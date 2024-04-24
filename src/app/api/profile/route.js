export async function POST(req) {
    const { name, email, phone } = await req.json()
    return Response.json({ name, email, phone })
}