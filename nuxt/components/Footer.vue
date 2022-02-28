<template>
	<footer>
		<h2>Elliott Evan</h2>
		<h3>© {{ currentYear }}</h3>
	</footer>
</template>

<script>
export default {
	name: "Footer",
	computed: {
		currentYear() {
			return new Date().getFullYear();
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~assets/_typography.scss";
@import "~assets/_variables.scss";

footer {
	@include center-column;

	color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 1.3rem;
	margin: 10rem auto 0;
	padding-bottom: 4rem;

	@include tablet-portrait {
		padding-bottom: 2rem;
	}

	@include mobile {
		left: 0;
		width: 100vw;
		padding: 0 1.5rem;
		padding-bottom: 2rem;
		margin: 5rem auto 0;
	}

	h2, h3 {
		font-weight: normal;
		font-size: 1rem;
	}

	h2 {
		@include garamond;
		text-transform: uppercase;
		letter-spacing: 3px;
		font-size: 1.1rem;
	}
}
</style>
