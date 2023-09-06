
export async function getRequestBody(req: Request){
    try {
        let data = await req.json()
        return data;

    } catch (error) {
        
        return null;
    }
}