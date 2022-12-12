<script>
	export let blog;
	export let sport;
</script>
<a href={`/blog/${blog.slug}`} class="blog-card">
	<div class="blog">
		{#if blog.isPremium}
		<img src="/assets/icons/premium-blog.svg" alt="Blayze+ Blog" class="premium-badge">
		{/if}

		<img src={`/assets${blog.featured_image}`} alt="Blog Alt Tag" class="blog-img">

		<div>
			<h2 class="headline sm">{blog.title}</h2>
			<p class="excerpt">{blog.excerpt}</p>

			<div class="author-details">
				<img src={`/assets/images/coaches/placeholder.png`} alt="Coach Thumbnail" class="coach-thumbnail">
				<div>
					<p><strong>{blog.author}</strong></p>
					<p class="muted capitalize">{sport}</p>
				</div>
			</div>
		</div>

		<div class="card-bg"></div>
	</div>
</a>

<style>
	.blog {
		position: relative;

		padding: 0 2.4rem 2.4rem;
	}

	.premium-badge {
		position: absolute;
		top: 2.4rem;
		left: 2.4rem;

		width: 3rem;
	}

	.blog-card {
		display: none;
	}

	.blog-card:nth-child(1),
	.blog-card:nth-child(2),
	.blog-card:nth-child(3) {
		display: block;
	}

	.blog-img {
		width: 100%;
		height: calc((100vw - 8rem) / 1.9);

		object-fit: cover;
		border-radius: .8rem;

		margin-bottom: 1.6rem;
	}

	.featured .blog-img {
		border-radius: 2.4rem;
	}

	.headline.sm {
		margin-bottom: 1.8rem;
	}

	.card-bg {
		top: calc((100vw - 8rem) / 3.8);
	}

	.author-details {
		display: flex;
		grid-gap: .8rem;
		align-items: flex-start;

		margin-top: 1.6rem;
	}

	.coach-thumbnail {
		width: 4rem;
	}

	.author .muted {
		margin-top: .4rem;
	}

	@media screen and (min-width: 768px) {
		.blog {
			display: grid;
			grid-template-columns: 1fr 2fr;
			grid-gap: 2.4rem;

			padding: 1.6rem;
		}

		.blog-img {
			height: auto;

			margin-bottom: 0;
		}

		.card-bg {
			top: 0;
		}

		.content {
			display: flex;
			flex-direction: column;
		}

		.headline.sm {
			font-size: 1.8rem;
		}

		.excerpt {
			display: none;
		}

		.author-details {
			margin-top: auto;
		}
	}
</style>