<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { premiumUser } from '../../../stores/premiumPaywall';
	import NewsletterForm from '$lib/shared/NewsletterForm.svelte';
	import PlusDialogPopup from '$lib/blog/PlusDialog.svelte';
	import BlogAuthor from '$lib/blog/AuthorSection.svelte';
	import RelatedBlogs from '$lib/blog/RelatedBlogs.svelte';

	let initialized = false;

	onMount(() => {
		setVideoLinks();
		checkSccaTag();
		checkExternalLinks();
		loadNewsletters();

		initialized = true;
	});

	onDestroy(() => {
		if (initialized) {
			document.getElementsByTagName('header')[0].classList.remove('scrolled');
		}
	});

	import Hls from 'hls.js';

	function setVideoLinks() {
		let instances = document.querySelectorAll('.mux-video');
		var hslSource = null;

		instances.forEach((instance) => {
			var source = instance.querySelector('source');

			if (source.src.indexOf('.m3u8') > -1) {
				hslSource = source.src;
			}

			if (hslSource !== null && Hls.isSupported()) {
				var hls = new Hls();
				hls.loadSource(hslSource);
				hls.attachMedia(instance);
				hls.on(Hls.Events.MANIFEST_PARSED, function () {
				});
			}
		});
	}

	function checkSccaTag() {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());

		if (
			isPremium &&
			!$premiumUser &&
			tag === 'scca' &&
			params.wherefrom &&
			params.wherefrom === 'sccasupertourmember'
		) {
			// comingFromSCCA = true;
			plusDialogRevealed = false;
		}
	}

	function checkExternalLinks() {
		let links = blogContent.querySelectorAll('a');
		links.forEach(function (link) {
			let url = link.href;
			if (!url.includes('blayze.io')) {
				link.setAttribute('target', '_blank');
			} else {
				link.removeAttribute('rel');
			}
		});
	}

	export let title;
	export let featured_image;
	export let meta_description;
	export let author;
	export let date;
	export let sport;
	export let isPremium;
	export let category;
	export let tag;
	export let slug;
	export let newsletterID;
	export let hasTwitterEmbed;
	export let hasTiktokEmbed;
	let authorBanner;
	let authorDetails;
	let posY;
	let lastPos = 0;

	function loadNewsletters() {
		console.log( category, newsletterID );
		if (category.includes('newsletter') && newsletterID) {
			new Promise((resolve, reject) => {
				const script = document.createElement('script');

				script.setAttribute('src', 'https://racers360.activehosted.com/f/embed.php?id=' + newsletterID);
				script.addEventListener('load', resolve);
				script.addEventListener('error', reject);

				console.log( 'Added' );

				document.body.appendChild(script);
			});
		}

		if (category.includes('newsletter') && hasTwitterEmbed) {
			new Promise((resolve, reject) => {
				const script = document.createElement('script');
			
				script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
				script.addEventListener('load', resolve);
				script.addEventListener('error', reject);
			
				document.body.appendChild(script);
			});
		}

		if (hasTiktokEmbed) {
			console.log('hi');
			new Promise((resolve, reject) => {
				const script = document.createElement('script');
			
				script.setAttribute('src', 'https://www.tiktok.com/embed.js');
				script.addEventListener('load', resolve);
				script.addEventListener('error', reject);
			
				document.body.appendChild(script);
			});
		}
	}

	function toggleNavbar() {
		if (initialized) {
			if (posY > lastPos) {
				document.getElementsByTagName('header')[0].classList.add('scrolled');
			} else {
				document.getElementsByTagName('header')[0].classList.remove('scrolled');
			}
			lastPos = posY <= 0 ? 0 : posY;
		}

		if (!author.startsWith('Blayze')) {
			if (posY > 100 && posY < authorDetails.offsetTop - window.innerHeight) {
				authorBanner.classList.add('visible');
			} else {
				if (authorBanner && authorBanner.classList.contains('visible')) {
					authorBanner.classList.remove('visible');
				}
			}
		}
	}

	if (Array.isArray(category) && category.length > 1) {
		category = category[0];
	}

	$: posY, toggleNavbar();

	let blogContent;
	let plusDialogRevealed = false;

	if (isPremium && !$premiumUser && !$page.url.search.includes('premium=true')) {
		plusDialogRevealed = true;
	}

	const dateFormattingOptions = { year: 'numeric', month: 'long', day: 'numeric' };

	import '../../../css/blog.css';

	let authorSlug = author.replace(/\s+/g, '-').toLowerCase();
