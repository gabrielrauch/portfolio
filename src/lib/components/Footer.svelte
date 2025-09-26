<script lang="ts">
	import { Terminal } from 'lucide-svelte';

	function smoothScrollTo(targetId: string) {
		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}
	// TODO: Make this dynamic
	const version = '1.0.0';
</script>

<footer class="border-border border-t py-6">
	<div class="container">
		<div
			class="text-muted-foreground flex flex-col items-center justify-between text-sm md:flex-row"
		>
			<div class="flex items-center gap-2">
				<Terminal class="h-4 w-4" />
				<span>
					© {new Date().getFullYear()} gabrielrauch.sh --version {version}
				</span>
			</div>
			<div class="mt-4 flex items-center gap-6 text-xs md:mt-0 md:gap-12 md:text-sm">
				<span class="text-muted-foreground">$ ls sitemap</span>
				<div class="mt-4 flex gap-4 md:mt-0">
					<button
						class="hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors"
						on:click={() => smoothScrollTo('home')}
					>
						~/home
					</button>
					<button
						class="hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors"
						on:click={() => smoothScrollTo('skills')}
					>
						~/skills
					</button>
					<button
						class="hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors"
						on:click={() => smoothScrollTo('about')}
					>
						~/about
					</button>
					<button
						class="hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors"
						on:click={() => smoothScrollTo('contact')}
					>
						~/contact
					</button>
					<span class="text-muted-foreground cursor-not-allowed opacity-50" title="Coming Soon">
						~/blog
					</span>
				</div>
			</div>
		</div>
	</div>
</footer>
