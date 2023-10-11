import countriesList from "./countries.js";

const toggleBtn = document.querySelector(".play-control")
const endBtn = document.querySelector(".end-control")
const timerDisplay = document.querySelector(".timer")
const input = document.querySelector(".input-country")
const mapDisplay = document.querySelector(".map-display")
const resultDisplay = document.querySelector(".result-display")
//const resultDisplayControls = document.querySelector(".controls-result-display")
const quizDisplayControlBar = document.querySelector(".control-bar-quiz")
const validatorDisplay = document.querySelector(".validator")
const result = document.querySelector(".result")
const totalCountries = countriesList.length

let quantityInputs = 0;
let quantityValidInputs = 0;

function switchDisplayMain() {

    /*if (mapDisplay.classList.contains("display-inactive")) {

        mapDisplay.classList.remove("display-inactive")
        mapDisplay.classList.add("display-active")
        resultDisplay.classList.remove("display-active")
        resultDisplay.classList.add("display-inactive")

    } else*/ if (mapDisplay.classList.contains("display-active")) {

        mapDisplay.classList.remove("display-active")
        mapDisplay.classList.add("display-inactive")
        resultDisplay.classList.remove("display-inactive")
        resultDisplay.classList.add("display-active")
        quizDisplayControlBar.classList.remove("display-active")
        quizDisplayControlBar.classList.add("display-inactive")

        result.innerText = `Well done! You correctly entered ${quantityValidInputs} countries out of ${totalCountries}`

    }

}

toggleBtn.onclick = function () {
    if (toggleBtn.classList.contains("inactive")) {

        toggleBtn.classList.remove("inactive")
        toggleBtn.classList.add("active")
        toggleBtn.classList.remove("btn-primary");
        toggleBtn.classList.add("btn-success");
        toggleBtn.textContent = "Pause";
        endBtn.classList.add("display-inactive")

    } else if (toggleBtn.classList.contains("active")) {

        toggleBtn.classList.remove("active")
        toggleBtn.classList.add("inactive")
        toggleBtn.classList.remove("btn-success");
        toggleBtn.classList.add("btn-primary");
        toggleBtn.textContent = "Play";
        endBtn.classList.remove("display-inactive")

    }
}

let timerInterval;
let timerRunning = false;
let seconds = 59;
let minutes = 14;


function updateTimer() {

    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

}

function toggleTimer() {

    if (timerRunning) {

        clearInterval(timerInterval);
        timerRunning = false;
        //toggleBtn.textContent = "Resume";

    } else {

        startTimer();
        //toggleBtn.textContent = "Pause";

    }
}

function startTimer() {

    if (!timerRunning) {
        timerInterval = setInterval(() => {
            seconds--;
            if (seconds === 0) {
                seconds = 59;
                minutes--;
            }
            if (minutes === -1 && seconds === 59) {
                endTimer();
            }

            updateTimer();
        }, 1000);
        timerRunning = true;
    }
}

function endTimer() {

    console.log(`Total correct inputs: ${quantityValidInputs} out of ${quantityInputs} total inputs`);

    clearInterval(timerInterval);
    timerRunning = false;
    seconds = 59;
    minutes = 14;
    updateTimer();

    toggleBtn.classList.remove("active")
    toggleBtn.classList.add("inactive")
    toggleBtn.classList.remove("btn-success");
    toggleBtn.classList.add("btn-primary");
    toggleBtn.textContent = "Play";
    //toggleBtn.textContent = "Start";
    switchDisplayMain()


}

toggleBtn.addEventListener("click", toggleTimer);
endBtn.addEventListener("click", endTimer);


function handleInputComparison() {

    const inputValue = input.value
    quantityInputs++
    if (countriesList.includes(inputValue)) {

        quantityValidInputs++;
        validatorDisplay.innerText = ""
        const mapElements = document.querySelectorAll(`.${inputValue}`);
        mapElements.forEach(function (mapElement) {

            mapElement.setAttribute("fill", "blue");

        });
    } else {

        validatorDisplay.innerText = "Invalid. Try again"

    }

    input.value = "";

}

input.addEventListener("keydown", function (event) {

    if (event.key == "Enter") {

        handleInputComparison()

    }

})



