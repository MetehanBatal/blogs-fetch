<script>
	export let testimonial;
	export let author;
	export let sport;
</script>

<section class="gray-section">
	<div class="container psm">
		<h2 class="headline"><span class="quote-icon">“</span>{@html testimonial}<span class="quote-icon">”</span></h2>
		<p><strong>{author}</strong></p>
		<p class="muted">{sport}</p>
	</div>
</section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.headline {
		text-align: center;
	}

	.quote-icon {
		font-weight: 500;
		font-size: 3.2rem;
		line-height: 1.3;
		letter-spacing: -0.024rem;
		margin-right: .8rem;

		color: var(--gold-color);
	}

	.quote-icon:last-child {
		margin-left: .8rem;
		margin-right: 0;
	}
</style>