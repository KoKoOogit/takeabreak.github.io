var today = new Date()
var time = today.getHours()
var saveBtn = document.getElementById("saveBtn")
var nextRunTime;
var wrapperElem = document.getElementById("time-wrapper")
var running_actual_timer = true
var audio = new Audio("sound.wav");

audio.onended = (e) => {
    if (running_actual_timer == true){
        audio.play()
    } 
    else{

    }
}

function setMinutes() {
  const getMinutes = document.getElementById("minuteInput").value
  localStorage.setItem("duration-gap", (getMinutes > 0) ? getMinutes : 10)
  alert(`Next Reminder Will Show you In  ${getMinutes}  minutes`)
}


function checkElementExists() {
  let minElem = document.getElementById("mins");
  let secElem = document.getElementById("secs");
  if (typeof (minElem) != 'undefined' && minElem != null && typeof (secElem) != 'undefined' && secElem != null) {
    return true
  }
  else {
    return false
  }
}

function nextTime(minutes) {
  var today = new Date()
  var currentTime = today.getMinutes()
  var nextNMinutes = currentTime + minutes
  today.setMinutes(nextNMinutes)
  return today
}


function startActualTimer(timer) {
  // This is the HTML from our response as a text string
  timeUntilNextEvent = nextTime(timer)

  var myfunc = setInterval(function() {

    var now = new Date().getTime();
    var timeleft = timeUntilNextEvent.getTime() - now;

    // Calculating the days, hours, minutes and seconds left

    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    // Result is output to the specific element
    //<time id="mins"></time>
    // <time id="secs"></time>



    let minElem = document.getElementById("mins");
    let secElem = document.getElementById("secs");
    minElem.innerText = minutes + "m "
    secElem.innerText = seconds + "s "

    // Display the message when countdown is over
    if (timeleft < 0) {
      clearInterval(myfunc);

      document.getElementById("mins").innerText = "Whoo! "
      document.getElementById("secs").innerText = "Fininshed!"


      startBackgroundTimer()
      running_actual_timer = false
      audio.pause()
    }
  }, 1000)
}

function startBackgroundTimer() {
    
    document.getElementById("mins").innerText = "You May Continue"
    document.getElementById("secs").innerText = "Your Task"

    var TimeToRun = localStorage.getItem("duration-gap") == null ? localStorage.setItem("duration-gap",10) : localStorage.getItem("duration-gap")
    console.log(TimeToRun)


    var tenMins = 60 * parseInt(TimeToRun) * 1000
    const startBgTaskInterval = setInterval(function () {
        tenMins--
        if (tenMins <= 0) {

            //If it isn't "undefined" and it isn't "null", then it exists.

            clearInterval(startBgTaskInterval)

            
            showStartNowBtn()
            running_actual_timer = true
            startActualTimer(5)
            audio.play()

        }
    }, 1000

    )
}

function startNow(e){
    console.log(e)
    e.style.display = "none"
    startBackgroundTimer()
}

function showStartNowBtn(){
    const startNowBtn = document.getElementById("startNowBtn")
    startNowBtn.style.display = "inline"
    startNowBtn.innerText = "Start Again"
}