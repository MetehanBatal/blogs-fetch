<script>
	export let positions = [];
	export let selectedPositions = [];

	function selectPosition(event) {
		let selected = event.target.closest('.position');
		selected.classList.toggle('active');

		const selectedIndex = selectedPositions.indexOf(selected.getAttribute('data-position'));
		if (selectedIndex > -1) {
			selectedPositions.splice(selectedIndex, 1);
		} else {
			selectedPositions.push(selected.getAttribute('data-position'));	
		}
	}
</script>

<section class="container">
	<div class="position-selection">
		<h2 class="headline">Filter by position</h2>

		<ul class="positions">
		{#each positions as position (position)}
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

<style>
	.container {
		padding-top: 0;
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

	@media screen and (min-width: 768px) {
		.positions {
			grid-gap: 1.6rem;
		}
	}
</style>