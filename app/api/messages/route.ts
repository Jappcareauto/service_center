
import { NextRequest, NextResponse } from "next/server"
import axios from "axios";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { userId, message, chatRoomId, timestamp, type, appointmentId } = body;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    var data = JSON.stringify({
        "senderId": `${userId}`,
        "content": `${message}`,
        "chatRoomId": `${chatRoomId}`,
        "timestamp": `${timestamp}`,
        "type": `${type}`,
        "appointmentId": `${appointmentId}`,
    });
    try {
        var config = {
            method: 'post',
            url: process.env.API_URL + 'chat-message',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: data
        };
        const sender = await axios(config);
        console.log(data)
        return new NextResponse(
            JSON.stringify(sender.data), { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify(error), { status: 500 }
        )
    }

}

export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const chatRoomId = searchParams.get("chatRoomId");
    try {
        var config = {
            method: 'get',
            url: process.env.API_URL + 'chat-message/chatroom/' + chatRoomId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        const sender = await axios(config);
        console.log(sender.data.data)
        return new NextResponse(
            JSON.stringify(sender.data), { status: 200 }
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify(error), { status: 500 }
        )
    }

}


