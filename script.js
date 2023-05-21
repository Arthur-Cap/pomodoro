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
  document.querySelector("body").style.backgroundImage =
    "url('background.jpg')";
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
  document.querySelector("#page1").style.transform = "translateX(-100vw)";
  document.querySelector("#page2").style.transform = "translateX(-100vw)";

  document.querySelector("#page3").style.transform = "translateX(-100vw)";
  document.querySelector("#page4").style.transform = "translateX(0vw)";

  document.querySelector("#page1").style.width = "0vw";
  document.querySelector("#page2").style.width = "0vw";


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

  document.querySelector("#page3").style.width = "0vw";
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
