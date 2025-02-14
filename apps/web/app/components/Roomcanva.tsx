"use client"
import { useEffect, useRef, useState } from "react"
import { Token, WS_BACKEND } from "../../config"
import { MainCanva } from "./MainCanva"

export function RoomCanva({ roomId }: {
    roomId: string
}) {
    const [socket, setScoket] = useState<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket(`${WS_BACKEND}/?token=${Token}`)

        // when ws is connected the add ws to socketRef 
        ws.onopen = () => {
            console.log("websocket connected")
            setScoket(ws)
            ws.send(JSON.stringify({
                type: "JOIN",
                payload: {
                    roomId: Number(roomId)
                }
            }))
        }

    }, [])



    if (!socket) {
        return <div>
            connecting to websocket server.....
        </div>
    }

    return <div>
        <MainCanva roomId={roomId} socket={socket} />
    </div>
}