<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="fixed top-0 left-0 w-full bg-linear-to-b from-black/80">
	<nav class="flex items-center justify-between px-8">
		<a href="/" class="py-6 font-heading font-bold text-text-light">SHOCK MARKET</a>

		<ul>
			{@render entry('/stocks', 'Trending')}
		</ul>
	</nav>
</header>

{@render children()}

{#snippet entry(href: string, name: string)}
	{@const isCurrent = page.url.pathname === href}

	<li class="inline-flex">
		<a class={['px-8 py-4', isCurrent && 'font-semibold text-text-light']} {href}>{name}</a>
	</li>
{/snippet}
