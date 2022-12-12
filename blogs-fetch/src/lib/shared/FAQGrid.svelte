<script>
	import { sportSelection } from '../../stores/sports';
	import { faqs } from "../../stores/faq";
	import FAQItem from "$lib/shared/FAQItem.svelte";
</script>

<section class="container pb">
	<h2 class="headline">Frequently asked questions</h2>
	<ul class="faq-list">
		<!-- {$sportSelection}
		{JSON.stringify(faqs).$sportSelection} -->
		{#if $sportSelection}
			{#each faqs[$sportSelection] as faq}
			<FAQItem
				question={faq.question}
				answer={faq.answer}
			/>
			{/each}
		{:else}
			{#each faqs["SUP"] as faq}
			<FAQItem
				question={faq.question}
				answer={faq.answer}
			/>
			{/each}
		{/if}
	</ul>

	<!-- <div class="button secondary">Visit Help Center</div> -->
</section>


<style>
	.button {
		max-width: 36rem;

		margin: 3.2rem auto 0;
	}
</style>