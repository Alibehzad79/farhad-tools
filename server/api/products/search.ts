export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const query = getQuery(event)
    const data = await fetch(config.api_v1 + "/products/search/?query=" + query.query, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": config.apiKey,
        }
    })
    return data
})