<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { premiumUser } from '../../stores/premiumPaywall';
	import PlusDialogPopup from '$lib/blog/PlusDialog.svelte';
	import lozad from 'lozad';
	
	export let blog;
	let plusDialogRevealed = false;
	let slug = `/blog/${blog.slug}`;

	function checkPremium(blog) {
		if (blog.isPremium && !$premiumUser) {
			event.preventDefault();

			plusDialogRevealed = true;
			document.querySelector('.swiper-wrapper').style.transform = 'unset';
		} else {
			goto(slug);
		}
	}

	onMount(() => {
		const observer = lozad();
		observer.observe();
	})
</script>
{#if blog.tag != "mazda"}
<div class="blog-card swiper-slide" on:click={(event) => checkPremium(blog)}>
	{#if blog.isPremium}
	<img data-src="/assets/icons/premium-blog.svg" alt="Blayze+ Blog" class="premium-badge lozad">
	{/if}

	<img data-src={`/assets${blog.featured_image}`} alt="Blog Thumbnail" class="blog-thumbnail lozad">

	<div class="card-details">
		<h5 class="headline sm">{blog.title}</h5>

		<div class="author">
			<img data-src={`/assets/images/coaches/${blog.author.replace(/\s+/g, '-').toLowerCase()}.png`} alt="Coach Thumbnail" class="coach-thumbnail lozad">
			<div>
				 <p><strong>{blog.author}</strong></p>
				<p class="muted">{blog.sport[0]}</p>
			</div>
		</div>
	</div>
</div>
{/if}

{#if plusDialogRevealed}
<PlusDialogPopup blogSlug={slug} bind:popupRevealed={plusDialogRevealed} />
{/if}

<style>
	.blog-card {
		display: flex;
		flex-direction: column;

		height: auto;

		position: relative;

		border-radius: .8rem;
		overflow: hidden;

		box-shadow: 0 .1rem .2rem rgba(0, 0, 0, .15);
	}

	.premium-badge {
		position: absolute;
		top: .8rem;
		left: .8rem;
	}

	.blog-thumbnail {
		width: 100%;
		object-fit: cover;
	}

	.card-details {
		display: flex;
		flex-direction: column;
		flex: 1;

		padding: 1.2rem;
	}

	.card-details .headline.sm {
		font-size: 1.6rem;
	}

	.author {
		display: flex;
		grid-gap: .8rem;
		align-items: flex-start;

		margin-top: auto;
	}

	.coach-thumbnail {
		width: 4rem;
	}

	.author .muted {
		text-transform: capitalize;
		margin-top: .4rem;
	}
</style>