<script lang="ts">
	import type { Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";

	type Props = {
		children: Snippet<[]>;
		class?: ClassValue;
	};

	let props: Props = $props();
</script>

<p class={["leading-relaxed", props.class]}>
	{@render props.children()}
</p>
