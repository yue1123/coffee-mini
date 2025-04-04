import { type RGBColor } from 'colorthief'
import { ref, unref, watch, type Ref } from 'vue'
// 在生产构建中将会分离出 chunk
import Worker from '@/workers/getImageColors?worker&inline'

const worker = new Worker()

export function useImageColors(imgSrc: string | Ref<string>) {
	const colors = ref<RGBColor[]>([])

	worker.onmessage = (e) => {
		const { data } = e

		colors.value = data.colors
	}

	watch(
		() => unref(imgSrc),
		(n) => {
			worker.postMessage({
				imageUrl: new URL(n, import.meta.url).href,
				quality: 70,
				colorCount: 4
			})
		},
		{ immediate: true }
	)

	return {
		colors
	}
}
