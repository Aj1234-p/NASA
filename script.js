const imageContainer = document.querySelector("#current-image-container");
const searchPicture = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#btn");
const dateHistory = document.querySelector("#search-history");
const NASA_KEY = `n6Vx3mN5BlokIvG5x6WSpzG2crnPgBFOu1d5M4gd`;
const today = new Date().toISOString().split("T")[0];
let picHistory = JSON.parse(localStorage.getItem("Picture_History")) || [];

function displayImage(data){
  imageContainer.innerHTML = "";
  let title = document.createElement('p');
  title.classList.add('title');
  title.textContent = data.title;
  let img = document.createElement('img');
  img.classList.add('image');
  img.alt = data.alt;
  img.src = data.hdurl;
  let desc= document.createElement('p');
  desc.classList.add('description');
  desc.innerHTML = data.explanation;
  imageContainer.append(title,img,desc);
}


// when page loads
async function getCurrentImageOfTheDay(today) {
  const yy = today.slice(2, 4),
        mm = today.slice(5, 7),
        dd = today.slice(8);
  const resp = await fetch(
    `https://science.nasa.gov/wp-json/wp/v2/apod-basic/${yy}${mm}${dd}`,
  );
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const data = await resp.json();
  displayImage(data);
}

function addSearchToHistory() { 
  dateHistory.innerHTML = "";
  picHistory = JSON.parse(localStorage.getItem("Picture_History")) || [];
  picHistory.forEach((list) => {
    const li = document.createElement("li");
    li.classList.add("date-list");
    const a = document.createElement("a");
    a.href = list.date;
    a.textContent = list.date;
    li.appendChild(a);  
    dateHistory.appendChild(li);
    let selectList = document.querySelectorAll('#search-history .date-list a');
    selectList.forEach(dl=> {
     dl.addEventListener('click',(el)=>{
      el.preventDefault();
      getCurrentImageOfTheDay(el.target.textContent);
     });
    });
  });
}

getCurrentImageOfTheDay(today);
addSearchToHistory();

function saveSearch(date) {
  picHistory = JSON.parse(localStorage.getItem("Picture_History")) || [];
  const d = { date: date };
  picHistory.push(d);
  localStorage.setItem("Picture_History", JSON.stringify(picHistory));
}

async function getImageOfTheDay(date) {
  const yy = date.slice(2, 4),
  mm = date.slice(5, 7),
  dd = date.slice(8);
  const resp = await fetch(`https://science.nasa.gov/wp-json/wp/v2/apod-basic/${yy}${mm}${dd}`);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const data = await resp.json();
  displayImage(data);
}

// when search for a specific day
searchPicture.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchDate = searchInput.value;
  const yy1 = searchDate.slice(0,4), mm1 = searchDate.slice(5,7), dd1 = searchDate.slice(8);
  const yy2 = today.slice(0,4), mm2 = today.slice(5,7), dd2 = today.slice(8);
  if((yy1>yy2 && mm1<=mm2 && dd1<=dd2) || (yy1<=yy2 && mm1>mm2 && dd1<=dd2) || (yy1<=yy2 && mm1<=mm2 && dd1>dd2)){
    alert("Images older than 25 days are not available. Please select a date within the last 25 days");
    searchInput.value = "";
    return;
  }
  getImageOfTheDay(searchDate);
  saveSearch(searchDate);
  addSearchToHistory();
  searchInput.value = "";
});

