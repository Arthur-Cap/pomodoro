function displayTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // add leading zero to minutes and seconds
  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  document.getElementById("hour").innerHTML = hours;
  document.getElementById("minute").textContent = minutes;
  document.getElementById("second").textContent = seconds;
}
setInterval(displayTime, 1000);

let workIndex = 1;
const works = document.querySelectorAll(".Work");

const interval = setInterval(() => {
  if (workIndex > works.length) {
    clearInterval(interval);
    return;
  }

  const element = works[workIndex - 1];
  element.style.transform = "scale(1,1)";
  element.style.transition = "all 0.2s ease-out";

  workIndex++;
}, 150);
function removene(text) {
  document.querySelector(text).style.transform = "scale(1,0)";
  document.querySelector(text).style.transition = "all 0.2s ease-out";
  setTimeout(function () {
    document.querySelector(text).remove(text);
  }, 400);
}
// removene("#work4");
// setTimeout(function(){
//     removene("#work1")},200);

var tasks = document.querySelectorAll(".end-task-button");

tasks.forEach((element) => {
  element.addEventListener("click", function () {
    console.log(element.parentNode.id);
    removene("#" + element.parentNode.id);
  });
});

var time = "00:05:20";
var timeParts;
var hoursInSeconds;
var minutesInSeconds;
var secondinSecond;
var totalSeconds;
var reduceTime = 1;
var permanentSecond;
var changeTimePerSecond;
function formatTime() {
  timeParts = time.split(":");
  hoursInSeconds = parseInt(timeParts[0]) * 3600;
  minutesInSeconds = parseInt(timeParts[1]) * 60;
  secondinSecond = parseInt(timeParts[2]);
  totalSeconds = hoursInSeconds + minutesInSeconds + secondinSecond;
  permanentSecond = totalSeconds;
}
formatTime();
function calculateTime() {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = totalSeconds % 60;
  document.querySelector("#time-remain").innerHTML =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  document.querySelector("#clock").style.strokeDashoffset =
    879 - (totalSeconds / permanentSecond) * 879;
  totalSeconds = totalSeconds - reduceTime;
}

function runtime() {
  changeTimePerSecond = setInterval(function () {
    if (totalSeconds <= 0) {
      clearInterval(changeTimePerSecond);
    }
    calculateTime();
  }, 1000);
}
runtime();
var isPaused = false;

document.querySelector("#stop-time").addEventListener("click", function () {
  if (totalSeconds > 0) {
    if (isPaused) {
      document.querySelector("#stop-time").name = "pause-circle-outline";
      isPaused = false;
      runtime();
    } else {
      document.querySelector("#stop-time").name = "play-circle-outline";
      clearInterval(changeTimePerSecond);
      isPaused = true;
    }
  }
});

document.querySelector("#reset-time").addEventListener("click", function () {
  totalSeconds = permanentSecond;
  isPaused = true;
  clearInterval(changeTimePerSecond);
  calculateTime();
  document.querySelector("#stop-time").name = "play-circle-outline";
});

document.querySelectorAll(".down-button").forEach(function (button) {
  button.addEventListener("click", function (e) {
    var input = e.target.parentNode.parentNode.querySelector("input");
    if (input.value > 0) input.value--;
  });
});
document.querySelectorAll(".up-button").forEach(function (button) {
  button.addEventListener("click", function (e) {
    var input = e.target.parentNode.parentNode.querySelector("input");
    if (input.value < 60 || input.id === "hours-field") input.value++;
  });
});

var changeTimeSpeed = null;
var pressTime = null;

document.querySelectorAll(".down-button").forEach(function (button) {
  button.addEventListener("mousedown", function (e) {
    var input = e.target.parentNode.parentNode.querySelector("input");
    pressTime = setTimeout(function () {
      changeTimeSpeed = setInterval(function () {
        if (input.value > 0)
          input.value = String(parseInt(input.value) - 1).padStart(2, "0");
      }, 100);
    }, 1000);
  });

  button.addEventListener("mouseup", function (e) {
    clearTimeout(pressTime);
    clearInterval(changeTimeSpeed);
  });
});

