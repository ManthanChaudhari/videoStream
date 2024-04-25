const progressBar = document.querySelector("#progressBar");
const searchInput = document.querySelector(".searchVid");
const homeList = document.querySelector(".home");
const homeIcon = homeList.querySelector("i");
const homeSpan = homeList.querySelector("span");

const playlistItem = document.querySelector(".playlist");
const localData = JSON.parse(localStorage.getItem("video-playlist")) || []
let playlist = [...localData];
const url = "https://yt-api.p.rapidapi.com/search?query=";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "04a5934699msh01385a8e400754fp179fbejsnd42b91f45084",
    "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
  },
};
// Debounce Code : 
const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          func.apply(context, args);
      }, delay);
  };
};
// Playlist link to the playlist.html
playlistItem.addEventListener("click" , () => {
  window.open("cart.html" , '_self');
})
//handle operations
function handleSearch(e) {
  try {
    if (e.key === "Enter" && searchInput.value.length > 1) {
      let getInputValue = searchInput.value;
      setTimeout(() => {
        homeIcon.classList.add("active");
        homeSpan.classList.add("active");
        fetchData(getInputValue);
      }, 500);
    }
  } catch (error) {
    alert("Some Error Occured , Try after some time");
    console.log("searchInput : ", error.message);
  }
}
searchInput.addEventListener("keydown", handleSearch);

// Button Functionalities :
function handleHomeClick() {
  try {
    if (
      homeIcon.classList.contains("active") &&
      homeSpan.classList.contains("active")
    ) {
      homeIcon.classList.remove("active");
      homeSpan.classList.remove("active");
      searchInput.value = "";
      updateUI(data);
    } else {
      return;
    }
  } catch (error) {
    console.log("featureIcon : ");
  }
}
homeList.addEventListener("click", handleHomeClick);




// Scroll Events : 

window.addEventListener("scroll", () => {
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
  fetchData("freecodecamp");
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
        const {thumbnail , title,channelTitle,channelThumbnail,lengthText,richThumbnail,videoId} = dataItem;
        if (!dataItem["channelThumbnail"] || !dataItem["thumbnail"] || !richThumbnail) return;
        const cloneCard = templateCard.content.cloneNode(true).children[0];
        cloneCard.querySelector(".thumbImage").src = thumbnail[0].url;
        cloneCard.querySelector(".title").innerText = title;
        cloneCard.querySelector(".channel-name").innerText = channelTitle
        cloneCard.querySelector(".channelLogo").src = channelThumbnail[0].url;
        cloneCard.querySelector(".timestamp").innerText = lengthText || "None"
          handleReview({richThumbnail , thumbnail} , cloneCard);
          handleVideoClick(videoId,cloneCard);
          handlePlaylist(dataItem,cloneCard);
        mainSection.append(cloneCard);
      });
    }
  } catch (error) {
    console.log("Error Occured in updateUI : ", error.message);
  }
}
function handleVideoClick(videoId,cloneCard){
  cloneCard.querySelector(".thumbImage").addEventListener("click" , debounce(function(){
    window.open(`https://www.youtube.com/watch?v=${videoId}` , "_blank")
    })
  ,100)
}
function handleReview({richThumbnail,thumbnail},cloneCard){
  cloneCard.querySelector(".thumbImage").addEventListener("mouseenter" , debounce(() => {
    cloneCard.querySelector(".thumbImage").src = richThumbnail[0].url;
  },100))
  cloneCard.querySelector(".thumbImage").addEventListener("mouseleave" , debounce(() => {
    cloneCard.querySelector(".thumbImage").src = thumbnail[0].url;
  },100))
}
// Playlist : 
function handlePlaylist(dataItem,card){
    card.querySelector(".addPlaylist").addEventListener("click" , () => {
      if(playlist.indexOf(dataItem) === -1){
        console.log("Yes");
        card.querySelector(".addPlaylist").innerHTML = "-"
       playlist = [dataItem , ...playlist];
       console.log(playlist);
       localStorage.setItem("video-playlist" , JSON.stringify(playlist));
      }
      else{ 
      card.querySelector(".addPlaylist").innerHTML = "+"
      playlist = playlist.filter(video => video.videoId !== dataItem.videoId);
      console.log(playlist);
      localStorage.setItem("video-playlist" , JSON.stringify(playlist));
      }
    })
  }
