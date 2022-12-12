<script>
	import { sportSelection } from '../../stores/sports';
	import { coaches } from '../../stores/testCoaches';
	import { onMount } from 'svelte';
	import * as onboarding from './onboarding.svelte';
	// import lozad from 'lozad';

	export let sport;
	let coachesData = [];
	let initialData = [];
	let holder = [];
	// let org = coaches.filter(coach => coach.sportName === sport);

	// export let availablePositions = [];
	export let selected;

	var observer;
	var pageLoaded = false;

	function adjustCoachesList() {
		// If the sport property defined...
		// ...filter coaches by sport
		//
		if (sport) {
			coachesData = coaches.filter((coach) => coach.sportName === sport);
			initialData = coachesData;
		} else {
			coachesData = coaches.filter((coach) => coach.featured === true);
		}
	}

	$: sport, fetchData();
	$: selected, filterCoachesByPosition();

	function filterCoachesByPosition() {
		adjustCoachesList();
		// initialData = coachesData;
		if (selected.length > 0) {
			coachesData = initialData.filter(({ positions }) =>
				positions.some((thing) => selected.includes(thing))
			);
		} else {
			coachesData = coaches.filter((coach) => coach.sportName === sport);
		}

		//const intersection = coachesData.filter(coach => selected.includes(coachesData.positions));
		// coachesData = coaches.filter(coach => coach.positions.includes(selected));
	}

	function fetchData() {
		coachesData = coaches.filter((coach) => coach.sportName === sport);
		// initialData = coachesData;
	}

	function getPositions() {
		availablePositions = [];
		coachesData.forEach((coach) =>
			coach.positions.forEach((position) => {
				if (availablePositions.includes(position)) {
					return;
				}
				availablePositions.push(position);
			})
		);

	}

	// $: $sportSelection, loadThumbnails();

	// function loadThumbnails() {
	// 	if (pageLoaded) {

	// 		setTimeout(function () {
	// 			observer.observe();

	// 		}, 12);
	// 	}
	// }

	onMount(() => {
		adjustCoachesList();
		// observer = lozad();
		// observer.observe();

		pageLoaded = true;
		
		// getPositions();
	});
</script>

{#each coachesData as coach (coach.id)}
	{#if coach.status != 'Idle'}
		<div class="coach-card slider swiper-slide" data-coach={coach.slug}>
			<!-- <div class="coach-card"> -->
			<img src={coach.thumbnail} alt="Coach Placeholder Image" class="coach-img" />

			<h4 class="coach-name">{coach.firstName} {coach.lastName}</h4>

			<p class="muted">{coach.excerpt}</p>

			<div class="buttons">
				<a href="/coach/{coach.slug}">
					<div class="button secondary">VIEW PROFILE</div>
				</a>
				{#if sport && coach.status != 'draft'}
					<div class="button primary" on:click={() => onboarding.beMyCoach(coach)}>BE MY COACH</div>
				{/if}
			</div>

			<div class="card-bg" />
			<!-- </div> -->
		</div>
	{/if}
{/each}

<style>
	.coach-card {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 100%;
		height: auto;

		position: relative;

		padding: 0 2.4rem 2.4rem;
		margin: 0 !important;
	}

	.coach-card[data-coach='mike-semenza'] {
		order: -2;
	}

	.coach-card[data-coach='cassie-miller'] {
		order: -1;
	}

	.coach-card[data-coach='ricky-taylor'] {
		order: -2;
	}

	.coach-card[data-coach='spencer-pigot'] {
		order: -2;
	}

	.coach-card[data-coach='dion-von-moltke'] {
		order: -1;
	}

	.coach-card[data-coach='gianmarco-raimondo'] {
		order: 1;
	}

	.coach-img {
		width: 9.6rem;
		height: 9.6rem;

		border-radius: 100%;

		margin-bottom: 1.6rem;
	}

	.coach-name {
		margin-bottom: 0.4rem;
	}

	.muted {
		text-align: center;

		margin-bottom: 3.2rem;
	}

	.buttons {
		display: grid;
		grid-auto-flow: column;
		grid-gap: 1rem;

		width: 100%;

		margin-top: auto;
	}

	:global(.coach-grid.lp .coach-card),
	:global(.coaches-page .coach-card) {
		width: 100% !important;
	}

	@media screen and (min-width: 768px) {
		.coach-card {
			width: calc((100% - 4.8rem) / 3);
		}

		.coach-img {
			width: 9.6rem;
			height: 9.6rem;
		}
	}

	@media screen and (min-width: 1440px) {
		.coach-card {
			/*width: calc(( 100% - 7.2rem ) / 4);*/

			/*padding: 0 1rem 1.6rem;*/
		}

		.button {
			padding: 1.2rem;
			font-size: 1.3rem;
		}
	}
</style>