document.querySelectorAll(".up-button").forEach(function (button) {
  button.addEventListener("mousedown", function (e) {
    var input = e.target.parentNode.parentNode.querySelector("input");
    pressTime = setTimeout(function () {
      changeTimeSpeed = setInterval(function () {
        if (input.value < 60 || input.id === "hours-field")
          input.value = String(parseInt(input.value) + 1).padStart(2, "0");
      }, 100);
    }, 500);
  });

  button.addEventListener("mouseup", function (e) {
    clearTimeout(pressTime);
    clearInterval(changeTimeSpeed);
  });
});

document.querySelector("#submit-time").addEventListener("click", function (e) {
  var hoursValue = document.querySelector("#hours-field").value;
  var minutesValue = document.querySelector("#minutes-field").value;
  var secondsValue = document.querySelector("#seconds-field").value;
  time = hoursValue + ":" + minutesValue + ":" + secondsValue;
  console.log(time);
  formatTime();
  calculateTime();
});

document.querySelector("#add-task").addEventListener("click", function (e) {
  document.querySelector("#page2-top").style.height = 0;
  document.querySelector("#page2-top").style.transform = "translateY(-100vh)";
  document.querySelector("#page2-bot").style.marginTop = 0;
  setTimeout(function () {
    document.querySelector("#page2-bot_close-btn").style.transform =
      "translateX(00px)";
  }, 1000);
  setTimeout(function () {
    document.querySelector("#page2-bot_close-btn").style.animation =
      "rotate1 5s linear infinite";
  }, 2000);
});

document
  .querySelector("#page2-bot_close-btn")
  .addEventListener("click", function () {
    document.querySelector("#page2-bot_close-btn").style.animation = "none";
    setTimeout(function () {
      document.querySelector("#page2-bot_close-btn").style.transform =
        "translateX(100px)";
    }, 100);

    setTimeout(function () {
      document.querySelector("#page2-top").style.height = "85vh";
      document.querySelector(".task-head-cover").style.display = "flex";
      document.querySelector("#page2-top").style.transform = "translateY(00vh)";
    }, 500);
    setTimeout(function () {
      document.querySelector("#page2-bot").style.marginTop = "20vh";
    }, 1700);
  });

document.querySelector(".page2-btn2").addEventListener("click", function () {
  document.querySelector("body").style.backgroundImage = "url('back2.jpg')";
  document.querySelector("#page1").style.transform = "translateX(-100vw)";
  document.querySelector("#page1").style.width = "0vw";
  document.querySelector("#page2").style.width = "100vw";
  document.querySelector("#page3").style.width = "100vw";

  document.querySelector("#page2").style.transform = "translateX(00vw)";
  document.querySelector("#page3").style.transform = "translateX(00vw)";
});

