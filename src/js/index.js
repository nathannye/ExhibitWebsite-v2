import { gsap } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Lottie from "lottie-web";
gsap.registerPlugin(ScrollTrigger, SplitText);

const colors = {
  ylw: "#FABC13",
  black: "#211E1F",
  lgry: "#e6e7e8",
  mgrey: "#939598",
  white: "#f9f9f9",
};

let imageContainers = gsap.utils.toArray("#companyContainer img");

document.addEventListener("DOMContentLoaded", (event) => {
  imageContainers.forEach((e) => {
    gsap.set(e, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    e.tl = gsap.timeline({
      scrollTrigger: {
        start: "top bottom-=2%",
        trigger: e,
      },
    });

    e.tl.from(
      e,
      {
        autoAlpha: 0,
        clipPath: "polygon(0% 20%, 100% 20%, 100% 100%, 0% 100%)",
        yPercent: 10,
        // transformOrigin: "center bottom",
        duration: 1.9,
        ease: "power3.inOut",
      },
      0
    );
  });

  let headerQuote = document.querySelectorAll("#quoteHeader > *");
  let vid = document.querySelector("video");
  let title = document.querySelector("#headerMark, #topBar");
  console.log(title);
  let navSwap = gsap.utils.toArray("nav, #topBar");
  let navText = gsap.utils.toArray(".navSplit");
  vid.volume = 0;
  let navElements = gsap.utils.toArray("nav a");
  let startWhite = document.getElementById("visitSectionContainer");
  let html = document.querySelector("html");
  let cont = document.querySelectorAll("body, html");
  let navLinks = document.querySelectorAll("nav a");

  let colorChange = gsap.timeline({
    scrollTrigger: {
      start: "top bottom-=10%",
      end: "top bottom-=37%",
      scrub: 0.25,
      duration: 20,

      trigger: startWhite,
    },
  });

  colorChange
    .to(
      html,
      {
        background: "#f9f9f9",
      },
      0
    )
    .to(
      title,
      {
        color: colors.black,
      },
      0
    )
    .to(
      "#quoteFrench",
      {
        color: colors.black,
      },
      0
    )
    .to(
      navSwap,
      {
        background: colors.white,
      },
      0
    )
    .to(
      navText,
      {
        color: colors.black,
      },
      0
    )
    .to(
      "#headerMark",
      {
        color: colors.black,
      },
      0
    );

  let introAnim = gsap.timeline({
    paused: true,
  });

  let tagline = document.querySelector("#tagline h2");

  tagline.split = new SplitText(tagline, {
    type: "lines, words",
    linesClass: "splitLine",
  });

  gsap.set(cont, {
    overflowY: "hidden",
  });

  gsap.set(vid, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  });

  introAnim
    .from(
      navElements,
      {
        stagger: 0.061,
        autoAlpha: 0,
        duration: 0.45,
        yPercent: -35,
        delay: 0.24,
      },
      0
    )
    .call(function () {
      vid.play();
    }, 0)
    .from(
      vid,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0 100%)",
        ease: "power3.inOut",
        duration: 1.3,
      },
      0
    )
    .from(
      title,
      {
        y: -10,
        autoAlpha: 0,
        ease: "power3.inOut",
        duration: 0.54,
      },
      0
    )
    .from(
      "#headerMark",
      {
        autoAlpha: 0,
        duration: 0.55,
        yPercent: -35,
      },
      0
    )
    .to(
      cont,
      {
        overflowY: "visible",
        delay: 0.2,
      },
      0
    )
    .from(
      headerQuote,
      {
        autoAlpha: 0,
        yPercent: 15,
        ease: "power3.inOut",
        duration: 1,
        duration: 1,
      },
      0
    );

  let covers = gsap.utils.toArray(".loadCover");
  let loaderContainer = document.getElementById("loaderAnimContainer");

  gsap.set(loaderContainer, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  });

  var markAnim = Lottie.loadAnimation({
    container: loaderContainer,
    loop: false,
    autoplay: false,
    path: "https://assets8.lottiefiles.com/packages/lf20_swh0vpqd.json",
  });

  markAnim.setSpeed(0.75);

  let taglinetl = gsap.timeline({
    paused: true,
  });

  gsap.set(tagline.split.words, {
    yPercent: 100,
  });

  taglinetl.to(tagline.split.words, {
    stagger: 0.066,
    duration: 1.4,
    ease: "power3.inOut",
    yPercent: 0,
    delay: 0.75,
  });

  let loaderAnim = gsap.timeline({
    paused: true,
  });

  loaderAnim
    .call(
      function () {
        markAnim.play();
        taglinetl.play();
      },
      null,
      "start"
    )
    .call(function () {
      setTimeout(() => {
        taglinetl.timeScale(1.4).reverse();
        markAnim.setDirection(-1);
        markAnim.setSpeed(1.1);
        markAnim.play();
      }, 3500);
    })
    .to(covers, {
      scaleY: 0,
      transformOrigin: "center top",
      stagger: 0.3,
      duration: 1.2,
      delay: 3.9,
      ease: "power3.inOut",
    })
    .to(
      "#loaderContainer",
      {
        display: "none",
      },
      ">"
    )
    .call(function () {
      setTimeout(() => {
        introAnim.play();
      }, 250);
    });

  markAnim.addEventListener("DOMLoaded", (event) => {
    loaderAnim.play();
  });
});

