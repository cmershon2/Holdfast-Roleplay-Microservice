import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({ "message": "Hello, world!" })
}

type example = {
    name?: string,
    message?: string
}

export async function POST(request: Request) {
    const data: example = await request.json();

    const {name, message} = data;

    return NextResponse.json({name, message});
}