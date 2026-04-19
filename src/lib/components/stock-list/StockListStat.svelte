<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet<[]>;
		class?: string;
	};

	let { children, ...rest }: Props = $props();
</script>

<li class={['flex items-center gap-2', rest.class]}>
	{@render children()}
</li>
