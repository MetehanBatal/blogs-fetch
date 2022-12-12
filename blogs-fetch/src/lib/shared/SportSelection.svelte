<script>
	import { sportSelection } from '../../stores/sports';
	import { onMount } from 'svelte';
	import lozad from 'lozad';

	export let title;

	let isLP = false;

	// let isSafari = false;

	let sports = [
		{
			id: 'soccer',
			name: 'Soccer',
			thumbnail: 'assets/images/sports/soccer.jpg'
		},
		{
			id: 'basketball',
			name: 'Basketball',
			thumbnail: 'assets/images/sports/basketball.jpg'
		},
		{
			id: 'sup',
			name: 'SUP',
			thumbnail: 'assets/images/sports/sup.jpg'
		},
		{
			id: 'car-racing',
			name: 'Car Racing',
			thumbnail: 'assets/images/sports/car-racing.jpg'
		},
		{
			id: 'motorcycle',
			name: 'Motorcycle',
			thumbnail: 'assets/images/sports/motorcycle.jpg'
		},
		{
			id: 'karting',
			name: 'Karting',
			thumbnail: 'assets/images/sports/karting.jpg'
		}
	];

	onMount(() => { 
		checkLP();
		checkSportSelection();
		if( $sportSelection ) {
			document.querySelectorAll('.sport').forEach((sport) => {
				sport.classList.add('non-selected');
			});
		}

		// safariPrefix();

		const observer = lozad();
		observer.observe();
	});

	// sportSelection.subscribe(value => {
	// 	sport = value;
	// });

	function setClasses() {
		document.querySelectorAll('.sport').forEach((sport) => {
			sport.classList.remove('selected');
			sport.classList.add('non-selected');
		});
	}

	function handleSportSelection(event) {
		setClasses();

		let clickedItem = event.target.closest( '.sport' );

		let sportName = clickedItem.id;
		if (sportName === $sportSelection) {
			sportSelection.set('');
			document.querySelectorAll('.sport').forEach(sport => sport.classList.remove('non-selected'));
		} else {
			sportSelection.set(sportName);
		}
	};

	function checkSportSelection() {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());

		if (params.sport &&  params.sport.length > 1) {
			sportSelection.set(params.sport);
			// setClasses();
		}
	}

	function safariPrefix() {
		isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	}

	function checkLP() {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());

		console.log( 'Params: ', params );

		if (params.lp &&  params.lp.length > 1) {
			isLP = true;
			// setClasses();
		}
	}
</script>

{#if !isLP}
<section class="container pb">
	<h2 class="headline">{title}</h2>

	<div class="sports-holder">
	{#each sports as sport}
		<div class="sport" id={sport.name} on:click={event => handleSportSelection(event)} class:selected={sport.name === $sportSelection}>
			<img data-src={sport.thumbnail} alt={sport.name} class="sport-thumbnail lozad">

			<div class="img-overlay"></div>

			<div class="title-holder">
				{sport.name}
			</div>
		</div>
	{/each}
	</div>
</section>
{/if}

<style>
	.sports-holder {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: .8rem;
		justify-content: space-between;
	}

	.sport {
		position: relative;

		min-height: 10rem;

		border: .4rem solid #ffffff;
		border-radius: .8rem;

		overflow: hidden;

		cursor: pointer;
	}

	.sport-thumbnail {
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
		.sports-holder {
			grid-template-columns: repeat(3, 1fr);
			/*grid-auto-flow: column;*/
			grid-gap: 2.4rem;
		}
	} 

	@media screen and (min-width: 1140px) {
		.sports-holder {
			grid-template-columns: repeat(6, 1fr);
		}
	}
</style>