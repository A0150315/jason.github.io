"use strict";
var birthday = new Date(1995, 10, 21);
var timeContainer = document.getElementById("timeContainer");
var i = 0;
outputTime();
function outputTime() {
    var nowaday = new Date();
    var dis = nowaday.getTime() - birthday.getTime();
    timeContainer.innerHTML = String(dis / 3600 / 1000 / 24 / 365).slice(0, 14);
    i++;
    setTimeout(outputTime, 20);
}
document.addEventListener("click", function () {
    document.documentElement.webkitRequestFullscreen();
});
