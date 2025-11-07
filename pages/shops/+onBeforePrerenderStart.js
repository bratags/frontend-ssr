import { getEnv } from '../../env.js'

const MODE = getEnv('MODE', 'dev')
const VITE_APP_API_KEY = getEnv('VITE_APP_API_KEY')
const shopMap = new Map()

const onBeforePrerenderStart = async () => {
    const url = MODE !== 'dev' ? 'https://api.june07.com/v1/bratags/shops' : 'https://api.dev.june07.com/v1/bratags/shops'
    const { shops, cursor: _cursor } = await fetch(url, {
        headers: {
            'x-apikey': VITE_APP_API_KEY
        }
    }).then((res) => res.json())

    // parse JSON values and store in map
    shops?.forEach((shop) => {
        try {
            shopMap.set(shop.field, { ...JSON.parse(shop.value), id: shop.field })
        } catch {
            console.warn('Invalid shop value', shop)
        }
    })

    return shops?.map((shop) => shop && `/shops/${shop.field}`)?.filter(Boolean) || []
}

export { onBeforePrerenderStart }

// onBeforeRender.js
export async function onBeforeRender(pageContext) {
    const shopId = pageContext.routeParams.shopId
    const shop = shopMap.get(shopId)

    return {
        pageContext: {
            data: {
                shop
            }
        }
    }
}