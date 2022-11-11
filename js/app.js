/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const allSection = document.querySelectorAll('section');
const nav = document.querySelector('.navbar__menu');
const navUl = document.getElementById('navbar__list');
const navLi = document.getElementsByClassName('menu__link');
const up = document.getElementById('up');
let timer = 1;
let timeOut;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//function to scroll into view when click menu link
function scrollToMySection() {
    navUl.addEventListener("click", function (e) {
        e.preventDefault();
        let target = e.target.getAttribute('href');
        target = target.substring(1);
        let link = document.getElementById(target);
        link.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function sectionToNav() {
    const sectionTemp = document.createDocumentFragment();
    for (let i = 0; i < allSection.length; i++) {
        const navLi = document.createElement('li');
        const sectionName = allSection[i].dataset.nav;
        navLi.innerHTML = `<a href="#${allSection[i].id}" class="menu__link">${sectionName}</a>`;
        sectionTemp.appendChild(navLi);
    }
    navUl.appendChild(sectionTemp);
}

// Add class 'active' to section and to 'section link' when near top of viewport
//call scrollingStop function that hide nav bar when stop scrolling 
function sectionActive() {
    for (let i = 0; i < allSection.length; i++) {
        let sectionSize = Math.floor(allSection[i].getBoundingClientRect().top);
        if (sectionSize >= -300 && sectionSize <= 150) {
            if (!allSection[i].classList.contains('your-active-class')) {
                allSection[i].classList.add('your-active-class');
                navLi[i].classList.add('link__active');
            }
        } else {
            allSection[i].classList.remove('your-active-class');
            navLi[i].classList.remove('link__active');
        }
    }

    scrollingStop();
}

/* ---- show and hide nave bar ---- */

// setTimeout function that hide nav bar when stop scrolling
function scrollingStop() {
    showNav();
    clearTimeout(timeOut);
    if (timer === 1) {
        timeOut = window.setTimeout(hideNav, 2000);
    }
}

// function to hide nav bar 
function hideNav() {
    if (!nav.classList.contains('hide__nav')) {
        nav.classList.add('hide__nav');
    }
    timer = 0;
    clearTimeout(timer);
}

// function to show nav bar 
function showNav() {
    if (nav.classList.contains('hide__nav')) {
        nav.classList.remove('hide__nav');
    }
    timer = 1;
}

// function for scroll to the top when click the button up
function toTop() {
    up.addEventListener('click', function () {
        allSection[0].scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

// Build menu 
sectionToNav();

/**
 * End Main Functions
 * Begin Events
 * 
*/

//go to the top section     
toTop();

// Scroll to section on link click

scrollToMySection();

// Set sections and section link in nav bar as active 
// and hide nav bar when not scrolling
window.addEventListener('scroll', sectionActive);