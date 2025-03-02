var videoEl = document.getElementsByTagName("video")[0],
  playBtn = document.getElementById("playBtn");
  vidControls = document.getElementById("controls");
  volumeControl = document.getElementById("volume");
  speedControl = document.getElementById("speed");
  timePicker = document.getElementById("timer");
  fullScreenButton = document.getElementById("full-screen");
  seekBar = document.getElementById("seek-bar");


const valueS = document.querySelector("#speedValue");
const inputS = document.querySelector("#speed");
valueS.textContent = inputS.value + "x";
inputS.addEventListener("input", (event) => {
  valueS.textContent = event.target.value + "x";
});

const valueV = document.querySelector("#volumeValue");
const inputV = document.querySelector("#volume");
valueV.textContent = inputV.value + "%";
inputV.addEventListener("input", (event) => {
  valueV.textContent = event.target.value + "%";
});

videoEl.addEventListener(
  "canplaythrough",
  function () {
    vidControls.classList.remove("hidden");
    videoEl.volume = volumeControl.value;
    videoEl.playbackRate = speedControl.value;
  });


seekBar.addEventListener("change", function () {
  var time = videoEl.duration * (seekBar.value / 100);
  videoEl.currentTime = time;
});

videoEl.addEventListener("timeupdate", function() {
  var value = (100 / videoEl.duration) * videoEl.currentTime;
  seekBar.value = value;
});

seekBar.addEventListener("mousedown", function() {
  videoEl.pause();
});

seekBar.addEventListener("mouseup", function() {
  videoEl.play();
});

fullScreenButton.addEventListener("click", function () {
  if (videoEl.requestFullscreen) {
    videoEl.requestFullscreen();
  } else if (videoEl.mozRequestFullScreen) {
    videoEl.mozRequestFullScreen();
  } else if (videoEl.webkitRequestFullscreen) {
    videoEl.webkitRequestFullscreen();
  }
});

playBtn.addEventListener(
  "click",
  function () {
    if (videoEl.paused) {
      videoEl.play();
    } else {
      videoEl.pause();
    }
  },
  false
);

videoEl.addEventListener(
  "play",
  function () {
    playBtn.innerText = "Pause";
  });


videoEl.addEventListener(
  "pause",
  function () {
    playBtn.innerText = "Play";
  });


volumeControl.addEventListener(
  "input",
  function () {
    videoEl.volume = volumeControl.value;
  });


speedControl.addEventListener(
  "input",
  function () {
    videoEl.playbackRate = speedControl.value;
  });


videoEl.addEventListener(
  "ended",
  function () {
    videoEl.currentTime = 0;
  });


videoEl.addEventListener("timeupdate", function() {
  timePicker.innerHTML = secondsToTime(videoEl.currentTime);
  var value = (100 / videoEl.duration) * videoEl.currentTime;
  seekBar.value = value;
});


function secondsToTime(time) {
  var h = Math.floor(time / (60 * 60));
  var dm = time % (60 * 60);
  var m = Math.floor(dm / 60);
  var ds = dm % 60;
  var s = Math.ceil(ds);
  if (s === 60) {
    m = m + 1;
  }
  if (s < 10) {
    s = "0" + s;
  }
  if (m === 60) {
    m = 0;
    h = h + 1;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (h === 0) {
    fulltime = m + ":" + s;
  } else {
    fulltime = h + ":" + m + ":" + s;
  }
  return fulltime;
}
