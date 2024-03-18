const playlist = [...JSON.parse(localStorage.getItem("video-playlist"))];
const main_section = document.querySelector("main");
const homeList = document.querySelector(".home");
const homeItem = homeList.querySelector("i");




if(playlist && playlist.length){
    playlist.forEach((item) => {
        main_section.innerHTML += `${item}`
    })
}
else{
    main_section.innerHTML = `<h1>Playlist Section is Empty</h1>`;
}
// Home Click Handler
homeItem.addEventListener("click" , handleHomeClick)
function handleHomeClick(){
    window.open("index.html" , "_self");
}

