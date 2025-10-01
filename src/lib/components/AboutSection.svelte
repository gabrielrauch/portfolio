<script lang="ts">
  import { Globe } from "lucide-svelte";
  import { config } from "$lib/config";
</script>

<div class="container">
  <h2 class="mb-8 flex items-center gap-2 text-2xl font-bold">
    <Globe class="h-6 w-6" />
    <span>$ whoami</span>
  </h2>
  <div class="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
    <div class="space-y-4">
      <div class="glass-card rounded-lg p-6">
        <h3 class="text-primary mb-3 text-lg font-semibold">Professional</h3>
        <p class="text-muted-foreground text-sm leading-relaxed">
          {config.professional.bio}
        </p>
      </div>
      <div class="glass-card rounded-lg p-6">
        <h3 class="text-primary mb-3 text-lg font-semibold">Personal</h3>
        <p class="text-muted-foreground text-sm leading-relaxed">
          {config.professional.personalBio}
        </p>
      </div>
    </div>
    <div class="glass-card rounded-lg p-6">
      <div class="text-muted-foreground mb-4 text-xs">~/.config/info.json</div>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-muted-foreground">Location:</span>
          <span>{config.personal.location}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Status:</span>
          <span class="text-green-400">{config.personal.availability}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Focus:</span>
          <span>{config.professional.focus}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Interests:</span>
          <span>{config.professional.interests}</span>
        </div>
      </div>
    </div>
  </div>
</div>
