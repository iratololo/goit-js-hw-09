const selectors = {
    startButton: document.querySelector("button[data-start]"),
    stopButton: document.querySelector("button[data-stop]"),
    body: document.querySelector("body")
}

document.addEventListener("click", changeкBackground);

let timerId = null;

function changeкBackground(evt) {
    if (evt.target === selectors.startButton) {
        evt.target.disabled = true;
        selectors.stopButton.disabled = false;
        timerId = setInterval(() => {
          selectors.body.style.backgroundColor = getRandomHexColor();  
        },1000);
    }
    if (evt.target === selectors.stopButton) {
        evt.target.disabled = true;
        selectors.startButton.disabled = false;
        clearTimeout(timerId);
    }
};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}



