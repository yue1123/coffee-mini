import quantize, { type RgbPixel } from 'quantize'

function createPixelArray(imgData: Uint8ClampedArray<ArrayBufferLike>, pixelCount: number, quality: number) {
	const pixels = imgData
	const pixelArray: RgbPixel[] = []

	for (let i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
		offset = i * 4
		r = pixels[offset + 0]
		g = pixels[offset + 1]
		b = pixels[offset + 2]
		a = pixels[offset + 3]

		// If pixel is mostly opaque and not white
		if (typeof a === 'undefined' || a >= 125) {
			if (!(r > 250 && g > 250 && b > 250)) {
				pixelArray.push([r, g, b])
			}
		}
	}
	return pixelArray
}

interface Options {
	colorCount: number
	quality: number
}

class CanvasImage {
	canvas: OffscreenCanvas
	ctx: OffscreenCanvasRenderingContext2D | null
	context: OffscreenCanvasRenderingContext2D
	width: number
	height: number

	constructor(imageData: ImageBitmap) {
		this.canvas = new OffscreenCanvas(100, 1)
		this.ctx = this.canvas.getContext('2d')
		this.context = this.canvas.getContext('2d')!
		this.width = this.canvas.width = imageData.width
		this.height = this.canvas.height = imageData.height
		this.context.drawImage(imageData, 0, 0, this.width, this.height)
	}

	getImageData() {
		return this.context.getImageData(0, 0, this.width, this.height)
	}
}

function validateOptions(options: Options) {
	let { colorCount, quality } = options

	if (typeof colorCount === 'undefined' || !Number.isInteger(colorCount)) {
		colorCount = 10
	} else if (colorCount === 1) {
		throw new Error(
			'colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()'
		)
	} else {
		colorCount = Math.max(colorCount, 2)
		colorCount = Math.min(colorCount, 20)
	}

	if (typeof quality === 'undefined' || !Number.isInteger(quality) || quality < 1) {
		quality = 10
	}

	return {
		colorCount,
		quality
	}
}

function getImageBitMap(imageSource: string) {
	return fetch(imageSource)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			return response.blob() // 将响应转换为 ArrayBuffer
		})
		.then((blob) => {
			return createImageBitmap(blob)
		})
		.then((bitmap) => {
			return bitmap
		})
		.catch((error) => {
			console.error('Error fetching image:', error)
		})
}

async function getPalette(sourceImage: string, colorCount: number, quality: number) {
	const options = validateOptions({
		colorCount,
		quality
	})

	const imageBitmap = await getImageBitMap(sourceImage)

	if (!imageBitmap) return

	// Create custom CanvasImage object
	const image = new CanvasImage(imageBitmap)
	const imageData = image.getImageData()
	const pixelCount = image.width * image.height

	const pixelArray = createPixelArray(imageData.data, pixelCount, options.quality)

	// Send array to quantize function which clusters values
	// using median cut algorithm
	const cmap = quantize(pixelArray, options.colorCount)
	const palette = cmap ? cmap.palette() : null

	return palette
}

self.onmessage = async (e) => {
	const { imageUrl, quality, colorCount } = e.data
	try {
		const colors = await getPalette(imageUrl, colorCount, quality)
		self.postMessage({ colors })
	} catch (error) {
		console.log(error)
	}
}
