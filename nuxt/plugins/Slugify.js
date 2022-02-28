import slugify from 'slugify'

export default ({ app }, inject) => {
	inject('Slugify', string => {
    return slugify(string)
	})
}