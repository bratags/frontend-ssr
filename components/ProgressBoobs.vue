<template>
	<div class="h-100 d-flex align-center justify-center animate__animated mb-2">
		<div v-if="false" style="position: relative; max-height: 100px">
			<bt-progress-circular indeterminate :color="'#FFF8E1' /*amber-lighten-5*/" :size="boobSize" width="2" />
			<bt-progress-circular indeterminate :color="'#FFECB3' /*amber-lighten-4*/" :size="areolaSize" width="10" :style="styleObj" />
		</div>
		<div style="position: relative; max-height: 100px">
			<v-progress-circular indeterminate color="amber-lighten-5" :size="boobSize" width="2" />
			<v-progress-circular indeterminate color="amber-lighten-4" :size="areolaSize" width="10" :style="styleObj" />
		</div>
	</div>
</template>
<script setup>
import { computed } from 'vue'

import BtProgressCircular from './BtProgressCircular.vue'

const props = defineProps({
	side: {
		type: String,
		default: 'left',
	},
	boobSize: {
		type: [String, Number],
		default: '100',
	},
    areolaSize: {
		type: [String, Number],
		default: '40',
	},
})
const styleObj = computed(() => ({
	position: 'absolute',
	bottom: '50%',
	left: props.side === 'right' ? '50%' : '75%',
	transform: 'translate(-75%, 75%)',
}))
</script>
