const {
    MODE,
    VITE_APP_API_KEY
} = process.env

const onBeforePrerenderStart = async () => {
    try {
        const url = MODE !== 'dev' ? 'https://api.june07.com/v1/bratags/ids?type=modelSlugs' : 'https://api.dev.june07.com/v1/bratags/ids?type=modelSlugs'
        const { ids, cursor: _cursor } = await fetch(url, {
            headers: {
                'x-apikey': VITE_APP_API_KEY
            }
        }).then((res) => res.json())

        return ids?.map((slug) => slug && `/model/${slug}`)?.filter(Boolean) || []
    } catch (error) {
        console.error(error)
        return []
    }
}

export { onBeforePrerenderStart }