document.querySelector(".page3-btn").addEventListener("click", function () {
  document.querySelector("body").style.backgroundColor = "#1a1a32";
  document.querySelector("body").style.backgroundImage = "none";
  document.querySelector("#page1").style.transform = "translateX(-100vw)";
  document.querySelector("#page2").style.transform = "translateX(-100vw)";

  document.querySelector("#page3").style.transform = "translateX(0vw)";
  document.querySelector("#page4").style.transform = "translateX(0vw)";

  document.querySelector("#page1").style.width = "0vw";
  document.querySelector("#page2").style.width = "0vw";
  document.querySelector("#page3").style.width = "99.9vw";
});
document.querySelector(".page4-btn").addEventListener("click", function () {
  document.querySelector("body").style.backgroundImage = "url('back2.jpg')";
  document.querySelector("#page1").style.transform = "translateX(-300vw)";
  document.querySelector("#page2").style.transform = "translateX(-200vw)";

  document.querySelector("#page3").style.transform = "translateX(-100vw)";
  // document.querySelector("#page4").style.transform = "translateX(-100vw)";

  document.querySelector("#page1").style.width = "0vw";
  document.querySelector("#page2").style.width = "0vw";
  document.querySelector("#page3").style.width = "0vw";

  document.querySelector("#page4").style.width = "100vw";
});
document.querySelector(".page2-btn1").addEventListener("click", function () {
  document.querySelector("body").style.backgroundImage =
    "url('background.jpg')";
  document.querySelector("#page2").style.transform = "translateX(0vw)";
  document.querySelector("#page1").style.transform = "translateX(0vw)";
  document.querySelector("#page3").style.transform = "translateX(0vw)";
  document.querySelector("#page4").style.transform = "translateX(0vw)";

  document.querySelector("#page1").style.width = "100vw";
  document.querySelector("#page2").style.width = "100vw";

  document.querySelector("#page3").style.width = "100vw";
  document.querySelector("#page4").style.width = "0vw";
});

var priorities = document.querySelectorAll(".task-priority_page2 input");

var colorSave = null;

priorities[0].addEventListener("click", function () {
  priorities[0].parentNode.parentNode.style.border =
    "3px solid rgb(13, 255, 0)";
  colorSave = "rgb(13, 255, 0)";
});

priorities[1].addEventListener("click", function () {
  priorities[1].parentNode.parentNode.style.border =
    "3px solid rgb(238, 255, 0)";
  colorSave = "rgb(238, 255, 0)";
});

priorities[2].addEventListener("click", function () {
  priorities[2].parentNode.parentNode.style.border = "3px solid rgb(255, 7, 7)";
  colorSave = "rgb(255, 7, 7)";
});

var page2Body = document.querySelector("#task_body");
document
  .querySelector(".page2-bot_done-btn")
  .addEventListener("click", function () {
    var newTask = document.createElement("div");
    newTask.classList.add(
      "task-list",
      "task-list" + page2Body.childElementCount + 1
    );
    var duration = document.querySelectorAll(".task-duration_page2 input");
    newTask.innerHTML =
      " <p class='task-day'>" +
      document.querySelector(".task-date_page2 textarea").value +
      "</p>" +
      "<p class='task-time'>" +
      document.querySelector(".task-time_page2  textarea").value +
      "</p>" +
      "<p class='duration'>Duration : " +
      duration[0].value +
      "h " +
      duration[1].value +
      "m " +
      duration[2].value +
      "s " +
      "</p>" +
      "<p class='work-description'>" +
      document.querySelector(".task-descrip_page2  textarea").value +
      "</p>" +
      "<p class=work_detail>" +
      document.querySelector(".task-detail_page2 textarea").value +
      "</p>" +
      "<button class='task-detail'>Task Detail</button>";

    console.log("5px solid " + colorSave);
    newTask.style.borderBottom = "5px solid " + colorSave;
    newTask.style.textAlign = "center";
    console.log(newTask);
    page2Body.appendChild(newTask);

    document.querySelector("#page2-bot_close-btn").style.animation = "none";
    setTimeout(function () {
      document.querySelector("#page2-bot_close-btn").style.transform =
        "translateX(100px)";
    }, 100);

    setTimeout(function () {
      document.querySelector("#page2-top").style.height = "85vh";
      document.querySelector(".task-head-cover").style.display = "flex";
      document.querySelector("#page2-top").style.transform = "translateY(00vh)";
    }, 500);
    setTimeout(function () {
      document.querySelector("#page2-bot").style.marginTop = "20vh";
    }, 1700);
    setTimeout(function () {
      clearPage2();
    }, 1500);
  });

