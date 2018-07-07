const remote = require('electron').remote;

document.getElementById("quit-application-button").addEventListener("click", function quitAppListener() {
    remote.getCurrentWindow().close();
})