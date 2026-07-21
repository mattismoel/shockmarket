<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { page } from "$app/state";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render navbar()}
{@render children()}

{#snippet navbar()}
	<nav class="flex justify-between px-8 items-center fixed text-white w-full">
		<a href="/" class="font-black">SHOCKMARKET</a>

		<ul class="flex">
			{@render navEntry("/stocks", "Stocks")}
			{@render navEntry("/about", "About")}
		</ul>
	</nav>
{/snippet}

{#snippet navEntry(href: string, name: string)}
	{@const isActive = page.url.pathname === href}
	<li><a class={["px-4 py-4 inline-flex", isActive && "font-medium"]} {href}>{name}</a></li>
{/snippet}
