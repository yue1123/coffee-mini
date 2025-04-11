<template>
	<GradientBlurBg :colors="colors">
		<section class="embla">
			<div class="embla__viewport" ref="emblaRef">
				<div class="embla__container">
					<div v-for="(bg, i) in bgs" class="embla__slide" :key="i">
						<div class="embla__slide__content">
							<Card
								:blurAmount="15"
								:background="bg"
								class="w-full h-full rounded-2xl"
							>
								<div class="w-full absolute top-4 left-4 text-white"></div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</section>
	</GradientBlurBg>
</template>

<script setup lang="ts">
	import GradientBlurBg from '@/components/GradientBlurBg/index.vue'
	import emblaCarouselVue from 'embla-carousel-vue'
	import { nextTick, onMounted, ref } from 'vue'
	import { clamp } from '@vueuse/core'
	import Card from '@/components/Card/index.vue'
	import { type EmblaCarouselType, type EmblaEventType } from 'embla-carousel'
	import { bgs } from '../images'
	import { useImageColors } from '@/hooks/useImageColors'
	import AutoScroll from 'embla-carousel-auto-scroll'
	import { Icon } from '@iconify/vue'
	const currentImage = ref(bgs[0])

	const { colors } = useImageColors(currentImage)

	const [emblaRef, emblaApi] = emblaCarouselVue(
		{
			loop: true,
			axis: 'x',
			align: 'center',
			startIndex: 0
		},
		[AutoScroll({ playOnInit: true, speed: 1 }) as any]
	) as any

	const TWEEN_FACTOR_BASE = 0.1
	const TWEEN_FACTOR_BASE_DEG = 40
	const tweenFactor = ref(0)
	const tweenNodes = ref<HTMLElement[]>([])

	function setTweenFactor(emblaApi: EmblaCarouselType) {
		tweenFactor.value = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
	}

	function setTweenNodes(emblaApi: EmblaCarouselType) {
		tweenNodes.value = emblaApi.slideNodes().map((slideNode) => {
			return slideNode.querySelector('.embla__slide__content') as HTMLElement
		})
		console.log(tweenNodes.value)
	}

	function tweenScale(emblaApi: EmblaCarouselType, eventName?: EmblaEventType) {
		const engine = emblaApi.internalEngine()
		const scrollProgress = emblaApi.scrollProgress()
		const slidesInView = emblaApi.slidesInView()
		const isScrollEvent = eventName === 'scroll'

		emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
			let diffToTarget = scrollSnap - scrollProgress
			console.log(diffToTarget)
			const slidesInSnap = engine.slideRegistry[snapIndex]

			slidesInSnap.forEach((slideIndex) => {
				if (isScrollEvent && !slidesInView.includes(slideIndex)) return

				if (engine.options.loop) {
					engine.slideLooper.loopPoints.forEach((loopItem) => {
						const target = loopItem.target()

						if (slideIndex === loopItem.index && target !== 0) {
							const sign = Math.sign(target)

							if (sign === -1) {
								diffToTarget = scrollSnap - (1 + scrollProgress)
							}
							if (sign === 1) {
								diffToTarget = scrollSnap + (1 - scrollProgress)
							}
						}
					})
				}

				const tweenValue = Math.abs(diffToTarget * tweenFactor.value)
				const scale = clamp(tweenValue, 0, 1)
				const direction = diffToTarget < 0 ? -1 : 1
				const rotate = scale * direction * TWEEN_FACTOR_BASE_DEG
				const tweenNode = tweenNodes.value[slideIndex]

				tweenNode.style.transform = `scale(${(1 - scale)}) rotate(${rotate}deg)`
			})
		})
	}

	onMounted(() => {
		nextTick(() => {
			console.log(emblaApi.value)
			if (!emblaApi.value) return
			setTweenNodes(emblaApi.value)
			setTweenFactor(emblaApi.value)
			tweenScale(emblaApi.value)
			emblaApi.value
				.on('select', (api: any) => {
					currentImage.value = bgs[api.selectedScrollSnap()]
				})
				.on('reInit', setTweenNodes)
				.on('reInit', setTweenFactor)
				.on('reInit', tweenScale)
				.on('scroll', tweenScale)
				.on('slideFocus', tweenScale)
		})
	})
</script>

<style>
	.embla {
		width: 100%;
		margin-top: 100px;
		--slide-spacing: 5%;
		--slide-size: 45%;
	}
	.embla__viewport {
		width: 100%;
		/* overflow: hidden; */
	}
	.embla__container {
		backface-visibility: hidden;
		display: flex;
		touch-action: pan-y pinch-zoom;
	}
	.embla__slide {
		min-width: 0;
		flex: 0 0 var(--slide-size);
		/* perspective: 300px; */
		aspect-ratio: 2/3;
		transform-origin: bottom center;
		will-change: transform;
		border-radius: 16px;
		margin-left: var(--spacing);
	}
	.embla__slide__content {
		width: 100%;
		height: 100%;
		box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 2/3;
		transform-origin: bottom center;
		user-select: none;
	}
</style>
