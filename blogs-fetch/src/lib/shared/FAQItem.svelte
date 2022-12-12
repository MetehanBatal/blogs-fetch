<script>
	export let question;
	export let answer;

	function handleClick(event) {
		event.target.closest('.list-item').classList.toggle('is-open');
	}
</script>

<li class="list-item" on:click={event => handleClick(event)}>
	<div class="question">
		<h3 class="headline sm">{question}</h3>
		<!-- <img src="./assets/img/icons/dropdown-icon.svg" alt="FAQ - Click to open"> -->
		<button class="dropdown-toggle">
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#ffffff" />
			</svg>
		</button>
	</div>

	<p class="answer">
		{@html answer}
	</p>
</li>

<style>
	.list-item {
		padding: 2rem 1.2rem;
		overflow: hidden;
		border-bottom: 0.1rem solid #000000;
		cursor: pointer;
	}

	.headline {
		flex: .92;
		
		margin-bottom: 0;
	}

	.question {
		display: flex;
		justify-content: space-between;
		align-items: center;

		width: 100%;
	}

	.answer {
		max-height: 0;
	
		overflow: hidden;
	
		transition: all .4s ease-in-out;
	}

	.dropdown-toggle {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;

		width: 3.2rem;
		height: 3.2rem;

		background-color: #000000;
		border-radius: 100%;

		transition: transform .2s linear;
	}

	.dropdown-toggle:hover {
		background-color: #333;
	}
</style>