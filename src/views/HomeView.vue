<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
let scroller;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const area = document.getElementById("area");
  const flowerTemplate = document.getElementById("sakura-template");

  function createFlower() {
    const clone = flowerTemplate.content.firstElementChild.cloneNode(true);
    const flower = clone;
    flower.style.position = "absolute";

    const spacing = 5;
    const left = 60 + Math.floor(Math.random() * (40 / spacing)) * spacing;
    flower.style.left = `calc(${left}vw + ${Math.random() * spacing}vw)`;
    flower.style.top = "100vh";
    flower.style.zIndex = "0";

    const size = 0.8 + Math.random() * 0.6;
    flower.style.transform = `scale(${size})`;

    area.appendChild(flower);

    gsap.to(flower, {
      y: -window.innerHeight - 100,
      x: `+=${(Math.random() - 0.5) * 100}`,
      rotation: 720,
      opacity: 0,
      duration: 10 + Math.random() * 10,
      ease: "linear",
      onComplete: () => flower.remove(),
    });
  }

  function scheduleFlower() {
    createFlower();
    setTimeout(scheduleFlower, 800 + Math.random() * 1200);
  }
  scheduleFlower();

  gsap.from(".intro-text", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.5,
  });

  const pageContainer = document.querySelector("[data-scroll-container]");
  scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true,
    multiplier: 1,
    lerp: 0.1,
    getDirection: true,
  });

  scroller.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
      return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: pageContainer.style.transform !== undefined ? "transform" : "fixed",
  });

  const pinWrap = document.querySelector(".pin-wrap");
  const pinWrapWidth = pinWrap.offsetWidth;
  const horizontalScrollLength = pinWrapWidth - window.innerWidth;

  gsap.to(".pin-wrap", {
    scrollTrigger: {
      trigger: "#sectionPin",
      scroller: pageContainer,
      scrub: true,
      pin: true,
      start: "top top",
      end: () => pinWrapWidth,
    },
    x: -horizontalScrollLength,
    ease: "none",
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});

onBeforeUnmount(() => {
  if (scroller) {
    scroller.destroy();
  }
});
</script>

<template>
  <main data-scroll-container>
    <div class="hero" id="area">
      <template id="sakura-template">
        <img
          src="../assets/cherry-blossom.svg"
          width="40"
          height="40"
          style="filter: drop-shadow(0 0 4px #ff66cc)"
        />
      </template>

      <div class="intro-text">
        <div class="profession">
          <hr />
          <h2>Frontend Developer</h2>
        </div>
        <h1>Geraldyne Garcia</h1>
        <p>I craft digital experiences with precision and creativity.</p>
      </div>
    </div>

    <div class="work container">
      <section>
        <div>
          <h1><span>Horizontal</span> <span>scroll</span> <span>section</span></h1>
          <p>with GSAP ScrollTrigger & Locomotive Scroll</p>
        </div>
      </section>

      <section id="sectionPin">
        <div class="pin-wrap">
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </h2>
          <img
            src="https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt=""
          />
          <img
            src="https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt=""
          />
          <img
            src="https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt=""
          />
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="less">
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  .intro-text {
    width: 30%;
    position: absolute;
    top: 30vh;
    left: 10%;
    z-index: 2;
    color: white;

    h1 {
      text-align: left;
      font-size: 65px;
      line-height: 1.2;
      margin-bottom: 30px;
    }
    h2 {
      text-transform: uppercase;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2px;
      opacity: 0.8;
    }

    p {
      font-size: 14px;
      max-width: 400px;
      opacity: 0.8;
      line-height: 24px;
      font-weight: 600;
      letter-spacing: 1px;
    }

    .profession {
      width: fit-content;
      display: flex;
      gap: 15px;
      flex-direction: row;
      align-items: center;
      margin-bottom: 30px;

      hr {
        width: 40px;
        height: 2px;
        background-color: #a3a3a33d;
        border: none;
      }
    }
  }
}

.work {
  section:not(#sectionPin) {
    min-height: 100vh;
    width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2rem;
    padding: 50px 10vw;
    margin: auto;
    place-items: center;
  }

  img {
    height: 80vh;
    width: auto;
    object-fit: cover;
  }

  h1 {
    font-size: 5rem;
    line-height: 1;
    font-weight: 800;
    margin-bottom: 1rem;
    position: absolute;
    top: 10vw;
    left: 10vw;
    z-index: 4;
    overflow-wrap: break-word;
    hyphens: auto;
    color: white;

    @media (max-width: 768px) {
      font-size: 16vw;
    }

    span {
      display: block;
    }
  }

  h2 {
    font-size: 2rem;
    max-width: 400px;
  }

  .credit {
    font-family: Termina, sans-serif;
    a {
      color: var(--text-color);
    }
  }

  * {
    box-sizing: border-box;
  }

  #sectionPin {
    height: 100vh;
    overflow: hidden;
    display: flex;
    left: 0;
    background: #000;
    color: white;
  }

  .pin-wrap {
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 50px 10vw;

    & > * {
      min-width: 60vw;
      padding: 0 5vw;
    }
  }

  p {
    position: absolute;
    bottom: 10vw;
    right: 10vw;
    width: 200px;
    line-height: 1.5;
    color: white;
  }
}

[data-scroll-container] {
  min-height: 100vh;
  position: relative;
}
</style>
