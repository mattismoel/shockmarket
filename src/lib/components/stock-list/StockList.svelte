<script lang="ts">
	import { calculateEthicsRating, type Stock } from '$lib/stock';
	import StockEntry from './StockEntry.svelte';

	type Props = {
		stocks: Stock[];
		hoveredStock: Stock | undefined;
	};

	let { stocks, hoveredStock = $bindable() }: Props = $props();

	let sortedStocks = $derived(
		stocks.sort((a, b) => {
			return calculateEthicsRating(a) - calculateEthicsRating(b);
		})
	);

	let expandedStock = $state<Stock>();

	const handleHoverStock = (stock: Stock) => {
		hoveredStock = stock;
	};

	const handleExpandStock = (stock: Stock) => {
		if (expandedStock === undefined) {
			console.log('expand (from zero)');
			expandedStock = stock;
			return;
		}

		if (expandedStock.name === stock.name) {
			console.log('collapse');
			expandedStock = undefined;
			return;
		}

		if (expandedStock !== undefined) {
			console.log('expand new');
			expandedStock = stock;
			return;
		}
	};
</script>

<ul class="grid divide-y divide-foreground/10">
	{#each sortedStocks as stock}
		<StockEntry
			{stock}
			onToggleExpand={() => handleExpandStock(stock)}
			onHover={() => handleHoverStock(stock)}
			expanded={expandedStock?.name === stock.name}
		/>
	{/each}
</ul>
