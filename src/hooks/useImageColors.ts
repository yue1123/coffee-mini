import ColorThief, { type RGBColor } from 'colorthief'
import { ref, unref, watch, type Ref } from 'vue'
// import { useWebWorkerFn } from '@vueuse/core'

export function useImageColors(imgSrc: string | Ref<string>) {
	const colorThief = new ColorThief()
	const colors = ref<RGBColor[]>([])

	const getColors = async (src: string) => {
		const img = await loadImage(src)
		const a = colorThief.getPalette(img, 5, 70)
		colors.value = a || []
	}

	unref(imgSrc) && getColors(unref(imgSrc))
	// function getPalette() {
	//   return colorThief
	// }
	// const { workerFn: gn1 } = useWebWorkerFn(
	// 	(...args) => {
	// 		const colorThief = new ColorThief()
	// 		// const img = document.createElement('img')
	// 		// console.log(args)
	// 		// const _img = await loadImage(img)
	// 		// console.log(_img)
	// 		// const parsedColors = getPalette(img)
	// 		// return parsedColors || []
	// 		// parse()
	// 		// eslint-disable-next-line no-undef
	// 		console.log(colorThief)
	// 	},
	// 	{
	// 		localDependencies: [ColorThief]
	// 	}
	// )
	// const pow = (a: number) => a * a

	// const { workerFn, workerStatus, workerTerminate } = useWebWorkerFn((numbers) => pow(numbers), {
	// 	timeout: 50000,
	// 	localDependencies: [pow]
	// })function loadImage(src: string) {
	// 	return new Promise<HTMLImageElement>(function a(resolve) {
	// 		const img = new Image()
	// 		img.src = src

	// 		if (img.complete) {
	// 			// getColors(img)
	// 			resolve(img)
	// 		} else {
	// 			img.addEventListener('load', () => resolve(img))
	// 		}
	// 		img.remove()
	// 	})
	// }
	function loadImage(src: string) {
		return new Promise<HTMLImageElement>(function a(resolve) {
			const img = new Image()
			img.src = src

			if (img.complete) {
				resolve(img)
			} else {
				img.addEventListener('load', () => resolve(img))
			}
			img.remove()
		})
	}
	watch(
		() => unref(imgSrc),
		async (n) => {
			await getColors(n)
			// img.src = n
			// if (img.complete) {
			// 	// getColors(img)
			// } else {
			// 	img.addEventListener('load', () => {
			// 		gn1()
			// 	})
			// }
			// gn1()
			// img.remove()
			// console.log(img)
			// gn1(n)
			// console.log(await workerFn(100), workerStatus, workerTerminate)
			// colors.value = await workerFn(n)
			// console.log(await workerFn(n))
		}
	)

	// console.log(colorThief)

	return {
		colors
	}
}
