<template>
	<div>	
		{{ totalImages }} /  {{ numImagesLoaded }}
	</div>
</template>

<script>
export default {
	name: "ListLoadingIndicator",
	props: {
		totalImages: Number,
		numImagesLoaded: Number
	},

}
</script>

<style>

</style>