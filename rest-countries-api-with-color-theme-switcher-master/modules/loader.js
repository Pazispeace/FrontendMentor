const preloader = document.querySelector(".loader-background");
const body = document.querySelector("body");

export const fadeEffect = setInterval(() => {
  if (!preloader.style.opacity) {
    preloader.style.opacity = 1;
    body.style.overflowY = "hidden";
  }
  if (preloader.style.opacity > 0) {
    preloader.style.opacity -= 0.1;
  } else {
    preloader.style.display = "none";
    body.style.overflowY = "initial";
    clearInterval(fadeEffect);
  }
}, 100);
