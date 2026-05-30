const hamburger = document.getElementById("hamburger");
const navitems = document.getElementById("nav_items");
const mode_btn = document.getElementById("switch");
const currentTheme = localStorage.getItem("theme");




hamburger.addEventListener('click', ()=>{
    console.log("it is working");
    navitems.classList.toggle("active");
})



mode_btn.addEventListener("click", () => {
  mode_btn.classList.toggle("ani")
  document.body.classList.toggle("dark");
  mode_btn.classList.toggle("moon");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

if (currentTheme === "dark") {
  document.body.classList.add("dark");
  mode_btn.classList.add("moon");
}
