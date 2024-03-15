const progressBar = document.querySelector("#progressBar");
const themeList = document.querySelector(".theme");
const homeList = document.querySelector(".home");
const homeIcon = homeList.querySelector("i");
const homeSpan = homeList.querySelector("span");
const container = document.querySelector(".container");
const url = "https://yt-api.p.rapidapi.com/search?query=";
let data = [];
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "04a5934699msh01385a8e400754fp179fbejsnd42b91f45084",
    "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
  },
};
const searchInput = document.querySelector(".searchVid");

searchInput.addEventListener("keydown" , handleSearch);
function handleSearch(e){
  try{
    if(e.key === "Enter" && searchInput.value.length > 1){
    let getInputValue = searchInput.value;
    setTimeout(() => {
    homeIcon.classList.add("active");
    homeSpan.classList.add("active");
    fetchData(getInputValue);
  },500);
    }
  }
  catch(error){
    alert("Some Error Occured , Try after some time");
    console.log("searchInput : " , error.message);
  }
}

// Feature Icons : 
  homeList.addEventListener("click" , () => {
    try{
    if(homeIcon.classList.contains("active") && homeSpan.classList.contains("active")){
      homeIcon.classList.remove("active");
      homeSpan.classList.remove("active");
      searchInput.value = "";
      updateUI(data);
    }else return;
  }catch(error){
    console.log("featureIcon : " , )
  }
  })
  themeList.addEventListener("click" , () => {
    container.classList.toggle("darkMode");
    themeList.querySelector("i").classList.toggle("fa-sun")
  })



window.addEventListener("scroll",  () => {
  const scrolledFromTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  // scrollHeight gives the height of the content present in the body node
  // clientHeight gives the height of the content which is visible in the browser screen
  const scrolledPortion =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const percent = Math.round((scrolledFromTop / scrolledPortion) * 100);
  if (document.documentElement.scrollHeight > 800) {
    progressBar.style.width = `${percent}%`;
  }
});
window.onload = () => {
  fetchData("Hitesh Chaudhary");
};
async function fetchData(searchParam) {
  try {
    document.querySelector(".loader-div").style.visibility = "visible";
    const response = await fetch(
      `https://yt-api.p.rapidapi.com/search?query=${searchParam}`,
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    if (result) {
      updateUI(result.data);
      data = [...data , ...result.data];
      document.querySelector(".loader-div").style.visibility = "hidden";
    }
  } catch (error) {
    console.log("Error Occured in fetchData() function : ", error.message);
    alert("An error occurred while fetching data. Please try again later.");
  }
}

function updateUI(data) {
  const templateCard = document.getElementById("template-card");
  const mainSection = document.querySelector("main");
  mainSection.innerHTML = " ";
  try {
    if (data && data.length) {
      data.forEach((dataItem) => {
        if (!dataItem["channelThumbnail"]) return;
        const cloneCard = templateCard.content.cloneNode(true).children[0];
        cloneCard.querySelector(".thumbImage").src = dataItem.thumbnail[0].url;
        cloneCard.querySelector(".title").innerText = dataItem["title"];
        cloneCard.querySelector(".channel-name").innerText =
          dataItem["channelTitle"];
        cloneCard.querySelector(".channelLogo").src =
          dataItem.channelThumbnail[0].url;
        cloneCard.querySelector(".timestamp").innerText =
         dataItem["lengthText"] || "None";
        mainSection.append(cloneCard);
      });
    }
  } catch (error) {
    console.log("Error Occured in updateUI : ", error.message);
  }
}
