"use strict";

// ---fullscreen---
function cancelFullScreen(el) {
  var requestMethod =
    el.cancelFullScreen ||
    el.webkitCancelFullScreen ||
    el.mozCancelFullScreen ||
    el.exitFullscreen;
  if (requestMethod) {
    // cancel full screen.
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}

function requestFullScreen(el) {
  // Supports most browsers and their versions.
  var requestMethod =
    el.requestFullScreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen;

  if (requestMethod) {
    // Native full screen.
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
  return false;
}

function toggleFull() {
  var elem = document.body; // Make the body go full screen.
  var isInFullScreen =
    (document.fullScreenElement && document.fullScreenElement !== null) ||
    (document.mozFullScreen || document.webkitIsFullScreen);

  if (isInFullScreen) {
    cancelFullScreen(document);
  } else {
    requestFullScreen(elem);
  }
  return false;
}
// ------

let timer = 0;

// подсвечивает предмет
function checkTimer() {
  if (timer == 5) {
    document.querySelector(`#${array1[0]}`).classList.add("light");
  }
}

const intervalFunc = setInterval(function() {
  timer++;
  checkTimer();
}, 1000);

let array1 = ["book", "basket", "fan", "shoe"];

// создаёт массив из <p> с названиями
let arrMod = array1.map((el, i) => {
  let p = document.createElement("p");
  p.id = el + 1;
  p.className = "set__item";
  p.innerHTML = el;
  document.querySelector("#set").appendChild(p);
});

// при клике на предмет - он исчезает с экрана и из списка и из массива
function setInvisible(e) {
  array1.forEach(el => {
    if (e.target.id == el) {
      e.target.classList.add("hidden");
      document.querySelector(`#${el}1`).classList.add("hidden");
      let indexForDelete = array1.indexOf(el);
      array1.splice(indexForDelete, 1);
    }
  });
  timer = 0;
}

function checkEndGame() {
  if (array1.length == 0) {
    clearInterval(intervalFunc);
    document.querySelector(`#overlay`).style.display = "initial";
  }
}

document.querySelector("#background").addEventListener("click", e => {
  setInvisible(e);
  checkEndGame();
});

// клик сквозь верхний div
document.querySelector("#my-cuts").addEventListener("click", e => {
  document.querySelector("#my-cuts").style.display = "none";
  let inner = document.elementFromPoint(e.clientX, e.clientY);
  inner.click();
  document.querySelector("#my-cuts").style.display = "initial";
});
