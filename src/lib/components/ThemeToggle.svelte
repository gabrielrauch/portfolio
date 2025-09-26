<script lang="ts">
	import { themeStore } from '$lib/stores/theme';

	let isOpen = false;
	let isDark = false;

	// Check if current theme is dark
	$: {
		if (typeof window !== 'undefined') {
			isDark = document.documentElement.classList.contains('dark');
		}
	}

	function toggleTheme(theme: 'light' | 'dark' | 'system') {
		themeStore.setTheme(theme);
		isOpen = false;
		// Force update the isDark state
		setTimeout(() => {
			if (typeof window !== 'undefined') {
				isDark = document.documentElement.classList.contains('dark');
			}
		}, 10);
	}
</script>

<div class="relative">
	<button
		class="theme-toggle-button focus-visible:ring-ring border-input hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-md border px-0 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
		on:click={() => (isOpen = !isOpen)}
	>
		<span
			class="text-lg transition-all duration-300 {isDark
				? 'rotate-90 scale-0'
				: 'rotate-0 scale-100'}"
		>
			☀️
		</span>
		<span
			class="absolute text-lg transition-all duration-300 {isDark
				? 'rotate-0 scale-100'
				: '-rotate-90 scale-0'}"
		>
			🌙
		</span>
		<span class="sr-only">Toggle theme</span>
	</button>

	{#if isOpen}
		<div
			class="bg-popover text-popover-foreground absolute right-0 z-50 mt-2 w-56 rounded-md border p-1 shadow-md"
		>
			<button
				class="focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors"
				on:click={() => toggleTheme('light')}
			>
				<span class="mr-2 text-sm">☀️</span>
				<span>Light</span>
			</button>
			<button
				class="focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors"
				on:click={() => toggleTheme('dark')}
			>
				<span class="mr-2 text-sm">🌙</span>
				<span>Dark</span>
			</button>
			<button
				class="focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors"
				on:click={() => toggleTheme('system')}
			>
				<span class="mr-2 text-sm">💻</span>
				<span>System</span>
			</button>
		</div>
	{/if}
</div>
