<script setup lang="ts">
	import Card from '@/components/Card/index.vue'
	import GradientBlurBg from '@/components/GradientBlurBg/index.vue'
	import { useImageColors } from '@/hooks/useImageColors'
	import image from '@/assets/free-photo-of-vibrant-wall.jpeg'
	import image1 from '@/assets/pexels-photo-2510104.jpeg'
	import image2 from '@/assets/pexels-photo-30862297.webp'
	import image3 from '@/assets/pexels-photo-31292931.webp'
	import image4 from '@/assets/pexels-photo-8238723.jpeg'
	import emblaCarouselVue from 'embla-carousel-vue'
	import { onMounted, ref } from 'vue'
	import { Icon } from '@iconify/vue'
	import UserList from './UserList.vue'

	const currentImage = ref(image)
	const { colors } = useImageColors(currentImage)
	const [emblaRef, emblaApi] = emblaCarouselVue({ loop: false, startIndex: 0 })
	const bgs = [image, image1, image2, image3, image4]

	onMounted(() => {
		if (emblaApi.value) {
			console.log(emblaApi.value)
			emblaApi.value.on('select', (api) => {
				currentImage.value = bgs[api.selectedScrollSnap()]
				console.log(api, 'gaibian------------')
			})
		}
	})
</script>

<template>
	<GradientBlurBg :colors="colors">
		<div class="pt-safe pb-safe select-none w-full h-full flex flex-col overflow-hidden text-white">
			<div class="header py-8">
				<div class="header-content flex justify-between items-center px-4 py-2">
					<div class="header-title flex items-end space-x-2">
						<h1 class="text-3xl font-bold">Today</h1>
						<button class="opacity-90">
							<Icon class="text-3xl" icon="material-symbols:keyboard-arrow-down-rounded"></Icon>
						</button>
					</div>
					<div class="header-button">
						<UserList />
					</div>
				</div>
			</div>
			<div class="embla flex-1 w-full pb-6 px-4 pt-4" ref="emblaRef">
				<div class="embla__container flex space-x-4 shrink-0 h-full w-full">
					<div
						v-for="(bg, index) in bgs"
						:key="index"
						class="embla__slide relative h-full flex justify-center items-center"
					>
						<Card :background="bg" class="shadow-2xl h-full w-[85vw]">
							<div class="w-full absolute top-4 left-4 text-white">
								<button
									class="flex justify-center items-center space-x-1 blur-button px-3 py-1 backdrop-blur-xl bg-[rgba(0,0,0,0.2)] rounded-full"
								>
									<Icon class="text-xl scale-y-80" icon="material-symbols:crown-rounded" />
									<span class="text-xs">Hosting</span>
								</button>
							</div>
							<div class="w-full py-14 absolute bottom-0 text-white text-center space-y-2">
								<p class="text-4xl font-bold font-sans">Tyler Turns 3!</p>
								<p class="text-sm font-normal">Sat June 14 3:00 PM</p>
								<p class="text-sm font-normal">Chicago,IL</p>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	</GradientBlurBg>
</template>
