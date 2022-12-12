<script>
	import { onMount } from 'svelte';
	import { coaches } from '../../stores/testCoaches';
	import * as onboarding from "$lib/coaches/onboarding.svelte";
	import lozad from 'lozad';

	export let author;
	let slug = author.replace(/\s+/g, '-').toLowerCase();

	let coach = coaches.filter(coach => coach.slug.includes( slug ));

	coach = coach[0];

	console.log(author);

	onMount(() => {
		const observer = lozad();
		observer.observe();
	});
</script>
{#if slug != 'blayze-newsletter'}
<h3 class="headline md">About the coach</h3>

<div  class="author-details">
	<img data-src={coach.thumbnail} alt={`Blayze Coach ${coach.firstName} ${coach.lastName}`} class="lozad">

	<div>
		<h4>{coach.firstName} {coach.lastName}</h4>
		<p>{coach.excerpt}</p>
		<p>{coach.sportName}</p>
	</div>
</div>

{#if coach.status != 'Idle'}
<div class="buttons">
	<a href={`/coach/${coach.slug}`}>
		<div class="button secondary">
			View Profile
		</div>
	</a>

	{#if coach.status != 'draft'}
	<div class="cta-button" on:click={() => onboarding.beMyCoach(coach)}>Be My Coach</div>
	{/if}
</div>
{/if}
{/if}

<style>

	.author-details {
		display: flex;
		margin-bottom: 4rem;
		margin-top: 2.4rem;
	}

	img {
		width: 9.6rem;
		height: 9.6rem;

		margin-right: 2.4rem;
	}

	div h4 {
		font-size: 2rem;
		font-weight: 500;

		margin-bottom: 1.6rem;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		grid-gap: 2.4rem;
	}

	@media screen and (min-width: 768px) {
		.buttons {
			flex-direction: row;
		}
		.buttons .button.secondary {
			width: 36rem;
		}
	}
	


</style>