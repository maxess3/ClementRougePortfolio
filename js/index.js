import images from '../img/*.jpg';
import data from '../json/project.json';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";

//SHOW NAVBAR WHEN SCROLL DOWN
let last_scroll_top = 0;
const navbar = document.getElementById("navbar-container");
document.addEventListener("scroll", (e)=> {
    if(window.innerWidth > 20){
        let scroll_top = window.scrollY;
        if(scroll_top > 0){
            navbar.classList.add("navbar-desactivate");
        }
        if(scroll_top < (last_scroll_top)){
            navbar.classList.add("navbar-active");
        } else {
            navbar.classList.remove("navbar-active");
        }
        last_scroll_top = scroll_top;
    } else {
        navbar.classList.remove("navbar-desactivate");
    }
})

if(window.scrollY === 0){
    navbar.style.opacity = "1";
}

// CREATE AND DISPLAY CARDS
function createCard(title,images,filename){
    const grid = document.getElementById("grid-work");
    let outerDiv = document.createElement("div");
    let innerDiv = document.createElement("div");
    let span = document.createElement("span");
    let img = document.createElement("img");
    img.setAttribute("src",`${images[filename]}`);
    img.setAttribute("alt","Photo du projet");
    outerDiv.setAttribute("data-aos","fade-up");
    span.classList.add("titleCard");
    outerDiv.classList.add(`project`);
    span.textContent = title;
    innerDiv.appendChild(span);
    innerDiv.appendChild(img);
    outerDiv.appendChild(innerDiv);
    grid.appendChild(outerDiv);
}

(function createCards(){
    for (let i = 0; i < data.length; i++) {
        let title = data[i].title;
        let filename = data[i].imageURL;
        createCard(title,images,filename);
    }
})();

// DISPLAY PROJECT SHOWCASE
const title = document.getElementById("title");
const client = document.getElementById("client");
const year = document.getElementById("year");
const skills = document.getElementById("skills");
const projectURL = document.getElementById("projectURL");
const description = document.getElementById("description");
const video = document.getElementById("video");
const card = document.querySelectorAll(".project");
const titleProject = document.querySelector(".title-project");
const clickProject = document.querySelector(".project-click");
const showProject = document.getElementById("project-show");
for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", () => {
        title.textContent = data[i].title;
        client.textContent = data[i].client;
        year.textContent = data[i].year;
        skills.textContent = data[i].skills;
        projectURL.setAttribute("href",data[i].projectURL);
        description.textContent = data[i].description;
        video.setAttribute("src",data[i].videoURL)
        titleProject.classList.add("show-project");
        showProject.classList.add("show-project");
        gsap.from(showProject, { // selector text, Array, or object
            opacity: 0,
            delay: 0.5,
            duration: 0.3,
            ease: "ease"
        });
        clickProject.scrollIntoView({
            behavior: 'smooth'
          });
    })
}

// CLOSE PROJECT SHOWCASE
const closeProject = document.querySelector(".close-now");
closeProject.addEventListener("click", () => {
    titleProject.classList.remove("show-project");
    showProject.classList.remove("show-project");
})

// NEXT OR PREV PROJECT
const prevProject = document.querySelector(".arrow-left");
const nextProject = document.querySelector(".arrow-right");
let index = null;
// elToChange = [title,client,year,skills,projectURL,description,photoProject];
let elToChange = [title]; // Change data for elements
prevProject.addEventListener("click", (e) => {
    if(index === null || index === 0){
        index = data.findIndex(x => x.title === title.textContent);
        if(index === 0){
            index = data.length - 1;
        } else {
            index = index - 1;
        }
        changeData(index);
    } else {
        index = index - 1;
        changeData(index);
    }
    // Data animation
    animData(elToChange);
})

nextProject.addEventListener("click", (e) => {
    if(index === null || index === (data.length - 1)){
        index = data.findIndex(x => x.title === title.textContent);
        if(index === (data.length - 1)){
            index = 0;
        } else {
            index = index + 1;
        }
        changeData(index);
    } else {
        index = index + 1;
        changeData(index);
    }
    // Data animation
    animData(elToChange);
})

function animData(els){
    let delay = 0;
    els.forEach(element => {
        delay = delay + 0.1;
        gsap.from(element, { // selector text, Array, or object
            duration: 0.5, // seconds
            opacity: 0,
            delay: delay,
            ease: "power2.inOut",
        });
    });
}

function changeData(index){
    title.textContent = data[index].title;
    client.textContent = data[index].client;
    year.textContent = data[index].year;
    skills.textContent = data[index].skills;
    projectURL.setAttribute("href",data[index].projectURL);
    description.textContent = data[index].description;
    video.setAttribute("src", data[index].videoURL);
}

const links = document.querySelectorAll(".link-page");
links.forEach(element => {
    element.addEventListener("click",()=> {
        element.classList.add("links-clicked");
        innerMenu.classList.remove("navigation-active");
        line1.classList.remove("line1-active");
        line2.classList.remove("line2-active");
        line3.classList.remove("line3-active");
        document.body.classList.remove("body-freeze");
    })
});
const menu = document.getElementById("burger-menu");
const innerMenu = document.querySelector(".navigation");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");

menu.addEventListener("click", () => {
    line1.classList.toggle("line1-active");
    line2.classList.toggle("line2-active");
    line3.classList.toggle("line3-active");
    innerMenu.classList.toggle("navigation-active");
    menu.classList.toggle("burger-active");
    document.body.classList.toggle("body-freeze");
})