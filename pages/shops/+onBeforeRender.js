const shopMap = new Map()

// onBeforeRender.js
async function onBeforeRender(pageContext) {
	const shopId = pageContext.routeParams.shopId
	const shop = shopMap.get(shopId)

	return {
		pageContext: {
			data: {
				shop,
			},
		},
	}
}

export { onBeforeRender }
