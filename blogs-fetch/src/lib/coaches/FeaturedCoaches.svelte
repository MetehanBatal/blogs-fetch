<script>
	import CoachCard from "$lib/coaches/CoachCard.svelte";
</script>

<section class="container">
	<div class="coaches-box">
		<div class="headline-box">
			<h2 class="headline">Popular coaches</h2>
		</div>

		<div class="coach-grid featured">
			<CoachCard />
		</div>

		<a href="/coaches">
			<div class="cta-button">View All Coaches</div>
		</a>
	</div>
</section>

<style>
	.coaches-box {
		margin-bottom: 4.8rem;
	}

	.coach-grid {
		display: flex;
		flex-wrap: wrap;
		grid-gap: 2.4rem;
	}

	.cta-button {
		max-width: 36rem;

		margin: 3.2rem auto 0;
	}

	@media screen and (min-width: 768px) {
		.coaches-box {
			margin-bottom: 8rem;
		}
	}
</style>