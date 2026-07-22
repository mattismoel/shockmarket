<script lang="ts">
	import StockList from "$lib/components/StockList.svelte";
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
	<p
		class="pointer-events-none absolute right-8 bottom-8 z-100 max-w-sm text-right text-[0.6rem] leading-relaxed text-white/20"
	>
		All data is made-up solely for the purpose of art, and are not to be taken as fact. No numbers
		are pulled from the actual stock exchange market.
	</p>
	<div class="fixed -z-50 h-full w-full">
		<div
			class="pointer-events-none absolute bottom-0 left-0 z-10 h-2/3 w-full bg-linear-to-t from-black"
		></div>

		{#if hoveredStock?.video}
			<video
				autoplay
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
			<h1 class="mb-4 font-heading text-5xl font-black">Trending Stocks</h1>
			<p class="text-white/75">
				These are the the currently most popular, and projected to be successful stocks.
			</p>
		</header>

		<div class="max-h-[50svh] overflow-y-scroll">
			<StockList {stocks} bind:hoveredStock />
		</div>
	</div>
</main>
