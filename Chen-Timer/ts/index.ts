const birthday: Date = new Date(1995, 10, 21);
const timeContainer: HTMLElement = document.getElementById(
  "timeContainer"
) as HTMLElement;

let i = 0;

outputTime();
function outputTime() {
  const nowaday: Date = new Date();

  const dis: number = nowaday.getTime() - birthday.getTime();
  timeContainer.innerHTML = String(dis / 3600 / 1000 / 24 / 365).slice(0, 14);
  i++;
  setTimeout(outputTime, 20);
}

document.addEventListener("click", () => {
  (document.documentElement as any).webkitRequestFullscreen();
});
