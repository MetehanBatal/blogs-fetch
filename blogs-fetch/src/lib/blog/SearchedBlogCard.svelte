<script>
	// import lozad from 'lozad';
	import { page } from '$app/stores'
	import { onMount } from 'svelte';
	import { premiumUser } from '../../stores/premiumPaywall';
	// import Cookies from 'js-cookie';

	import { goto } from '$app/navigation';
	import PlusDialogPopup from '$lib/blog/PlusDialog.svelte';
	// import lozad from 'lozad';

	export let blog;
	export let featured;
	export let sport;
	export let slider;

	let slug = '';
	
	if (sport === 'all') {
		slug = `/blog/${blog.sport[0].replace(/\s+/g, '-').toLowerCase()}/${blog.slug}`;
	} else {
		slug = `/blog/${sport.replace(/\s+/g, '-').toLowerCase()}/${blog.slug}`;
	}

	let plusDialogRevealed = false;
	let toggledCategory;

	$: plusDialogRevealed, checkDialogStatus();
	function checkDialogStatus() {
		if (!plusDialogRevealed && toggledCategory) {
			toggledCategory.classList.remove('no-transform');
		}
	}

	function checkPremium(event, blog) {
		if (blog.isPremium && !$premiumUser && blog.layout != 'video' && !$page.url.search.includes('premium=true')) {
			event.preventDefault();

			plusDialogRevealed = true;

			toggledCategory = event.target.closest('.swiper-wrapper');
			toggledCategory.classList.add('no-transform');
		} else {
			if (sport === 'all') {
				slug = `/blog/${blog.sport[0].replace(/\s+/g, '-').toLowerCase()}/${blog.slug}`;
			} else {
				slug = `/blog/${sport.replace(/\s+/g, '-').toLowerCase()}/${blog.slug}`;	
			}
			goto(slug);
		}
	}

	onMount(() => {
		// const observer = lozad();
		// observer.observe();
		// const observer = lozad();
		// observer.observe();
	});

	let authorSlug = blog.author.replace(/\s+/g, '-').toLowerCase();
</script>

{#if blog.tag != 'mazda'}
	<div
		class="blog-card"
		class:swiper-slide={slider === 'true'}
		on:click={(event) => checkPremium(event, blog)}
	>
		<!-- <div class:featured={featured === 'true'}> -->
		<div class="blog">
			<div class="relative">
				{#if blog.isPremium}
					<div class="premium-badge">
						<img src="/assets/icons/blayze-premium-badge.svg" alt="Premium Badge" />
						<p>Blayze+ content</p>
					</div>
					<!-- <img src="/assets/icons/premium-blog.svg" alt="Blayze+ Blog" class="premium-badge"> -->
				{/if}
				<img src={`/assets${blog.featured_image}`} alt="Blog Alt Tag" class="blog-img" />
			</div>

			<div class="content">
				<h2 class="headline sm">{blog.meta_title}</h2>

				<!-- <p class="excerpt">{@html blog.excerpt}</p> -->

				<div class="card-bottom">
					<div class="author-details">
						<img
							src={`/assets/images/coaches/${blog.author.replace(/\s+/g, '-').toLowerCase()}.png`}
							alt="Coach Thumbnail"
							class="coach-thumbnail"
						/>
						<div>
							<p><strong>{blog.author}</strong></p>
							<p class="muted capitalize">{blog.sport[0]}</p>
						</div>
					</div>

					<div class="social-media-icons">
						<a
							target="_blank"
							href={`https://facebook.com/sharer/sharer.php?u=https://blayze.io/blog/${blog.slug}/&quote=${blog.meta_description}`}
						>
							<img src="/assets/icons/facebook.svg" alt="Share on Facebook" />
						</a>
						<a
							target="_blank"
							href={`https://twitter.com/intent/tweet?url=https://blayze.io/blog/${blog.slug}&text=${blog.meta_description}`}
						>
							<img src="/assets/icons/twitter.svg" alt="Share on Twitter" />
						</a>
						<a
							target="_blank"
							href={`https://www.pinterest.com/pin/create/button/?url=https://blayze.io/blog/${blog.slug}/&media=https://blayze.io/assets${blog.featured_image}&description=${blog.meta_description}`}
						>
							<img src="/assets/icons/pinterest.svg" alt="Share on Pinterest" />
						</a>
					</div>
				</div>
			</div>
		</div>
		<!-- </div> -->
	</div>
{/if}

{#if plusDialogRevealed}
	<PlusDialogPopup blogSlug={slug} bind:popupRevealed={plusDialogRevealed} />
{/if}

<style>
	/*.blog-card {
		display: none;
	}*/

	.relative {
		position: relative;
	}

	.premium-badge {
		display: flex;
		align-items: center;
		grid-gap: .8rem;

		position: absolute;
		bottom: 0rem;
		left: 0rem;

		width: 100%;

		padding: 0.4rem 1.6rem;

		background-color: var(--primary-color);
		color: #fff;
	}

	.featured .premium-badge {
		position: absolute;
		top: 1.8rem;
		left: 2.4rem;
	}

	/*.blog-card:nth-child(1),
	.blog-card:nth-child(2),
	.blog-card:nth-child(3) {
		display: block;
	}*/

	.blog {
		display: flex;
		flex-direction: column;

		position: relative;

		background-color: #fff;
		box-shadow: 0 0.4rem 0.8rem rgba(117, 117, 117, 0.15);
		border-radius: 1.6rem;

		overflow: hidden;
	}

	.blog-img {
		width: 100%;
		height: calc((100vw - 8rem) / 1.9);

		object-fit: cover;
	}

	.headline.sm {
		font-weight: 400;
		letter-spacing: -0.01rem;
		margin-bottom: 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		grid-gap: 1.8rem;

		padding: 1.6rem;
	}

	.card-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.author-details {
		display: flex;
		grid-gap: 0.8rem;
		align-items: flex-start;
	}

	.coach-thumbnail {
		width: 4rem;
	}

	.author .muted {
		margin-top: 0.4rem;
	}

	:global(.swiper-wrapper.no-transform) {
		transform: none !important;
	}

	.social-media-icons {
		display: grid;
		grid-template-columns: repeat(3, 2.4rem);
		grid-gap: 0.6rem;
	}

	@media screen and (min-width: 768px) {
		.featured {
			height: 100%;
		}

		.featured .content {
			display: flex;
			flex-direction: column;
			flex: 1;
		}

		.featured .blog {
			display: flex;
			flex-direction: column;
			grid-gap: 0;

			height: 100%;
		}

		.featured .headline.sm {
			margin-top: auto;
		}

		.blog {
			height: 100%;
		}

		.content {
			flex: 1;
		}

		.blog-img {
			align-self: center;

			height: auto;
			/*margin: 0 .8rem;*/

			/*border-radius: .8rem;*/
		}

		.featured .blog-img {
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
		}

		.card-bg {
			top: 0;
		}

		.headline.sm {
			font-size: 1.8rem;
		}

		.excerpt {
			display: none;
		}

		.featured .excerpt {
			display: block;

			margin-bottom: 1.2rem;
		}

		.card-bottom {
			margin-top: auto;
			flex-direction: column;
		}

		.social-media-icons {
			grid-template-columns: repeat(3, 3.2rem);
		}
	}

	@media screen and (min-width: 940px) {
		.card-bottom {
			flex-direction: row;
		}
	}
</style>
