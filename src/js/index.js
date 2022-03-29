import { gsap } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const colors = {
  ylw: "#FABC13",
  black: "#211E1F",
  lgry: "#e6e7e8",
  mgrey: "#939598",
  white: "#fff",
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
        duration: 1.2,
        ease: "power3.inOut",
      },
      0
    );
  });

  let startWhite = document.getElementById("visitSectionContainer");
  let html = document.querySelector("html");
  let navLinks = document.querySelectorAll("nav a");

  gsap.to(html, {
    scrollTrigger: {
      start: "top bottom+=38%",
      end: "top bottom-=4%",
      scrub: 0.25,
      duration: 20,
      trigger: startWhite,
    },
    background: "#f9f9f9",
  });

  // gsap.to(navLinks, {
  //   scrollTrigger: {
  //     start: "top bottom",
  //     end: "top bottom-=28%",
  //     scrub: 0.25,
  //     duration: 20,
  //     trigger: startWhite,
  //   },
  //   color: "#211E1F",
  // });

  let headerQuote = document.querySelectorAll("#quoteHeader > *");
  // let tagline = document.getElementById("headerTagline");
  // let para = document.querySelector("#quoteHeader p");
  let vid = document.querySelector("video");
  let title = document.querySelector("nav > span, #topBar");
  vid.volume = 0;
  let navElements = gsap.utils.toArray("nav a");
  let introAnim = gsap.timeline({
    paused: true,
  });
  // tagline.split = new SplitText(tagline, {
  //   type: "lines, words",
  //   linesClass: "splitLine",
  // });

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
      },
      0
    )
    .call(function () {
      vid.play();
    })
    .from(
      vid,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0 100%)",
        ease: "power4.inOut",
        duration: 1.1,
      },
      0
    )
    .from(
      title,
      {
        y: -10,
        autoAlpha: 0,
        ease: "power3.inOut",
        duration: 0.5,
      },
      0
    )

    // .from(
    //   tagline.split.words,
    //   {
    //     yPercent: 100,
    //     rotateX: 90,
    //     duration: 2,
    //     stagger: 0.065,
    //     ease: "power3.inOut",
    //   },
    //   0.5
    // )
    .from(
      headerQuote,
      {
        autoAlpha: 0,
        yPercent: 15,
        ease: "power3.inOut",
        duration: 0.9,
        duration: 1,
      },
      0
    );

  let cover = document.getElementById("loaderCover");

  gsap.set(cover, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  });

  let loaderAnim = gsap.timeline({});

  loaderAnim
    .from(
      cover,
      {
        delay: 1,
        duration: 1,
        autoAlpha: 0,
        ease: "power3.inOut",
      },
      0
    )
    .call(function () {
      introAnim.play();
    }, 0);
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
      duration: 2,
      ease: "power3.inOut",
      // autoAlpha: 0,s
      stagger: 0.26,
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
  });

  bottom.split = new SplitText(bottom, {
    type: "chars",
  });

  let tl = gsap.timeline({
    paused: true,
  });

  tl.to(
    top.split.chars,
    {
      y: "-1rem",
      rotateX: 90,
      duration: 0.25,
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
      color: colors.white,
      duration: 0.25,
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
      duration: 0.3,
      ease: "power3.inOut",
    },
    0
  )
  .from(
    btn.split.chars,
    {
      yPercent: 100,
      duration: 0.3,
      // stagger: 0.01,
      ease: "power3.inOut",
    },
    0
  );

// inserting blockquote lines

// let quotes = gsap.utils.toArray("blockquote");
