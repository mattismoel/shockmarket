<script lang="ts">
	import type { ButtonProps } from './button';

	let { children, ...rest }: ButtonProps = $props();
</script>

<svelte:element
	this={rest.href ? 'a' : 'button'}
	{...rest}
	class={[
		'flex w-fit items-center justify-center gap-2 bg-foreground px-8 py-2 text-background transition-colors hover:bg-foreground hover:text-background disabled:bg-foreground/10 disabled:text-inherit',
		rest.class
	]}
>
	{@render children?.()}
</svelte:element>
