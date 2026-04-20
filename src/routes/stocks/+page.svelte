<script lang="ts">
	import StockList from '$lib/components/stock-list/StockList.svelte';
	import { STOCKS, type Stock } from '$lib/stock';

	let hoveredStock = $state<Stock>();
</script>

<div class="mx-auto max-w-3xl py-32">
	{#if hoveredStock?.video}
		<video
			class="pointer-events-none fixed top-0 left-0 -z-10 h-svh w-full object-cover"
			src={hoveredStock?.video}
			autoplay
			muted
			loop
		>
			<track kind="captions" />
		</video>
	{/if}
	<main>
		<div class="fixed bottom-0 left-0 w-full">
			<header class="mb-16 px-4 text-shadow-md sm:px-16">
				<h1 class="mb-4 font-heading text-3xl font-bold text-text-light sm:text-6xl">
					Trending Stocks
				</h1>
				<p>These are the currently most popular, and projected to be successful stocks.</p>
			</header>

			<div class="max-h-84 w-full overflow-scroll">
				<StockList stocks={STOCKS} bind:hoveredStock />
			</div>
		</div>

		<div class="fixed inset-0 bottom-0 -z-10 bg-linear-to-t from-black"></div>
	</main>
</div>
