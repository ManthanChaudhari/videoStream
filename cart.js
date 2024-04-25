const playlist = JSON.parse(localStorage.getItem("video-playlist")) || []; 
let realPlaylist = [...playlist]
const main_section = document.querySelector("main");
const homeList = document.querySelector(".home");

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

window.onload =  () => {
    if(realPlaylist && realPlaylist.length>0){
        updateUI(realPlaylist)
    }
    else{
        main_section.innerHTML = `<h1 class="emptyMsg">Playlist Section is Empty</h1>`;
    }
}
// Home Click Handler
function handleHomeClick(){
    window.open("index.html" , "_self");
}
homeList.addEventListener("click" , handleHomeClick)

// Update Ui : 
function updateUI(data) {
    const templateCard = document.getElementById("template-card");
    console.log(data);
    try {
      if (data) {
        data.forEach((dataItem) => {
          const {thumbnail , title,channelTitle,channelThumbnail,lengthText,richThumbnail,videoId} = dataItem;
          if (!dataItem["channelThumbnail"] || !dataItem["thumbnail"] || !richThumbnail) return;
          const cloneCard = templateCard.content.cloneNode(true).children[0];
          cloneCard.querySelector(".thumbImage").src = thumbnail[0].url;
          cloneCard.querySelector(".title").innerText = title;
          cloneCard.querySelector(".channel-name").innerText = channelTitle
          cloneCard.querySelector(".channelLogo").src = channelThumbnail[0].url;
          cloneCard.querySelector(".timestamp").innerText = lengthText || "None"
          // console.log(dataItem);
          cloneCard.querySelector(".addPlaylist").innerHTML = "-";
            handleVideoClick(videoId,cloneCard);
            handlePlaylist(dataItem,cloneCard);
          main_section.append(cloneCard);
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
  function handlePlaylist(data , card){
    card.querySelector(".addPlaylist").addEventListener("click" , (e) => {
        // const indexOfCard = realPlaylist.indexOf(data);
        realPlaylist = [...realPlaylist.filter(video => video !== data)];
        localStorage.setItem("video-playlist" , JSON.stringify(realPlaylist));
        // console.log(card);
        card.style.display = "none"
        // console.log(realPlaylist);
        if(!realPlaylist.length){
            main_section.innerHTML = `<h1 class="emptyMsg">Playlist Section is Empty</h1>`;
        }
    })
}