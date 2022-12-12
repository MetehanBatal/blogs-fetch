<script>
	import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
	import lozad from 'lozad';
	// import Swiper and modules styles
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';

	Swiper.use([Navigation, Pagination, Autoplay]);

	import { sportSelection } from '../../stores/sports';
	// import { sliderOptions } from '../../stores/slider';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import BlogCard from '$lib/blog/BlogCardTest.svelte';
	import SearchedBlogCard from '$lib/blog/SearchedBlogCard.svelte';
	import BlogSliderCard from '$lib/blog/BlogSliderCard.svelte';
	
	import NewsletterForm from '$lib/shared/NewsletterForm.svelte';

	export let blogs;
	export let searchTerm;
	let featuredBlogs = [];

	onMount(() => {
		initSlider();

		const observer = lozad();
		observer.observe();
	});

	const sortedBlogs = [
		{
			category: 'General',
			blogs: []	
		},
		{
			category: 'Soccer',
			blogs: []	
		},
		{
			category: 'SUP',
			blogs: []	
		},
		{
			category: 'Car Racing',
			blogs: []	
		},
		{
			category: 'Motorcycle',
			blogs: []	
		},
		{
			category: 'Karting',
			blogs: []	
		},
	];

	var featuredSlider;
	const dateFormattingOptions = { year: 'numeric', month: 'long', day: 'numeric' };
	blogs = blogs.data.articles;
	
	blogs.forEach((blog) => {
		let sports = blog.sports;
		sports.forEach((sport) => {
			let matchingSport = sortedBlogs.filter(
				(categories) => categories.category.toLowerCase() === sport['sport_id']['name'].toLowerCase()
			);
			if (!matchingSport[0].blogs.includes(blog)) {
				matchingSport[0].blogs.push(blog);
			}
		});
		if (blog['is_featured']) {
			console.log(blog);
			featuredBlogs.push(blog);
		}
	});

	console.log('Blogs: ', sortedBlogs);

	sortedBlogs.forEach((sport) => {
		sport.blogs = sport.blogs.sort((blogOne, blogTwo) => new Date(blogTwo['updated_at']) - new Date(blogOne['updated_at']));
	});
	console.log('Sorted Blogs: ', sortedBlogs);

	function selectSport(e) {
		let sportName = e.target.getAttribute('data-sport');
		$sportSelection = sportName;
	}

	function initSlider() {
		let options = {
			loop: true,
			slidesPerView: 1,
			autoHeight: true,
			pagination: {
				el: '.swiper-pagination',
				dynamicBullets: true
			},
			navigation: {
				nextEl: '.slider-pagination-next',
				prevEl: '.slider-pagination-prev'
			}
		};

		featuredSlider = new Swiper('.hero-swiper', options);
	}

	$: searchedBlogs = blogs.filter((blog) => {
		return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
	});
</script>

<!-- <svelte:window bind:scrollY={posY} /> -->

