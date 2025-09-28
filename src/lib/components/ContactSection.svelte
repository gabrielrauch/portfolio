<script lang="ts">
  import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-svelte";
  import { ExternalLink, Mail, Phone } from "lucide-svelte";
  import ContactForm from "./ContactForm.svelte";

  const email = "gabrielrauchdev@gmail.com";
  let copied = false;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    }
  }
</script>

<div class="container">
  <h2 class="mb-8 flex items-center gap-2 text-2xl font-bold">
    <Mail class="h-6 w-6" />
    <span>$ connect --with-me</span>
  </h2>
  <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
    <div class="space-y-6">
      <div class="glass-card rounded-lg p-6">
        <div class="space-y-3">
          <button
            on:click={copyEmail}
            class="hover:text-primary flex cursor-pointer items-center gap-3 border-none bg-transparent p-0 text-left text-sm transition-colors"
            title="Click to copy email"
          >
            <Mail class="h-4 w-4" />
            <span>{email}</span>
            {#if copied}
              <span class="text-xs text-green-500">✓ Copied!</span>
            {/if}
          </button>
          <a
            href="https://github.com/gabrielrauch"
            class="hover:text-primary flex items-center gap-3 text-sm transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub class="h-4 w-4" />
            <span>github.com/gabrielrauch</span>
            <ExternalLink class="h-3 w-3" />
          </a>
          <a
            href="https://linkedin.com/in/gabrielrauch"
            class="hover:text-primary flex items-center gap-3 text-sm transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin class="h-4 w-4" />
            <span>linkedin.com/in/gabrielrauch</span>
            <ExternalLink class="h-3 w-3" />
          </a>
        </div>
      </div>
      <div class="glass-card rounded-lg p-6">
        <div class="flex gap-3">
          <a
            href="https://discordapp.com/users/1372249142750871713"
            class="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground glass inline-flex h-10 w-10 items-center justify-center rounded-md border font-mono text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.191.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
              />
            </svg>
          </a>
          <a
            href="https://wa.me/5547933810963?text=Hello%20Gabriel!"
            class="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground glass inline-flex h-10 w-10 items-center justify-center rounded-md border font-mono text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <Phone class="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
    <div>
      <ContactForm />
    </div>
  </div>
</div>
