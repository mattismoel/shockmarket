<script lang="ts">
	import StockList from "$lib/components/StockList.svelte";
	import Title from "$lib/components/Title.svelte";
	import { type Stock } from "$lib/stock";
	import { listStocks } from "$lib/stock.remote";
	import { onMount } from "svelte";

	let stocks = $derived(await listStocks());

	let hoveredStock = $state<Stock>();

	onMount(() => {
		hoveredStock = stocks.at(0);
	});
</script>

<main class="relative">
	<!-- Preload all videos in the background -->
	<div class="pointer-events-none fixed -z-50 h-0 w-0 overflow-hidden" aria-hidden="true">
		{#each stocks.filter((stock) => stock.video) as stock}
			<video src={stock.video} preload="" autoplay muted></video>
		{/each}
	</div>

	<div class="fixed -z-50 h-full w-full">
		<div
			class="pointer-events-none absolute bottom-0 left-0 z-10 h-2/3 w-full bg-linear-to-t from-black"
		></div>

		{#if hoveredStock?.video}
			<video
				autoplay
				preload="auto"
				muted
				loop
				src={hoveredStock?.video}
				class="h-full w-full object-cover brightness-50"
			>
				<track kind="captions" />
			</video>
		{/if}
	</div>

	<div class="z-50 flex min-h-svh flex-col justify-end">
		<header class="mx-responsive mb-8 text-white">
			<Title size="lg">Trending Stocks</Title>
			<p class="text-white/75">
				These are the the currently most popular, and projected to be successful stocks.
			</p>
		</header>

		<div class="max-h-[50svh] overflow-y-scroll">
			<StockList {stocks} bind:hoveredStock />
		</div>
	</div>
</main>
