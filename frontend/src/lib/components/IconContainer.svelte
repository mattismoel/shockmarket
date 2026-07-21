<script lang="ts">
	import type { Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";

	type Spacing = "tight" | "relaxed" | "loose";

	type Props = {
		icon: string;
		children: Snippet<[]>;
		spacing?: Spacing;
		iconClass?: ClassValue;
		class?: ClassValue;
	};

	let { icon, spacing = "relaxed", children, ...rest }: Props = $props();

	const spacingClasses: Record<Spacing, string> = {
		tight: "gap-1",
		relaxed: "gap-2",
		loose: "gap-4"
	};
</script>

<div class={["flex items-center", spacingClasses[spacing], rest.class]}>
	<span class={["iconify", icon, rest.iconClass]}></span>
	{@render children()}
</div>
