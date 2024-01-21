var before = document.getElementById("before");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
var commands = [];

setTimeout(function () {
    loopLines(header, "", 80);
    textarea.focus();
}, 100);

window.addEventListener("keydown", enterKey);

//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
    textarea.focus();
    // Check for Ctrl + R combination
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault(); // Prevent default behavior (page refresh)
        var confirmReload = confirm("Are you sure you want to reload the page?");
        if (confirmReload) {
            document.location.reload(true);
        }
    } else {
        if (e.keyCode == 13) {
            commands.push(command.innerHTML);
            git = commands.length;
            addLine("(guest@sashank.wiki) - $ <span class='previous-command'>" + command.innerHTML + "</span>", "no-animation", 0);
            commander(command.innerHTML.toLowerCase());
            command.innerHTML = "";
            textarea.value = "";
        }

        if (e.keyCode == 38 && git != 0) {
            git -= 1;
            textarea.value = commands[git];
            command.innerHTML = textarea.value;
        }
        if (e.keyCode == 40 && git != commands.length) {
            git += 1;
            if (commands[git] === undefined) {
                textarea.value = "";
            } else {
                textarea.value = commands[git];
            }
            command.innerHTML = textarea.value;
        }
    }
}

function commander(cmd) {
    switch (cmd.toLowerCase()) {
        case "achievements":
            loopLines(achievements, "color2 margin", 80);
            break;
        case "clear":
            setTimeout(function () {
                terminal.innerHTML = '<a id="before"></a>';
                before = document.getElementById("before");
            }, 1);
            break;
        case "contact":
            loopLines(contact, "color2 margin", 80);
            break;
        case "education":
            loopLines(education, "color2 margin", 80);
            break;
        case "experience":
            loopLines(experience, "color2 margin", 80);
            break;
        case "header":
            loopLines(header, "", 80);
            break;
        case "help":
            loopLines(help, "color2 margin", 80);
            break;
        case "projects":
            loopLines(projects, "color2 margin", 80);
            break;
        case "resume":
            loopLines(resume, "color2 margin", 80);
            break;
        case "skills":
            loopLines(skills, "color2 margin", 80);
            break;
        case "social":
            loopLines(social, "color2 margin", 80);
            break;
        case "whoami":
            loopLines(whoami, "color2 margin", 80);
            break;
        // Secret Commands
        case "sudo":
            addLine("Nice try, but no dice.", "error", 80);
            break;
        case "starwars":
            loopLines(starwars, "color2 margin", 80);
            break;
        case "jokes":
            loopLines(jokes, "color2 margin", 80);
            break;
        // Invalid Command
        default:
            addLine("<span class=\"inherit\">Invalid command. To view available commands, enter <span class=\"command\">'help'</span>.</span>", "error", 100);
            break;
    }
}

function addLine(text, style, time) {
    var t = "";
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
            t += "&nbsp;&nbsp;";
            i++;
        } else {
            t += text.charAt(i);
        }
    }
    setTimeout(function () {
        var next = document.createElement("p");
        next.innerHTML = t;
        next.className = style;

        before.parentNode.insertBefore(next, before);

        window.scrollTo(0, document.body.offsetHeight);
    }, time);
}

function loopLines(name, style, time) {
    name.forEach(function (item, index) {
        addLine(item, style, index * time);
    });
}