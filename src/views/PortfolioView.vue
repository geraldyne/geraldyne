<template>
  <main data-scroll-container>
    <HeroSection />
    <div class="work container">
      <ProjectsIntro />
      <ProjectsShowcase />
    </div>
    <AppFooter />
  </main>
</template>

<script setup>
import HeroSection from "@/components/HeroSection.vue";
import ProjectsIntro from "@/components/ProjectsIntro.vue";
import ProjectsShowcase from "@/components/ProjectsShowcase.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

// Inicializar las animaciones de scroll
useScrollAnimation();
</script>

<style lang="less">
@import "@/assets/styles/main.less";
</style>
