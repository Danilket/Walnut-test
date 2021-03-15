const imagemin = require("imagemin")
const webp = require("imagemin-webp")

imagemin(['src/assets/images/*.{jpg,png}'], {
	destination: 'src/assets/images',
	plugins: [
		webp({ quality: 60 })
	]
})