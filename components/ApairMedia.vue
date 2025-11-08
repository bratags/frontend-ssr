<template>
	<div class="d-flex align-center justify-center">
		<img v-if="content?.image" width="100%" height="100%" :src="content.image" />
		<img v-else-if="content?.url && !props.ssr" height="100%" width="100%" :src="'/andrew-kliatskyi-PKCcowPZpDc-unsplash.webp'" v-intersect.once="() => decrypt('nftMedia', content)" />
		<progress-boobs v-else-if="!props.ssr" side="right" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)" />
	</div>
</template>
<style scoped></style>
<script setup>
import { ref, computed, onBeforeMount, inject, onServerPrefetch } from 'vue'
import { fileTypeFromBuffer } from 'file-type'

import { useObjectURLManager } from '@/composables/useObjectURLManager.composable'
import { decryptFilePayload } from '@/utilities/decryptFilePayload.util'
import ProgressBoobs from './ProgressBoobs.vue'

const props = defineProps({
	ssr: Boolean,
	apairId: String,
    apiServer: String
})
const $api = !props.ssr && inject('$api')
const { createObjectURL } = useObjectURLManager()
const src = ref()
const content = ref()

function uint8ToBase64(u8Arr) {
	let binary = ''
	const chunkSize = 0x8000 // to avoid stack overflow on large arrays
	for (let i = 0; i < u8Arr.length; i += chunkSize) {
		const chunk = u8Arr.subarray(i, i + chunkSize)
		binary += String.fromCharCode.apply(null, chunk)
	}
	return btoa(binary)
}
async function decrypt(side, payload, index = 0) {
	let currentAbort = {}

	if (!currentAbort[side]) currentAbort[side] = []
	if (currentAbort[side][index]) currentAbort[side][index].abort()

	currentAbort[side][index] = new AbortController()

	const { url, encryptedMetadata } = payload
	const maxAttempts = 11
	let attempts = 0
	let delay = 1000

	let response

	while (attempts < maxAttempts && !currentAbort[side][index].signal.aborted) {
		try {
			response = await fetch(url, { signal: currentAbort[side][index].signal })

			if (response.ok) break
		} catch (err) {
			if (err.name === 'AbortError') {
				console.log('Fetch aborted')
				return
			}
			console.warn(`Attempt ${attempts + 1} failed`, err)
		}

		attempts += 1
		await new Promise(resolve => setTimeout(resolve, delay))
		delay *= 2
	}

	if (!response.ok) throw new Error(response)

	const ciphertext = await response.text()

	const file = await decryptFilePayload({ ciphertext, ...encryptedMetadata })

	if (!file) {
		return
	}
	const fileType = await fileTypeFromBuffer(file)

	if (props.ssr) {
		const base64 = uint8ToBase64(file)

		content.value.image = `data:${fileType?.mime};base64, ${base64}`
	} else {
		const blob = new Blob([file], { type: fileType?.mime })

		content.value.image = createObjectURL(blob)
	}
}
async function init() {
    const apairIdParam = !props.ssr && document.location.pathname.match(/\/apair\/media\/([^\/]+)$/)?.[1]
	const [_, baseId, serial] = (props.apairId || apairIdParam)?.match(/(.*):(\d+)$/)
	let apair

	if (props.ssr) {
		const response = (await fetch(`${props.apiServer}/v1/bratags/apair/${baseId}`).then(res => res.json())) || {}

		apair = response.apair
	} else {
		const response = (await $api.fetchApair({ baseId })) || {}

		apair = response.apair
	}

	const og = apair?.premints?.find(p => p.serial === 0)

	content.value = og?.content?.find(c => /\/nftMedia/.test(c.url))

	if (props.ssr) {
		await decrypt('nftMedia', content.value)
	}
}
if (!props.ssr) {
	onBeforeMount(() => {
		init()
	})
} else {
	onServerPrefetch(init)
}
</script>
