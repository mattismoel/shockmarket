<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import SurgeryVideo from '$lib/videos/Smoking.webm';
</script>

<header class="flex min-h-svh items-center justify-center">
	<video
		src={SurgeryVideo}
		class="fixed top-0 left-0 -z-10 h-full w-full brightness-80"
		autoplay
		muted
	></video>
	<div class="flex h-full max-w-md flex-col items-center justify-center gap-8">
		<div>
			<h1 class="mb-2 font-heading text-4xl font-bold text-text-light">SHOCK MARKET</h1>
			<p class="text-text max-w-sm text-xl leading-relaxed italic">
				"If you dishonour the beaver by taking too much, it will find other places to live. If you
				waste the grain, you will starve."
			</p>
		</div>

		<Button href="/stocks" class="w-full">Buy Stocks</Button>
	</div>
</header>
