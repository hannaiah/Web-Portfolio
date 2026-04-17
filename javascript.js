const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
});

nav.addEventListener('click', (e) => {
    if (e.target === nav) {
        location.reload();
    }
});

const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    // save preference
    if(document.body.classList.contains("light")){
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});

// load saved theme
window.addEventListener("load", () => {
    const saved = localStorage.getItem("theme");
    if(saved === "light"){
        document.body.classList.add("light");
    }
});

const timelineItems = document.querySelectorAll(".timeline-item");
const timelineLine = document.querySelector(".timeline-line");
const timeline = document.querySelector(".timeline");

function showTimeline(){

    const triggerBottom = window.innerHeight * 0.85;

    timelineItems.forEach(item => {

        const boxTop = item.getBoundingClientRect().top;

        if(boxTop < triggerBottom){
            item.classList.add("show");
        }

    });

    const timelineRect = timeline.getBoundingClientRect();

    let height = window.innerHeight - timelineRect.top;

    if(height < 0) height = 0;

    /* LIMIT THE HEIGHT SO IT NEVER PASSES THE TIMELINE */

    const maxHeight = timeline.offsetHeight;

    if(height > maxHeight){
        height = maxHeight;
    }

    timelineLine.style.height = height + "px";
}

window.addEventListener("scroll", showTimeline);

const skills = document.querySelectorAll(".skill-progress");

const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){

const width = entry.target.getAttribute("data-width");
entry.target.style.width = width;

}
});
},{threshold:0.5});

skills.forEach(skill=>{
observer.observe(skill);
});

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let isValid = true;

    clearErrors();

    // Name validation
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Name cannot be empty");
        isValid = false;
    }

    // Email validation
    if (emailInput.value.trim() === "") {
        showError(emailInput, "Email cannot be empty");
        isValid = false;
    } 
    else if (!validateEmail(emailInput.value)) {
        showError(emailInput, "Enter a valid email");
        isValid = false;
    }

    // Message validation
    if (messageInput.value.trim() === "") {
        showError(messageInput, "Message cannot be empty");
        isValid = false;
    }

    // If everything is valid
    if (isValid) {
        alert("Message sent successfully!");
        contactForm.reset();
    }
});

(function(){
emailjs.init(rE_BKBZemqnFe8Esi); // from EmailJS
})();

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){
e.preventDefault();

emailjs.sendForm(service_qe1vj6o, template_nx16gwe, this)
.then(() => {
    alert("Message sent to your Gmail");
    form.reset();
}, (error) => {
    alert("Failed to send ❌");
});
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error-msg");

    error.textContent = message;
    error.style.visibility = "visible";

    input.style.borderColor = "red";
}

function clearErrors() {
    const errors = document.querySelectorAll(".error-msg");
    const inputs = document.querySelectorAll("input, textarea");

    errors.forEach(error => {
        error.style.visibility = "hidden";
    });

    inputs.forEach(input => {
        input.style.borderColor = "";
    });
}

function validateEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email);
}
/* RESUME ACCORDION */

document.addEventListener("DOMContentLoaded", () => {

const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {

header.addEventListener("click", () => {

const item = header.parentElement;
const content = header.nextElementSibling;

/* close other accordion items */

document.querySelectorAll(".accordion-item").forEach(i => {
if(i !== item){
i.classList.remove("active");
i.querySelector(".accordion-content").style.maxHeight = null;
}
});

/* toggle current item */

item.classList.toggle("active");

if(content.style.maxHeight){
content.style.maxHeight = null;
}
else{
content.style.maxHeight = content.scrollHeight + "px";
}

});

});

});