function clearPage2() {
  var duration = document.querySelectorAll(".task-duration_page2 input");
  document.querySelector(".task-time_page2 textarea").value = "00:00:00";
  document.querySelector(".task-date_page2 textarea").value = "00/00/00";
  document.querySelector(".task-descrip_page2  textarea").value = "";
  document.querySelector(".task-detail_page2 textarea").value = "";
  priorities[2].parentNode.parentNode.style.border = "3px solid white";
  duration[0].value = "";
  duration[1].value = "";
  duration[2].value = "";
  priorities.forEach((priority) => {
    priority.checked = false;
  });
}

var popupPage3 = document.querySelectorAll(".popup-page3");
var popupblur = document.querySelector(".blur-ms");

var musicList = document.querySelectorAll(".music-list");
musicList.forEach(function (element) {
  element.addEventListener("click", function (e) {
    popupPage3.forEach(function (element) {
      element.style.display = "flex";
      element.style.transform = "scaleY(1)";

    });
    popupblur.style.backdropFilter = "blur(5px)";
    popupblur.style.transform = "scaleY(1)";

  });
});


popupblur.addEventListener("click", function (e) {
  popupPage3.forEach(function (element) {
    element.style.transform = "scaleY(0)";

  });
  popupblur.style.backdropFilter = "blur(0)";
  popupblur.style.transform = "scaleY(0)";
  document.querySelector(".popup_right-side").innerHTML ="";
});

var banner = document.querySelector(".banner");
document.querySelector(".ml1").addEventListener("click", function (e) {
  banner.style.backgroundImage = "url(mlchill.jpg)";
  getVideosDetails(whiteNoise);
  msplayer.loadVideoById(whiteNoise[0]);
  videoIds=whiteNoise.getVideoIds();
});

document.querySelector(".ml2").addEventListener("click", function (e) {
  banner.style.backgroundImage = "url(elecMus.jpg)";
  getVideosDetails(electronicMusic);
  msplayer.loadVideoById(electronicMusic[0]);
  videoIds=electronicMusic.getVideoIds();
});

document.querySelector(".ml3").addEventListener("click", function (e) {
  banner.style.backgroundImage = "url(lightms.jpg)";
  getVideosDetails(chillMusic);
  msplayer.loadVideoById(chillMusic[0]);
  videoIds=chillMusic;
});

document.querySelector(".ml4").addEventListener("click", function (e) {
  banner.style.backgroundImage = "url(novoice.jpg)";
  getVideosDetails(instrumentalMusic);
  msplayer.loadVideoById(instrumentalMusic[0]);
  videoIds=instrumentalMusic;

});

document.querySelector(".ml5").addEventListener("click", function (e) {
  banner.style.backgroundImage = "url(mlchill.jpg)";

  var customeLink = prompt("Please enter your name");


  msplayer.loadVideoById(instrumentalMusic[0]);
  videoIds=instrumentalMusic;
});

var msplayer;


async function getVideoIds(linkPL) {
  return new Promise((resolve, reject) => {
    var playlistId = extractPlaylistId(linkPL);
    if (playlistId) {
      var apiKey = 'AIzaSyD5CLYGTJlmIPvuPR3p5NoZQlxUyzOlspY';
      var url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          var idList = data.items.map(item => item.contentDetails.videoId);
          resolve(idList);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      reject(new Error('Liên kết playlist không hợp lệ'));
    }
  });
}

function extractPlaylistId(playlistLink) {
  var regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/playlist\?list=|https?:\/\/(?:www\.)?youtu\.be\/)([a-zA-Z0-9_-]{10,})/;
  var match = playlistLink.match(regex);
  if (match && match.length > 1) {
    return match[1];
  }
  return null;
}

var chillMusic ;
var whiteNoise;
var electronicMusic;
var instrumentalMusic ;
var yourMusic;

