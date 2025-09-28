<script lang="ts">
  import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-svelte";
  import { Download } from "lucide-svelte";
  import { onMount } from "svelte";

  export let name = "Gabriel Rauch";
  export let title = "Full Stack Engineer";
  export let description =
    "Experienced in building scalable and resilient web applications using modern technologies. Focused on clean architecture, performance optimization, and delivering a seamless developer experience.";
  export let resumeUrl =
    "https://drive.google.com/file/d/1iJe38G4H4gP-T9vTW2zc7EYd1Lk0sngP/view?usp=sharing";

  const terminalLines = [
    { type: "command", text: "$ whoami" },
    { type: "output", text: name },
    { type: "command", text: "$ cat role.txt" },
    { type: "output", text: title },
    { type: "command", text: "$ cat about.txt" },
    { type: "output", text: description },
  ];

  let visibleLines: Array<{ type: string; text: string; displayText: string }> =
    [];
  let currentLineIndex = 0;
  let currentCharIndex = 0;
  let isTyping = false;

  function typeNextCharacter() {
    if (currentLineIndex >= terminalLines.length) return;

    const currentLine = terminalLines[currentLineIndex];

    if (currentCharIndex === 0) {
      visibleLines = [...visibleLines, { ...currentLine, displayText: "" }];
      isTyping = true;
    }

    if (currentCharIndex < currentLine.text.length) {
      const newDisplayText = currentLine.text.slice(0, currentCharIndex + 1);
      visibleLines = visibleLines.map((line, index) =>
        index === visibleLines.length - 1
          ? { ...line, displayText: newDisplayText }
          : line
      );
      currentCharIndex++;

      const typingSpeed = currentLine.type === "command" ? 80 : 40;
      setTimeout(typeNextCharacter, typingSpeed + Math.random() * 40);
    } else {
      currentLineIndex++;
      currentCharIndex = 0;
      isTyping = false;
      setTimeout(typeNextCharacter, 800);
    }
  }

  onMount(() => {
    setTimeout(typeNextCharacter, 500);
  });
</script>

<section
  class="bg-background relative flex min-h-[600px] w-full items-center px-4 py-16 sm:px-6 lg:px-8"
>
  <div class="container mx-auto">
    <div class="mx-auto max-w-4xl space-y-8 text-center">
      <!-- Terminal-style header -->
      <div
        class="terminal-window glass-card mx-auto w-full max-w-3xl rounded-lg text-left"
      >
        <div class="terminal-container">
          <div
            class="terminal-header text-muted-foreground border-border flex items-center gap-2 border-b px-6 py-3 text-xs"
          >
            <div class="flex gap-1">
              <div class="h-3 w-3 rounded-full bg-red-500"></div>
              <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div class="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <span>gabriel@portfolio:~</span>
          </div>
          <div class="terminal-content font-mono text-sm">
            <div class="terminal-lines">
              {#each visibleLines as line, i (i)}
                <div class="terminal-line mb-1">
                  {#if line.type === "command"}
                    <div class="flex items-center gap-2">
                      <span class="text-green-400">$</span>
                      <span class="command-text"
                        >{line.displayText.replace("$ ", "")}</span
                      >
                      {#if i === visibleLines.length - 1 && isTyping}
                        <div class="typing-cursor h-4 w-2 bg-green-400"></div>
                      {/if}
                    </div>
                  {:else if line.text === description}
                    <div
                      class="text-muted-foreground pl-4 text-xs leading-relaxed"
                    >
                      {line.displayText}
                      {#if i === visibleLines.length - 1 && isTyping}
                        <span
                          class="typing-cursor inline-block h-3 w-1 bg-blue-400"
                        ></span>
                      {/if}
                    </div>
                  {:else}
                    <div class="output-text pl-4">
                      {line.displayText}
                      {#if i === visibleLines.length - 1 && isTyping}
                        <span
                          class="typing-cursor inline-block h-4 w-1 bg-blue-400"
                        ></span>
                      {/if}
                    </div>
                  {/if}
                </div>
              {/each}
              {#if currentLineIndex >= terminalLines.length}
                <div class="flex items-center gap-2">
                  <span class="text-green-400">$</span>
                  <div class="blinking-cursor h-4 w-2 bg-green-400"></div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Main heading -->
      <div class="space-y-4">
        <h1 class="text-4xl font-bold tracking-tight md:text-6xl">
          <span class="text-muted-foreground">const</span>
          <span class="text-primary">developer</span>
          <span class="text-muted-foreground">=</span>
          <span class="text-foreground">"digital craftsman";</span>
        </h1>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          Turning complex requirements into elegant, maintainable solutions.
        </p>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-wrap justify-center gap-4 pt-6">
        <a
          href={resumeUrl}
          class="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground glass inline-flex h-10 items-center justify-center rounded-md border px-8 font-mono text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
          download
        >
          <Download class="mr-2 h-4 w-4" />
          Download CV
        </a>
      </div>

      <!-- Social links -->
      <div class="flex justify-center gap-4 pt-4">
        <a
          href="https://github.com/gabrielrauch"
          class="focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-md font-mono text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
          aria-label="GitHub Profile"
        >
          <IconBrandGithub class="h-5 w-5" />
        </a>
        <a
          href="https://linkedin.com/in/gabrielrauch"
          class="focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-md font-mono text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
          aria-label="LinkedIn Profile"
        >
          <IconBrandLinkedin class="h-5 w-5" />
        </a>
      </div>

      <!-- Status indicator -->
      <div
        class="text-muted-foreground flex items-center justify-center gap-2 pt-8 text-sm"
      >
        <div class="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
        <span>Available for new opportunities</span>
      </div>
    </div>
  </div>
</section>
