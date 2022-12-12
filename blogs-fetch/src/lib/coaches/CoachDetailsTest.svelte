<script>
	import Hls from 'hls.js';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import * as onboarding from './onboarding.svelte';
	import CoachReviews from '$lib/coaches/CoachReviews.svelte'
	import lozad from 'lozad';

	onMount(() => {
		reviseData();

		const observer = lozad();
		observer.observe();
	});

	function setVideoLink(el) {
		let instance = el;
		var hslSource = null;

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
	}

	let popupRevealed = false;
	// let video;
	let href;

	function togglePreviewPopup(event) {
		let videoURL = event.target.closest('.video-opener').getAttribute('data-video-url');

		popupRevealed = true;

		href = videoURL;

		setTimeout(function () {
			let video = document.querySelector('.preview-video');

			setVideoLink(video);
			video.play();
		}, 100);
	}

	export let data;
	export let reviews;

	let sports = [];
	data.forEach((sport) => {
		sports.push(sport.sportName);
	});

	let activeSport = sports[0];

	function handleSportChange(event) {
		const sportName = event.target.getAttribute('data-sport-name');
		activeSport = sportName;
	}

	$: activeSport, reviseData();

	let coachData = data.find((coachData) => coachData.sportName === activeSport);
	function reviseData() {
		coachData = data.find((coachData) => coachData.sportName === activeSport);
	}
</script>

