<script>
	// import { onMount } from 'svelte';

	let emailAddress = '';
	let formSuccess = false;
	let formError = false;
	let newsletterSportSelection = false;
	const blayzeJsonApiUrl = `${import.meta.env.VITE_BLAYZE_JSON_API_URL}`;

	// onMount(() => {
	// 	safariPrefix();
	// });

	let selectedSports = [];
	// let isSafari = false;

	let sports = [
		{
			id: 'soccer',
			name: 'Soccer',
			selected: false,
			listId: 18,
			thumbnail: '/assets/images/sports/soccer.jpg'
		},
		{
			id: 'basketball',
			name: 'Basketball',
			selected: false,
			listId: 19,
			thumbnail: '/assets/images/sports/basketball.jpg'
		},
		{
			id: 'sup',
			name: 'SUP',
			selected: false,
			listId: 9,
			thumbnail: '/assets/images/sports/sup.jpg'
		},
		{
			id: 'car-racing',
			name: 'Car Racing',
			selected: false,
			listId: 3,
			thumbnail: '/assets/images/sports/car-racing.jpg'
		},
		{
			id: 'motorcycle',
			name: 'Motorcycle',
			selected: false,
			listId: 20,
			thumbnail: '/assets/images/sports/motorcycle.jpg'
		},
		{
			id: 'karting',
			name: 'Karting',
			selected: false,
			listId: 21,
			thumbnail: '/assets/images/sports/karting.jpg'
		}
	];

	function triggerSportSelection(e) {
		newsletterSportSelection = true;

		document.body.classList.add('overflow-hidden');

		e.preventDefault();
	}

	function setClasses() {
		document.querySelectorAll('.sport').forEach((sport) => {
			if (!sport.classList.contains('selected')) {
				sport.classList.add('non-selected');
			}
		});
	}

	function handleSportSelection(event) {
		let clickedItem = event.target.closest( '.sport' );

		clickedItem.classList.toggle('selected');

		const selectedIndex = selectedSports.indexOf(clickedItem.getAttribute('data-id'));
		if (selectedIndex > -1) {
			selectedSports.splice(selectedIndex, 1);
		} else {
			selectedSports.push(clickedItem.getAttribute('data-id'));
		}

		setClasses();

		selectedSports = selectedSports;
	};

	function handleSubscribe(e) {
		const data = {
			email: emailAddress,
			list_ids: selectedSports
		};

		fetch(`${blayzeJsonApiUrl}/activecampaign-passthrough`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((responseJson) => {
			formSuccess = true;
			newsletterSportSelection = false;
			document.body.classList.remove('overflow-hidden');
		})
		.catch((err) => console.error(err));
	}

	function safariPrefix() {
		isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	}
</script>

<section class="gray-section">
	<div class="container psm">
		<p class="lg">Get free coaching tips from our team of coaches every week when signing up for our newsletter here.</p>

		{#if !formSuccess}
			<form on:submit={e => triggerSportSelection(e)}>
				<input type="email" required placeholder="E-mail Address" bind:value={emailAddress} />
				<button class="cta-button">Subscribe</button>
			</form>
		{:else}
			<div class="success-message">
				<img src="/assets/icons/success.svg" alt="Thanks for subscribing to Blayze newsletter" />
				<p class="muted">Thanks for subscribing!</p>
			</div>
		{/if}
	</div>
</section>

{#if newsletterSportSelection}
<section class="newsletter-popup">
	<div class="popup">
		<img src="/assets/icons/close.svg" class="close-icon" alt="Close Popup Icon" on:click={function (event) { newsletterSportSelection = false; document.body.classList.remove('overflow-hidden');}} />

		<h3 class="headline md">Which sport newsletter are you interested in?</h3>

		<p class="muted">Select all that apply</p>

		<div class="newsletter-sport-selection">
		{#each sports as sport}
			<div class="sport" id={sport.name} data-id={sport.listId} on:click={event => handleSportSelection(event)}>
				<img src={sport.thumbnail} alt={sport.name} class="sport-thumbnail">

				<div class="img-overlay"></div>

				<div class="title-holder">
					{sport.name}
				</div>
			</div>
		{/each}
		</div>

		<div class="cta-button" on:click={event => handleSubscribe(event)}>Subscribe</div>
	</div>
</section>
{/if}

<style>
	input {
		width: 100%;

		margin: 3.2rem 0 2.4rem;
	}

	.newsletter-popup {
		position: fixed;
		top: 0;
		left: 0;

		width: 100vw;
		height: 100%;

		background-color: rgba( 0, 0, 0, .5 );

		display: flex;
		justify-content: center;
		align-items: center;

		z-index: 99;
	}

	.popup {
		display: flex;
		flex-direction: column;
		align-items: center;

		position: relative;

		max-width: 64rem;
		
		background-color: #fff;
		border-radius: 1.2rem;
		
		padding: 5.6rem 2.4rem 4rem;
	}

	.popup .close-icon {
		position: absolute;
		top: 1.6rem;
		right: 1.6rem;

		cursor: pointer;
	}

	.headline.md {
		text-align: center;
	}

	.newsletter-sport-selection {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: .8rem;
		justify-content: space-between;

		margin: 2.4rem 0 4rem;
	}

	.sport {
		position: relative;

		min-width: 15rem;
		min-height: 10rem;

		border: .4rem solid #ffffff;
		border-radius: .8rem;

		/*aspect-ratio: 18 / 10;*/

		overflow: hidden;

		cursor: pointer;
	}

	.sport-thumbnail {
		min-width: 15rem;
			width: 100%;
		height: 100%;

		object-fit: cover;
	}

	.title-holder {
		position: absolute;
		bottom: 0;
		left: 0;

		padding: .8rem;

		background-color: var(--primary-color);
		color: #ffffff;

		z-index: 2;
	}

	.title-holder:after {
		position: absolute;
		bottom: 0;
		right: 0;

		background-color: var(--primary-color);
		
		content: '';

		width: 2.4rem;
		height: 100%;
		
		clip-path: polygon(0 0, 0% 100%, 100% 0);
		
		transform: translateX(98%);
	}

	@media screen and (min-width: 768px) {
		.lg {
			font-size: 1.6rem;
			max-width: 42rem;
		}

		.container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			grid-gap: 6rem;
		}

		form {
			display: flex;
			justify-content: space-between;
			flex: 1;
			grid-gap: 3.2rem;
		}

		.success-message {
			display: flex;
			align-items: center;
			grid-gap: 0.8rem;
			flex: 1;
		}

		input {
			flex: 0.95;

			margin: 0;
		}

		.success-state {
			flex: 1;
		}

		.cta-button {
			flex: 0.05;
		}

		.popup {
			padding: 5.6rem 10rem 4rem;
		}

		.newsletter-sport-selection {
			grid-template-columns: repeat(2, 1fr);
			/*grid-auto-flow: column;*/
			grid-gap: 2.4rem;
		}
	}
</style>
