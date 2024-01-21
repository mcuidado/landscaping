"use strict"

let slideCount = 0
let slideText = document.querySelector(".home-caption05")
let slideTitles = document.querySelectorAll(".slide-title")
let sliderContainer = document.querySelector(".home-slide-titles")
let selectedContent = document.querySelector(".home-header05")
let navContainer = document.querySelector(".home-navbar")
let navLinksContainer = document.querySelector(".home-nav-links")
let contactButton = document.querySelector(".home-button")
let heroContainer = document.querySelector(".home-hero-content")

let htmlArr = [
    `<h3 class="home-heading02">Landscaping</h3>
    <p class="home-caption06">

        Revitalize your outdoor haven with my specialized lawn care services. Offering precision lawn mowing on flexible schedules, I use expert techniques to enhance grass health and visual allure. Elevate your landscape with meticulous trimming of shrubs and hedges for a polished aesthetic. Explore the benefits of my mulching services, enhancing flower beds and preventing soil erosion and weeds. With unwavering commitment to quality and detail, your lawn and landscape needs are in trusted hands. 
    </p>`,
    `<h3 class="home-heading02">Snow Removal</h3>
    <p class="home-caption06">
        I emphasize the importance of preventing accidents and injuries by maintaining a property that is free from slippery and hazardous conditions. Complying with the municipality’s snow removal ordinance is crucial, requiring property owners to clear a 2-3 foot path within twenty-four hours after the snow stops falling—avoiding fines and penalties in the process. Beyond compliance, maintaining a neat and tidy appearance not only enhances the curb appeal but also adds value to your property. Your commitment to a safe and well-kept environment reflects positively on both the property and its owner.
    </p>`,
    `<h3 class="home-heading02">Technical Services</h3>
    <p class="home-caption06">
        Safeguarding your network is paramount for protecting personal information. Regularly upgrading and updating your router, limiting administration to the internal network, and enabling automatic updates minimize vulnerabilities. Incorporating NVR camera systems, WiFi cameras, and doorbell cameras enhances security and provides real-time monitoring, offering peace of mind and deterring potential criminals. These measures, tailored to your ownership, contribute to a safer and more secure environment, reflecting your commitment to protecting your home or office.
    </p>`
]


sliderContainer.addEventListener('click', (e)=>{

    let targetSlide = e.target.closest('.slide-title');
    // remove the active class
    document.querySelectorAll(".slide-title").forEach( n => n.classList.remove("slide-title-active") )
    // console.log(htmlArr[parseInt(targetSlide.dataset.slideNum, 10)])

    if(targetSlide){
        targetSlide.classList.add("slide-title-active")
        selectedContent.innerHTML = htmlArr[parseInt(targetSlide.dataset.slideNum, 10)]
          // Apply fade-in effect
        selectedContent.style.opacity = .6;
        setTimeout(() => {
            selectedContent.style.opacity = 1;
        }, 500); // This should match the transition duration
    }
})

document.querySelector(".home-controls").addEventListener("click", (e) => {

    let targetButton = e.target
    if(e.target.closest(".home-previous")){
        console.log("previous")
        selectedContent.innerHTML = htmlArr[ (slideCount < 0) ? slideCount = htmlArr.length - 1 : slideCount-- ]
    }
    if(e.target.closest(".home-next")){
        console.log("Next")
        selectedContent.innerHTML = htmlArr[ (slideCount == htmlArr.length) ? slideCount = 0 : slideCount++ ]
    }
    console.log(slideCount)
      // Apply fade-in effect
      selectedContent.style.opacity = 0;
      setTimeout(() => {
          selectedContent.style.opacity = 1;
      }, 500); // This should match the transition duration
})


document.querySelector(".home-button5").addEventListener("click", (e) =>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

function scrollToDiv(ele){
    ele.scrollIntoView({
        behavior:"smooth", 
        block: "end"
    })
}

navContainer.addEventListener("click", (e) => {

    let selectedLink = e.target.closest(".nav-link")
    scrollToDiv(document.getElementById(selectedLink.dataset.sect))

})

contactButton.addEventListener("click", ()=>{
    scrollToDiv(document.getElementById("contact"))
})

const obsOptions = {
    root: null,
    threshold: 0,
    rootMargin: "24px"
}

let obsCallback = function(entries, observer){
    let [entry] = entries
    console.log(entry.intersectionRatio)
    if( ! entry.isIntersecting ){
        // navLinksContainer.style.height = "3rem"
        navContainer.classList.add("stickyNav")
    }else{
        navContainer.classList.remove("stickyNav")
    }
}

let sectionObserver = new IntersectionObserver(obsCallback, obsOptions)

sectionObserver.observe(heroContainer)