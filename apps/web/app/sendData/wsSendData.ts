


export function WsSend(
    socket: WebSocket,
    data: {
        type: "Chat" | "JOIN",
        payload: {
            roomId: number,
            shapes: string
        }
    }) {
    socket.send(JSON.stringify(data))
}