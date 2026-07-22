<script lang="ts">
	import { normaliseRating } from "$lib/stock";
	import { Tween } from "svelte/motion";
	import { expoOut } from "svelte/easing";
	import { onMount } from "svelte";
	import { isTouchDevice } from "$lib/media";

	const LABEL_DURATION = 800;

	type Props = {
		rating: number;
		active: boolean;
	};

	let { rating, active }: Props = $props();

	const value = new Tween(0);

	let isTouch = $state(false);
	let normalised = $derived(isTouch ? normaliseRating(rating) : normaliseRating(value.current));

	onMount(() => {
		isTouch = isTouchDevice();
	});

	$effect(() => {
		if (!active) {
			value.set(-1.0, { duration: 100 });
			return;
		}

		value.set(rating, {
			duration: LABEL_DURATION,
			easing: expoOut
		});
	});
</script>

<div class="w-full pt-4 sm:max-w-64">
	<div class={["min-h-6 w-full"]}>
		<!-- Bar -->
		<div
			class={[
				"relative top-0 left-0 h-1 -translate-y-1/2 rounded-full bg-linear-to-r from-red-500 via-yellow-500 to-green-500"
			]}
		>
			<!-- Center Marker -->
			<div
				class={[
					"absolute top-0 left-1/2 z-50 h-full w-0.5 bg-black/50",
					active ? "opacity-100" : "opacity-0"
				]}
			></div>

			<!-- Marker -->
			<div
				class="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-white"
				style:left="calc({normalised} * 100%)"
			>
				<span class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-xs text-white">
					{value.current.toFixed(2)}
				</span>
			</div>

			<div
				class={[
					"absolute -bottom-2 flex w-full translate-y-full justify-between text-xs font-medium text-white/50 transition-[opacity,height]",
					active ? "h-4 opacity-100" : "h-0 opacity-50"
				]}
			>
				<span>Unethical</span>
				<span>Ethical</span>
			</div>
		</div>
	</div>
</div>
