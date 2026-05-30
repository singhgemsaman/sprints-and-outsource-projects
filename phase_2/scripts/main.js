const hamburger = document.getElementById("hamburger");
const navitems = document.getElementById("nav_items");

hamburger.addEventListener('click', ()=>{
    // console.log("it is working");
    navitems.classList.toggle("active");
})





const mode_btn = document.getElementById("switch");

mode_btn.addEventListener("click", () => {
  mode_btn.classList.toggle("ani")
  document.body.classList.toggle("dark-mode");
  mode_btn.classList.toggle("moon");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  mode_btn.classList.add("moon");
}