<script lang="ts">
  import { Database } from "lucide-svelte";

  const techStack = [
    { name: "Go", icon: "🦦" },
    { name: "TypeScript", icon: "🔷" },
    { name: "PHP", icon: "🐘" },
    { name: "Node.js", icon: "🟢" },
    { name: "React", icon: "⚛️" },
    { name: "Mobile", icon: "📱" },
    { name: "Docker", icon: "🐳" },
    { name: "AWS", icon: "☁️" },
  ];
</script>

<div class="container">
  <h2 class="mb-8 flex items-center gap-2 text-2xl font-bold">
    <Database class="h-6 w-6" />
    <span>$ cat tech-stack.json</span>
  </h2>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
    {#each techStack as tech (tech.name)}
      <div
        class="glass-card rounded-lg border transition-all duration-300 hover:scale-105 hover:border-gray-400/80 hover:bg-gray-200/90 dark:hover:border-gray-500/80 dark:hover:bg-gray-700/90"
      >
        <div class="p-4 text-center">
          <div class="mb-2 text-2xl">{tech.icon}</div>
          <div class="font-mono text-sm">{tech.name}</div>
        </div>
      </div>
    {/each}
  </div>
</div>
