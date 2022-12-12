<script>
	import { sportSelection } from '../../stores/sports';
	import { coaches } from "../../stores/testCoaches";
	import { onMount } from 'svelte';
	
	// import PositionSelector from "$lib/coaches/PositionSelector.svelte";
	import CoachCard from "$lib/coaches/CoachCard.svelte";

	let swiperEl;
	let fromLP = false;

	var initialSports = [
		'Soccer',
		'Basketball',
		'SUP',
		'Car Racing',
		'Motorcycle',
		'Karting',
	];

	let availablePositions = [];
	let selectedPositions = [];

	let section;
	onMount(() => {
		checkPredefinedSport();
	});

	function selectPosition(event) {
		let selected = event.target.closest('.position');
		selected.classList.toggle('active');

		const selectedIndex = selectedPositions.indexOf(selected.getAttribute('data-position'));
		if (selectedIndex > -1) {
			selectedPositions = selectedPositions.filter(item => item !== selected.getAttribute('data-position'))
			// selectedPositions.splice(selectedIndex, 1);
		} else {
			selectedPositions = [...selectedPositions, selected.getAttribute('data-position')];
		}
	}
	
	var sports = initialSports;

	// When sportSelection variable updates... -> /stores/sports
	// filter the sports accordingly
	// 
	$: $sportSelection, filterSports(), getPositions();
	$: selectedPositions, filterCoachesByPosition();
	$: availablePositions;

	function filterSports() {
		sports = initialSports;
		sports = sports.filter(sport => ~sport.indexOf($sportSelection));

		selectedPositions = [];
	}

	function checkPredefinedSport() {
		if ($sportSelection) {
			document.querySelector('.button-sm.all').click();

			fromLP = true;
		}
	}

	function filterCoachesByPosition() {
		// let sportSpecificCoaches = coaches.filter(coach => coach.sportName === $sportSelection);
		// let positionCoach = sportSpecificCoaches.filter(coach => coach.positions.includes(selectedPositions[0]))
		// coachesData = coaches.filter(coach => coach.positions.includes(selected));
	}

	function getPositions() {
		availablePositions = [];
		let sportSpecificCoaches = coaches.filter(coach => coach.sportName === $sportSelection);

		sportSpecificCoaches.forEach(coach => coach.positions.forEach(position => {
			if (availablePositions.includes(position)) {
				return; }
			availablePositions.push(position);
		}));
	
	}

	function handleViewAll(e) {
		e.target.closest('.coaches-box').classList.toggle('view-all');
	}
</script>
{#if $sportSelection && availablePositions.length > 0}
<!-- <PositionSelector positions={availablePositions} bind:selectedPositions={selectedPositions} /> -->
<section class="container pb">
	<div class="position-selection">
		<h2 class="headline">Filter by position</h2>

		<ul class="positions">
		{#each availablePositions as position (position)}
			<li class="position" data-position={position} on:click={e => selectPosition(e)}>
				<p>{position}</p>

				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
				</svg>
			</li>
		{/each}
		</ul>
	</div>
</section>
{/if}

<section class="container" bind:this={section}>
	{#each sports as sport}
	<div class="coaches-box" id={sport.toLowerCase()}>
		<div class="headline-box">
			<h2 class="headline">{sport} coaches</h2>
			
			{#if !fromLP}
			<div class="button-sm all" data-sport={sport.toLowerCase()} on:click|self={(event) => handleViewAll(event)}>
				View All
			</div>
			<div class="button-sm less" data-sport={sport.toLowerCase()} on:click|self={(event) => handleViewAll(event)}>
				View Less
			</div>
			{/if}
		</div>

		<div class="coach-grid coaches-page">
				<!-- <CoachCard sport={sport} bind:availablePositions={availablePositions} selected={selectedPositions} /> -->
			<CoachCard sport={sport} selected={selectedPositions} />
		</div>
	</div>
	{/each}
</section>

<style>
	:global(.no-swiper .slider-pagination-buttons) {
		display: none!important;
	}

	:global(.no-swiper .swiper-slide) {
		width: 100%!important;
	}

	:global(.no-swiper .swiper-wrapper) {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
	}

	.container:not(.home) {
		padding-top: 0;
	}
	
	.coaches-box {
		padding-bottom: 10rem;

		overflow: hidden;
	}

	.coach-grid {
		display: grid;
		gap: 1.6rem;
	}

	.slider-pagination-buttons {
		position: absolute;
		bottom: 0;
		right: 50%;

		grid-gap: 9.4rem;

		transform: translate3d(50%, calc(100% + 2.4rem),0);
	}

	.swiper-pagination {
		bottom: 0;

		transform: translate3d(-50%, calc(100% + 3.2rem), 0) !important;
	}

	.swiper-wrapper {
		grid-gap: 1.6rem;
	}

	@media screen and (min-width: 768px) {
		.coaches-box {
			padding-bottom: 8rem;
		}

		.coach-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.slider-pagination-buttons {
			bottom: unset;
			top: 0;
			right: 0;

			grid-gap: 2.4rem;

			transform: translate3d( 0, calc( -100% - 3rem ), 0 );
		}

		.positions {
			grid-gap: 1.6rem;
		}

		.swiper-wrapper {
			grid-gap: 2.4rem;
		}

		:global(.no-swiper .swiper-wrapper) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media screen and (min-width: 1024px) {
		.coach-grid {
			gap: 2.4rem;
		}
	}

	.positions {
		display: flex;
		flex-wrap: wrap;
		grid-gap: 1.6rem .8rem;
	}

	.position {
		display: flex;
		align-items: center;

		padding: 1.4rem 1.6rem;

		background-color: #EEEEEE;
		border-radius: 6rem;

		text-transform: uppercase;
		cursor: pointer;

		transition: all .3s ease-in-out;
	}

	:global(.position.active) {
		background-color: #000!important;
		color: #fff;
	}

	.button-sm.less {
		display: none;
	}

	:global(.view-all .button-sm.less) {
		display: block!important;
	}

	:global(.view-all .button-sm.all) {
		display: none;
	}

	:global(.coaches-box#motorcycle .button-sm),
	:global(.coaches-box#sup .button-sm) {
		display: none!important;
	}

	.position p {
		font-size: 1.4rem;
		
		margin-right: 1.4rem;

		transform: translate3d(0, .1rem, 0);
	}

	svg {
		transition: transform .3s ease-in-out;
	}

	:global(.position.active svg) {
		transform: rotate(45deg);
	}

	svg path {
		fill: var(--gray-color);
	}

	:global(.position.active svg path) {
		fill: #ffffff !important;
	}
</style>
