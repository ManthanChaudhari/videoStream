
const container = document.querySelector(".container");
const themeList = document.querySelector(".theme");

// Theme Mode
function handleThemeMode() {
    container.classList.toggle("darkMode");
    themeList.querySelector("i").classList.toggle("fa-sun");
  }
  themeList.addEventListener("click", handleThemeMode);