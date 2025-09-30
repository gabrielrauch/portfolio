<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let email = $state("");
  let password = $state("");
  let loading = $state(false);
  let error = $state("");

  const API_BASE_URL = "https://portfolio-blog-api.gabrielrauchdev.workers.dev";

  onMount(() => {
    const token = localStorage.getItem("admin_token");
    if (
      token &&
      token !== "[object Object]" &&
      token !== "null" &&
      token !== "undefined"
    ) {
      goto("/admin/dashboard");
    } else if (token) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      document.cookie = "admin_token=; path=/; max-age=0";
      document.cookie = "admin_user=; path=/; max-age=0";
    }
  });

  async function handleLogin() {
    if (!email || !password) {
      error = "Please fill in all fields";
      return;
    }

    loading = true;
    error = "";

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data?.user?.role === "admin") {
        localStorage.setItem("admin_token", data.data.token);
        localStorage.setItem("admin_user", JSON.stringify(data.data.user));

        document.cookie = `admin_token=${data.data.token}; path=/; max-age=604800`;
        document.cookie = `admin_user=${encodeURIComponent(JSON.stringify(data.data.user))}; path=/; max-age=604800`;

        await goto("/admin/dashboard");
      } else {
        error = "Admin privileges required";
      }
    } catch (err) {
      console.error("Login error:", err);
      error = "Invalid credentials";
    } finally {
      loading = false;
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      handleLogin();
    }
  }
</script>

<svelte:head>
  <title>Admin Login - Portfolio Blog</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="min-h-screen bg-background flex items-center justify-center px-4">
  <div class="w-full max-w-md">
    <div class="glass border border-border rounded-lg p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-foreground mb-2">
          <span class="font-mono text-primary">~/</span>admin
        </h1>
        <p class="text-muted-foreground">CORE DUMPED</p>
      </div>

      <form
        onsubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        class="space-y-6"
      >
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-foreground mb-2"
          >
            email
          </label>
          <input
            id="email"
            type="email"
            bind:value={email}
            onkeypress={handleKeyPress}
            disabled={loading}
            class="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
            placeholder="admin@example.com"
            required
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-foreground mb-2"
          >
            password
          </label>
          <input
            id="password"
            type="password"
            bind:value={password}
            onkeypress={handleKeyPress}
            disabled={loading}
            class="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
            placeholder="••••••••"
            required
          />
        </div>

        {#if error}
          <div class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p class="text-red-400 text-sm">{error}</p>
          </div>
        {/if}

        <button
          type="submit"
          disabled={loading}
          class="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {#if loading}
            <span class="flex items-center justify-center gap-2">
              <svg
                class="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              signing in...
            </span>
          {:else}
            sign in
          {/if}
        </button>
      </form>

      <div class="mt-6 pt-6 border-t border-border">
        <p class="text-center text-sm text-muted-foreground">
          <a
            href="/"
            class="text-primary hover:text-primary/80 transition-colors"
          >
            ← back to home
          </a>
        </p>
      </div>
    </div>
  </div>
</main>

<style>
  .glass {
    background: rgba(var(--card), 0.8);
    backdrop-filter: blur(10px);
  }
</style>
