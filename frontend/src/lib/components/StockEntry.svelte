<script lang="ts">
	import { isTouchDevice } from "$lib/media";
	import {
		calculateEthicsRating,
		calculateImpactRating,
		getEthicsText,
		normaliseRating,
		type Impact,
		type Stock
	} from "$lib/stock";

	import { signNumber } from "$lib/string";
	import { onMount } from "svelte";
	import EthicsMeter from "./EthicsMeter.svelte";

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
	class="w-full group hover:bg-white/10 transition-[background,backdrop-filter] duration-100 hover:backdrop-blur-2xl"
>
	<button onclick={onToggle} class="text-left py-8 mx-responsive grid text-white">
		<div class="flex flex-col mb-4">
			<div class="flex gap-4">
				<span
					class="text-white/50 transition-colors group-hover:text-white font-black w-full text-2xl flex gap-2 font-heading"
				>
					{stock.companyName} [{stock.ticker}]
				</span>

				<div class="flex items-center gap-2">
					{#if isChangePositive}
						<span class="size-8 iconify boxicons--trending-up text-green-500"></span>
					{:else}
						<span class="size-8 iconify boxicons--trending-down text-red-500"></span>
					{/if}
					<span>{signNumber(stock.changePct)}%</span>
				</div>
			</div>
		</div>

		<div class="text-white/50 group-hover:text-white transition-colors">
			<p
				class={[
					"overflow-hidden mb-8 transition-[height,margin-top]",
					expanded ? "mt-4" : "line-clamp-1"
				]}
			>
				{stock.description}
			</p>

			<div
				class={[
					"gap-8 grid overflow-hidden transition-[margin-bottom,height,opacity]",
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
				"h-fit relative min-w-full sm:min-w-48 sm:w-fit inline-flex items-center justify-center bg-white text-black font-medium px-8 py-2 gap-2 transition-colors",
				"aria-disabled:text-white/50 aria-disabled:bg-white/10 aria-disabled:pointer-events-none"
			]}
		>
			{#if disabled}
				<span class="iconify boxicons--lock transition-opacity"> </span>
			{/if}

			{#if disabled && expanded}
				Buy ({secondsLeft}s)
			{:else}
				Buy
			{/if}

			<div
				style="--duration: {WAIT_DURATION_SECS}s"
				class={[
					"transition-[opacity,width] absolute w-0 bottom-0 left-0 h-0.5 bg-white/50",
					hovered ? "opacity-100" : "opacity-0"
				]}
				class:progress={expanded}
			></div>
		</a>

		<p
			class={[
				"size-8 iconify flex justify-center w-full boxicons--chevron-down transition-[rotate]",
				expanded && "rotate-180"
			]}
		></p>
	</button>
</li>

{#snippet impactList(title: string, impacts: Impact[], emptyText: string)}
	<div>
		<h3 class="font-bold mb-2 font-heading">{title}</h3>

		{#if impacts.length}
			<ul class="list-disc list-inside text-white/75">
				{#each impacts as { text, sources }}
					<li>
						<span class="relative">
							{text}
							{#if sources && sources.length > 0}
								<ol
									class="absolute top-2 right-0 flex gap-0.5 text-xs -translate-y-1/2 translate-x-full"
								>
									{#each sources as source, i}
										<li><a href={source} class="hover:underline">[{i + 1}]</a></li>
									{/each}
								</ol>
							{/if}
						</span>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="italic text-white/75">{emptyText}</p>
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
