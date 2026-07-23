<script>
	import Button from "$lib/components/Button.svelte";
	import Title from "$lib/components/Title.svelte";

	import Lockheed from "$lib/videos/lockheed.webm";
</script>

<video
	src={Lockheed}
	class="fixed -z-10 h-full w-full object-cover brightness-50"
	muted
	autoplay
	loop
>
	<track kind="captions" />
</video>

<main class="mx-responsive grid">
	<header class="flex h-svh flex-col justify-center">
		<div class="flex flex-col items-center sm:items-start">
			<Title size="lg">SHOCKMARKET</Title>

			<p class="mb-8 text-center sm:text-left">
				Your Stock Exchange Market Site viewed through a critical lense.
			</p>

			<div class="flex w-full flex-col-reverse gap-2 sm:flex-row">
				<Button variant="secondary" href="/about">Read More</Button>
				<Button href="/stocks">Buy Stocks</Button>
			</div>
		</div>
	</header>
</main>