let h1 = gsap.utils.toArray(
  ".companySection h1, #behindExhibitHeadingContainer h1, #visitHeading h1"
);

function setuph1() {
  h1.forEach((e) => {
    if (e.anim) {
      e.anim.progress(1).kill();
      e.split.revert();
    }

    e.split = new SplitText(e, {
      type: "lines, words",
      linesClass: "splitLine",
    });

    e.anim = gsap.from(e.split.words, {
      scrollTrigger: {
        trigger: e,
        start: "top bottom-=12%",
      },
      duration: 1.95,
      ease: "power3.inOut",
      // autoAlpha: 0,s
      stagger: 0.12,
      rotateX: 40,
      yPercent: 100,
    });
  });
}

ScrollTrigger.addEventListener("refresh", setuph1);
setuph1();

// Nav hover animation

let links = gsap.utils.toArray("nav a");
const linkName = ["plan a visit", "behind the exhibit"];

for (let i = 0; i < links.length; i++) {
  let top = document.createElement("span");
  let bottom = document.createElement("span");

  top.innerHTML = linkName[i];
  bottom.innerHTML = linkName[i];

  links[i].appendChild(top);
  links[i].appendChild(bottom);

  top.split = new SplitText(top, {
    type: "chars",
    charsClass: "navSplit",
  });

  bottom.split = new SplitText(bottom, {
    type: "chars",
    charsClass: "navSplit",
  });

  let tl = gsap.timeline({
    paused: true,
  });

  tl.to(
    top.split.chars,
    {
      y: "-1rem",
      rotateX: 90,
      duration: 0.35,
      ease: "power3.inOut",
      transformOrigin: "center bottom",
    },
    0
  ).from(
    bottom.split.chars,
    {
      y: "0rem",
      rotateX: -90,
      delay: 0.2,
      color: colors.lgry,
      duration: 0.35,
      ease: "power3.inOut",
      transformOrigin: "center bottom",
    },
    0
  );

  links[i].addEventListener("mouseenter", (event) => {
    tl.play();
  });

  links[i].addEventListener("mouseleave", (event) => {
    tl.reverse();
  });
}

// reveal to top button after scrolling down

let btn = document.querySelectorAll("#toTopButton, #toTopButtonMobile");
let target = document.querySelector("header");

gsap.set(btn, {
  clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
});

btn.split = new SplitText(btn, {
  type: "chars, lines",
  linesClass: "splitLine",
});

btn.tl = gsap.timeline({
  scrollTrigger: {
    trigger: target,
    start: "bottom top+=10%",
    toggleActions: "play none play reverse",
  },
});

btn.tl
  .to(
    btn,
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.5,
      ease: "power3.inOut",
    },
    0
  )
  .from(
    btn.split.chars,
    {
      yPercent: 100,
      duration: 0.5,
      // stagger: 0.01,
      ease: "power3.inOut",
    },
    0
  );

// inserting blockquote lines

// let quotes = gsap.utils.toArray("blockquote");
