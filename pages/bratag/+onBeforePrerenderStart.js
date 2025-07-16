const {
    VITE_APP_API_KEY
} = process.env

const onBeforePrerenderStart = async () => {
    const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development'
    const url = MODE === 'production' ? 'https://api.june07.com/v1/bratags/ids' : 'https://api.dev.june07.com/v1/bratags/ids'
    const { ids, cursor } = await fetch(url, {
        headers: {
            'x-apikey': VITE_APP_API_KEY
        }
    }).then((res) => res.json())

    return ids?.map((id) => `/bratag/${id}`) || []
}

export { onBeforePrerenderStart }

