<script>
	import { onMount } from 'svelte';
	import Hls from 'hls.js';

	export let sport;
	export let title;

	onMount(() => {
		if (window.location.hash && window.location.hash === '#previewsample') {
			scroll({
				top: previewsample.offsetTop
			});
		}
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
	let href;
	let previewsample;

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

	let data = [
		{
			sportName: 'Basketball',
			videos: [
				{
					name: 'Technique Analysis Sample',
					videoURL: 's45BKe02rKrwHXuVxUm7wAYcOQUPTQPV1TmSr3GeNhnI'
				},
				{
					name: 'Game Film Analysis Sample',
					videoURL: 'vY5r6JXsXeFPe00L5OWi00rz8gh00TWbn7GRVFqkiT6LbI'
				}
			]
		},
		{
			sportName: 'Soccer',
			videos: [
				{
					name: 'Technique Analysis Sample',
					videoURL: 'KsN02VkfPDjys3pffbk9X8j7O59c00B24L2WoUru6E02zk'
				},
				{
					name: 'Game Film Analysis Sample',
					videoURL: 'E78mJG6L00YtwGPNRIHhOw3YXE6NDwpkaxQDtpu6FSS8'
				}
			]
		},
		{
			sportName: 'SUP',
			videos: [
				{
					name: 'Technique Analysis Sample',
					videoURL: 'IgBopdVCMxtjL7OXvqjTTPxWUxOj02Bei3PEeRuar1Uc'
				}
			]
		},
		{
			sportName: 'Car Racing',
			videos: [
				{
					name: 'One Lap Analysis Sample',
					videoURL: 'XAu4lEh8lSUlFLLJcBhOHXfCAEU1dKa2Cv01gKd1PS0000'
				},
				{
					name: 'Video & Data Sample',
					videoURL: 'NoqBaeIv6MdbMJT4VQ01ZmBP1aM86acQcmlV01CHA6Qd8'
				},
				{
					name: 'Race Analysis Sample',
					videoURL: '00No02LtWVOgASPqnkoJ00iULJdpi432D2MDEfzKsvNG00g'
				}
			]
		},
		{
			sportName: 'Motorcycle',
			videos: [
				{
					name: 'One Lap Analysis Sample',
					videoURL: 'L3smAnmJdW4G01lrBbCaf4B02wobV8GYtmAuTIHYxia94'
				},
				{
					name: 'Video & Data Analysis Sample',
					videoURL: 'NoqBaeIv6MdbMJT4VQ01ZmBP1aM86acQcmlV01CHA6Qd8'
				}
			]
		},
		{
			sportName: 'Karting',
			videos: [
				{
					name: 'Technique Analysis Sample',
					videoURL: 'aMYMapin22bO6aafMctVml6tia00T5fnV0279ok99jt3U'
				}
			]
		}
	];

	$: sport, fetchData();

	let sportSpesificData = data.find((videos) => videos.sportName === sport);

	function fetchData() {
		sportSpesificData = data.find((videos) => videos.sportName === sport);
	}
</script>

<section class="container" bind:this={previewsample}>
	<h2 class="headline">{title}</h2>

	<div class="coach-videos">
		{#each sportSpesificData.videos as previewVideo}
			<div class="coach-video">
				<p class="muted">{previewVideo.name}</p>

				<div
					data-video-url={previewVideo.videoURL}
					class="video-opener"
					on:click={(event) => togglePreviewPopup(event)}
				>
					<img
						src="https://image.mux.com/{previewVideo.videoURL}/thumbnail.jpg?time=24"
						alt="Meet Video Thumbnail"
						class="video-thumbnail"
					/>
					<img src="/assets/icons/play.svg" alt="Play Button" class="play-icon" />
				</div>
			</div>
		{/each}
	</div>
</section>

{#if popupRevealed}
	<div class="popup">
		<div class="popup-bg" on:click={(event) => (popupRevealed = false)} />

		<div class="video-box">
			<img src="/assets/icons/close.svg" alt="Close Popup Icon" on:click={(event) => (popupRevealed = false)} />

			<video class="preview-video" controls>
				<source src="https://stream.mux.com/{href}.m3u8" type="video/mp4" />
			</video>
		</div>
	</div>
{/if}

<style>
	.coach-videos {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 3rem;
	}

	.coach-video {
		display: flex;
		flex-direction: column;
	}

	.video-opener {
		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;

		border-radius: 0.8rem;

		overflow: hidden;

		cursor: pointer;
	}

	.video-thumbnail {
		width: 100%;

		margin: 0;
	}

	.play-icon {
		position: absolute;
		top: 50%;
		left: 50%;

		width: 6rem;

		transform: translate3d(-50%, -50%, 0);
	}

	.muted {
		margin-bottom: 1.8rem;
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

		width: 3.2rem;

		margin: 0;

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

	@media screen and (min-width: 768px) {
		.coach-videos {
			grid-template-columns: unset;
			grid-auto-columns: minmax(calc((100% - 6rem) / 3), 0.5fr);
			grid-auto-flow: column;
		}

		.video-opener {
			flex: 1;

			border-radius: 1.6rem;
		}

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
