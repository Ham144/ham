export async function POST(req) {
    const data = await req.FormData()
    const file = data.get("file")

    if (file) {
        console.log(file)
    }
    else {
        console.log("fail")
    }
}