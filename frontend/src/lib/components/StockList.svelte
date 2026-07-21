<script lang="ts">
	import type { Stock } from "$lib/stock";
	import { onMount } from "svelte";
	import StockEntry from "./StockEntry.svelte";
	import { isTouchDevice } from "$lib/media";

	type Props = {
		stocks: Stock[];

		hoveredStock: Stock | undefined;
	};

	let { stocks, hoveredStock = $bindable() }: Props = $props();

	let expandedStock = $state<Stock>();

	const handleToggle = (stock: Stock) => {
		if (stock.ticker === expandedStock?.ticker) {
			expandedStock = undefined;
			return;
		}

		expandedStock = stock;

		if (isTouchDevice()) {
			hoveredStock = expandedStock;
		}
	};
</script>

<ul class="divide-y divide-white/5">
	{#each stocks as stock}
		{@const expanded = expandedStock?.ticker === stock.ticker}
		<StockEntry
			{stock}
			{expanded}
			onToggle={() => handleToggle(stock)}
			onHover={() => (hoveredStock = stock)}
		/>
	{/each}
</ul>