{#if searchTerm.length > 0}
	<section class="container searched">
		<h2 class="headline text-center">Search Results: <span>“{searchTerm}”</span></h2>

		<div class="searched-blogs-grid">
			{#each searchedBlogs as metadata}
				<SearchedBlogCard blog={metadata} featured="false" sport="all" />
			{/each}
		</div>
	</section>
	{:else}
	<section class="blog-slider">
		<div class="container">
			<div class="swiper hero-swiper">
				<div class="swiper-wrapper">
					{#each featuredBlogs as featuredBlog}
						<div class="featured-item swiper-slide" data-sport={featuredBlog.sport}>
							<img src={`https://cms.blayze-cdn.io/${featuredBlog['hero_image']['filename_disk']}`} alt="Blog Alt Tag" class="featured-img" />

							<div class="featured-content">
								<p class="muted">
									{new Date(featuredBlog.updated_at).toLocaleDateString(undefined, dateFormattingOptions)}
								</p>

								<h2 class="featured-title">{featuredBlog.title}</h2>

								<div class="author-details">
									<img
										src={`/assets/images/coaches/${featuredBlog.authors[0]['author_id']['full_name'].replace(/\s+/g, '-').toLowerCase()}.png`}
										alt="Coach Thumbnail"
										class="coach-thumbnail"
									/>
									<div>
										<p><strong>{featuredBlog.authors[0]['author_id']['full_name']}</strong></p>
										{#if $sportSelection}
										<p class="muted capitalize">{$sportSelection}</p>
										{:else}
										<p class="muted capitalize">{featuredBlog.sports[0]['sport_id']['name']}</p>
										{/if}
									</div>
								</div>

								<div class="featured-bottom">
									<a href={`blog/${featuredBlog.sports[0]['sport_id']['name'].replace(' ', '-')}/${featuredBlog.slug}`}>
										<div class="cta-button">Read Article</div>
									</a>

									<div class="social-media-icons">
										<a
											target="_blank"
											href={`https://facebook.com/sharer/sharer.php?u=https://blayze.io/blog/${featuredBlog.slug}/&quote=${featuredBlog.meta_description}`}
										>
											<img src="/assets/icons/facebook.svg" alt="Share on Facebook" />
										</a>
										<a
											target="_blank"
											href={`https://twitter.com/intent/tweet?url=https://blayze.io/blog/${featuredBlog.slug}&text=${featuredBlog.meta_description}`}
										>
											<img src="/assets/icons/twitter.svg" alt="Share on Twitter" />
										</a>
										<a
											target="_blank"
											href={`https://www.pinterest.com/pin/create/button/?url=https://blayze.io/blog/${featuredBlog.slug}/&media=https://blayze.io/assets${featuredBlog.featured_image}&description=${featuredBlog.meta_description}`}
										>
											<img src="/assets/icons/pinterest.svg" alt="Share on Pinteres" />
										</a>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<div class="slider-navigation-holder">
					<div class="slider-pagination-buttons">
						<button data-role="prev" class="slider-pagination-prev">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M17.67 3.8701L15.9 2.1001L6 12.0001L15.9 21.9001L17.67 20.1301L9.54 12.0001L17.67 3.8701Z"
								/>
							</svg>
						</button>
						<button data-role="next" class="slider-pagination-next">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.22998 20.23L7.99998 22L18 12L7.99998 2L6.22998 3.77L14.46 12L6.22998 20.23Z"
								/>
							</svg>
						</button>
					</div>

					<div class="swiper-pagination" />
				</div>
			</div>
		</div>
	</section>

	<NewsletterForm />

	<section class="section-blogs">
		{#each sortedBlogs as {category, blogs}}
			<div class="blogs-box container" data-category={category.toLowerCase()}>
				<div class="headline-box">
					<h2 class="headline">{category} articles</h2>

					<a href={`/blog/${category.replace(/\s+/g, '-').toLowerCase()}/`}>
						<div class="button-sm" data-sport={category.toLowerCase()} on:click|self={(event) => selectSport(event)}>
							View All
						</div>
					</a>
				</div>

				<div class="blog-grid">
					<div class="blogs">
						{#each blogs.slice(0, 3) as blog}
							<BlogCard blog={blog} featured="false" sport={category.toLowerCase()} />
						{/each}
					</div>
				</div>
			</div>
		{/each}

		<!-- {#if !$sportSelection} -->
		
		<!-- {/if} -->
	</section>
{/if}

<style>
	.section-blogs {
		display: flex;
		flex-direction: column;

		padding-bottom: 4rem;
	}

	:global(.section-blogs .banner) {
		order: 4;

		margin: 4rem 0;
	}

	.headline span {
		color: var(--gray-color);
	}

	.blogs-box {
		display: flex;
		flex-direction: column;
	}

	.blog-grid {
		display: grid;
		grid-template-columns: 1fr;

		grid-gap: 2.4rem;
	}

	.blogs-box div:first-child .headline-box {
		margin-top: 0;
	}

	.category {
		margin-bottom: 8rem;
	}

	.category:last-child {
		margin-bottom: 0;
	}

	:global(.category.selected .headline-box) {
		justify-content: center;
	}

	div[data-category='general articles'] .swiper-slide {
		margin-bottom: 16px;
	}

	div[data-category='general articles'] .slider-pagination-buttons {
		display: none;
	}

	div[data-category='general articles'] .blog-grid {
		display: block;
	}

	div[data-category='general articles'] .swiper-wrapper {
		flex-wrap: wrap;
		grid-gap: 1.6rem 4rem;
	}

	.blogs {
		display: flex;
		flex-direction: column;
		grid-gap: 3.2rem;
	}

	.cta-button {
		margin-top: 2.4rem;
	}

	.searched-blogs-grid,
	.all-blogs {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 3.6rem 2.4rem;
	}

	.blogs-box:nth-child(1) {
		order: 1;
	}

	.blogs-box:nth-child(2) {
		order: 2;
	}

	.blogs-box:nth-child(3) {
		order: 3;
	}

	.blogs-box:nth-child(4) {
		order: 5;
	}

	.blogs-box:nth-child(5) {
		order: 6;
	}

	.blogs-box:nth-child(6) {
		order: 7;
	}

	.blogs-box:nth-child(7) {
		order: 8;
	}

	div[data-category='general'] {
		order: 0 !important;
	}

	div[data-category='soccer'] {
		order: 1 !important;
	}

	div[data-category='car racing'] {
		order: 2 !important;
	}

	div[data-category='karting'] {
		order: 5 !important;
	}

	div[data-category='motorcycle'] {
		order: 6 !important;
	}

	div[data-category='basketball'] {
		order: 7 !important;
	}

	div[data-category='sup'] {
		order: 8 !important;
	}

	.banner {
		order: 4;
	}

	/* <Featured Slider> */
	.blog-slider {
		margin-bottom: 4rem;
		padding-top: 14rem;
	}

	.featured-item {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 2.4rem;
	}

	.featured-img {
		border-radius: 0.8rem;
	}

	.featured-title {
		margin-top: 1.6rem;
	}

	.author-details {
		display: flex;

		margin: 2.4rem 0;
	}

	.coach-thumbnail {
		width: 4.8rem;
		height: 4.8rem;

		margin-right: 0.8rem;
	}

	.featured-title {
		font-weight: 500;
		font-size: 22px;

		letter-spacing: -0.04rem;
	}

	.slider-navigation-holder {
		display: flex;
		justify-content: center;

		margin-top: 2.4rem;
	}

	.slider-pagination-buttons {
		grid-gap: 8rem;
	}

	.back-to {
		display: flex;
		align-items: center;
		justify-content: flex-start;

		padding-top: 4.8rem;

		width: 100%;

		cursor: pointer;
	}

	.featured-bottom {
		display: flex;
		align-items: center;

		margin-top: 2.4rem;
	}

	.featured-bottom .cta-button {
		margin-top: 0;
	}

	.social-media-icons {
		display: flex;

		margin-left: 2.4rem;
	}

	.social-media-icons a:nth-child(2) {
		margin: 0 1.6rem;
	}

	:global(.sport-selected .swiper-wrapper) {
		height: 100% !important;
	}

	/* </Featured Slider> */

	.searched-blogs-grid {
		padding-bottom: 8rem;
	}

	.container {
		width: 100%;
	}

	:global(.blog-grid.swiper) {
		padding-bottom: 1rem;
	}

	:global(.selected .slider-pagination-buttons) {
		display: none;
	}

	.swiper-pagination {
		width: 80px !important;
	}

	div[data-category='blayze+'] {
		display: none!important;
	}

	.container.searched {
		padding-top: 20rem;
	}

	@media screen and (min-width: 768px) {
		.blog-grid {
			grid-gap: 3.6rem;
		}

		.blog-grid:not(.swiper-initialized) .swiper-wrapper {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
		}

		div[data-category='general articles'] .blog-card {
			margin-bottom: 0;
			margin-right: 40px;
		}

		.blogs-box.container {
			padding: 4rem 6.4rem;
		}

		.searched-blogs-grid,
		.all-blogs {
			grid-template-columns: repeat(3, 1fr);
		}

		.all-blogs {
			grid-area: 2/1/2/3;
		}

		.blogs {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 1.6rem;
		}

		.cta-button-holder {
			display: flex;
			justify-content: center;

			grid-area: 2/1/2/3;
		}

		.featured-item {
			grid-template-columns: 1fr 1fr;
		}

		.featured-bottom .cta-button {
			width: fit-content;
		}

		.featured-title {
			font-size: 26px;
		}
	}
</style>
