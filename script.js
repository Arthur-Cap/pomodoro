var taskList = [];
var idCount = 0;
var taskCount = 0;
var taskDisplay = 0;
var adding = 0;
var doneTask=0;
var low = 0;
var medium=0;
var high=0;
var percentLow=0;
var percentMedium=0;
var percentHigh=0;
var totalPriority = 0;
var countt = 1;
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
  totalPriority+=1;
  if(a.priority=="LOW"){
    low+=1;
  }
  if(a.priority=="MEDIUM"){
    medium+=1;
  }
  if(a.priority=="HIGH"){
    high+=1;
  }
  taskList.push(a)
  return;

}
function getValue(){
  setInterval( ()=>{
    percentLow=low/totalPriority*100;
    percentMedium=medium/totalPriority*100;
    percentHigh=high/totalPriority*100;
    document.getElementById("lowVal").innerHTML = low
    document.getElementById("mediumVal").innerHTML = medium
    document.getElementById("highVal").innerHTML = high
    document.getElementById("low").style.width= percentLow + "%"
    document.getElementById("medium").style.width= percentMedium + "%"
    document.getElementById("high").style.width= percentHigh + "%"
    document.getElementById('focusTime').innerHTML = convertSecondsToHMS(focusTime+1) + " s"
  },1000)
}
function convertSecondsToHMS(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;

  // Add leading zeros if necessary
  var hoursString = hours < 10 ? "0" + hours : hours.toString();
  var minutesString = minutes < 10 ? "0" + minutes : minutes.toString();
  var secondsString = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds.toString();

  return hoursString + ":" + minutesString + ":" + secondsString;
}
getValue()
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
  var small = taskList.reduce((a, b) => {
    return getTotalSec(b) > getTotalSec(a) ? a : b;
  })
  console.log(taskList)
  if (taskChoose == 0) {
    var choose = taskList[taskCount]
    var counting = taskCount;
  } else {
    if (taskList.length == 4) {
      return;
    }
    var choose = taskList[4]
    // if(adding>3){
    //   adding-=3;
    // }
    console.log(adding)
    var counting = taskCount + adding +1;
    if(counting>6){
      counting =  taskCount + adding -1;
    }
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
      console.log("delete no: " + counting)
      div1.remove();
      document.getElementById(counting).remove()
      let coutingRemove = counting - adding
      if (counting > 5) { taskList.splice(coutingRemove - 1, 1) }
      else {
        taskList.splice(counting - 1, 1)
      }

      taskCount--;
      taskDisplay--;
      doneTask+=1;
      console.log("deleted: " + counting)
      document.getElementById("taskDone").innerHTML = doneTask;
      if (taskDisplay == 4 && taskList.length > 4) {
        // adding+=1;
        addTask(1)
        adding += 1;
      }
    }, 400);
  })
  div1.appendChild(buton);
  console.log("id of: " +counting)
  taskCount += 1;
  taskDisplay++;
}
function getStartTime(){
  document.querySelector('#startTime').innerHTML = document.querySelector("#hour").innerText + " : " + document.querySelector("#minute").innerText+ " : " + document.querySelector('#second').innerText
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
setTimeout(getStartTime,3000)
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
var focusTime=0;
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
  if(totalSeconds == -1) {
    totalSeconds = 0
    return
  }
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
function relax(){
  if(timeCount % 5 ==0){
    timeStore = totalSeconds;
    totalSeconds = 5;
    clearInterval(changeTimePerSecond)
    stopRest = setInterval(()=>{
      if (totalSeconds <= 0) {
        totalSeconds = timeStore;
        runtime()
        clearInterval(stopRest);
      }
      calculateTime();
    },1000)
  }
}

function runtime() {
  changeTimePerSecond = setInterval(function () {
    if (totalSeconds <= 0) {
      clearInterval(changeTimePerSecond);
    }
    calculateTime();
    timeCount+=1;
    focusTime+=1;
    relax()
    console.log(timeCount)
  }, 1000);
}
// runtime();
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
  timeCount=0;
  formatTime();
  document.querySelector("#stop-time").name = "play-circle-outline";
      clearInterval(changeTimePerSecond);
      isPaused = true;
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
        document.querySelector(".page2-bot_done-btn").style.opacity="1"
        clearPage2()
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
  //here1
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
//here2
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
  //here4
});

var priorities = document.querySelectorAll(".task-priority_page2 input");

