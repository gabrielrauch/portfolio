<script lang="ts">
  import AboutSection from "$lib/components/AboutSection.svelte";
  import ContactSection from "$lib/components/ContactSection.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import HeroSection from "$lib/components/HeroSection.svelte";
  import Navigation from "$lib/components/Navigation.svelte";
  import TechStack from "$lib/components/TechStack.svelte";
  import { config } from "$lib/config";
  import { onMount } from "svelte";

  let sectionsVisible = {
    skills: false,
    about: false,
    contact: false,
  };

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId in sectionsVisible) {
              sectionsVisible[sectionId as keyof typeof sectionsVisible] = true;
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const sections = document.querySelectorAll("#skills, #about, #contact");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>{config.personal.name} - {config.personal.title}</title>
  <meta name="description" content={config.personal.description} />
  <meta property="og:title" content="{config.personal.name} - {config.personal.title}" />
  <meta property="og:description" content={config.personal.description} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{config.personal.name} - {config.personal.title}" />
  <meta name="twitter:description" content={config.personal.description} />
</svelte:head>

<div class="bg-background text-foreground min-h-screen font-mono">
  <Navigation />

  <section id="home" class="fade-in-up">
    <HeroSection />
  </section>

  <section
    id="skills"
    class="border-border section-animate border-t py-16 {sectionsVisible.skills
      ? 'visible'
      : ''}"
  >
    <TechStack />
  </section>

  <section
    id="about"
    class="border-border section-animate border-t py-16 {sectionsVisible.about
      ? 'visible'
      : ''}"
  >
    <AboutSection />
  </section>

  <section
    id="contact"
    class="border-border section-animate border-t py-16 {sectionsVisible.contact
      ? 'visible'
      : ''}"
  >
    <ContactSection />
  </section>

  <Footer />
</div>
