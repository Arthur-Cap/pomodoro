<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Time Manager</title>
  <link rel="stylesheet" href="style.css" />
  <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  <script src="https://apis.google.com/js/api.js"></script>
  <script src="https://www.youtube.com/iframe_api"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Dongle&family=Montserrat&family=Raleway:wght@600;700&display=swap');
  </style>
</head>

<body>
  <div class="main-head">
    <div class="left-head">
      <div id="avarta"></div>
      <p id="userName"><strong>Arthur Cap</strong></p>
    </div>
    <div class="right-head">
      <div class="choice flex-colum page2-btn1">
        <ion-icon class="head-icon" name="home-outline"></ion-icon><span class="head-icon_description">Home</span>
        <span class="head-icon_decor">____</span>
      </div>
      <div class="choice flex-colum page2-btn2">
        <ion-icon class="head-icon" name="checkbox-outline"></ion-icon><span class="head-icon_description">To Do
          List</span>
        <span class="head-icon_decor">____</span>
      </div>
      <div class="choice flex-colum page3-btn">
        <ion-icon class="head-icon" name="radio-outline"></ion-icon><span class="head-icon_description">Music </span>
        <span class="head-icon_decor">____</span>
      </div>
      <div class="choice flex-colum page4-btn">
        <ion-icon class="head-icon" name="calendar-outline"></ion-icon><span class="head-icon_description"> Carlendar
        </span>
        <span class="head-icon_decor">____</span>
      </div>
    </div>
  </div>
  <div class="pages">
    <div id="page1">


      <div class="main-body">
        <div id="left-body" class="flex-colum">
          <div class="task-in-process">
            <p class="work-description" id="heading-des">Timer</p>
            <p class="work-detail" id="heading-det">
              Set your time here :)
            </p>
          </div>
          <div class="count-time">
            <p id="time-remain">00 : 00</p>
            <ion-icon class="time-icon" id="reset-time" name="refresh-circle-outline"></ion-icon>
            <ion-icon class="time-icon" id="stop-time" name="pause-circle-outline"></ion-icon>
          </div>
          <div class="clock">
            <svg id="clock">
              <circle id="clock1" cx="150" cy="150" r="140" stroke="white" stroke-width="2px" fill="none" />
            </svg>
            <svg id="sub-clock">
              <circle id="clock2" cx="200" cy="200" r="160" stroke="white" stroke-width="2px" fill="none" />
            </svg>
            <svg id="sub-clock1">
              <circle id="clock3" cx="200" cy="200" r="150" stroke="white" stroke-width="2px" fill="none" />
            </svg>
          </div>
          <div class="time-controler">
            <div class="time-input">
              <button class="time-button down-button">
                <ion-icon name="chevron-back-circle-outline"></ion-icon>
              </button>
              <input type="number" id="hours-field" class="input-field" value="00" />
              <button class="time-button up-button">
                <ion-icon name="chevron-forward-circle-outline"></ion-icon>
              </button>
            </div>
            <div class="time-input">
              <button class="time-button down-button">
                <ion-icon name="chevron-back-circle-outline"></ion-icon>
              </button>
              <input type="number" id="minutes-field" class="input-field" value="00" />
              <button class="time-button up-button">
                <ion-icon name="chevron-forward-circle-outline"></ion-icon>
              </button>
            </div>
            <div class="time-input">
              <button class="time-button down-button">
                <ion-icon name="chevron-back-circle-outline"></ion-icon>
              </button>
              <input type="number" id="seconds-field" class="input-field" value="00" />
              <button class="time-button up-button">
                <ion-icon name="chevron-forward-circle-outline"></ion-icon>
              </button>
            </div>
            <button id="submit-time">SUBMIT</button>
          </div>
        </div>
        <div id="mid-body">
          <p id="hour">00</p>
          <p id="minute">00</p>
          <p id="second">00</p>
        </div>
        <div id="right-body">
          <p id="right-body-title" class="flex-colum">
            <strong>Next Work</strong>
          </p>

          <div id="work-list">
          </div>
        </div>
      </div>
      <div class="foot">
        <video id="foot-back" autoplay loop muted>
          <source src="sekiro.mp4" type="video/mp4" />
        </video>
      </div>
    </div>

    <div id="page2">
      <div id="page2-top" class=flex-colum>
        <div class="task-head-cover flex-colum">
          <p style="color: rgb(255, 255, 255); margin: 0; font-size: 1.2em; "><strong>PRIORITY</strong></p>

          <div id="task_head">
            <div class="priority_detail priority-icon1"> <ion-icon id=priority-icon1 name="albums"></ion-icon> High
            </div>
            <div class="priority_detail priority-icon2"> <ion-icon id=priority-icon2 name="albums"></ion-icon> Medium
            </div>
            <div class="priority_detail priority-icon3"> <ion-icon id=priority-icon3 name="albums"></ion-icon> Low</div>
          </div>
        </div>
        <div id="task_body">

          <div id="add-task" class="flex-colum"><ion-icon id=add-task-icon name="add-circle-outline"></ion-icon> ADD
            YOUR TASK</div>


        </div>

      </div>
      <div id="page2-bot">
        <div class="page2-bot_head">
          <ion-icon id=page2-bot_close-btn name="close-circle-outline"></ion-icon>
        </div>

        <div class="page2-bot-boy_cover ">
          <p id="task_detail"><strong>TASK DETAIL</strong></p>
          <div class="page2-bot_body ">

            <div class=" task-descrip_page2 page2-input">
              <textarea id="des" placeholder="Type here ..." maxlength="56"></textarea>
              <p><strong>Description</strong></p>
            </div>

            <div class=" task-detail_page2 page2-input">
              <textarea id="det" placeholder="Type here ..."></textarea>
              <p><strong>Detail</strong></p>
            </div>

            <div class=" task-duration_page2 page2-input">
              <div class="page2-bot_duration">
                <input class="time-dur" type="number" placeholder="Hours">h
                <input class="time-dur" type="number" placeholder="Minutes">m
                <input class="time-dur" type="number" placeholder="Seconds">s
              </div>
              <p><strong>Duration</strong></p>
            </div>

            <div class=" task-time_page2 page2-input">
              <textarea id="time-start" placeholder="hh:mm:ss">00:00:00</textarea>
              <p><strong>Time</strong></p>
            </div>

            <div class=" task-date_page2 page2-input">
              <textarea id="day" placeholder="dd/mm/yyyy">00/00/0000</textarea>
              <p><strong>Day</strong></p>
            </div>

            <div class=" task-priority_page2 page2-input">
              <div class="task-priority_first flex-colum">
                <input type="radio" name="task-priority" value="LOW">
                <div class="task-priority_container flex-colum">
                  <span>LOW</span>
                  <ion-icon name="book"></ion-icon>
                </div>
              </div>

              <div class="task-priority_second flex-colum">
                <input type="radio" name="task-priority" value="MEDIUM">
                <div class="task-priority_container flex-colum">
                  <span>MEDIUM</span>
                  <ion-icon name="shield"></ion-icon>
                </div>
              </div>

              <div class="task-priority_third flex-colum">
                <input type="radio" name="task-priority" value="HIGH">
                <div class="task-priority_container flex-colum">
                  <span>HIGH</span>
                  <ion-icon name="flame"></ion-icon>
                </div>
              </div>

              <p><strong>Priority</strong></p>
            </div>

            <div class="page2-bot_done-btn flex-colum">
              <P><strong>SUBMIT</strong></P>
            </div>


            

          </div>

        </div>
      </div>
    </div>
    <div id="page3">
      <div class="page3-head">
        <p class="music"><strong>Music</strong></p>
        <span>RECOMEND LIST</span>
        <p class="musicdes">There is a relationship between music and focus. Music can offer a resource for emotion
          regulation and help people achieve various goals such as maintaining focus on a task and reducing boredom 1.
          Music can also improve cognitive performance, reduce stress, and improve mood, all of which can contribute to
          better focus </p>
      </div>
      <div class="page3-body">
        <div class="music-list ml1">
          <div class="mld mld1">
            <p> WHITE NOISE </p>
          </div>
        </div>
        <div class="music-list ml2">
          <div class="mld mld2">
            <p> ELECTRONIC MUSIC </p>
          </div>
        </div>
        <div class="music-list ml3">
          <div class="mld mld3">
            <p> CHILL MUSIC </p>
          </div>
        </div>
        <div class="music-list ml4">
          <div class="mld mld4">
            <p> INSTRUMENTAL </p>
          </div>
        </div>
        <div id="ms-player"></div>
        <div class="music-list ml5">
          <div class="mld mld5">
            <p> SELF - CREATE </p>
          </div>
        </div>
      </div>
      <div class="popup-page3">

        <div class="popup_left-side">
          <div class="banner">

          </div>
          <div class="music-controller-cover">
            <div class="music-controller">
              <ion-icon name="play-skip-back-circle-outline"></ion-icon>
              <ion-icon name="shuffle-outline"></ion-icon>
              <ion-icon class="play-mid" id="play-ms-Button" name="play-circle-outline"></ion-icon>
              <ion-icon name="repeat-outline"></ion-icon>
              <ion-icon name="play-skip-forward-circle-outline"></ion-icon>
            </div>
          </div>
        </div>

        <div class="popup_right-side">
          <div id="ms-player"></div>

        </div>
      </div>

      <div class="blur-ms"></div>
    </div>
    <div id="page4">
      <div class="page4-content">
        <div class="page4-content1">
          <div id=fix class="page4-content1-1">
            <p>Done:</p>
            <p id="taskDone"></p>
          </div>
        </div>
        <div class="page4-content1">
          <div id="fix" class="page4-content1-1">
            <p>Total focus time:</p>
            <p id="focusTime"></p>
          </div>
        </div>
        <div class="page4-content1">
          <div class="page4-content1-1">
            <h3>
              <p id="fixx">Start time:</p>
              <p id="startTime"></p>
            </h3>
          </div>
        </div>
        <div class="page4-content2">
          <div class="progressBar">
            <span id="low"></span>
            <span id="medium"></span>
            <span id="high"></span>
          </div>
          <div class="page4-content2-1">
            <div class="value">
              <p class="page4-val" id="color1">Low: </p>
              <p id="lowVal"></p>
            </div>
            <div class="value">
              <p class="page4-val" id="color2">Medium: </p>
              <p id="mediumVal"></p>
            </div>
            <div class="value">
              <p class="page4-val" id="color3">High: </p>
              <p id="highVal"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End pages -->
  </div>
  <script src="https://www.youtube.com/iframe_api"></script>
  <script src="script.js"></script>
</body>

</html>
