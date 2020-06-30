window.addEventListener("DOMContentLoaded", function () {
  let video = document.querySelector(".video");
  let vid = document.querySelector("video");
  let bottom = document.querySelector(".bottom");
  let play = document.querySelector(".play");
  let li = document.querySelectorAll(".last li");

  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");
  let usedTime = document.querySelector(".usedTime");
  let remainingTime = document.querySelector(".remainingTime");
  let sliderTime = document.querySelector(".sliderTime");
  let sliderCover = document.querySelector(".sliderCover");
  let stop = document.querySelector(".stop");
  let volumeScroller = document.querySelector("#volumeScroller");
  let videoCounter = 0,
    forEach,
    videoArray = [];
  li = Array.from(li);
  changeVideoColor();
  forEach = Array.prototype.forEach;

  for (i in vid.dataset) {
    videoArray.push(vid.dataset[i]);
  }
  let time_step = 3;
  let videoLength = vid.duration;
  let lengthOfSlider = 350;
  function formatTime(seconds) {
    let mins, secs, time;
    time = Math.round(seconds);
    if (time > 59) {
      mins = time / 60 > 9 ? time / 60 : `0${time / 60}`;
      secs = time - mins * 60 > 9 ? time - mins * 60 : `0${time - mins * 60}`;
    } else {
      mins = "00";
      secs = time > 9 ? time : `0${time}`;
    }
    return `${mins}:${secs}`;
  }

  video.addEventListener("mouseover", function (e) {
    bottom.classList.add("showControls");
  });
  video.addEventListener("mouseout", function (e) {
    bottom.classList.remove("showControls");
  });
  play.addEventListener("click", function () {
    if (vid.paused || vid.ended) {
      vid.play();
      play.innerText = "pause";
    } else {
      vid.pause();
      play.innerText = "play";
    }
  });

  vid.addEventListener("timeupdate", function () {
    updateTime(remainingTime, usedTime, formatTime);
    sliderTime.style.width = `${vid.currentTime * (100 / vid.duration)}%`;
  });
  sliderCover.addEventListener("click", function (e) {
    let time = Math.round((e.offsetX / lengthOfSlider) * vid.duration);
    sliderTime.style.width = `${time}%`;
    vid.currentTime = time;
    updateTime(remainingTime, usedTime, formatTime);
  });
  function updateTime(remainingTime, usedTime, formatTime) {
    let remaining = vid.duration - vid.currentTime;
    remainingTime.innerText = formatTime(remaining);
    usedTime.innerText = formatTime(vid.currentTime);
  }
  stop.addEventListener("click", function () {
    vid.pause();
    vid.currentTime = 0;
    play.innerText = "Play";
    vid.playbackRate = 1;
    sliderTime.style.width = "0%";
  });
  volumeScroller.addEventListener("change", function (e) {
    vid.volume = this.value;
  });

  vid.addEventListener("ended", function () {
    changeVideo(1);
  });
  next.addEventListener("click", function () {
    changeVideo(1);
  });
  prev.addEventListener("click", function () {
    changeVideo(-1);
  });
  function changeVideo(num) {
    videoCounter += num;
    sources = vid.getElementsByTagName("source");
    if (sources[0].src.indexOf(videoArray[videoArray.length]) === -1) {
      forEach.call(sources, function (source) {
        source.src = source.src.replace(
          videoArray[videoCounter - num],
          videoArray[videoCounter]
        );
      });
    }

    changeVideoColor();
    vid.load();
    vid.play();
  }
  function changeVideoColor() {
    li.forEach(function (l) {
      l.classList.remove("active");
    });

    li[videoCounter].classList.add("active");
  }
});
