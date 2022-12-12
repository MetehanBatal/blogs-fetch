<script>
	import { sliderOptions } from '../../stores/slider';
	import { onMount } from 'svelte';
	import BlogCard from '$lib/coaches/BlogCard.svelte';
	
	export let name;
	export let blogs;

	blogs = blogs.sort((blogOne, blogTwo) => new Date(blogTwo.date) - new Date(blogOne.date));

	onMount(() => {
		sliderOptions.initSlider('swiper', 'coaches');
	});

</script>

<section class="coach-articles">
	<div class="headline-box">
		<h4 class="headline sm">Articles by {name}</h4>
	</div>

	<div class="slider-outer-box swiper">
		<div class="swiper-wrapper">
			{#each blogs as metadata}
			<BlogCard blog={metadata} />
			{/each}
		</div>
		<div class="slider-pagination-buttons">
			<button data-role="prev" class="slider-pagination-prev">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M17.67 3.8701L15.9 2.1001L6 12.0001L15.9 21.9001L17.67 20.1301L9.54 12.0001L17.67 3.8701Z"/>
				</svg>
			</button>
			<button data-role="next" class="active slider-pagination-next">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6.22998 20.23L7.99998 22L18 12L7.99998 2L6.22998 3.77L14.46 12L6.22998 20.23Z"/>
				</svg>
			</button>
		</div>
	</div>
</section>

<style>
	.coach-articles {
		padding-top: 4.8rem;
		overflow: hidden;
	}

	.slider-outer-box {
		grid-column-gap: 2.4rem;

		will-change: unset;
	}

	.slider {
		width: 100%;
	}

	.swiper {
		overflow: unset;
	}

	.slider-pagination-buttons {
		position: absolute;
		top: -1.5rem;
		right: 0;

		transform: translate3d(0, -75%, 0);
	}

	@media screen and (min-width: 768px) {
		.coach-articles {
			padding-top: 8rem;
		}

		.slider {
			width: calc(25% - 1.82rem);
		}
	}
</style>