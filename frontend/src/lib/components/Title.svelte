<script lang="ts">
	import type { ClassValue } from "clsx";
	import type { Snippet } from "svelte";

	type Size = "sm" | "md" | "lg";

	type Props = {
		children: Snippet<[]>;
		class?: ClassValue;
		size?: Size;
	};

	let { size = "md", ...rest }: Props = $props();

	let sizeClasses: Record<Size, string> = {
		sm: "text-normal mb-2",
		md: "text-2xl mb-2",
		lg: "text-4xl mb-4 sm:text-6xl"
	};
</script>

<h1 class={["font-heading font-black text-text-light", sizeClasses[size], rest.class]}>
	{@render rest.children()}
</h1>
