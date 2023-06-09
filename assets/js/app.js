// Wait for the window to load
window.addEventListener('load', function () {
    // Get the preloader element
    var preloader = document.querySelector('.preloader');

    // Hide the preloader when the window is fully loaded
    function hidePreloader() {
        preloader.style.display = 'none';
    }

    // Hide the preloader after a certain delay (in milliseconds)
    var delay = 3200; // Adjust this value as needed
    setTimeout(hidePreloader, delay);
});

// 



// 

// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the tab buttons and content elements
    var tabButtons = document.querySelectorAll('.tab-btn li');
    var tabContentItems = document.querySelectorAll('.tab-content li');

    // Add click event listeners to each tab button
    tabButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            // Remove the 'active' class from all tab buttons and content items
            tabButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });
            tabContentItems.forEach(function (item) {
                item.style.display = 'none';
            });

            // Add the 'active' class to the clicked tab button
            button.classList.add('active');
            // Display the corresponding content item
            tabContentItems[index].style.display = 'flex';
        });
    });

    // Activate the first tab button and content item by default
    tabButtons[0].click();
});




// 
// 

const body = document.body,
    jsScroll = document.getElementsByClassName('namScroll')[0],
    height = jsScroll.getBoundingClientRect().height - 1,
    speed = 0.05

var offset = 0

body.style.height = Math.floor(height) + "px"

function smoothScroll() {
    offset += (window.pageYOffset - offset) * speed

    var scroll = "translateY(-" + offset + "px) translateZ(0)"
    jsScroll.style.transform = scroll

    raf = requestAnimationFrame(smoothScroll)
}
smoothScroll()


// 
// 
// 
// 
// 
const slides = document.querySelectorAll("section");
const container = document.querySelector("#panelWrap");
let dots = document.querySelector(".dots");
let toolTips = document.querySelectorAll(".toolTip");
let oldSlide = 0;
let activeSlide = 0;
let navDots = [];
let dur = 1.6;
let offsets = [];
let toolTipAnims = [];
let ih = window.innerHeight;
const mouseAnim = gsap.timeline({
    repeat: -1,
    repeatDelay: 1
});
const handAnim = gsap.timeline({
    repeat: -1,
    repeatDelay: 1
});
const cursorAnim = gsap.timeline({
    repeat: -1,
    repeatDelay: 1
});
const arrowAnim = gsap.timeline({
    repeat: -1,
    repeatDelay: 1
});
document.querySelector("#upArrow").addEventListener("click", slideAnim);
document.querySelector("#downArrow").addEventListener("click", slideAnim);

// create nev dots and add tooltip listeners
for (let i = 0; i < slides.length; i++) {
    let tl = gsap.timeline({
        paused: true,
        reversed: true
    });
    let newDot = document.createElement("div");
    newDot.className = "dot";
    newDot.index = i;
    navDots.push(newDot);
    newDot.addEventListener("click", slideAnim);
    newDot.addEventListener("mouseenter", dotHover);
    newDot.addEventListener("mouseleave", dotHover);
    dots.appendChild(newDot);
    offsets.push(-slides[i].offsetTop);
    tl.to(toolTips[i], 0.25, {
        opacity: 1,
        ease: Linear.easeNone
    });
    toolTipAnims.push(tl);
}


// get elements positioned
gsap.set(".dots", {
    yPercent: -50
});
gsap.set(".toolTips", {
    yPercent: -50
});

// side screen animation with nav dots
const dotAnim = gsap.timeline({
    paused: true
});
dotAnim.to(
    ".dot", {
        stagger: {
            each: 1,
            yoyo: true,
            repeat: 1
        },
        scale: 2.1,
        rotation: 0.1,
        ease: "none"
    },
    0.5
);
dotAnim.time(1);

// tooltips hovers
function dotHover() {
    toolTipAnims[this.index].reversed() ? toolTipAnims[this.index].play() : toolTipAnims[this.index].reverse();
}

// figure out which of the 4 nav controls called the function
function slideAnim(e) {

    oldSlide = activeSlide;
    // dragging the panels
    if (this.id === "dragger") {
        activeSlide = offsets.indexOf(this.endY);
    } else {
        if (gsap.isTweening(container)) {
            return;
        }
        // up/down arrow clicks
        if (this.id === "downArrow" || this.id === "upArrow") {
            activeSlide = this.id === "downArrow" ? (activeSlide += 1) : (activeSlide -= 1);
            // click on a dot
        } else if (this.className === "dot") {
            activeSlide = this.index;
            // scrollwheel
        } else {
            activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
        }
    }
    // make sure we're not past the end or beginning slide
    activeSlide = activeSlide < 0 ? 0 : activeSlide;
    activeSlide = activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
    if (oldSlide === activeSlide) {
        return;
    }
    // if we're dragging we don't animate the container
    if (this.id != "dragger") {
        gsap.to(container, dur, {
            y: offsets[activeSlide],
            ease: "power2.inOut",
            onUpdate: tweenDot
        });
    }
}

window.addEventListener("wheel", slideAnim);
window.addEventListener("resize", newSize);

// make the container a draggable element
let dragMe = Draggable.create(container, {
    type: "y",
    edgeResistance: 1,
    onDragEnd: slideAnim,
    onDrag: tweenDot,
    onThrowUpdate: tweenDot,
    snap: offsets,
    inertia: true,
    zIndexBoost: false,
    allowNativeTouchScrolling: false,
    bounds: "#masterWrap"
});

dragMe[0].id = "dragger";
newSize();

// resize all panels and refigure draggable snap array
function newSize() {
    offsets = [];
    ih = window.innerHeight;
    gsap.set("#panelWrap", {
        height: slides.length * ih
    });
    gsap.set(slides, {
        height: ih
    });
    for (let i = 0; i < slides.length; i++) {
        offsets.push(-slides[i].offsetTop);
    }
    gsap.set(container, {
        y: offsets[activeSlide]
    });
    dragMe[0].vars.snap = offsets;
}

// tween the dot animation as the draggable moves
function tweenDot() {
    gsap.set(dotAnim, {
        time: Math.abs(gsap.getProperty(container, "y") / ih) + 1
    });
}