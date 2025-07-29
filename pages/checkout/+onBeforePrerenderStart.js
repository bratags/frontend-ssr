const {
    MODE,
    VITE_APP_API_KEY
} = process.env

const onBeforePrerenderStart = async () => {
    const url = MODE !== 'dev' ? 'https://api.june07.com/v1/bratags/checkouts' : 'https://api.dev.june07.com/v1/bratags/checkouts'
    const { checkouts, cursor } = await fetch(url, {
        headers: {
            'x-apikey': VITE_APP_API_KEY
        }
    }).then((res) => res.json())

    return checkouts?.map((checkout) => `/checkout?url=${checkout.url}&slug=${checkout.slug}`) || []
}

export { onBeforePrerenderStart }

