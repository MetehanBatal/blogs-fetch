<script context="module">
	// TODO: refactor: put onboarding url to other place and use env/config variable to infer staging and prod host.
	
	const accountCreationgUrl = `${import.meta.env.VITE_BLAYZE_ACCOUNT_CREATION_URL}`;
	/**
	 * redirect to app site with some query params:
	 * available_coach_id: required
	 * sport_id: optional
	 * player_positions: optional
	 */
	export function beMyCoach(coach) {
		const generatedOnboardingURL = new URL(accountCreationgUrl);

		coach.id && generatedOnboardingURL.searchParams.append('available_coach_id', coach.id);
		// coach.sport_id && generatedOnboardingURL.searchParams.append('sport_id', coach.sport_id);
		// TODO: uncomment below lines when player_positions data ready
		// for (position of coach.player_positions) {
		//     accountCreationgUrl.searchParams.append(`player_positions[${position.name}]`, position.id)
		// }

		const urlString = generatedOnboardingURL.toString();

		// window.location.href = urlString;
		window.open(urlString); // Opens in new tab instead
	}
</script>
