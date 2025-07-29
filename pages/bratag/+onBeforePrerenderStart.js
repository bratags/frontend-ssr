const {
    MODE,
    VITE_APP_API_KEY
} = process.env

const onBeforePrerenderStart = async () => {
    const url = MODE !== 'dev' ? 'https://api.june07.com/v1/bratags/ids' : 'https://api.dev.june07.com/v1/bratags/ids'
    const { ids, cursor: _cursor } = await fetch(url, {
        headers: {
            'x-apikey': VITE_APP_API_KEY
        }
    }).then((res) => res.json())

    return ids?.map((id) => id && `/bratag/${id}`)?.filter(Boolean) || []
}

export { onBeforePrerenderStart }

