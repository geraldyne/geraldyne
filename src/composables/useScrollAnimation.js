import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export function useScrollAnimation() {
  let scroller = null;

  const initializeScroll = () => {
    gsap.registerPlugin(ScrollTrigger);

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

      // Configurar scroll horizontal
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
  };

  const destroyScroll = () => {
    if (scroller) {
      scroller.destroy();
    }
  };

  onMounted(() => {
    initializeScroll();
  });

  onBeforeUnmount(() => {
    destroyScroll();
  });

  return {
    scroller,
    initializeScroll,
    destroyScroll,
  };
}
