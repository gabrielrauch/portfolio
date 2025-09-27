<script lang="ts">
  import { Globe } from "lucide-svelte";
</script>

<div class="container">
  <h2 class="mb-8 flex items-center gap-2 text-2xl font-bold">
    <Globe class="h-6 w-6" />
    <span>$ whoami</span>
  </h2>
  <div class="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
    <div class="space-y-4">
      <div class="glass-card rounded-lg p-6">
        <h3 class="text-primary mb-3 text-lg font-semibold">// Professional</h3>
        <p class="text-muted-foreground text-sm leading-relaxed">
          Fullstack developer with over 5 years of experience, having worked on
          a variety of projects across different industries, including financial
          systems, Web3 platforms, and large-scale enterprise solutions. I bring
          strong expertise in both back-end and front-end development, with a
          focus on performance, scalability, and code quality 🚀.
        </p>
      </div>
      <div class="glass-card rounded-lg p-6">
        <h3 class="text-primary mb-3 text-lg font-semibold">// Personal</h3>
        <p class="text-muted-foreground text-sm leading-relaxed">
          Based in Brazil, I'm commited to building reliable software solutions.
          Always learning, always improving, with a focus on creating technology
          that makes a difference 🏃.
        </p>
      </div>
    </div>
    <div class="glass-card rounded-lg p-6">
      <div class="text-muted-foreground mb-4 text-xs">// Current status</div>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-muted-foreground">Location:</span>
          <span>Blumenau, SC - Brazil</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Status:</span>
          <span class="text-green-400">Available for work</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Focus:</span>
          <span> Node.js, TypeScript, React, Go, AWS</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Interests:</span>
          <span>Fintech, AI/ML, IaC, DX</span>
        </div>
      </div>
    </div>
  </div>
</div>
