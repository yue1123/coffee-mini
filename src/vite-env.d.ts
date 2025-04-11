/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
declare module 'colorthief' {
	export type RGBColor = [number, number, number]
	export default class ColorThief {
		getColor: (img: HTMLImageElement | null, quality: number = 10) => RGBColor | null

		getColorFromUrl: (
			imgUrl: string,
			callback: (colors: RGBColor[], src: string) => void,
			quality: number = 10
		) => void
		getPalette: (
			img: HTMLImageElement | null,
			colorCount: number = 10,
			quality: number = 10
		) => RGBColor[] | null
	}
}
