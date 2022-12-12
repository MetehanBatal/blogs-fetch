<script>
	import NewsletterForm from '$lib/shared/NewsletterForm.svelte';
	import RelatedBlogs from '$lib/blog/RelatedBlogs.svelte';
	import { premiumUser } from '../../../stores/premiumPaywall';
	import PlusDialogPopup from '$lib/blog/PlusDialog.svelte';
	import BlogAuthor from '$lib/blog/AuthorSection.svelte';

	import { onMount } from 'svelte';
	onMount(() => {
		setVideoLinks();
		checkSccaTag();

		checkPremium();
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

	export let title;
	export let author;
	export let tracks;
	export let category;
	export let isPremium;
	export let tag;
	export let date;
	export let sport;
	export let slug;

	let currentTrack = 0;
	let selectedLogin = false;
	let popupRevealed = false;
	let videoPlayer;
	export let featured_image;
	export let excerpt;
	export let meta_description;

	let notPremium = false;

	if (isPremium && !$premiumUser) {
		notPremium = true;
	}

	function changeTrack(id) {
		currentTrack = id;

		videoPlayer.pause();

		setTimeout(() => {
			setVideoLinks();
			videoPlayer.load();
		}, 240);
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
			notPremium = false;
			setTimeout(() => {
				setVideoLinks();
			}, 200);
		}
	}

	function checkPremium() {
		if (notPremium) {
			videoPlayer.addEventListener('timeupdate', (event) => {
				if (videoPlayer.currentTime > 120) {
					videoPlayer.pause();
					videoPlayer.parentNode.classList.add('video-on-pause');
					popupRevealed = true;
				}
			});
		}
	}

	//videoPlayer.addEventListener('timeupdate', (event) => {
	
	//});

	//$: currentTrack

	//const dateFormattingOptions = { year: 'numeric', month: 'short', day: 'numeric' };

	//import '../../../css/blog.css';

	const dateFormattingOptions = { year: 'numeric', month: 'long', day: 'numeric' };

	let authorSlug = author.replace(/\s+/g, '-').toLowerCase();
</script>

<svelte:head>
	<title>{title} | Blayze</title>
	<meta name="description" content={`${meta_description}`} />
	<meta property="og:image" content={`https://blayze.io/assets${featured_image}`} />
</svelte:head>

<section>
	<div class="container">
		<div class="blog-hero">
			<p class="muted">{new Date(date).toLocaleDateString(undefined, dateFormattingOptions)}</p>
			<h1>{title}</h1>
			<div class="author-details">
				<img
					src={`/assets/images/coaches/${author.replace(/\s+/g, '-').toLowerCase()}.png`}
					alt="Coach Thumbnail"
					class="coach-thumbnail"
				/>
				<div>
					<p><strong>{author}</strong></p>
					<p class="muted capitalize">{sport[0]}</p>
				</div>
			</div>
		</div>

		<div class="video-content">
			<div class="video-holder">
				<div class="video">
					<video
						class="mux-video"
						bind:this={videoPlayer}
						id="player"
						poster="https://image.mux.com/{tracks[currentTrack].playback_id}/thumbnail.png?time=80"
						crossorigin
						autoplay
						playsinline
						controls
					>
						<source
							src="https://stream.mux.com/{tracks[currentTrack].playback_id}.m3u8"
							type="video/mp4"
						/>
					</video>
				</div>

				<div class="lesson-description">
					<slot />
					<!-- <h2 class="headline">{tracks[currentTrack].lesson_name}</h2> -->
				</div>

				{#if notPremium}
					<div class="desktop-hidden">
						<p class="full-access-text">
							To access the full course, please log in or subscribe to Blayze+.
						</p>
						<div class="buttons">
							<div class="button secondary" on:click={() => (selectedLogin = true)}>Login</div>
							<div class="button primary" on:click={() => (window.location.href = '/blayze-plus')}>
								Subscribe
							</div>
						</div>
					</div>
				{/if}
			</div>

			<div class="course-details">
				<div class="column">
					<div class="column-heading">
						<p>Overview</p>
					</div>

					<div class="muted">
						<p>{@html tracks[currentTrack].lesson_desc}</p>
					</div>

					{#if notPremium}
						<div class="mobile-hidden">
							<p class="full-access-text">
								To access the full course, please log in or subscribe to Blayze+.
							</p>
							<div class="buttons">
								<div class="button secondary" on:click={() => (selectedLogin = true)}>Login</div>
								<div
									class="button primary"
									on:click={() => (window.location.href = '/blayze-plus')}
								>
									Subscribe
								</div>
							</div>
						</div>
					{/if}
				</div>

				<div class="column">
					<div class="column-heading">
						<p>Outline</p>
						<p>{tracks.length} lessons</p>
					</div>
					<ul class="chapters-list">
						{#each tracks as track}
							<li class="chapter" on:click={(event) => changeTrack(track.track_id)}>
								<img
									src="https://image.mux.com/{track.playback_id}/thumbnail.png?time=79"
									alt="Chapter Image"
								/>
								<h4 class="headline sm">{track.lesson_name}</h4>
							</li>
						{/each}

						{#if tracks.length > 2}
							<div class="overlay" />
						{/if}
					</ul>
				</div>
			</div>
		</div>

		<BlogAuthor {author} />

		<!-- <RelatedBlogs title="Related courses" {category} /> -->
	</div>

	{#if selectedLogin}
		<PlusDialogPopup blogSlug={slug} directToLogin="true" />
	{/if}

	{#if popupRevealed}
		<PlusDialogPopup blogSlug={slug} />
	{/if}
</section>

<NewsletterForm />

<style>
	h1 {
		font-size: 3rem;
		font-weight: 500;
		letter-spacing: -0.08rem;
		margin-top: 0.8rem;
		margin-bottom: 1.6rem;
	}
	.no-access {
		background-color: #000;
		height: 72vh;
	}
	section {
		/*background-color: #000;
		color: #fff;*/

		border-bottom: 0.1rem solid var(--gray-color);
	}

	.container {
		padding-top: 8rem;
		padding-bottom: 8rem;
	}

	.video-content {
		display: grid;
		grid-column-gap: 4.8rem;
	}

	.video-holder {
		display: flex;
		flex-direction: column;

		padding-bottom: 1.6rem;
		margin-bottom: 4.8rem;

		border-bottom: 0.1rem solid #bdbdbd;
	}

	.video {
		width: 100%;

		background-color: var(--gold-color);
	}

	.mux-video {
		max-width: 100%;

		vertical-align: bottom;
	}

	.lesson-description {
		flex: 1;

		padding: 3.2rem 0;
	}

	.author-details {
		display: flex;
		align-items: center;

		grid-gap: 1.2rem;

		margin-bottom: 1.8rem;
	}

	.author-details img {
		width: 6rem;
	}

	.chapters-list {
		display: flex;
		flex-direction: column;
		grid-gap: 1.2rem;

		max-height: 36rem;

		overflow: auto;

		margin-top: 2.4rem;
	}

	.chapters-list::placeholder {
		color: var(--gold-color);
	}

	.chapter {
		display: grid;
		grid-template-columns: 0.6fr 0.4fr;
		grid-gap: 1.2rem;
		align-items: center;

		cursor: pointer;
	}

	.chapter img {
		border-radius: 0.8rem;
	}

	.chapter .headline {
		font-size: 1.4rem;
		margin-bottom: 0;
	}

	.overlay {
		position: sticky;
		bottom: -0.2rem;

		width: 100%;
		min-height: 3.6rem;

		background: linear-gradient(0deg, #fff, transparent);
	}

	.course-details {
		margin-bottom: 4rem;
	}

	.column:last-child {
		position: sticky;
		top: 9rem;
	}

	.column:first-child {
		margin-bottom: 4rem;
	}

	.column:first-child .muted {
		margin-top: 1.6rem;
		margin-bottom: 4rem;
	}

	.column-heading {
		display: flex;
		justify-content: space-between;

		padding-bottom: 0.4rem;
		border-bottom: 0.2rem solid #bdbdbd;
	}

	:global(.video.video-on-pause) {
		filter: blur(0.1rem);
		opacity: 0.92;

		pointer-events: none;
	}

	.full-access-text {
		font-weight: 500;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		grid-gap: 0.8rem;

		margin-top: 3rem;
	}

	.buttons div {
		width: 100%;
	}

	.column .muted {
		margin-top: 1.2rem;
	}

	@media screen and (min-width: 768px) {
		.container {
			padding-top: 16rem;
		}

		.course-details {
			margin-bottom: 0;
		}

		.video-content {
			grid-template-columns: 1fr 32rem;
		}
	}
</style>
