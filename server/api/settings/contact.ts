export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const body = await readBody(event)
    const data = await fetch(config.api_v1 + '/settings/contact/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': config.apiKey
        },
        body: JSON.stringify(body)
    })
    return data
})