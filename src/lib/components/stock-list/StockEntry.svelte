<script lang="ts">
	import TrendingUp from '@iconify-svelte/boxicons/trending-up';
	import TrendingDown from '@iconify-svelte/boxicons/trending-down';
	import ChevronDown from '@iconify-svelte/boxicons/chevron-down';
	import Lock from '@iconify-svelte/boxicons/lock';
	import Video from '@iconify-svelte/boxicons/video';

	import {
		calculateEthicsRating,
		calculateImpactRating,
		getEthicsText,
		type Impact,
		type Stock
	} from '$lib/stock';
	import Button from '../button/Button.svelte';

	const FORCE_WAIT_DURATION_SECS = 10;

	type Props = {
		stock: Stock;
		expanded: boolean;
		onToggleExpand: () => void;
		onHover: () => void;
	};

	let { stock, expanded, onToggleExpand, onHover }: Props = $props();

	let impactContainer = $state<HTMLDivElement>();
	let impactHeight = $derived(impactContainer ? impactContainer.scrollHeight : 0);

	let positveImpacts = $derived(
		stock.impacts.filter((impact) => calculateImpactRating(impact) > 0)
	);

	let negativeImpacts = $derived(
		stock.impacts.filter((impact) => calculateImpactRating(impact) <= 0)
	);

	let hovered = $state(false);
	let disabled = $state(true);

	let disabledTimeout = $state<number>();
	let disabledInterval = $state<number>();

	let secondsLeft = $state<number>(FORCE_WAIT_DURATION_SECS);

	let ethicsRating = $derived(calculateEthicsRating(stock));

	const handleHover = () => {
		hovered = true;

		disabledTimeout = setTimeout(() => {
			disabled = false;
			clearInterval(disabledInterval);
		}, FORCE_WAIT_DURATION_SECS * 1000);

		disabledInterval = setInterval(() => {
			secondsLeft -= 1;
		}, 1000);

		onHover();
	};

	const handleBlur = () => {
		disabled = true;
		hovered = false;

		clearInterval(disabledInterval);
		clearTimeout(disabledTimeout);
		secondsLeft = FORCE_WAIT_DURATION_SECS;
	};
</script>

<li
	class="group hover:bg-foreground/10 hover:backdrop-blur-2xl"
	id="main"
	onmouseenter={handleHover}
	onfocus={onHover}
	onmouseleave={handleBlur}
	onblur={handleBlur}
>
	<button
		type="button"
		onclick={onToggleExpand}
		class="relative mb-4 grid w-full cursor-pointer px-16 pt-4 text-left"
	>
		<div class="relative flex items-center gap-8">
			<div class="flex gap-2">
				{#if stock.video !== undefined}
					<Video class="size-8" />
				{/if}

				<p class="text-left font-heading text-2xl transition-colors group-hover:text-text-light">
					{stock.name} [{stock.symbol}]
				</p>
			</div>

			<ChevronDown
				class={[
					'absolute top-1/2 -left-10 size-8 -translate-y-1/2 transition-transform',
					expanded && 'rotate-180'
				]}
			/>

			<div class="flex items-center gap-2">
				{#if stock.priceDelta > 0}
					<TrendingUp class="size-8 text-green-500" />
				{:else}
					<TrendingDown class="size-8 text-red-500" />
				{/if}

				{#if stock.priceDelta < 0}
					<span>{stock.priceDelta}%</span>
				{:else}
					<span>+{stock.priceDelta}%</span>
				{/if}
			</div>
		</div>

		<p class={['mb-4 max-w-lg transition-[margin]', expanded ? 'mt-4' : 'truncate']}>
			{stock.description}
		</p>

		<div
			class="absolute top-8 right-16 flex w-fit flex-col items-end gap-4 text-sm font-semibold transition-colors group-hover:text-text-light"
		>
			<p>{getEthicsText(ethicsRating)} ({ethicsRating.toFixed(2)})</p>
			{@render ethicsMeter(ethicsRating)}
		</div>

		<div
			bind:this={impactContainer}
			class="overflow-hidden transition-[height]"
			style:height={expanded ? `${impactHeight}px` : '0px'}
		>
			<div class="grid gap-4 py-4">
				{@render impactList(positveImpacts, 'Positive Impacts')}
				{@render impactList(negativeImpacts, 'Negative Impacts')}
			</div>
		</div>
	</button>

	<div class="px-16 pb-8">
		<Button {disabled}>
			{#if hovered && disabled}
				<Lock class="size-5" />
				Buy ({secondsLeft}s)
			{:else}
				Buy
			{/if}
		</Button>
	</div>
</li>

{#snippet impactList(impacts: Impact[], title: string)}
	<div>
		<h2 class="font-heading transition-colors group-hover:text-text-light">
			{title}
		</h2>
		{#if impacts.length > 0}
			<ol class="list-inside list-disc">
				{#each impacts as impact}
					<li class="relative w-fit">
						<span>{impact.message}</span>

						{#if impact.sources && impact.sources.length > 0}
							<div class="absolute top-0 -right-4 flex translate-x-full items-center gap-1 text-xs">
								<p>Sources:</p>
								{#each impact.sources as source, i}
									<a href={source} class="hover:underline">[{i + 1}]</a>
								{/each}
							</div>
						{/if}
					</li>
				{/each}
			</ol>
		{:else}
			<p class="italic">There doesn't seem to be any positive impacts of this stock...</p>
		{/if}
	</div>
{/snippet}

{#snippet ethicsMeter(rating: number)}
	<div
		class="relative h-1 w-0 rounded-full bg-linear-to-r from-red-500 via-yellow-300 to-green-500 grayscale-100 transition-[filter,width] group-hover:w-48 group-hover:grayscale-0"
	>
		<div
			class="absolute top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground opacity-0 shadow-md transition-[height,width,left,opacity] delay-100 ease-in-out group-hover:size-2 group-hover:opacity-100"
			style:left={hovered ? `calc((0.5 * (${rating} + 1)) * 100%)` : '0%'}
		></div>

		<div
			class="absolute top-1/2 left-1/2 h-1 w-px -translate-x-1/2 -translate-y-1/2 bg-surface-50/50"
		></div>
	</div>
{/snippet}
