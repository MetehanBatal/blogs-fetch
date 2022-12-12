// import Swiper JS
import Swiper, { Navigation, Pagination, Autoplay, Grid } from 'swiper';
import { onMount } from 'svelte';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Swiper.use([Navigation, Pagination, Autoplay]);

export let sliderOptions = {
	inProgress: false,
	options: {
		coaches: [
			{
				loop: false,
				slidesPerView: 1,
				spaceBetween: 16,
				pagination: {
					el: '.swiper-pagination',
					dynamicBullets: true
				},
				navigation: {
					nextEl: '.slider-pagination-next',
					prevEl: '.slider-pagination-prev'
				},
				breakpoints: {
					768: {
						slidesPerView: 2,
						pagination: false
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 24,
						pagination: false
					}
				}
			}
		],
		testimonials: [
			{
				loop: true,
				slidesPerView: 1,
				spaceBetween: 16,
				slideToClickedSlide: true,
				navigation: {
					nextEl: '.slider-pagination-next',
					prevEl: '.slider-pagination-prev'
				},
				breakpoints: {
					768: {
						slidesPerView: 3
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 24
					}
				}
			}
		],
		blayzePlus: [
			{
				loop: true,
				slidesPerView: 1,
				spaceBetween: 16,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.slider-pagination-next',
					prevEl: '.slider-pagination-prev'
				},
				autoplay: {
					delay: 6400,
					disableOnInteraction: false
				},
				breakpoints: {
					940: {
						slidesPerView: 3
					}
				}
			},
			{
				destroy: 940
			}
		],
		homeAbout: [
			{
				loop: true,
				slidesPerView: 1,
				spaceBetween: 16,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.slider-pagination-next',
					prevEl: '.slider-pagination-prev'
				},
				autoplay: {
					delay: 6400,
					disableOnInteraction: false
				},
				breakpoints: {
					940: {
						slidesPerView: 3
					}
				}
			},
			{
				destroy: 940
			}
		],
		blog: [
			{
				slidesPerView: 3,
				navigation: {
					nextEl: '.slider-pagination-next',
					prevEl: '.slider-pagination-prev'
				}
			}
		],
		blogFeatured: [
			{
				loop: true,
				slidesPerView: 1,
				pagination: {
					el: '.swiper-pagination',
					dynamicBullets: true
				},
				navigation: {
					nextEl: '.slider-pagination-next',
					prevEl: '.slider-pagination-prev'
				}
			}
		],
		lp: [
			{
				loop: true,
				slidesPerView: 1.2,
				spaceBetween: 16,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.slider-pagination-next',
					prevEl: '.slider-pagination-prev'
				}
			},
			{
				destroy: 767
			}
		],
		lpTestimonials: [
			{
				loop: true,
				slidesPerView: 1,
				spaceBetween: 16,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.slider-pagination-next',
					prevEl: '.slider-pagination-prev'
				},
				// thumbs: {
				// 	swiper: swiper['lpLeftSide'],
				// },
			}
		],
		lpLeftSide: [
			{
				speed: 500,
				effect: 'fade',
				freeMode: true,
				watchSlidesProgress: true,
			}
		],
	},

	initSlider: function (container, slider) {
		if (container === 'sport-based-blogs') {
			// onMount(() => {
			let swiper = new Swiper('.' + container, sliderOptions.options[slider][0]);

			// document.querySelectorAll('.sport-based-blogs').forEach(function(sliderContainer) {
			//
			// })
			// });
			return;
		}

		const swiper = new Swiper('.' + container, sliderOptions.options[slider][0]);

		if (sliderOptions.options[slider][1]) {
			let desktop = window.matchMedia(`(min-width: ${sliderOptions.options[slider][1].destroy}px)`);

			if (desktop.matches) {
				swiper.destroy();
			}
		}

		if( swiper.$el[0].classList.contains('testimonials-swiper') ) {
			document.querySelectorAll('.left-side-holder')[0].classList.remove('hidden');
			swiper.on('slideChange', function (e) {
				document.querySelectorAll('.left-side-holder').forEach((container) => container.classList.add('hidden'));
				document.querySelectorAll('.left-side-holder')[e.realIndex].classList.remove('hidden');
			});
		}
	}
};
