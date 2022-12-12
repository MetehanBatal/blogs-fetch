<script>
export let reviews;
console.log(reviews);
// export let rating = 4.87;
let rating = 0.0;
let communicationRating = 0.0;
let instructionRating = 0.0;
let trainingRating = 0.0;
let valueRating = 0.0;
let responseTime = 0.0;

const options = { year: 'numeric', month: 'long', day: 'numeric' };

reviews.forEach(function(review, index, array) {
	rating += (review.communication_score + review.instruction_score + review.value_score) / 3;
	communicationRating += review.communication_score;
	instructionRating += review.instruction_score;
	// trainingRating += ;
	valueRating += review.value_score;
	responseTime += review.response_time_score;
	// let publishedAt = new Date(review.published_at);
	
	// publishedAt.toLocaleDateString("en-US", options);
	// console.log('Published at: ', publishedAt.toLocaleDateString("en-US", options));
	if (index + 1 === array.length) {
		rating = rating / array.length + '.0';
		communicationRating = communicationRating / array.length + '.0';
		instructionRating = instructionRating / array.length + '.0';
		valueRating = valueRating / array.length + '.0';
		responseTime = responseTime / array.length + '.0';
	}
});
export let coachName = "Ashley D.";
export let reviewDate = "25 March 2020";
export let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dui turpis, pulvinar non feugiat eget, consequat in diam. In nibh sem, interdum sed pellentesque nec, faucibus non odio. Aenean quis imperdiet libero, et vestibulum diam. Nullam in augue sem. Vivamus sollicitudin quam eget mauris rhoncus, ut mattis neque tincidunt.";
</script>
<div class="coach-review">
	<div class="coach-review-deg">
		<img class="star-icon" src="/assets/icons/red-star.svg" alt="">
		<div class="coach-review-desc">
			<p class="coach-review-rating">{rating} rating</p>
			<p class="coach-review-total muted">Out of {reviews.length} reviews</p>
		</div>
	</div>
	<div class="coach-review-bars">
		<div class="coach-review-bar">
			<p class="coach-review-bar-item">Communication</p>
			<div data-point={communicationRating * 20} class="coach-review-bar-item-full"></div>
			<p class="coach-review-bar-item-rating">{communicationRating}</p>
		</div>
		<div class="coach-review-bar">
			<p class="coach-review-bar-item">Instruction</p>
			<div data-point={instructionRating * 20} class="coach-review-bar-item-full"></div>
			<p class="coach-review-bar-item-rating">{instructionRating}</p>
		</div>
		<div class="coach-review-bar">
			<p class="coach-review-bar-item">Value</p>
			<div data-point={valueRating * 20} class="coach-review-bar-item-full"></div>
			<p class="coach-review-bar-item-rating">{valueRating}</p>
		</div>
		<div class="coach-review-bar">
			<p class="coach-review-bar-item">Response Time</p>
			<div data-point={responseTime * 20} class="coach-review-bar-item-full"></div>
			<p class="coach-review-bar-item-rating">{responseTime}</p>
		</div>
	</div>
	<div class="divider"></div>
	<div class="coach-review-items">
		{#each reviews as review}
		{#if review.public_comment.length > 0}
		<div class="coach-review-item">
			{#if review.thumbnail}
			<img class="coach-review-image" src={review.thumbnail} alt="Blayze Reviewer Thumbnail">
			{:else}
			<img class="coach-review-image" src="/assets/icons/avatar.svg" alt="Blayze Reviewer Thumbnail">
			{/if}
			
			<div class="coach-review-person">
				<p class="coach-review-item-name">{review.athlete_id.full_name}</p>
				<p class="coach-review-item-date muted">{new Date(review.published_at).toLocaleDateString("en-US", options)} </p>
				<p class="coach-review-item-content">{review.public_comment}</p>
			</div>
		</div>
		<div class="divider"></div>
		{/if}
		{/each}
	</div>
</div>
<style>
.divider {
width: 100%;
height: 1px;
background-color: #BDBDBD;
}
.coach-review-image {
	width: 4rem;
	height: 4rem;
	object-fit: cover;
border-radius: 100%;
margin-right: 16px;
}
.star-icon {
margin-right: 10px;
}
.coach-review {
margin-top: 18px;
width: 100%;
background: #FFFFFF;
border-radius: 8px;
}
.coach-review-deg {
padding: 24px 0px 24px 18px;
display: flex;
align-items: flex-start;
}
.coach-review-item {
padding: 24px 0px 24px 18px;
display: flex;
align-items: flex-start;
}
.coach-review-rating {
font-size: 20px;
font-weight: 500;
margin-bottom: 2px;
}
.coach-review-bars {
padding-left: 18px;
width: 50%;
margin-bottom: 24px;
}
.coach-review-bar {
display: flex;
align-items: center;
justify-content: space-around;
}
.coach-review-bar-item {
width: 40%;
margin-bottom: 3px;
margin-right: 16px;
}
.coach-review-bar-item-rating {
width: 10%;
margin-left: 16px;
}
.coach-review-bar-item-full {
	position: relative;
width: 50%;
height: 4px;
background-color: #eee;
border-radius: 6px;
overflow: hidden;
}
.coach-review-bar-item-full:after {
	position: absolute;
	top: 0;
	left: 0;

	content: '';

	width: 0px;
	height: 100%;

	background-color: #F22509;
	
	z-index: 2;
}
.coach-review-bar-item-full[data-point="20"]:after {
	width: 20%;
}
.coach-review-bar-item-full[data-point="30"]:after {
	width: 30%;
}
.coach-review-bar-item-full[data-point="40"]:after {
	width: 40%;
}
.coach-review-bar-item-full[data-point="50"]:after {
	width: 50%;
}
.coach-review-bar-item-full[data-point="60"]:after {
	width: 60%;
}
.coach-review-bar-item-full[data-point="70"]:after {
	width: 70%;
}
.coach-review-bar-item-full[data-point="80"]:after {
	width: 80%;
}
.coach-review-bar-item-full[data-point="90"]:after {
	width: 90%;
}
.coach-review-bar-item-full[data-point="100"]:after {
	width: 100%;
}
.coach-review-item-name {
	text-transform: capitalize;
font-size: 16px;
margin-bottom: 5px;
}
.coach-review-item-date {
font-size: 14px;
}
.coach-review-item-content {
padding-right: 74px;
padding-bottom: 31px;
font-size: 14px;
margin-top: 8px;
}
@media screen and (max-width: 768px) {
.coach-review-item-content {
padding-right: 16px;
padding-bottom: 31px;
font-size: 14px;
margin-top: 8px;
}
.coach-review-bar-item-full {
width: 50%;
height: 4px;
background-color: #eee;
margin-right: 5px;
}
.coach-review-bar-item {
width: 62%;
margin-bottom: 3px;
}
.coach-review-bars {
padding-left: 18px;
padding-right: 16px;
width: 100%;
margin-bottom: 24px;
}
}
</style>