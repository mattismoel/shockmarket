<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

	type Variant = "primary" | "secondary";

	type BaseProps = {
		variant?: Variant;
	};

	type ButtonProps = HTMLButtonAttributes & {
		href?: never;
	};

	type LinkButtonProps = HTMLAnchorAttributes & {
		href: string;
	};

	type Props = BaseProps & (ButtonProps | LinkButtonProps);

	let { variant = "primary", ...rest }: Props = $props();

	let variantClasses: Record<Variant, string> = {
		primary: "bg-primary text-zinc-900 font-medium border-primary hover:bg-zinc-300",
		secondary: "bg-primary/20 border-primary/20 hover:text-text-light"
	};
</script>

<svelte:element
	this={rest.href ? "a" : "button"}
	{...rest}
	class={[
		"flex justify-center rounded-full border px-8 py-2 transition-colors duration-100",
		variantClasses[variant],
		rest.class
	]}
>
	{@render rest.children?.()}
</svelte:element>
