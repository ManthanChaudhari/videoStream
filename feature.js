
const container = document.querySelector(".container");
const themeList = document.querySelector(".theme");
const localTheme = localStorage.getItem("ytTheme");

// Theme Mode
function handleThemeMode() {
  const isDarkMode = container.classList.toggle("darkMode");
  localStorage.setItem("ytTheme", isDarkMode ? "darkMode" : "");
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("ytTheme");
  container.classList.toggle("darkMode", savedTheme === "darkMode");
}

initializeTheme();
themeList.addEventListener("click", handleThemeMode);
