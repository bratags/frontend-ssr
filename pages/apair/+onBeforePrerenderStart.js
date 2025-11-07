const { MODE, VITE_APP_API_KEY } = process.env

const onBeforePrerenderStart = async () => {
	const url = MODE !== 'dev' ? 'https://api.june07.com/v1/bratags/apair/ids' : 'https://api.dev.june07.com/v1/bratags/apair/ids'
	const allIds = []
	let cursor = 0

	try {
		while (true) {
			const res = await fetch(`${url}?cursor=${cursor}`, {
				headers: {
					'x-apikey': VITE_APP_API_KEY,
				},
			})

			if (!res.ok) {
				console.warn(`Fetch failed with status ${res.status}`)
				break
			}

			console.log(`res: ${JSON.stringify(res)}`)

			const { ids = [], cursor: nextCursor } = await res.json()

			console.log(`Fetched ${ids.length} IDs, cursor: ${nextCursor}`)

			allIds.push(...ids.filter(Boolean))

			// stop if no more pages
			if (!nextCursor || nextCursor === '0' || nextCursor === 0) {
				break
			}

			cursor = nextCursor
		}
	} catch (err) {
		console.error('Error fetching IDs:', err)
	}

	return allIds.map(id => `/apair/${id}`) || []
}

export { onBeforePrerenderStart }
