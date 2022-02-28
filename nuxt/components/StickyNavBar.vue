<template>
	<nav class="sticky-nav-bar" :class="{ visible: shouldShowStickyNav }">
		<button @click="scrollToTop">Back to top</button>
		<button class="snipcart-checkout">
			Cart (<span class="snipcart-items-count"></span>)
		</button>
	</nav>
</template>

<script>
export default {
	name: "StickyNavBar",
	data() {
		return {
			shouldShowStickyNav: false,
			currentPos: 0,
			prevPos: 0
		}
	},
	mounted() {
		window.addEventListener('scroll', this.checkScrollPos) 
	},
	destroyed() {
		window.removeEventListener('scroll', this.checkScrollPos) 
	},
	methods: {
		checkScrollPos() {
			this.currentPos = window.scrollY
			const mainNavBottom = document.getElementById("navigation-container").getBoundingClientRect().bottom
			const isScrollingUp = this.currentPos < this.prevPos 

			if (this.currentPos > mainNavBottom && isScrollingUp) {
				this.shouldShowStickyNav = true
			} else {
				this.shouldShowStickyNav = false
			}

			this.prevPos = this.currentPos
		},
		scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~assets/_variables.scss";

.sticky-nav-bar {
	@include center-column;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;

	position: fixed;
	top: 0;
	left: calc((100vw - 40vw) / 2);

	background-color: lightgrey;
	color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 10;

	opacity: 0;
	pointer-events: none;
	transition: opacity 0.25s ease-in-out;

	&.visible {
		opacity: 1;
		pointer-events: all;
	}

	@include tablet-portrait {
		width: 100vw;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		left: 0;
	}

	@include mobile {
		width: 100vw;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		left: 0;
	}
}

button {
	color: black;
	border: 0;
	padding: 0;
	background-color: transparent;
	cursor: pointer;
}
</style>
