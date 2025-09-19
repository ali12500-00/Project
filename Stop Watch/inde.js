let secondElapsed=0;
let interval=null;
let time=document.querySelector("#time")
function padStart(value){
    return String(value).padStart(2,"0")
}
 function setTime(){
    minutes=Math.floor(secondElapsed/60)
    second=secondElapsed%60;
    time.innerHTML=`${padStart(minutes)}:${padStart(second)}`
 }
function timer(){
    secondElapsed++;
    setTime();
}

function startClock(){
    if (interval) stopClock()
    interval=setInterval(timer,1000)
    
}
function stopClock(){
    clearInterval(interval)
}
function resetClock(){
    secondElapsed=0;
    stopClock()
    setTime()
}