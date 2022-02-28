export default ({ app }, inject) => {

	inject('LoadImage', url => {
		return new Promise(function(resolve, reject) {
			const image = new Image()
			image.src = url

			image.onload = () => {
				resolve(image)
			}

			image.onerror = () => {
				reject(new Error('Could not load image at ' + url))
			}
		})
	})

}