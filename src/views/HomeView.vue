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

  const MAX_FLOWERS = 20;
  let activeFlowers = 0;

  function createFlower() {

    if (activeFlowers >= MAX_FLOWERS) {
      return;
    }

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
    activeFlowers++; 

    gsap.to(flower, {
      y: -window.innerHeight - 100,
      x: `+=${(Math.random() - 0.5) * 100}`,
      rotation: 720,
      opacity: 0,
      duration: 10 + Math.random() * 10,
      ease: "linear",
      onComplete: () => {
        if (flower.parentNode) {
          flower.remove();
        }
        activeFlowers--; 
      },
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

  setTimeout(() => {
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
        return arguments.length
          ? scroller.scrollTo(value, 0, 0)
          : scroller.scroll.instance.scroll.y;
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


    setTimeout(() => {
      const pinWrap = document.querySelector(".pin-wrap");
      if (pinWrap) {
        const pinWrapWidth = pinWrap.offsetWidth;
        const horizontalScrollLength = pinWrapWidth - window.innerWidth;

        if (horizontalScrollLength > 0) {
          gsap.to(".pin-wrap", {
            scrollTrigger: {
              trigger: "#sectionPin",
              scroller: pageContainer,
              scrub: 1,
              pin: true,
              start: "top top",
              end: () => `+=${horizontalScrollLength}`,
              anticipatePin: 1,
            },
            x: -horizontalScrollLength,
            ease: "none",
          });
        }
      }

      ScrollTrigger.addEventListener("refresh", () => scroller.update());
      ScrollTrigger.refresh();
    }, 500);
  }, 200);
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
        <p>
          I build smart, scalable frontends using modern frameworks like Vue and React. Focused on
          performance, usability, and clean architecture..
        </p>
      </div>
    </div>

    <div class="work container">
      <section>
        <div>
          <h1><span>Projects</span> <span>&</span> <span>Work</span></h1>
          <p>
            Explore my latest web development projects showcasing modern design and cutting-edge
            technologies
          </p>
        </div>
      </section>

      <section id="sectionPin">
        <div class="pin-wrap">
          <div class="project-intro">
            <h2>Cryptocurrency Analytics</h2>
            <h3>
              Interactive dashboards with real-time market data, advanced charting systems, and
              comprehensive trading interfaces.
            </h3>
          </div>

          <div class="project-image">
            <img src="../assets/img/Template.png" alt="Project Template" />
            <div class="project-overlay">
              <h4>F2 Admin Dashboard</h4>
              <p>
                A data visualization dashboard built with Vue 2, Vuex, and ApexCharts to help
                investors monitor and track their investment performance. Features include
                custom-built data tables, pagination, filters by algorithm and exchange, interactive
                charts, and modal components. UI was designed in Figma and implemented with full
                responsiveness in mind.
              </p>
            </div>
          </div>

          <div class="project-image">
            <img
              src="../assets/img/Algorithm detail - In use - Increase.png"
              alt="Algorithm Detail"
            />
            <div class="project-overlay">
              <h4>Amaia</h4>
              <p>
                As the Frontend Lead, I led the development of this subscription-based investment
                platform using Vue 3, Vuex, and ApexCharts. Users can register, subscribe to
                investment tiers, manage wallets, and track performance in real time. I was
                responsible for frontend architecture, component design based on Figma, and
                implementing key modules such as dashboard, algorithm selection, subscription
                management, and KYC verification.
              </p>
            </div>
          </div>

          <div class="project-image">
            <img src="../assets/img/algorithms list.PNG" alt="Algorithms List" />
            <div class="project-overlay">
              <h4>Amaia Admin Dashboard</h4>
              <p>
                Admin panel built with React 19, Redux, and ApexCharts to manage users, algorithms,
                and investor performance. Based on a company-provided UI template. Includes secure
                JWT auth with cookies. Led frontend development.
              </p>
            </div>
          </div>

          <div class="project-image">
            <img src="../assets/img/amaia landing.PNG" alt="Amaia Landing" />
            <div class="project-overlay">
              <h4>Amaia Landing Page</h4>
              <p>
                Informational landing page introducing the Amaia investment platform — what it is,
                how it works, and key features. Built with Vue 3 to be responsive and visually
                appealing, with sections highlighting subscription types, algorithm-based investing,
                and user benefits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-info">
          <h3>Geraldyne Garcia</h3>
          <p>Frontend Developer</p>
        </div>
        <div class="footer-links">
          <a
            href="https://github.com/geraldyne/geraldyne"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>GitHub</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/geraldyne-garcía"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>LinkedIn</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Geraldyne Garcia. Built with Vue.js & GSAP</p>
      </div>
    </footer>
  </main>
</template>

<style lang="less">
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  background: linear-gradient(135deg, #1a1a1a, #0f0f0f, #000000);

  .intro-text {
    width: 30%;
    position: absolute;
    top: 30vh;
    left: 10%;
    z-index: 2;
    color: white;

    @media (max-width: 768px) {
      width: 80%;
      left: 10%;
      top: 20vh;
    }

    h1 {
      text-align: left;
      font-size: 65px;
      line-height: 1.2;
      margin-bottom: 30px;

      @media (max-width: 768px) {
        font-size: 40px;
      }

      @media (max-width: 480px) {
        font-size: 32px;
      }
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
  background: #000;
  min-height: 100vh;

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

    @media (max-width: 768px) {
      height: auto;
      overflow: visible;
    }
  }

  .pin-wrap {
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 50px 10vw;

    @media (max-width: 768px) {
      flex-direction: column;
      padding: 30px 5vw;
      height: auto;
      min-height: 100vh;
    }

    & > * {
      min-width: 60vw;
      padding: 0 5vw;

      @media (max-width: 768px) {
        min-width: 100%;
        padding: 0 0 2rem 0;
      }
    }

    .project-intro {
      @media (max-width: 768px) {
        text-align: center;
        margin-bottom: 2rem;
      }

      h2 {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 1rem;
        color: white;
        line-height: 1.2;

        @media (max-width: 768px) {
          font-size: 2rem;
        }

        @media (max-width: 480px) {
          font-size: 1.5rem;
        }
      }

      h3 {
        font-size: 1.2rem;
        font-weight: 400;
        color: #a3a3a3;
        line-height: 1.5;
        max-width: 500px;

        @media (max-width: 768px) {
          font-size: 1rem;
          max-width: 100%;
        }
      }
    }

    .project-image {
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      cursor: pointer;

      @media (max-width: 768px) {
        margin-bottom: 1rem;
      }

      img {
        width: 100%;
        height: 80vh;
        object-fit: cover;
        transition: transform 0.3s ease;

        @media (max-width: 768px) {
          height: 50vh;
        }

        @media (max-width: 480px) {
          height: 40vh;
        }
      }

      .project-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        color: white;
        padding: 1.5rem;
        transform: translateY(100%);
        transition: transform 0.3s ease;

        @media (max-width: 768px) {
          padding: 1rem;
          position: static;
          transform: translateY(0);
          background: rgba(0, 0, 0, 0.8);
        }

        h4 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: white;
          margin: 0 0 0.5rem 0;

          @media (max-width: 768px) {
            font-size: 1.1rem;
          }
        }

        p {
          font-size: 0.85rem;
          color: #cccccc;
          line-height: 1.4;
          margin: 0;
          max-width: none;
          position: static;

          @media (max-width: 768px) {
            font-size: 0.8rem;
          }
        }
      }

      &:hover {
        img {
          transform: scale(1.05);
        }

        .project-overlay {
          transform: translateY(0);

          @media (max-width: 768px) {
            transform: translateY(0);
          }
        }
      }
    }
  }

  p:not(.project-overlay p) {
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

.footer {
  background: #000;
  border-top: 1px solid #333;
  padding: 4rem 10vw 2rem;

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 2rem;
    }
  }

  .footer-info {
    h3 {
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    p {
      color: #a3a3a3;
      font-size: 14px;
      max-width: 400px;
      line-height: 1.5;
    }
  }

  .footer-links {
    display: flex;
    gap: 2rem;

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #a3a3a3;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover {
        color: #ff66cc;
        transform: translateY(-2px);
      }

      svg {
        transition: all 0.3s ease;
      }

      &:hover svg {
        color: #ff66cc;
      }
    }
  }

  .footer-bottom {
    padding-top: 2rem;
    border-top: 1px solid #333;
    text-align: center;

    p {
      color: #666;
      font-size: 12px;
      margin: 0;
    }
  }
}
</style>
