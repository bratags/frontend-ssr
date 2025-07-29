const {
    MODE,
    VITE_APP_API_KEY
} = process.env

const onBeforePrerenderStart = async () => {
    try {
        const apiUrl = MODE !== 'dev' ? 'https://api.june07.com/v1/bratags/checkouts' : 'https://api.dev.june07.com/v1/bratags/checkouts'
        const response = await fetch(apiUrl, {
            headers: {
                'x-apikey': VITE_APP_API_KEY
            }
        }).then((res) => res.json())

        const { checkouts, cursor: _cursor } = response

        return checkouts?.map((checkout) => {
            const { url, slug } = checkout

            if (!slug || slug == 'null') {
                return
            }
            if (!url || url == 'null') {
                return
            }

            const encodedUrl = encodeURIComponent(url)

            return `/checkout?url=${encodedUrl}&slug=${slug}`
        })?.filter((Boolean)) || []
    } catch (error) {
        console.error(error)
        return []
    }
}

export { onBeforePrerenderStart }