</script>

<svelte:head>
	<title>{title} | Blayze</title>
	<meta name="description" content={`${meta_description}`} />
	<meta property="og:image" content={`https://blayze.io/assets${featured_image}`} />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
</svelte:head>

<!-- For taking the navbar out of view -->
<svelte:window bind:scrollY={posY} />

<section>
	<div class="container">
		{#if !plusDialogRevealed}
			<div class="blog-hero">
				<p class="muted">{new Date(date).toLocaleDateString(undefined, dateFormattingOptions)}</p>
				<h1>{title}</h1>
				<div class="hero-bottom">
					<div class="author-details">
						<img
							src={`/assets/images/coaches/${author.replace(/\s+/g, '-').toLowerCase()}.png`}
							alt="Coach Thumbnail"
							class="coach-thumbnail"
							id={authorSlug}
						/>
						<div>
							<p><strong>{author}</strong></p>
							<p class="muted capitalize">{sport[0]}</p>
						</div>
					</div>

					<div class="social-media-icons">
						<a
							target="_blank"
							href={`https://facebook.com/sharer/sharer.php?u=https://blayze.io/blog/${slug}/&quote=${meta_description}`}
						>
							<img src="/assets/icons/facebook.svg" alt="Share on Facebook" />
						</a>
						<a
							target="_blank"
							href={`https://twitter.com/intent/tweet?url=https://blayze.io/blog/${slug}&text=${meta_description}`}
						>
							<img src="/assets/icons/twitter.svg" alt="Share on Twitter" />
						</a>
						<a
							target="_blank"
							href={`https://www.pinterest.com/pin/create/button/?url=https://blayze.io/blog/${slug}/&media=https://blayze.io/assets${featured_image}&description=${meta_description}`}
						>
							<img src="/assets/icons/pinterest.svg" alt="Share on Pinteres" />
						</a>
					</div>
				</div>

				{#if category != 'newsletter'}
					<img src={`/assets${featured_image}`} alt={`${title} Image`} class="blog-img" />
				{/if}
			</div>

			<div class="blog-content" bind:this={blogContent}>
				<slot />
			</div>

			{#if !author.startsWith('Blayze')}
				<div class="author-banner" bind:this={authorBanner}>
					<div class="container">
						<div class="author-details">
							<img
								src={`/assets/images/coaches/${author.replace(/\s+/g, '-').toLowerCase()}.png`}
								alt="Coach Thumbnail"
								class="coach-thumbnail"
							/>
							<div>
								<h3 class="headline sm">Enjoying {author}'s post?</h3>
								<p class="muted">Take your game to the next level by working 1:1 with them.</p>
							</div>
						</div>

						<div class="buttons">
							<a href={`/coach/${authorSlug}`}>
								<div class="button primary">Learn More</div>
							</a>

							<div class="close-button" on:click={() => authorBanner.classList.add('out-of-view')}>
								<svg
									width="48"
									height="48"
									viewBox="0 0 48 48"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M0 24C0 10.7452 10.7452 0 24 0V0C37.2548 0 48 10.7452 48 24V24C48 37.2548 37.2548 48 24 48V48C10.7452 48 0 37.2548 0 24V24Z"
										fill="#BDBDBD"
									/>
									<path
										d="M31 18.41L29.59 17L24 22.59L18.41 17L17 18.41L22.59 24L17 29.59L18.41 31L24 25.41L29.59 31L31 29.59L25.41 24L31 18.41Z"
										fill="black"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div bind:this={authorDetails}>
					<BlogAuthor {author} />
				</div>
			{/if}
			<RelatedBlogs title="Related articles" sport={sport[0]} {category} length="4" />
		{:else}
		<div class="no-access"></div>
		<PlusDialogPopup blogSlug={slug} bind:popupRevealed={plusDialogRevealed} calledFrom="blog" />
		{/if}
	</div>
</section>

<NewsletterForm />

<style>
	section {
		padding: 6rem 0;
	}

	.blog-content {
		padding-bottom: 5.6rem;
		margin-bottom: 5.6rem;

		border-bottom: 0.1rem solid var(--light-gray-color);
	}

	.blog-hero {
		border-bottom: 0.1rem solid var(--light-gray-color);
		padding-bottom: 4.8rem;
		margin-bottom: 4.8rem;
	}

	.blog-img {
		width: 100%;

		border-radius: 1.6rem;
	}

	h1 {
		font-size: 3rem;
		font-weight: 500;
		letter-spacing: -0.08rem;

		margin-top: 0.8rem;
		margin-bottom: 1.6rem;
	}

	.author-details {
		display: flex;

		margin-bottom: 1.2rem;
	}

	.coach-thumbnail {
		width: 4.8rem;
		height: 4.8rem;

		margin-right: 0.8rem;
	}

	.blog-metadata {
		display: flex;
		align-items: center;

		margin-top: 2.4rem;
		padding: 1.2rem 0;

		color: var(--gray-color);

		border-top: 0.1rem solid var(--light-gray-color);
		border-bottom: 0.1rem solid var(--light-gray-color);
	}

	.blog-metadata p {
		font-size: 1.4rem;

		margin-bottom: 0;
	}

	.author-name {
		padding-bottom: 0.3rem;
		border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);

		transition: all 0.24s ease-in-out;
		transform: translate3d(0, 0.2rem, 0);

		cursor: pointer;
	}

	.author-name:hover {
		color: var(--gold-color);
		border-bottom-color: var(--gold-color);
	}

	.circle-divider {
		width: 0.4rem;
		height: 0.4rem;

		margin: 0 0.8rem;

		border-radius: 100%;
		background-color: var(--primary-color);
	}

	.author-banner {
		position: fixed;
		bottom: 0;
		left: 0;

		width: 100vw;

		padding: 2.4rem 0;

		background: #eee;

		transform: translate3d(0, 100%, 0);
		transition: transform 0.36s ease-in-out;

		z-index: 9999999999;
	}

	.close-button {
		cursor: pointer;
	}

	:global(.author-banner.visible) {
		transform: translate3d(0, 0%, 0) !important;
	}

	:global(.author-banner.out-of-view) {
		transform: translate3d(0, 100%, 0) !important;
	}

	.author-banner .container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		padding-top: 0;
	}

	.author-banner .author-details {
		margin-bottom: 0;
	}

	.author-banner .author-details .headline {
		margin-bottom: 0.4rem;
	}

	.buttons {
		display: flex;

		width: 100%;

		margin-top: 0.8rem;
	}

	.buttons a {
		flex: 1;

		margin-right: 2.4rem;
	}

	.hero-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;

		margin-bottom: 1.6rem;
	}

	.author-banner .headline.sm {
		font-size: 1.8rem;
	}

	.desktop-hidden {
		display: initial;
	}

	.coach-thumbnail#blayze-newsletter {
		border-radius: 100%;
	}

	@media screen and (min-width: 768px) {
		.blog-hero {
			grid-template-columns: minmax(360px, 1fr) 1.4fr;
		}

		.author-banner .container {
			flex-direction: row;
		}

		.buttons {
			width: auto;

			margin-top: 0;
		}

		.author-banner .headline.sm {
			font-size: 2rem;
		}

		.desktop-hidden {
			display: none;
		}
	}
</style>