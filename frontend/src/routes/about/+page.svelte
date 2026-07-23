<script lang="ts">
	import EthicsMeter from "$lib/components/EthicsMeter.svelte";
	import Paragraph from "$lib/components/Paragraph.svelte";
	import Title from "$lib/components/Title.svelte";
</script>

<main class="mx-responsive grid h-fit gap-16 py-32">
	<section>
		<Title>The Project</Title>

		<Paragraph>
			This project is aimed at sparking awareness of the ethical consequenses of investing in
			certain types of stocks. By forcing you to see the damage of your action, you are also forced
			to take responsibility of where you put your money.
			<br />
			<br />
			Today we are easily disconnected from the consequences of our actions. Everything is only a couple
			of clicks away, but these simple actions can have huge ethical impacts on the world around us. Here
			we slow down, think about our actions before succumbing for easy money.
		</Paragraph>
	</section>

	<section>
		<Title>The Ethics Rating</Title>

		<Paragraph class="mb-16">
			On each of the stocks you will see the following <i>Ethics&nbsp;Meter</i> with an
			<i>Ethics&nbsp;Rating</i>.
		</Paragraph>

		<div class="mb-16 flex justify-center">
			<EthicsMeter active={true} rating={0.64} />
		</div>

		<Paragraph>
			This rating is based on three primary parameters: <i>Climate, Health and Human Rights</i>.
			Each stock has a set of <i>Ethics Impacts</i>, each having a set of ratings these parameters.
			The ratings range from -1 to 1, <i>Extremely Unethical</i> to
			<i>Extremely Ethical</i>. The final rating is the average of these impact's average parameter
			score.
		</Paragraph>
	</section>

	<section>
		<Title>The Stock Data</Title>

		<Paragraph>
			The data used for the stocks are completely made-up for the purpose of the art. They are not
			to be taken as fact by any means.
		</Paragraph>
	</section>
</main>
