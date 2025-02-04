export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const data = await fetch(config.api_v1 + "/products/categories_tags/", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": config.apiKey,
        }
    })
    return data
})