<template>
  <section id="sectionPin" class="projects-showcase">
    <div class="pin-wrap">
      <div class="project-intro">
        <h2>Cryptocurrency Analytics</h2>
        <h3>
          Interactive dashboards with real-time market data, advanced charting systems, and
          comprehensive trading interfaces.
        </h3>
      </div>

      <div class="project-image">
        <img :src="templateImg" alt="Project Template" />
        <div class="project-overlay">
          <h4>F2 Admin Dashboard</h4>
          <p>
            A data visualization dashboard built with Vue 2, Vuex, and ApexCharts to help investors
            monitor and track their investment performance. Features include custom-built data
            tables, pagination, filters by algorithm and exchange, interactive charts, and modal
            components. UI was designed in Figma and implemented with full responsiveness in mind.
          </p>
        </div>
      </div>

      <div class="project-image">
        <img :src="algorithmImg" alt="Algorithm Detail" />
        <div class="project-overlay">
          <h4>Amaia</h4>
          <p>
            As the Frontend Lead, I led the development of this subscription-based investment
            platform using Vue 3, Vuex, and ApexCharts. Users can register, subscribe to investment
            tiers, manage wallets, and track performance in real time. I was responsible for
            frontend architecture, component design based on Figma, and implementing key modules
            such as dashboard, algorithm selection, subscription management, and KYC verification.
          </p>
        </div>
      </div>

      <div class="project-image">
        <img :src="algorithmsListImg" alt="Algorithms List" />
        <div class="project-overlay">
          <h4>Amaia Admin Dashboard</h4>
          <p>
            Admin panel built with React 19, Redux, and ApexCharts to manage users, algorithms, and
            investor performance. Based on a company-provided UI template. Includes secure JWT auth
            with cookies. Led frontend development.
          </p>
        </div>
      </div>

      <div class="project-image">
        <img :src="landingImg" alt="Amaia Landing" />
        <div class="project-overlay">
          <h4>Amaia Landing Page</h4>
          <p>
            Informational landing page introducing the Amaia investment platform — what it is, how
            it works, and key features. Built with Vue 3 to be responsive and visually appealing,
            with sections highlighting subscription types, algorithm-based investing, and user
            benefits.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Importar las imágenes explícitamente para Vite
import templateImg from "@/assets/img/Template.png";
import algorithmImg from "@/assets/img/Algorithm detail - In use - Increase.png";
import algorithmsListImg from "@/assets/img/algorithms list.PNG";
import landingImg from "@/assets/img/amaia landing.PNG";
</script>

<style src="@/assets/styles/projects.less" lang="less"></style>
