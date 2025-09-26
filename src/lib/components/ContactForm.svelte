<script lang="ts">
	import { Send, Terminal } from 'lucide-svelte';

	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	let isSubmitting = false;
	let submitStatus: 'success' | 'error' | null = null;

	async function handleSubmit(event: Event) {
		event.preventDefault();

		// Basic validation
		if (!formData.name || formData.name.length < 2) {
			alert('Name must be at least 2 characters.');
			return;
		}
		if (!formData.email || !formData.email.includes('@')) {
			alert('Please enter a valid email address.');
			return;
		}
		if (!formData.subject || formData.subject.length < 5) {
			alert('Subject must be at least 5 characters.');
			return;
		}
		if (!formData.message || formData.message.length < 10) {
			alert('Message must be at least 10 characters.');
			return;
		}

		isSubmitting = true;
		submitStatus = null;

		try {
			const response = await fetch('https://formspree.io/f/mgvnowna', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					subject: formData.subject,
					message: formData.message
				})
			});

			if (response.ok) {
				submitStatus = 'success';
				formData = { name: '', email: '', subject: '', message: '' };
			} else {
				throw new Error('Failed to send message');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			submitStatus = 'error';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="bg-background mx-auto w-full max-w-2xl font-mono">
	<div class="bg-card/30 border-border w-full rounded-lg border">
		<div class="flex flex-col space-y-1.5 p-6 pb-2">
			<h3 class="flex items-center gap-2 text-xl font-bold">
				<Terminal class="h-5 w-5" />
				<span>$ send-message</span>
			</h3>
			<p class="text-muted-foreground text-sm">
				// Drop me a line about projects, opportunities, or just to say hi
			</p>
		</div>
		<div class="p-6 pt-0">
			{#if submitStatus === 'success'}
				<div class="mb-6 rounded-lg p-3 text-green-400">
					<p class="text-sm">✓ Message sent successfully! I'll get back to you soon.</p>
				</div>
			{/if}

			{#if submitStatus === 'error'}
				<div class="mb-6 rounded-lg border border-red-800 bg-red-900/20 p-3 text-red-400">
					<p class="text-sm">✗ Error sending message. Please try again later.</p>
				</div>
			{/if}

			<form on:submit={handleSubmit} class="space-y-4">
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<label for="name" class="text-muted-foreground text-sm">// name</label>
						<input
							id="name"
							type="text"
							placeholder="your-name"
							bind:value={formData.name}
							class="border-input bg-background/50 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 font-mono text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						/>
					</div>

					<div class="space-y-2">
						<label for="email" class="text-muted-foreground text-sm">// email</label>
						<input
							id="email"
							type="email"
							placeholder="you@domain.com"
							bind:value={formData.email}
							class="border-input bg-background/50 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 font-mono text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						/>
					</div>
				</div>

				<div class="space-y-2">
					<label for="subject" class="text-muted-foreground text-sm">// subject</label>
					<input
						id="subject"
						type="text"
						placeholder="project-inquiry"
						bind:value={formData.subject}
						class="border-input bg-background/50 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 font-mono text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>

				<div class="space-y-2">
					<label for="message" class="text-muted-foreground text-sm">// message</label>
					<textarea
						id="message"
						placeholder="Hello! I'd like to discuss..."
						bind:value={formData.message}
						rows="5"
						class="border-input bg-background/50 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[120px] w-full resize-none rounded-md border px-3 py-2 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					></textarea>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 font-mono text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					{#if isSubmitting}
						<span class="flex items-center gap-2">
							<span class="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
							<span>sending...</span>
						</span>
					{:else}
						<span class="flex items-center gap-2">
							<Send class="h-4 w-4" />
							<span>execute send()</span>
						</span>
					{/if}
				</button>
			</form>
		</div>
	</div>
</div>