async function fetchData() {
  try {
     chillMusic = await getVideoIds("https://youtube.com/playlist?list=PLnAH_52EwoIXQ2ZAFNM2YHBUkvhic0Dfb");
     whiteNoise = await getVideoIds("https://youtube.com/playlist?list=PLnAH_52EwoIWwgJhlT_Ts2_EOYZ0Ha-pR");
     electronicMusic = await getVideoIds("https://youtube.com/playlist?list=PLnAH_52EwoIXSj_xUxZX95plTTi2rhRvV");
     instrumentalMusic = await getVideoIds("https://youtube.com/playlist?list=PLnAH_52EwoIXQ2ZAFNM2YHBUkvhic0Dfb");
    

    // Tiếp tục xử lý dữ liệu
  } catch (error) {
    console.error(error);
  }
}

fetchData();

setTimeout(console.log("ggg"+chillMusic),3000);

//////////////////
var videoIds = ["nMfPqeZjc2c","nMfPqeZjc2c"];
var apiKey = "AIzaSyD5CLYGTJlmIPvuPR3p5NoZQlxUyzOlspY";

function onYouTubeIframeAPIReady() {
  msplayer = new YT.Player('ms-player', {
    height: '00px',
    width: '00px',
    videoId: videoIds[0],
    playerVars: {
      'playsinline': 1,
      'mute' :0,
      'defaultPlaybackQuality': 'small'
    },
    events: {
      'onStateChange': onPlayerStateChange
    }
  });

  var playButton = document.getElementById('play-ms-Button');
  playButton.addEventListener('click', playVideo);
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    nextSong();
    
  }
}

function nextSong(){
  var currentIndex = videoIds.indexOf(msplayer.getVideoData().video_id);
    var nextIndex = (currentIndex + 1) % videoIds.length;
    var nextVideoId = videoIds[nextIndex];
    msplayer.loadVideoById(nextVideoId);
}
function playVideo() {
  msplayer.playVideo();
}



//////////////
function loadClient() {
  return gapi.client
    .init({
      apiKey: apiKey,
    })
    .then(function () {
      console.log("API loaded successfully");
      return gapi.client.load(
        "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
      );
    })
    .then(function () {
      console.log("Client loaded successfully");
      getVideosDetails([]);
    })
    .catch(function (err) {
      console.error("Error loading client", err);
    });
}

function createVideoElement(index, title, channelTitle) {
  var msDiv = document.createElement("div");
  msDiv.className = "ms";

  var hiddenVid = document.createElement("div");
  hiddenVid.id="ms-player";

  var msNumberDiv = document.createElement("div");
  msNumberDiv.className = "ms-number";
  var h1 = document.createElement("h1");
  h1.textContent = index;
  msNumberDiv.appendChild(h1);

  var msDetailDiv = document.createElement("div");
  msDetailDiv.className = "ms-detail";
  var span = document.createElement("span");
  span.textContent = title;
  var p = document.createElement("p");
  p.textContent = channelTitle;
  msDetailDiv.appendChild(span);
  msDetailDiv.appendChild(p);

  var ionIcon = document.createElement("ion-icon");
  ionIcon.setAttribute("name", "heart-circle-outline");

  msDiv.appendChild(hiddenVid);
  msDiv.appendChild(msNumberDiv);
  msDiv.appendChild(msDetailDiv);
  msDiv.appendChild(ionIcon);

  var popupRightSide = document.querySelector(".popup_right-side");
  popupRightSide.appendChild(msDiv);
}

///

async function getVideosDetails(videoIDs) {
  for (var i = 0; i < videoIDs.length; i++) {
    try {
      var response = await gapi.client.youtube.videos.list({
        part: "snippet",
        id: videoIDs[i],
      });
  console.log(videoIDs+'g');

      var title = response.result.items[0].snippet.title;
      var channelTitle = response.result.items[0].snippet.channelTitle;

      createVideoElement(i, title, channelTitle);
    } catch (err) {
      console.error("Execute error", err);
    }
  }
}

gapi.load("client", loadClient);
//////////////////////////////////////