<div class="coach-details-box container">
	<div class="details-bg" />

	<div class="coach-details">
		<img data-src={coachData.thumbnail} alt="Coach Thumbnail" class="coach-thumbnail lozad" />

		<h1 class="headline">{coachData.firstName} {coachData.lastName}</h1>
		<p class="muted">{coachData.excerpt}</p>

		{#if coachData.status === 'draft'}
			<div class="button muted">
				<img data-src="/assets/icons/coming-soon.svg" alt="Coming Soon" class="lozad" />

				Coming Soon
			</div>
		{:else}
			<div class="cta-button primary" on:click={() => onboarding.beMyCoach(coachData)}>
				<svg
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" />
				</svg>
				Be My Coach
			</div>
		{/if}

		<hr />

		<div class="coach-achievements-box">
			<div class="coach-videos">
				{#if coachData.selfieVideoId}
					<div class="coach-video">
						<h4 class="headline sm">Meet {coachData.firstName}</h4>

						<div
							data-video-url={coachData.selfieVideoId}
							class="video-opener"
							on:click={(event) => togglePreviewPopup(event)}
						>
							{#if coachData.selfieVideoId != '1EJxH005wrAVD86ILI5mRU6FwM8Uhv5fpC5YMz007SuFA'}
								<img src="https://image.mux.com/{coachData.selfieVideoId}/thumbnail.jpg?time=12" alt="Meet Video Thumbnail" class="video-thumbnail selfie-thumbnail lozad" id={coachData.firstName}/>
							{:else}
								<img
									data-src="https://image.mux.com/{coachData.selfieVideoId}/thumbnail.jpg?time=14"
									alt="Meet Video Thumbnail"
									class="video-thumbnail selfie-thumbnail lozad"
									id={coachData.firstName}
								/>
							{/if}
							<img src="/assets/icons/play.svg" alt="Play Button" class="play-icon" />
						</div>
					</div>
				{/if}

				{#if coachData.coachingVideoId}
					<div class="coach-video">
						<h4 class="headline sm">Coaching Preview</h4>

						<div
							data-video-url={coachData.coachingVideoId}
							class="video-opener"
							on:click={(event) => togglePreviewPopup(event)}
						>
							<img
								src="https://image.mux.com/{coachData.coachingVideoId}/thumbnail.jpg?time=24" alt="Meet Video Thumbnail" class="video-thumbnail"
							/>
							<img src="/assets/icons/play.svg" alt="Play Button" class="play-icon" />
						</div>
					</div>
				{/if}
			</div>

			<div class="coach-sport-details">
				{#if sports.length > 1}
					<ul class="coach-sports">
						{#each sports as sport}
							<li
								class={activeSport === sport ? 'coach-sport active' : 'coach-sport'}
								data-sport-name={sport}
								on:click={(event) => handleSportChange(event)}
							>
								{sport}
							</li>
						{/each}
					</ul>
				{/if}
				<ul class="coach-achievements">
					{#each coachData.achievements as achievement}
						<li class="coach-achievement">
							<img data-src={achievement.icon} alt="Achievement Icon" class="lozad" />
							<p>{achievement.description}</p>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		
		{#if reviews.length > 0}
		<CoachReviews reviews={reviews} />
		{/if}
	</div>
</div>

{#if popupRevealed}
	<div class="popup">
		<div class="popup-bg" on:click={(event) => (popupRevealed = false)} />

		<div class="video-box">
			<img
				src="/assets/icons/close.svg"
				alt="Close Popup Icon"
				on:click={(event) => (popupRevealed = false)}
			/>

			<video class="preview-video" controls>
				<source src="https://stream.mux.com/{href}.m3u8" type="video/mp4" />
			</video>
		</div>
	</div>
{/if}

<style>
	.coach-details-box {
		position: relative;

		padding: 4.8rem 2.4rem 2.4rem;
	}

	.details-bg {
		position: absolute;
		top: 10.8rem;
		bottom: 0;
		left: 0;
		right: 0;

		background-color: #eeeeee;
		border-radius: 1.6rem;
	}

	.coach-details {
		display: flex;
		flex-direction: column;
		align-items: center;

		position: relative;

		width: 100%;
	}

	.coach-thumbnail {
		width: 12rem;

		margin-bottom: 1.6rem;
	}

	.ratings {
		display: none;

		margin-top: 26px;
		width: 100%;
	}

	.ratings_m {
		margin-top: 26px;
	}

	.headline {
		margin-bottom: 0.4rem;
	}

	.headline,
	.muted {
		text-align: center;
	}

	.cta-button {
		display: flex;
		justify-content: center;
		align-items: center;

		max-width: 36rem;

		margin: 2.4rem 0;
	}

	.cta-button svg {
		margin-right: 1.2rem;
	}

	hr {
		width: 100%;

		border: 0.1rem solid var(--light-gray-color);

		margin: 2.4rem 0;
	}

	.coach-videos {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 3rem;
	}

	.video-opener {
		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;

		max-height: 20rem;

		border-radius: 0.8rem;

		overflow: hidden;
		cursor: pointer;
	}

	.video-thumbnail {
		width: 100%;
		max-height: 20rem;

		object-fit: cover;
	}

	.selfie-thumbnail {
		object-position: 50% 36%;
	}

	/* Selfie Adjustments for not having a crop on face */
	.selfie-thumbnail#Nicole {
		object-position: 50% 20%;
	}

	.selfie-thumbnail#Ken {
		object-position: 50% 62%;
	}

	.selfie-thumbnail#Ryan {
		object-position: 50% 40%;
	}

	.selfie-thumbnail#Anthony {
		object-position: 50% 75%;
	}

	.selfie-thumbnail#Ricky {
		object-position: 50% 46%;
	}

	.selfie-thumbnail#Alex {
		object-position: 50% 46%;
	}

	.play-icon {
		position: absolute;
		top: 50%;
		left: 50%;

		width: 6rem;

		transform: translate3d(-50%, -50%, 0);
	}

	.headline.sm {
		text-align: left;
		margin-bottom: 1.2rem;
	}

	.coach-achievements-box {
		width: 100%;
	}

	.coach-sports {
		display: flex;
	}

	.coach-sport {
		flex: 1;

		padding: 1.6rem;

		text-align: center;

		border-bottom: 0.2rem solid var(--light-gray-color);

		cursor: pointer;
	}

	.coach-sport.active {
		border-bottom-color: var(--gold-color);
	}

	.coach-sport-details {
		margin-top: 2.4rem;

		background-color: #ffffff;
		border-radius: 0.8rem;
	}

	.coach-achievements {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 1rem;

		padding: 1.6rem;
	}

	.coach-achievement {
		display: flex;
		align-items: flex-start;
		grid-gap: 1.2rem;
	}

	.coach-achievement img {
		transform: translate3d(0, -0.3rem, 0);
	}

	.popup {
		display: flex;
		justify-content: center;
		align-items: center;

		position: fixed;
		top: 0;
		left: 0;

		width: 100vw;
		height: 100vh;

		z-index: 99;
	}

	.popup-bg {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-color: rgba(0, 0, 0, 0.5);

		cursor: pointer;

		z-index: 0;
	}

	.video-box {
		display: flex;
		justify-content: center;

		position: relative;

		max-width: 108rem;
		width: 92%;
		max-height: 84%;

		background-color: #000000;
		border-radius: 1.2rem;
	}

	.video-box img {
		position: absolute;
		top: -1.6rem;
		right: 0;

		cursor: pointer;

		transform: translate3d(0, -100%, 0);
		z-index: 3;
	}

	.preview-video {
		max-width: 100%;
		max-height: 100%;

		border-radius: 1.2rem;

		z-index: 2;
	}

	.button.muted {
		width: 100%;

		padding: 0.8rem 1.2rem;
		margin-top: 2.4rem;
		border: 0.1rem solid #bdbdbd;

		cursor: default;
	}

	@media screen and (min-width: 768px) {
		.ratings_m {
			display: none;
		}

		.ratings {
			display: block;
		}

		.coach-videos {
			grid-template-columns: 1fr 1fr;
		}

		.coach-achievements {
			grid-template-columns: 1fr 1fr;

			padding: 2.4rem;
		}

		.video-opener,
		.video-thumbnail {
			height: 100%;
		}

		.video-box img {
			top: -6rem;
			right: 0;

			transform: none;
		}
	}
</style>
