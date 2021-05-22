const searchForm = document.querySelector("form"); // CSS selector which allows you to select elements in HTML (element selected <form></form> from HTML)
const searchResultDiv = document.querySelector(".search-result"); // element selected from html <div class="search-result">
const container = document.querySelector(".container"); // element selected <div class="container initial">


//API

let searchQuery = "";
const APP_ID = "daa69c3e"; 
const APP_key = "606223eac7048b332bab16a880b0571a";



searchForm.addEventListener("submit", (e) => {   //Taged </form> and listening for event of submit from form then is = to preventDefault / (e stands for event)
  e.preventDefault(); //prevents from being directed to a differnt page
  searchQuery = e.target.querySelector("input").value; //The target event property returns the element that triggered the event.
  fetchAPI(); // interface for fetching resources
});


// The purpose of async/await functions is to 
//simplify the behavior of using Promises synchronously and to perform some behavior on a group of Promises
async function fetchAPI() {
  const baseURL = `https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;  // 20 returns 20 search's/hits on webstie from the API
  const response = await fetch(baseURL); // fecting the above URL
  const data = await response.json(); // after fecthing URL this line converts into Json then into data, used to transmit data between a server and web applications, the data is converted into a hits array, loged into 20 counts on web page
  generateHTML(data.hints) // passing data to the html, calling hits from the array
  console.log(data);
}

function myFunction(x) {
  x.classList.toggle("fa-thumbs-down");
}

//Below function is calling the results from our data.hits array results

 function generateHTML(results){
 container.classList.remove('initial');
 let generatedHTML = '';
 //maping our result and loping through our array data, and every time we loop through the data array we are retuning the below html string and to our genrated html 20 times.
 results.map(result => {  
 generatedHTML +=
 `
 
<div class="item">
  <img src="${result.food.image}" alt="img">
  <div class="flex-container">
  <h1 class="title">${result.food.label}</h1>   
</div>
  <p class="item-data">Carbs Grams: ${result.food.nutrients.CHOCDF.toFixed(2)}</p>
  <p class="item-data">Protein Grams: ${result.food.nutrients.PROCNT.toFixed(2)}</p>
  <p class="item-data">Fat Grams: ${result.food.nutrients.FAT.toFixed(2)}</p>
  <p class="item-data">Servings: ${result.food.servingsPerContainer}</p>
  <i onclick="myFunction(this)" class="fa fa-thumbs-up"></i>
</div>
`;

});

searchResultDiv.innerHTML = generatedHTML;
}


 // apply the 20 items from the above looping array to the search reults div (ref line 13 html)
    




