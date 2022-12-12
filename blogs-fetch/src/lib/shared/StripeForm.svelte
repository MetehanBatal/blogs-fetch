<script>
	import Cookies from 'js-cookie';

	export let formOpened;

	let paymentEndpoint = '';
	let recordEndpoint = '';
	let stripeKey = '';
	let paymentId = '';

	let bookedServices = [
		"01EN139NPJA3YT9SZG8XPDBMZ5",
        "01EN139NPJA3YT9SZG8XPDBMZ5"
	];
	// Complete data of user {firstName, lastName, email, bookedItems} to use it in multiple API requests
	let bookedData = {};

	function addScript(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');

			script.setAttribute('src', src);
			script.addEventListener('load', resolve);
			script.addEventListener('error', reject);

			document.head.appendChild(script);
		});
	}

	async function test() {
		try {
			await addScript('https://js.stripe.com/v3/');

			getEnvVariables();
			initStripeForm();
			// initStripeForm();
		} catch (e) {

		}
	}

	test();

	function getEnvVariables() {
		const currentURL = location.href;
		const productionUrl = 'https://blayze.io';

		// Stripe API Keys
		const stripeTestKey = 'pk_test_KTqkfVrQJf41tL8rw0ONs3SE00trsZy77w';
		const stripeLiveKey = 'pk_live_B7JjGUNUvK5hFDSwaG21bS8300uFdvqdcw';

		// API Endpoints
		//
		const paymentStaging = 'https://staging-app.blayze.io/api/hyperfest-2022/payment-intent';
		const recordStaging = 'https://staging-app.blayze.io/api/hyperfest-2022/record-sale';

		const paymentProduction = 'https://app.blayze.io/api/hyperfest-2022/payment-intent';
		const recordProduction = 'https://app.blayze.io/api/hyperfest-2022/record-sale';

		// If the current page is the live one...
		//
		if (currentURL.includes(productionUrl)) {
			paymentEndpoint = paymentProduction;
			recordEndpoint = recordProduction;
			stripeKey = stripeLiveKey;
		} else {
			// ...if local...
			//
			paymentEndpoint = paymentStaging;
			recordEndpoint = recordStaging;
			stripeKey = stripeTestKey;
		}
	}

	function initStripeForm() {
		// Init Stripe
		let stripe = Stripe(stripeKey);

		// Create an instance of elements.
		const elements = stripe.elements();

		// Custom styling based on the inputs'
		//
		const style = {
			base: {
				iconColor: '#666EE8',
				color: '#000000',
				fontWeight: 400,
				fontFamily: 'DM Sans',
				fontSize: '15px',

				'::placeholder': {
					color: '#9F9F9F'
				}
			}
		};
		// Create Card Number field
		//
		let cardNumberElement = elements.create('cardNumber', {
			style: style,
			placeholder: '**** **** **** ****'
		});
		// ...and implement to the page
		cardNumberElement.mount('#cardNumber');

		// Create Expiry date field
		//
		let cardExpiryElement = elements.create('cardExpiry', {
			style: style,
			placeholder: 'MM/YY'
		});
		// ...and implement to the page
		cardExpiryElement.mount('#expiryDate');

		// Create CVV/CVC field
		//
		let cardCvcElement = elements.create('cardCvc', {
			style: style,
			placeholder: '***'
		});
		// ...and implement to the page
		cardCvcElement.mount('#cvv');

		// Create ZIP code field
		//
		let cardPostalCodeElement = elements.create('postalCode', {
			style: style,
			placeholder: '*********'
		});
		// ...and implement to the page
		cardPostalCodeElement.mount('#postalCode');

		document.body.addEventListener('submit', function(e) {
		 	e.preventDefault();

			if (e.target.id === 'stripe-form') {
				handleSubmit(stripe, cardNumberElement) }
		});
	}

	function handleSubmit(stripe, card) {
		// Start loading state
		// 
		document.querySelector('.button-text').classList.toggle('hidden');
		document.querySelector('.loader').classList.toggle('hidden');
		document.getElementById('payment-button').classList.toggle('no-click');
		
		// Hide the error message if previously entered an incorrect info
		document.querySelector('.error-message').classList.add('hidden');

		getStripeIntentKey(stripe, card);
	}

	function getStripeIntentKey(stripe, card) {
		const data = {
			firstName: document.getElementById("firstName").value,
			lastName: document.getElementById("lastName").value,
			email: document.getElementById("email").value,
			bookedItems: bookedServices
		};

		fetch(paymentEndpoint, {
			"method": "POST",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": JSON.stringify(data)
		})
		.then((response) => response.json())
		.then(function(responseJson) {
			data.stripePaymentIntentId = responseJson.stripePaymentIntentClientSecret;
			bookedData = data;
			paymentId = responseJson.stripePaymentIntentClientSecret;


			createPurchase(stripe, card)

			// purchaseFormHench.recordSuccessfulSale(data);
			// purchaseFormHench.recordOnActiveCampaign();
		})
		.catch(function(err) {
			// Return button to its initial state
			// 
			document.querySelector('.button-text').classList.toggle('hidden');
			document.querySelector('.loader').classList.toggle('hidden');
			document.getElementById('payment-button').classList.toggle('no-click');
			
			// Toggle error message
			// 
			document.querySelector('.error-message').classList.remove('hidden');
		});
	}

	function createPurchase(stripe, card) {
		stripe.confirmCardPayment(paymentId, {
			payment_method: {
				card: card,
			},
		})
		.then(function(result) {
			if (result.error) {
				// Return button to its initial state
				// 
				document.querySelector('.button-text').classList.toggle('hidden');
				document.querySelector('.loader').classList.toggle('hidden');
				document.getElementById('payment-button').classList.toggle('no-click');
				
				// Toggle error message
				// 
				document.querySelector('.error-message').innerText = result.error.message;
				document.querySelector('.error-message').classList.remove('hidden');
			} else {
				recordSuccessfulSale();
				recordOnActiveCampaign();	
			}
		})
	}

	function recordSuccessfulSale() {
		fetch(recordEndpoint, {
			"method": "POST",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": JSON.stringify(bookedData)
		})
		.then((response) => response.json())
		.then(function(responseJson) {
			document.querySelector('.form-holder').classList.add('hidden');
			document.getElementById('successful-state').classList.remove('hidden');

			redirectUsers();
		})
		.catch((err) => console.error( err ));
	}

	function recordOnActiveCampaign() {
		const data = {
			first_name: document.getElementById("firstName").value,
			last_name: document.getElementById("lastName").value,
			email: document.getElementById("email").value,
			list_ids: [ 3 ],
			tag_ids: [ 99 ]
		};

		fetch("https://app.blayze.io/api/activecampaign-passthrough", {
			"method": "POST",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((responseJson) => console.log( responseJson ))
		.catch((err) => console.error( err ));
	}

	function redirectUsers() {
		let cookie = Cookies.get('blayze_user_logged_in');
		setTimeout(function() {
			if (cookie) {
				window.location.href = "https://app.blayze.io/athlete/sessions?list=purchased"
			} else {
				window.location.href = "https://app.blayze.io/reset-password/new"
			}
		}, 3600);
	}
</script>

<!-- <Stripe Form> -->
<div class="stripe-form-box">
	{formOpened}
	<div class="popup-overlay popup-toggler" on:click={() => formOpened = false} />

	<div class="form-box">
		<div class="form-holder">
			<div class="headline-box">
				<h3 class="headline md text-black">CARD DETAILS</h3>
				<img
					src="/assets/icons/close.svg"
					alt="Payment Popup Close Icon"
					class="popup-toggler"
					on:click={() => formOpened = false}
				/>
			</div>

			<form action="" id="stripe-form">
				<label class="input-holder stripe-el">
					<span class="label">Card Number</span>
					<div id="cardNumber" />
					<!-- <input class="input" id="cardNumber" type="text" placeholder="**** **** **** *****"> -->
				</label>

				<label class="input-holder w-50 stripe-el">
					<span class="label">Expiry Date</span>
					<div id="expiryDate" />
					<!-- <input class="input" id="expiryDate" type="text" placeholder="MM/YYYY"> -->
				</label>

				<label class="input-holder w-50 stripe-el">
					<span class="label">CVV</span>
					<div id="cvv" />
					<!-- <input class="input" id="cvv" type="text" placeholder="***"> -->
				</label>

				<div class="input-holder w-50">
					<label class="label" for="firstName">First Name</label>
					<input class="input" id="firstName" type="text" placeholder="First Name" />
				</div>

				<div class="input-holder w-50">
					<label class="label" for="lastName">Last Name</label>
					<input class="input" id="lastName" type="text" placeholder="Last Name" />
				</div>

				<div class="input-holder">
					<label class="label" for="email">E-mail Address</label>
					<input class="input" id="email" type="text" placeholder="E-mail Address" />
				</div>

				<label class="input-holder stripe-el">
					<span class="label">ZIP Code</span>
					<div id="postalCode" />
					<!-- <input class="input" id="cardNumber" type="text" placeholder="**** **** **** *****"> -->
				</label>

				<button type="submit" class="button primary" id="payment-button">
					<span class="button-text">Purchase - $499</span>
					<div class="loader hidden" />
				</button>
			</form>
		</div>

		<p class="hidden error-message">An error occured. Please try again.</p>

		<div class="hidden" id="successful-state">
			<p>
				Redirecting to your dashboard!
			</p>

			<p>
				<em>If you're a new user, you will be redirected to password creation page.</em>
			</p>

			<div class="button primary">Purchase Successful</div>
		</div>
	</div>
</div>

<!-- </Stripe Form> -->
<style>
	.stripe-form-box {
		display: flex;
		justify-content: center;
		align-items: center;

		position: fixed;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		z-index: 999;
	}

	.form-box {
		position: relative;

		width: 100%;
		max-height: 100%;
		height: 100%;

		overflow-y: auto;

		background-color: #fff;

		padding: 3rem 1.5rem;
		z-index: 2;
	}

	.popup-overlay {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(1.2rem);

		z-index: -1;
	}

	.headline-box {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	#stripe-form {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.input-holder {
		display: flex;
		flex-direction: column;

		width: 100%;

		font-weight: 400;
		font-size: 1.5rem;
		color: #000;
		margin-bottom: 3rem;
	}

	.input-holder.w-50 {
		width: 46%;
	}

	.input-holder.stripe-el,
	.input {
		font-size: 1.5rem;
		border: none;
		border-bottom: 0.1rem solid #606060;
		padding: 1rem 0;
	}

	.input-holder.stripe-el {
		padding-top: 0;
	}


	#successful-state p:first-child {
		margin-bottom: 1.6rem;
		text-align: center;
	}

	#successful-state em {
		font-size: 1.4rem;
		text-align: center;
	}

	#successful-state a {
		color: var(--primary-color);
		text-decoration: underline;
	}

	#successful-state .button {
		background-color: #139913;
		margin-top: 4rem;
		
		cursor: not-allowed;
	}

	.error-message {
		padding: 1.2rem 2rem;
		margin-top: 3rem;

		border-radius: .6rem;
		background-color: rgba( 252, 36, 46, .8 );
		color: #fff;
	}

	.loader {
		width: 1.8rem;
		height: 1.8rem;

		border: .24rem solid transparent;
		border-top: .24rem solid #fff;
		border-radius: 100%;

		margin: 0 auto;
		
		-webkit-animation: spin 2s linear infinite;
				animation: spin 2s linear infinite;
	}

	@-webkit-keyframes spin {
		0% { -webkit-transform: rotate(0deg); }
		100% { -webkit-transform: rotate(360deg); }
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	@media screen and (min-width: 1024px) {
		.form-box {
			max-width: 64rem;
			width: 72%;
			height: auto;
			padding: 3rem;
			border-radius: 0.6rem;
		}
	}

	.button.primary {
		width: 100%;

		margin-left: auto;
		margin-right: auto;
	}

	.stripe-el .label {
		margin-bottom: 1rem;
	}

	.popup-toggler {
		cursor: pointer;
	}
</style>
