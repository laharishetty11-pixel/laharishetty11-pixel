let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;
let lapCounter = 1;

function stopwatch(){

    seconds++;

    if(seconds == 60){
        seconds = 0;
        minutes++;
    }

    if(minutes == 60){
        minutes = 0;
        hours++;
    }

    updateDisplay();
}

function updateDisplay(){

    let h = String(hours).padStart(2,'0');
    let m = String(minutes).padStart(2,'0');
    let s = String(seconds).padStart(2,'0');

    document.getElementById("display").innerText =
    h + ":" + m + ":" + s;
}

function startStopwatch(){

    if(timer !== null){
        return;
    }

    timer = setInterval(stopwatch,1000);
}

function pauseStopwatch(){

    clearInterval(timer);
    timer = null;
}

function resetStopwatch(){

    clearInterval(timer);

    timer = null;

    seconds = 0;
    minutes = 0;
    hours = 0;

    lapCounter = 1;

    updateDisplay();

    document.getElementById("laps").innerHTML = "";
}

function recordLap(){

    if(timer == null){
        return;
    }

    let lapTime =
    document.getElementById("display").innerText;

    let li = document.createElement("li");

    li.innerText =
    "Lap " + lapCounter + " : " + lapTime;

    document.getElementById("laps").appendChild(li);

    lapCounter++;
}