var colorSave = null;//here5

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
    if(taskList.length>7){
      alert("Maximum 8 Task!");
      return
    }
    getTask();
    var newTask = document.createElement("div");
    newTask.id = taskCount;
    console.log("append normal" +newTask.id)
    if (taskList.length > 6) {
      adding += 1;
      newTask.id = taskCount + adding;
      console.log("append not ok" +newTask.id)
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
      "</p>" 
      +
       "<button class='task-detail'>Task Detail</button>";
    newTask.style.borderBottom = "5px solid " + colorSave;
    newTask.style.textAlign = "center";
    page2Body.appendChild(newTask);
    document.getElementsByClassName('task-detail')[newTask.id].id=newTask.id;
    showwTask()

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
function handleClick(event) {
  var clickedElement = event.target;
  return clickedElement;
}
function showwTask(){
  var taskDetails = document.querySelectorAll(".task-detail");
taskDetails.forEach(function (taskDetail) {
  taskDetail.addEventListener("click", function (event) {
    var clickedon =  handleClick(event);
    console.log(clickedon.id)
    document.querySelector("#page2-top").style.height = 0;
    document.querySelector("#page2-top").style.transform = "translateY(-100vh)";
    document.querySelector("#page2-bot").style.marginTop = 0;
    setTimeout(function () {
      document.querySelector("#page2-bot_close-btn").style.transform =
        "translateX(0px)";
    }, 1000);
    setTimeout(function () {
      document.querySelector("#page2-bot_close-btn").style.animation =
        "rotate1 5s linear infinite";
    }, 2000);
    document.querySelector(".page2-bot_done-btn").style.opacity="0"
    for(let i = 0 ; i<taskList.length ; i++){
      if(clickedon.id=="0"){
        var timeTas = taskList[0].duration.split(":");
        var hourTim = timeTas[0];
        var minuTim = timeTas[1];
        var secTim = timeTas[2];
        document.getElementById('des').value = taskList[0].description;
        document.getElementById('det').value = taskList[0].detail;
        document.getElementsByClassName('time-dur')[0].value=hourTim
        document.getElementsByClassName('time-dur')[1].value=minuTim
        document.getElementsByClassName('time-dur')[2].value=secTim
        document.getElementById('time-start').value=taskList[0].timeStart
        document.getElementById('day').value=taskList[0].day
        var chec = document.getElementsByName('task-priority')
        for (let j = 0; j < chec.length; j++) {
          if (taskList[0].priority == chec[j].value ) {
            chec[j].checked=true;
            break;
          }}
      }else{
        if(clickedon.id == taskList[i].id){
          
          i+=1;
          var timeTas = taskList[i].duration.split(":");
          var hourTim = timeTas[0];
          var minuTim = timeTas[1];
          var secTim = timeTas[2];
          document.getElementById('des').value = taskList[i].description;
          document.getElementById('det').value = taskList[i].detail;
          document.getElementsByClassName('time-dur')[0].value=hourTim
          document.getElementsByClassName('time-dur')[1].value=minuTim
          document.getElementsByClassName('time-dur')[2].value=secTim
          document.getElementById('time-start').value=taskList[i].timeStart
          document.getElementById('day').value=taskList[i].day
          var chec = document.getElementsByName('task-priority')
          for (let j = 0; j < chec.length; j++) {
            if (taskList[i].priority == chec[j].value ) {
              chec[j].checked=true;
              break;
            }}}
        }
      
    }
  });
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
var customeLink;
var firstTime = 1;
document.querySelector(".ml5").addEventListener("click", function (e) {
  banner.style.backgroundImage = "url(mlchill.jpg)";

  if (firstTime == 1) {
    customeLink = prompt(
      "Open your YouTube Playlist and copy link, then paste it here !",
      "https://youtube.com/playlist?list=PLnAH_52EwoIVgpPDZCqx41Z9nPL5eIPew"
    );
    fetchData();
    firstTime = 0;

  setTimeout(function () {
    getVideosDetails(yourMusic);
  msplayer.loadVideoById(yourMusic[0]);
  videoIds=yourMusic;
  },1000);
  }
  getVideosDetails(yourMusic);

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
     yourMusic = await getVideoIds(customeLink);


    // Tiếp tục xử lý dữ liệu
  } catch (error) {
    console.error(error);
  }
}

fetchData();

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
var pauseButton = document.getElementById("play-ms-Button");
pauseButton.addEventListener("click", function () {


  if(pauseButton.getAttribute('name')=='pause-circle-outline'){
    pauseButton.setAttribute('name', 'play-circle-outline');
  msplayer.pauseVideo();
  }
  else{
    pauseButton.setAttribute('name', 'pause-circle-outline');
  msplayer.playVideo();
  }

});
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

document
  .querySelector("#play-ms-Button")
  .addEventListener("click", function () {
    stopVideo();
  });
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
