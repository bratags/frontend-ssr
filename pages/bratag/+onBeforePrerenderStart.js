const {
    MODE,
    VITE_APP_API_KEY
} = import.meta.env

const onBeforePrerenderStart = async () => {
    const url = MODE === 'production' ? 'https://api.june07.com/v1/bratags/ids' : 'https://api.dev.june07.com/v1/bratags/ids'
    const { ids, cursor } = await fetch(url, {
        headers: {
            'x-apikey': VITE_APP_API_KEY
        }
    }).then((res) => res.json())

    return ids?.map((id) => `/bratag/@${id}`) || []
}

export { onBeforePrerenderStart }

