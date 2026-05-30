const hamburger = document.getElementById("hamburger");
const navitems = document.getElementById("nav_items");

hamburger.addEventListener('click', ()=>{
    console.log("it is working");
    navitems.classList.toggle("active");
})