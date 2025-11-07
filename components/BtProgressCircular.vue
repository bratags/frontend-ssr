<template>
	<svg :width="Number(size)" :height="Number(size)" viewBox="0 0 100 100" class="circular-progress">
		<!-- Background circle -->
		<circle cx="50%" cy="50%" :r="radius" stroke="#e0e0e0" :stroke-width="Number(width)" fill="transparent" />

		<!-- Progress circle -->
		<circle cx="50%" cy="50%" :r="radius" :stroke="color" :stroke-width="Number(width)" fill="transparent" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" stroke-linecap="round" transform="rotate(-90 50 50)" />
	</svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: { type: Number, default: 0 }, // 0 to 100
	size: { type: [String, Number], default: 100 },
	width: { type: [String, Number], default: 10 },
	color: { type: String, default: '#000' },
})

const radius = computed(() => 50 - props.width / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - props.modelValue / 100))
</script>

<style scoped>
.circular-progress {
	animation: rotate 2s linear infinite; /* spin the whole SVG */
}
@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
