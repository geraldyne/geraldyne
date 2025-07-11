<template>
  <section class="hero" id="area">
    <div class="intro-text">
      <div class="profession">
        <hr />
        <h2>Frontend Developer</h2>
      </div>
      <h1>Geraldyne Garcia</h1>
      <p>
        I build smart, scalable frontends using modern frameworks like Vue and React. Focused on
        performance, usability, and clean architecture.
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import cherryBlossomSvg from "../assets/cherry-blossom.svg";

// Controlar el número máximo de flores
const MAX_FLOWERS = 20;
let activeFlowers = 0;

onMounted(() => {
  // Configurar animaciones de flores
  const area = document.getElementById("area");

  // Verificar que el elemento exista antes de continuar
  if (!area) {
    console.warn("Area element not found for flower animation");
    return;
  }

  function createFlower() {
    if (activeFlowers >= MAX_FLOWERS) {
      return;
    }

    // Crear el elemento img directamente
    const flower = document.createElement("img");
    flower.src = cherryBlossomSvg;
    flower.width = 40;
    flower.height = 40;
    flower.style.filter = "drop-shadow(0 0 4px #ff66cc)";
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
  
  // Iniciar las flores con un pequeño delay para asegurar que el DOM esté listo
  setTimeout(() => {
    scheduleFlower();
  }, 100);

  // Animación del texto intro
  gsap.from(".intro-text", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.5,
  });
});
</script>
