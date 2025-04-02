<script setup lang="ts">
	import Card from '@/components/Card/index.vue'
	import GradientBlurBg from '@/components/GradientBlurBg/index.vue'

	import { useImageColors } from '@/hooks/useImageColors'

	import image from '@/assets/free-photo-of-vibrant-wall.jpeg'
	import image1 from '@/assets/pexels-photo-19824679.jpeg'
	import image2 from '@/assets/pexels-photo-30862297.webp'
	import image3 from '@/assets/pexels-photo-31292931.webp'
	import emblaCarouselVue from 'embla-carousel-vue'
	import { nextTick, onMounted, ref } from 'vue'
	const currentImage = ref(image)
	const { colors } = useImageColors(currentImage)
	const [emblaRef, emblaApi] = emblaCarouselVue({ loop: false })
	const bgs = [image, image1, image2, image3]

	onMounted(() => {
		if (emblaApi.value) {
			console.log(emblaApi.value)
			emblaApi.value.on('select', (api) => {
				console.log(api, 'gaibian------------')
				// const container = api.containerNode()
				// if (container) {
				// 	container.addEventListener('transitionend', () => {
				// 		nextTick(() => {
				// 			console.log('11111111111111111')

				// 		})
				// 	})
				// }
				setTimeout(() => {
					currentImage.value = bgs[api.selectedScrollSnap()]
				}, 300)
			})
			// console.log(emblaApi.value.slideNodes()) // Access API
		}
	})
	// function handleTransitionEnd() {
	// 	console.log(11111111111)
	// 	if (!emblaApi.value) return
	// 	setTimeout(() => {
	// 		if (!emblaApi.value) return
	// 		console.log(111111111111)
	// 		currentImage.value = bgs[emblaApi.value.selectedScrollSnap()]
	// 	})
	// }
</script>

<template>
	<GradientBlurBg :colors="colors"></GradientBlurBg>
	<!-- <div class="relative h-full flex justify-center items-center">
		<Card :background="image" class="h-[90vh] w-[90vw]">
			<div class="w-full absolute bottom-0 py-14 text-white text-center space-y-2">
				<p class="text-4xl">Tyler Turns 3!</p>
				<p class="text-sm font-normal">Sat June 14 3:00 PM</p>
				<p class="text-sm font-normal">Chicago,IL</p>
			</div>
		</Card>
	</div> -->
	<div class="embla h-full w-full px-4" ref="emblaRef">
		<div class="embla__container flex space-x-4 shrink-0 h-full w-full">
			<div
				v-for="(bg, index) in bgs"
				:key="index"
				class="embla__slide relative h-full flex justify-center items-center"
			>
				<Card :background="bg" class="h-[70vh] w-[85vw]">
					<div class="w-full absolute bottom-0 py-14 text-white text-center space-y-2">
						<p class="text-4xl">Tyler Turns 3!</p>
						<p class="text-sm font-normal">Sat June 14 3:00 PM</p>
						<p class="text-sm font-normal">Chicago,IL</p>
					</div>
				</Card>
			</div>
		</div>
	</div>
</template>
