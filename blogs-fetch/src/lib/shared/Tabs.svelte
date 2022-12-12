<script>
  export let tabData = [];
  export let activeTabValue = 1;

  const handleTabChange = tabValue => () => (activeTabValue = tabValue);
</script>

<div class="tab-handler">
	<ul class="tabs">
	{#each tabData as tab}
		<li class={activeTabValue === tab.id ? 'active' : ''} on:click={handleTabChange(tab.id)}>
			<svg class="tab-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				{@html tab.rawIcon}
			</svg>

			<h4 class="headline sm">{tab.title}</h4>

			<div class="tab-border"></div>

			<p class="muted">
				{@html tab.content}
			</p>
		</li>
	{/each}
	</ul>

	{#each tabData as tab}
		{#if activeTabValue == tab.id}
		<div class="tab-content">
			<p class="muted">
				{@html tab.content}
			</p>
			<img src={tab.image} />
		</div>
		{/if}
	{/each}
</div>

<style>

.tab-handler {
	display: grid;
}

.tabs {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}

.tabs .headline.sm {
	font-size: 1.4rem;
	text-align: center;

	margin-bottom: 1.6rem;
	padding-left: .8rem;
}

.tabs .tab-icon {
	width: 3.2rem;

	margin-left: .8rem;
}

.tabs .muted {
	display: none;
}

.tabs li {
	display: flex;
	flex-direction: column;
	align-items: center;

	cursor: pointer;
}

.tab-border {
	position: relative;

	width: 100%;
	height: .2rem;

	margin-top: auto;
	margin-bottom: 1.6rem;

	background-color: var(--light-gray-color);
}

.active .tab-border:after {
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	content: '';

	background-color: var(--gold-color);

	z-index: 1;
}

.tab-content .muted {
	margin-bottom: 2.4rem;
}

.tab-content img {
	width: 100%;

	border-radius: .8rem;
	box-shadow: 0 .8rem 1.6rem rgba(0, 0, 0, .15);
}

@media screen and (min-width: 768px) {
	.tab-handler {
		grid-template-columns: repeat(2, minmax(auto, 40rem));
		grid-gap: 18rem;
		align-items: flex-start;
		justify-content: flex-end;
	}

	.tabs {
		grid-template-columns: repeat(1, 1fr);
		grid-gap: 4rem;
	}

	.tabs li {
		align-items: flex-start;
	}

	.tabs .muted {
		display: block;
	}

	.tab-content .muted {
		display: none;
	}

	.tabs .tab-icon {
		width: 4.8rem;

		margin-left: 0rem;
		margin-bottom: .8rem;
	}

	.tabs .headline.sm {
		font-size: 2rem;
		text-align: left;

		margin-bottom: 1.6rem;
		padding-left: 0rem;
	}
}

</style>