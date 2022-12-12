<script>
	import { success, warning, failure } from '../../stores/toastMessageOptions';
	import { isLoggedIn } from '../../stores/loginChecker';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { initLogRocket } from '$lib/shared/LogRocket.svelte';
	import Cookies from 'js-cookie';

	export let popupRevealed = true;
	export let calledFrom;
	export let blogSlug;
	export let directToLogin;
	let showLoginForm = false;
	let showNotPlusMemberText = false;

	const webAppUrl = `${import.meta.env.VITE_BLAYZE_WEB_APP_URL}`;
	let iframeSrc = `${webAppUrl}/session/marketing-new`;

	onMount(() => {
		initLogRocket();
	});

	if (directToLogin === 'true') {
		toggleLogin();
	}

	function closePopup(e) {
		// Check cookies and push to LogRocket
		// logImportantCookies;

		if (calledFrom === 'blog') {
			goto('/blog/');
			return;
		}
		popupRevealed = false;
	}

	function toggleLogin() {
		// Check cookies and push to LogRocket
		// logImportantCookies;

		showLoginForm = true;
		const cookieCheck = setInterval(() => {
			let cookie = Cookies.get('blayze_user_logged_in');
			if (cookie) {
				clearInterval(cookieCheck);
				checkPlusCookie();
			}
		});
	}

	function checkPlusCookie() {
		// Check cookies and push to LogRocket
		// logImportantCookies;

		let cookie = Cookies.get('blayze_subscriber');
		if (cookie === 'true') {
			$isLoggedIn = true;
			success('Successfully logged in!');
			popupRevealed = false;
			goto(blogSlug);
		} else if (cookie === 'false') {
			failure('Not a Blayze+ member.');
			showLoginForm = false;
			showNotPlusMemberText = true;
		} else {
			showLoginForm = true;

			const plusCookieCheck = setInterval(() => {
				if (cookie) {
					clearInterval(plusCookieCheck);
					checkPlusCookie();
				}
			});
		}
	}
</script>

{#if popupRevealed}
	<div class="popup-bg" on:click={(event) => closePopup(event)} />

	<div class="popup">
		{#if !showLoginForm}
			<div class="content-box">
				<img
					src="/assets/icons/close.svg"
					alt="Close Popup Icon"
					on:click={(event) => closePopup(event)}
					class="close-button"
				/>

				<img src="/assets/icons/blayze-plus/popup-icon.svg" alt="Blayze+ Content Logo" />

				<h2 class="headline text-center">Access this article and more for $1 per day</h2>

				<p class="text-center">
					This article is reserved for Blayze+ members. Subscribe today to take your game to the
					next level.
					<br />
					<br />
					{#if !showNotPlusMemberText}
						If you’re already a Blayze+ member, <span on:click={() => toggleLogin()}
							>log into your account</span
						>
						or <a href="mailto:team@blayze.io">contact support</a> for help with accessing this article.
					{:else}
						If you’re already a Blayze+ member and you are seeing this please contact us at <a
							href="mailto:support@blayze.io">support@blayze.io</a
						> for help with accessing this article.
					{/if}
				</p>

				<div class="buttons">
					{#if !showNotPlusMemberText}
						<div class="button secondary" on:click={() => toggleLogin()}>Log in</div>
					{/if}

					<a href="/blayze-plus#hero">
						<div class="cta-button">Go Plus</div>
					</a>
				</div>
			</div>
		{:else}
			<div class="content-box">
				<img
					src="/assets/icons/close.svg"
					alt="Close Popup Icon"
					on:click={(event) => closePopup(event)}
					class="close-button"
				/>

				<img src="/assets/icons/blayze-plus/popup-icon.svg" alt="Blayze+ Content Logo" />

				<iframe title="Blog iFrame" src={iframeSrc} frameborder="0" />
			</div>
		{/if}
	</div>
{/if}

<style>
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
		position: fixed;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-color: rgba(0, 0, 0, 0.5);

		cursor: pointer;

		z-index: 1;
	}

	.content-box {
		display: flex;
		flex-direction: column;
		align-items: center;

		position: relative;

		max-width: 64rem;
		width: 100%;
		height: 100%;

		background-color: #ffffff;
		color: #000;

		padding: 5.6rem 1.6rem 1.6rem;

		z-index: 2;
	}

	.close-button {
		position: absolute;
		top: 1.6rem;
		right: 1.6rem;

		cursor: pointer;
	}

	.headline {
		margin-top: 2.4rem;
	}

	p {
		line-height: 1.5;
	}

	p a,
	p span {
		color: #1565c0;
		text-decoration: underline;

		cursor: pointer;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		grid-gap: 1.2rem;
		justify-content: center;

		width: 100%;

		margin-top: auto;
	}

	.buttons a {
		order: -1;
	}

	.buttons p {
		font-size: 1.4rem;
	}

	iframe {
		width: 100%;
		height: 48rem;
	}

	@media screen and (min-width: 768px) {
		.content-box {
			height: auto;

			border-radius: 1.6rem;

			padding: 5.6rem 2.4rem 2.4rem;
		}

		.buttons {
			flex-direction: row;

			margin-top: 4rem;
		}

		.buttons .button,
		.buttons a {
			width: 50%;
		}

		.buttons a {
			order: 1;
		}
	}

	@media screen and (max-width: 768px) {
		.popup {
			top: 100%;

			height: auto;

			transform: translateY(-100%);
		}

		img:not(.close-button) {
			width: 6rem;
		}

		.content-box {
			padding-top: 2.4rem;
			padding-bottom: 4rem;
		}

		.popup .headline {
			font-size: 1.8rem;

			margin-top: 1.2rem;
			margin-bottom: 1.8rem;
		}

		.popup p {
			font-size: 1.3rem;

			margin-bottom: 2.4rem;
		}
	}
</style>
