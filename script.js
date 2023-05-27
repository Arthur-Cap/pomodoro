var taskList = [];
var idCount = 0;
var taskCount = 0;
var taskDisplay = 0;
var adding = 0;
function task(description, duration, priority, detail, timeStart, day, id) {
  this.description = description;
  this.duration = duration;
  this.priority = priority;
  this.detail = detail;
  this.timeStart = timeStart;
  this.day = day;
  this.id = id;
}
function getTask() {
  idCount += 1;
  a = new task();
  a.id = idCount;
  a.description = document.getElementById('des').value;
  a.detail = document.getElementById('det').value;
  var time = document.getElementsByClassName('time-dur');
  time[0].value.length < 2 ? time[0].value = '0' + time[0].value : time[0].value = time[0].value;
  time[1].value.length < 2 ? time[1].value = '0' + time[1].value : time[1].value = time[1].value;
  time[2].value.length < 2 ? time[2].value = '0' + time[2].value : time[2].value = time[2].value;
  a.duration = time[0].value + ':' + time[1].value + ':' + time[2].value;
  a.timeStart = document.getElementById('time-start').value;
  a.day = document.getElementById('day').value;
  var check = document.getElementsByName('task-priority')
  for (let i = 0; i < check.length; i++) {
    if (check[i].checked) {
      a.priority = check[i].value;
      break;
    }
  }
  taskList.push(a)

  return;

}
function getTotalSec(obj) {
  var timeTask = obj.timeStart.split(":");
  var hourTime = timeTask[0];
  var minuTime = timeTask[1];
  var secTime = timeTask[2];
  return hourTime * 60 * 60 + minuTime * 60 + parseInt(secTime);
}

function addTask(taskChoose) {
  if (taskDisplay == 5) {
    return;
  }
  let small = taskList.reduce((a, b) => {
    return getTotalSec(b) > getTotalSec(a) ? a : b;
  })
  if (taskChoose == 0) {
    var choose = taskList[taskCount]
    var counting = taskCount;
  } else {
    if (taskList.length == 4) {
      return;
    }
    var choose = taskList[4]
    var counting = taskCount + adding -1; 
  }

  const div1 = document.createElement('div');
  div1.className = "Work open-animation";
  div1.style.transform = "scale(1, 1)";
  div1.style.transition = "all 0.2s ease-out 0s";
  div1.id = "work" + taskCount;
  if (getTotalSec(choose) == getTotalSec(small)) {
    let getSmallId = "work" + small.id;
    document.getElementById('work-list').prepend(div1)
  } else {
    if (taskList.length == 0) {
      document.getElementById('work-list').appendChild(div1)
    } else {
      let flag = 0;
      for (let i = 0; i < taskList.length; i++) {
        let getId = taskList[i].id - 1;
        let riuID = "work" + getId;
        if (i > 0) {
          getId = taskList[i - 1].id;
          riuID = "work" + getId;
        }
        if (getTotalSec(choose) < getTotalSec(taskList[i])) {
          document.getElementById('work-list').insertBefore(div1, document.getElementById(riuID))
          flag = 1;
        }
      }
      if (flag == 0) {
        document.getElementById('work-list').appendChild(div1)
      }
    }
  }
  const div2 = document.createElement('div');
  div2.classList.add('left-work-bar', 'flex-colum');
  var p1 = document.createElement('p');
  p1.innerHTML = choose.timeStart;
  p1.className = "task-time";
  var p2 = document.createElement('p');
  p2.innerHTML = "Duration : " + choose.duration;
  p2.className = "duration";
  var p3 = document.createElement('p');
  p3.innerHTML = "Priority : " + choose.priority;
  p3.className = "task-priority";
  div2.appendChild(p1)
  div2.appendChild(p2)
  div2.appendChild(p3)
  div1.appendChild(div2);
  var div3 = document.createElement('div');
  div3.className = "mid-work-bar";
  var p4 = document.createElement('p');
  p4.innerHTML = choose.description;
  p4.className = "work-description";
  var p5 = document.createElement('p')
  p5.innerHTML = choose.detail;
  p5.className = "work-detail"
  div3.appendChild(p4)
  div3.appendChild(p5)
  div1.appendChild(div3)
  var buton = document.createElement('button')
  buton.innerHTML = "Done";
  buton.className = "end-task-button flex-colum";
  buton.addEventListener('click', function () {
    div1.style.transform = "scale(1,0)";
    div1.style.transition = "all 0.2s ease-out";
    setTimeout(function () {

      // if(counting >=5){
      //   alert("okkk")
      //   adding+=1;
      // }
      div1.remove();
      document.getElementById(counting).remove()
      let coutingRemove = counting - adding
      if (counting > 5) { taskList.splice(coutingRemove - 1, 1) }
      else {
        taskList.splice(counting - 1, 1)
      }
      taskCount--;
      taskDisplay--;

      if (taskDisplay == 4 && taskList.length > 4) {
        // adding+=1;
        addTask(1)

        adding += 1;
      }
    }, 400);
  })
  div1.appendChild(buton);

  taskCount += 1;
  taskDisplay++;
}

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
var timeStore=0;
var timeCount=0;
var restTime;
var storeTimeCount=0;
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
  console.log("timecount: " +timeCount)
  console.log("totalsec: " +totalSeconds)
  }


function runtime() {
  changeTimePerSecond = setInterval(function () {
    if (totalSeconds <= 0) {
      clearInterval(changeTimePerSecond);
    }
    calculateTime();
    timeCount+=1;
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
});

document.querySelector(".page2-btn1").addEventListener("click", function () {
  document.querySelector("body").style.backgroundImage =
    "url('background.jpg')";
  document.querySelector("#page1").style.transform = "translateX(00vw)";
  document.querySelector("#page1").style.width = "100vw";
});

var priorities = document.querySelectorAll(".task-priority_page2 input");

var colorSave = null;

priorities[0].addEventListener("click", function () {
  priorities[0].parentNode.parentNode.style.border = "3px solid rgb(13, 255, 0)";
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
    getTask();
    var newTask = document.createElement("div");
    newTask.id = taskCount;
    if (taskList.length > 6) {
      adding += 1;
      newTask.id = taskCount + adding;
    }

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

    newTask.style.borderBottom = "5px solid " + colorSave;
    newTask.style.textAlign = "center";
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
    setTimeout(function () { clearPage2(); }, 1500)
    addTask(0);
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
