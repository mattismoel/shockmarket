<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { page } from "$app/state";
	import Title from "$lib/components/Title.svelte";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render navbar()}

<div class="grid min-h-svh">
	{@render children()}
</div>

{@render footer()}

{#snippet navbar()}
	<nav class="fixed z-100 flex w-full items-center justify-between px-8 text-white">
		<a href="/" class="font-black">SHOCKMARKET</a>

		<ul class="flex">
			{@render navEntry("/stocks", "Stocks")}
			{@render navEntry("/about", "About")}
		</ul>
	</nav>
{/snippet}

{#snippet navEntry(href: string, name: string)}
	{@const isActive = page.url.pathname === href}
	<li><a class={["inline-flex px-4 py-4", isActive && "font-medium"]} {href}>{name}</a></li>
{/snippet}

{#snippet footer()}
	{@const year = new Date().getFullYear()}

	<footer class={["border-t border-zinc-900 bg-zinc-950"]}>
		<div class="mx-responsive py-8">
			<a href="/">
				<Title>SHOCKMARKET</Title>
			</a>

			<ul>
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/stocks">Stocks</a>
				</li>
				<li>
					<a href="/about">About</a>
				</li>
			</ul>

			<div class="text-center text-xs text-text/50">
				&copy;&nbsp;{year}&nbsp; Mattis Møl Kristensen,&nbsp; All Rights Reserved
			</div>
		</div>
	</footer>
{/snippet}
