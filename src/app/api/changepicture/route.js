export async function POST(req) {
    const data = await req.FormData()
    const file = data.get("file")
    console.log(file)
}