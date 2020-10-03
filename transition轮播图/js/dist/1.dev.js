"use strict";

var container = document.getElementsByClassName('container')[0];
var wrapper = container.getElementsByClassName('wrapper')[0];
var slides = wrapper.getElementsByClassName('slide');
var pagination = container.getElementsByClassName('pagination')[0];
var oLis = pagination.getElementsByTagName('li');
var changeLeft = container.getElementsByClassName('changeLeft')[0];
var changeRight = container.getElementsByClassName('changeRight')[0];
var timer = null;
var index = 0;

var change = function change() {
  wrapper.style.transition = '0.5s';
  wrapper.style.transform = "translateX(".concat(-index * 1200, "px)");
  autoFocus();
};

var autoMove = function autoMove() {
  index++;

  if (index >= 5) {
    wrapper.style.transition = 'none';
    wrapper.style.transform = "translateX(0)";
    var l = container.offsetLeft;
    index = 1;
    wrapper.style.transition = '0.5s';
  }

  change();
};

var autoFocus = function autoFocus() {
  var temp = index;

  for (var i = 0; i < oLis.length; i++) {
    oLis[i].classList.remove('active');
  }

  if (temp >= 4) {
    temp = 0;
  }

  oLis[temp].classList.add('active');
};

var handleFocus = function handleFocus() {
  for (var i = 0; i < oLis.length; i++) {
    oLis[i].n = i;

    oLis[i].onclick = function () {
      index = this.n;
      change();
    };
  }
};

var handleButton = function handleButton() {
  changeLeft.onclick = function () {
    index--;

    if (index < 0) {
      wrapper.style.transition = 'none';
      wrapper.style.transform = "translateX(-4800px)";
      var l = container.offsetLeft;
      index = 3;
      wrapper.style.transition = '0.5s';
    }

    change();
  };

  changeRight.onclick = function () {
    autoMove();
  };
};

timer = setInterval(autoMove, 3000);
handleFocus();

container.onmouseover = function () {
  clearInterval(timer);
};

container.onmouseout = function () {
  timer = setInterval(autoMove, 3000);
};

handleButton();