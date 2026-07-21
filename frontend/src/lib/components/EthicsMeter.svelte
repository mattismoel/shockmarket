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

<div class="sm:max-w-64 w-full pt-4">
	<div class={["w-full min-h-6"]}>
		<!-- Bar -->
		<div
			class={[
				"relative left-0 top-0 -translate-y-1/2 h-1 rounded-full bg-linear-to-r from-red-500 via-yellow-500 to-green-500"
			]}
		>
			<!-- Center Marker -->
			<div
				class={[
					"z-50 w-0.5 h-full top-0 absolute left-1/2 bg-black/50",
					active ? "opacity-100" : "opacity-0"
				]}
			></div>

			<!-- Marker -->
			<div
				class="size-2 absolute bg-white rounded-full top-1/2 -translate-y-1/2"
				style:left="calc({normalised} * 100%)"
			>
				<span class="text-xs absolute top-0 -translate-y-full left-1/2 text-white -translate-x-1/2">
					{value.current.toFixed(2)}
				</span>
			</div>

			<div
				class={[
					"absolute -bottom-2 translate-y-full w-full flex transition-[opacity,height] text-white/50 font-medium justify-between text-xs",
					active ? "h-4 opacity-100" : "h-0 opacity-50"
				]}
			>
				<span>Unethical</span>
				<span>Ethical</span>
			</div>
		</div>
	</div>
</div>
