export async function POST(req) {
    const url = req.url
    const searchString = url.split('=')[1]

    return Response.json({ ok: true })
}
