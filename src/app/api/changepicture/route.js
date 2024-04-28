export async function POST(req) {
    const data = await req.FormData()
    const file = data.get("file")
    if (file.length === 1) {
        Response.json("Ok")
    }
}