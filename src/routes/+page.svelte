<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import LandingVideo from '$lib/videos/Smoking.webm';
</script>

<header class="flex min-h-svh items-center justify-center">
	<video
		src={LandingVideo}
		class="fixed top-0 left-0 -z-10 h-full w-full blur-lg brightness-50"
		autoplay
		muted
		loop
	></video>
	<div class="flex h-full max-w-md flex-col items-center justify-center gap-8">
		<div class="mb-4 flex w-full flex-col items-center gap-8">
			<div class="w-full cursor-default">
				<h1 class="mb-8 font-heading text-7xl font-bold text-text-light text-shadow-md">
					SHOCK MARKET
				</h1>
				<p class="text-lg">
					Every stock has a story. Welcome to Shock Market, the ethically critical stock
					trading-site.
				</p>
			</div>

			<div class="h-px w-full bg-foreground/30"></div>

			<div class="grid gap-4">
				<p
					class="text-text cursor-default text-xl leading-relaxed italic transition-colors duration-500 hover:text-text-light"
				>
					"If you dishonour the beaver by taking too much, it will find other places to live. If you
					waste the grain, you will starve."
				</p>
				<p class="text-right">-&nbsp;Robin Wall Kimmerer</p>
			</div>
		</div>

		<Button href="/stocks" class="w-full">Buy Stocks</Button>
	</div>
</header>
