import Vue from 'vue'
import Flickity from 'vue-flickity'
import 'flickity-imagesloaded'

/**
 * Delay $flickity.destroy to prevent flash of unstyled cells 
 * during page transitions.
 * 
 * https://github.com/drewjbartlett/vue-flickity/issues/12#issuecomment-486912371
 */
Flickity.beforeDestroy = undefined
Flickity.destroyed = function() {
	setTimeout(() => {
		this.$flickity.destroy();
		this.$flickity = null;
	}, 1000)
} 

Vue.component('Flickity', Flickity)
