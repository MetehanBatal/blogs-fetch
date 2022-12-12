<script>
	import { sportSelection } from '../../stores/sports';
	import { onMount } from 'svelte';

	export let title;
	export let value;
	export let selectedSport;

	let sports = [
		{
			id: 'soccer',
			name: 'Soccer',
			thumbnail: 'assets/images/sports/soccer.jpg'
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

	let questions = [
		"FAQ's",
		"Passing",
		"Defending",
		"Racecraft",
	];

	onMount(() => {
		checkSportSelection();

		console.log( 'Sport selection: ', $sportSelection );
	});
	

	function handleSportSelection(event) {
		document.querySelectorAll('.sport').forEach((sport) => {
			sport.classList.remove('selected');
		});

		let clickedItem = event.target.closest( '.sport' );

		let sportName = clickedItem.id;
		if (sportName === $sportSelection) {
			sportSelection.set('');
		} else {
			sportSelection.set(sportName);
		}

		if (sportName === 'all') {
			sportSelection.set('');
		}
	};

	function prefillSearch(event) {
		let term = event.target.getAttribute('data-search-key');
		value = term;
		inputOpened = false
	}

	let inputOpened = false;
	let menuOpened = false;

	$:menuOpened

	function toggleDropdown(e) {
		if (menuOpened) {
			menuOpened = false;
		} else {
			menuOpened = true;
		}
	}

	function handleKeydown(e) {
		if (!inputOpened) { return };
		if (e.keyCode === 13) {
			inputOpened = false;
		}
	}

	function handleInput() {
		if (inputOpened) {
			inputOpened = false;
		} else {
			inputOpened = true;
		}
	}

	function checkSportSelection() {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());

		if (params.sport && params.sport.length > 1) {
			sportSelection.set(params.sport);
		}

		// if (params.lp && params.lp.length > 1) {
		// 	sportSelection.set(params.lp);
		// }
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<section class="blog-sport-selection">
	<div class="container">
		<div class="sports-holder mobile-hidden">
			<a href="/blog-test/" id="sport-all" sveltekit:prefetch>
				<div class="sport" id="all" class:selected={'' === selectedSport || !selectedSport}>
					<p class="uppercase">All</p>
				</div>
			</a>
			{#each sports as sport}
			<a href="/blog-test/{sport.id}" id="sport-{sport.name.replace(/\s+/g, '-').toLowerCase()}" sveltekit:prefetch>
				<div class="sport" id={sport.name.replace(/\s+/g, '-').toLowerCase()} class:selected={sport.name === selectedSport}>
					<p class="uppercase">{sport.name}</p>
				</div>
			</a>
			{/each}
		</div>

		<div class="mobile-selector desktop-hidden" class:opened={menuOpened} on:click={event => toggleDropdown(event)}>
			<div class="dropdown-selection">
				{#if selectedSport}
				<p class="uppercase">{selectedSport}</p>
				{:else}
				<p class="uppercase">Select Sport</p>
				{/if}
				
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.51268 4.15332L1.33268 5.33332L7.99935 12L14.666 5.33332L13.486 4.15332L7.99935 9.63999L2.51268 4.15332Z" fill="#757575"/>
				</svg>
			</div>

			<div class="sports-list">
			<div class="sport" id="all" on:click={event => handleSportSelection(event)} class:selected={'' === selectedSport}>
				<p class="uppercase">All</p>
			</div>
			{#each sports as sport}
			<a href="/blog-test/{sport.id}" id="m-sport-{sport.name.replace(/\s+/g, '-').toLowerCase()}" sveltekit:prefetch>
				<div class="sport" id={sport.name} on:click={event => handleSportSelection(event)} class:selected={sport.name === selectedSport}>
					<p class="uppercase">{sport.name}</p>
				</div>
			</a>
			{/each}
			</div>
		</div>

		<div class="opened" on:click={() => {if (inputOpened) {inputOpened = false} else {inputOpened = true}}}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#000"/>
			</svg>
		</div>

		{#if inputOpened}
		<div class="search-area">
			<div class="overlay" on:click={() => {if (inputOpened) {inputOpened = false} else {inputOpened = true}}}>
				<img src="/assets/icons/close.svg" alt="Close Popup Icon" class="close-icon">
			</div>

			<div class="search-area-content">
				<div class="container max-w-900">
					<div class="search-field">
						<input type="text" class:opened={inputOpened} id="search-input" bind:value placeholder="Search...">	
						<div class="cta-button" on:click={(e) => {handleInput()}}>Search</div>
					</div>

					<div>
						<h3 class="headline md">Popular searches</h3>

						{#each questions as question}
						<p class="muted" data-search-key={question} on:click|self={(event) => prefillSearch(event)}>{question}</p>
						{/each}
					</div>
				</div>
			</div>
			

			<!-- <img src="/assets/icons/search.svg" alt="Search Through Blayze Blog" > -->
		</div>
		{/if}
	</div>
</section>

<style>
	.blog-sport-selection {
		position: fixed;
		top: 6rem;

		width: 100%;

		background-color: var(--gold-color);

		padding: .4rem 0;
		/*margin-top: 6rem;*/

		z-index: 8;
	}

	.sport#car-racing {
		min-width: 100px;
	}

	/*.blog-sport-selection.searchBarOpened {
		padding-bottom: 6.8rem;
	}*/

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding-top: 0;
		padding-bottom: 0;
	}

	.search-area {
		display: flex;
		grid-gap: .8rem;
	}

	.searchBarOpened .mobile-selector,
	.searchBarOpened .sports-holder {
		display: none;
	}

	.searchBarOpened .search-area {
		width: 100%;
	}

	.searchBarOpened .search-area input {
		display: block;
		flex: 1;
	}

	.sports-holder {
		display: flex;
		flex: .96;

		position: relative;

		overflow-x: auto;
		
		grid-gap: 2rem;
	}

	/*.sports-holder:after {
		position: sticky;
		top: 0;
		right: 0;

		min-width: 4.8rem;
			height: 52px;

		background: linear-gradient(270deg, rgba( 255, 145, 0, 1 ), rgba( 255, 145, 0, 0 ));

		content:  '';

		z-index: 9;
	}*/

	.sport {
		position: relative;

		padding: 1.6rem 0;

		cursor: pointer;
	}

	.sport.selected {
		outline: 0;
	}

	.mobile-selector {
		position: relative;

		min-width: 20rem;

		background: #fff;
		border-radius: 0.6rem;

		z-index: 2;
	}

	.dropdown-selection {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 1.2rem;

		border-bottom: .2rem solid transparent;
	}

	.dropdown-selection svg {
		transition: transform .24s ease-in-out;
	}

	.opened .dropdown-selection svg {
		transform: rotate(180deg);
	}

	.sports-list {
		display: none;

		position: absolute;
		left: 0;
		bottom: 0;

		width: 100%;

		padding: 1.2rem 2.4rem 1.2rem 1.2rem;

		background: #fff;
		box-shadow: 0 4px 8px rgb(117 117 117 / 15%);
		border-bottom-right-radius: 1.6rem;
		border-bottom-left-radius: 1.6rem;

		transform: translate3d(0, 100%, 0);
	}

	.mobile-selector.opened {
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}

	.mobile-selector.opened .dropdown-selection {
		border-color: var(--light-gray-color);
	}

	.mobile-selector.opened .sports-list {
		display: flex;
		flex-direction: column;
	}

	.sports-list .sport {
		margin-bottom: .8rem;
	}

	.search-area {
		align-items: flex-end;

		position: fixed;
		top: 0;
		left: 0;

		width: 100vw;
		height: 100%;

		z-index: 99;
	}

	.search-area .container {
		flex-direction: column;
		align-items: flex-start;
	}

	.search-area .overlay {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-color: rgba(0, 0, 0, .5);

		cursor: pointer;
	}

	.search-area-content {
		position: relative;

		width: 100%;
		height: 84%;

		padding: 5.6rem 0;

		background-color: #EEEEEE;
	}

	.search-field {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		grid-gap: 2.4rem;

		margin-bottom: 4rem;

		width: 100%;
	}

	.search-field input {
		width: 100%;
	}

	.search-field .cta-button {
		width: 24rem;
	}

	.search-area .muted {
		font-size: 1.8rem;

		margin-bottom: .8rem;

		cursor: pointer;
	}

	.search-area .headline.md {
		margin-bottom: 1.6rem;
	}

	.close-icon {
		position: absolute;
		top: 6.4rem;
		right: 1.6rem;
	}

	.mobile-hidden {
		display: none;
	}

	#sport-all,
	#m-sport-all {
		order: 0;
	}

	#sport-soccer,
	#m-sport-soccer {
		order: 1;
	}

	#sport-basketball,
	#m-sport-basketball {
		order: 5;
	}

	#sport-sup,
	#m-sport-sup {
		order: 6;
	}

	#sport-car-racing,
	#m-sport-car-racing {
		order: 2;
	}

	#sport-motorcycle,
	#m-sport-motorcycle {
		order: 4;
	}

	#sport-karting,
	#m-sport-karting {
		order: 3;
	}

	@media screen and (min-width: 768px) {
		.mobile-hidden {
			display: flex;
		}

		.blog-sport-selection {
			top: 8rem;
		}

		.search-field {
			flex-direction: row;
		}

		.search-area input {
			display: block;

			min-width: 24rem;

			padding: .8rem 1.2rem;
		}

		.sports-holder {
			grid-gap: 4rem;
		}

		.sport#car-racing {
			min-width: auto;
		}

		.sport:after {
			position: absolute;
			bottom: 1rem;
			left: 0;

			width: 100%;
			height: .4rem;

			opacity: 0;
			visibility: hidden;

			content: '';

			transform: translate3d(0, 100%, 0);
			transition: opacity .24s ease-in-out;
		}

		.sport.selected:after {
			opacity: 1;
			visibility: visible;

			background-color: #000;
		}

		.sport:hover:after {
			opacity: 1;
			visibility: visible;

			background-color: #fff;
		}

		.sport p {
			font-weight: 500;
			font-size: 1.4rem;
		}

		.close-icon {
			top: 9rem;
			right: 4.8rem;

			width: 4rem;
		}
	}

	@media screen and (min-width: 940px) {
		.sport p {
			font-size: 1.6rem;
		}
	}
</style>