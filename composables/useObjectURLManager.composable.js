import { onMounted, onBeforeUnmount } from 'vue'

export function useObjectURLManager() {
	const urls = new Set()

	// Create and track new URLs automatically
	function createObjectURL(blob) {
		const url = URL.createObjectURL(blob)
		urls.add(url)
		return url
	}

	// Revoke a single URL (optional)
	function revoke(url) {
		if (urls.has(url)) {
			URL.revokeObjectURL(url)
			urls.delete(url)
		}
	}

	// Revoke all URLs
	function revokeAll() {
		for (const url of urls) {
			URL.revokeObjectURL(url)
		}
		urls.clear()
		console.log('🧹 Revoked all object URLs')
	}

	// Handle tab reload/close
	onMounted(() => {
		window.addEventListener('beforeunload', revokeAll)
	})

	// Handle Vue unmount
	onBeforeUnmount(() => {
		revokeAll()
		window.removeEventListener('beforeunload', revokeAll)
	})

	return { createObjectURL, revoke, revokeAll }
}
