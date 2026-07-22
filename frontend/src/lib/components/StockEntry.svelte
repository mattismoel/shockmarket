<script lang="ts">
	import { isTouchDevice } from "$lib/media";
	import {
		calculateEthicsRating,
		calculateImpactRating,
		type Impact,
		type Stock
	} from "$lib/stock";

	import { signNumber } from "$lib/string";
	import { onMount } from "svelte";
	import EthicsMeter from "./EthicsMeter.svelte";
	import { fade } from "svelte/transition";

	const WAIT_DURATION_SECS = 15;

	type Props = {
		stock: Stock;
		expanded: boolean;
		onHover: () => void;
		onToggle: () => void;
	};

	let { stock, expanded, onToggle, onHover }: Props = $props();

	let isTouch = $state(false);

	onMount(() => {
		isTouch = isTouchDevice();
	});

	let hovered = $state(false);
	let ethicsRating = $derived(calculateEthicsRating(stock));

	let positiveImpacts = $derived(stock.impacts.filter((i) => calculateImpactRating(i) > 0));
	let negativeImpacts = $derived(stock.impacts.filter((i) => calculateImpactRating(i) <= 0));

	let isChangePositive = $derived(stock.changePct > 0.0);

	let impactContainer = $state<HTMLDivElement>();
	let impactContainerHeight = $derived(impactContainer ? impactContainer.scrollHeight : 0);

	let disabled = $state(true);
	let secondsLeft = $state(WAIT_DURATION_SECS);

	$effect(() => {
		if (expanded) {
			disabled = true;
			secondsLeft = WAIT_DURATION_SECS;

			const disabledTimeout = setTimeout(() => {
				disabled = false;
			}, WAIT_DURATION_SECS * 1000);

			const disabledInterval = setInterval(() => {
				secondsLeft -= 1;
			}, 1000);

			return () => {
				clearTimeout(disabledTimeout);
				clearInterval(disabledInterval);
			};
		}

		disabled = true;
		secondsLeft = WAIT_DURATION_SECS;
	});

	const handleHover = () => {
		hovered = true;

		onHover();
	};

	const handleBlur = () => {
		hovered = false;
	};
</script>

<li
	onmouseenter={handleHover}
	onmouseleave={handleBlur}
	onfocus={handleHover}
	onblur={handleBlur}
	class="group w-full transition-[background,backdrop-filter] duration-100 hover:bg-white/10 hover:backdrop-blur-2xl"
>
	<button onclick={onToggle} class="w-full py-8">
		<div class="mx-responsive grid text-left text-white">
			<div class="mb-4 flex flex-col">
				<div class="flex gap-4">
					<span
						class="flex w-full gap-2 font-heading text-2xl font-black text-white/50 transition-colors group-hover:text-white"
					>
						{stock.companyName} [{stock.ticker}]
					</span>

					<div class="flex items-center gap-2">
						{#if isChangePositive}
							<span class="iconify size-8 text-green-500 boxicons--trending-up"></span>
						{:else}
							<span class="iconify size-8 text-red-500 boxicons--trending-down"></span>
						{/if}
						<span>{signNumber(stock.changePct)}%</span>
					</div>
				</div>
			</div>

			<div class="text-white/50 transition-colors group-hover:text-white">
				<p
					class={[
						"mb-8 overflow-hidden transition-[height,margin-top]",
						expanded ? "mt-4" : "line-clamp-1"
					]}
				>
					{stock.description}
				</p>

				<div
					class={[
						"grid gap-8 overflow-hidden transition-[margin-bottom,height,opacity]",
						expanded ? "mb-8 opacity-100" : "opacity-0"
					]}
					bind:this={impactContainer}
					style:height={expanded ? `${impactContainerHeight}px` : "0px"}
				>
					<EthicsMeter rating={ethicsRating} active={expanded} />

					{@render impactList(
						"Positive Impacts",
						positiveImpacts,
						"There doesn't seem to be any positive impacts of this stock..."
					)}
					{@render impactList(
						"Negative Impacts",
						negativeImpacts,
						"There doesn't seem to be any negative impacts of this stock."
					)}
				</div>
			</div>

			<a
				href={stock.outboundHref}
				aria-disabled={disabled ? "true" : "false"}
				class={[
					"relative inline-flex h-fit min-w-full items-center justify-center gap-2 bg-white px-8 py-2 font-medium text-black transition-colors sm:w-fit sm:min-w-48",
					"aria-disabled:pointer-events-none aria-disabled:bg-white/10 aria-disabled:text-white/50"
				]}
			>
				{#if disabled}
					<span class="iconify transition-opacity boxicons--lock"> </span>
				{/if}

				{#if disabled && expanded}
					Buy ({secondsLeft}s)
				{:else}
					Buy
				{/if}

				<div
					style="--duration: {WAIT_DURATION_SECS}s"
					class={[
						"absolute bottom-0 left-0 h-0.5 w-0 bg-white/50 transition-[opacity,width]",
						hovered ? "opacity-100" : "opacity-0"
					]}
					class:progress={expanded}
				></div>
			</a>

			<p
				class={[
					"iconify flex size-8 w-full justify-center text-white/50 transition-[rotate,color] boxicons--chevron-down group-hover:text-white",
					expanded && "rotate-180"
				]}
			></p>
		</div>
	</button>
</li>

{#snippet impactList(title: string, impacts: Impact[], emptyText: string)}
	{@const delay = 300}
	{@const interval = 200}
	<div>
		<h3 class="mb-2 font-heading font-bold">{title}</h3>

		{#if impacts.length}
			<ul class="list-inside list-disc text-white/75">
				{#each impacts as { text, sources }, i (text)}
					{#if impacts.length === 1 || expanded}
						<li transition:fade={{ duration: 300, delay: delay + i * interval }}>
							<span class="relative">
								{text}
								{#if sources && sources.length > 0}
									<ol
										class="absolute top-2 right-0 flex translate-x-full -translate-y-1/2 gap-0.5 text-xs"
									>
										{#each sources as source, i}
											<li><a href={source} class="hover:underline">[{i + 1}]</a></li>
										{/each}
									</ol>
								{/if}
							</span>
						</li>
					{/if}
				{/each}
			</ul>
		{:else}
			<p class="text-white/75 italic">{emptyText}</p>
		{/if}
	</div>
{/snippet}

<style>
	@keyframes progress {
		from {
			width: 100%;
		}

		to {
			width: 0%;
		}
	}

	.progress {
		animation: var(--duration) linear 0s progress;
	}
</style>
