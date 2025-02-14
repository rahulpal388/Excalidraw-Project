import WebSocket, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"
import { WsChatSchema, WsJoinSchema } from "@repo/common/type"
import { Client } from "@repo/db/prismaClinet"

const ws = new WebSocketServer({ port: 8081 }, () => { console.log("websocket server started ") })

interface IUser {
    userId: number,
    socket: WebSocket,
    roomId: number[]
}

const Users: IUser[] = []

ws.on("connection", (socket, request) => {
    const url = request.url

    // if not url then return
    if (!url) return;

    // search queryparam 
    const queryParam = new URLSearchParams(url.split("?")[1])
    const token = queryParam.get("token");
    console.log(token)

    // if token param is empty then return
    if (!token) return;

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET)
        if (typeof decodedToken === "string") return
        const userId = decodedToken.id

        // add the user to users array
        Users.push({
            userId: decodedToken.id,
            socket: socket,
            roomId: []
        })

        socket.on("message", async (data) => {
            const parseData = JSON.parse(data as unknown as string);
            // push the user into User array with socke and roomId
            if (parseData.type === "JOIN") {
                const verifyData = WsJoinSchema.safeParse(parseData)
                if (!verifyData.success) return;

                const user = Users.find(x => x.socket === socket);
                user?.roomId.push(verifyData.data.payload.roomId)

                // send acknowledgedment message
                socket.send(JSON.stringify({
                    message: "You have joined the room"
                }))
            }


            // when user want to chat the room
            if (parseData.type === "CHAT") {
                const verifyData = WsChatSchema.safeParse(parseData);
                if (!verifyData.success) return;
                // add the message to database
                // await Client.strokes.create({
                //     data: {
                //         stroke: `${verifyData.data.payload.message}`,
                //         userId: decodedToken.id,
                //         roomId: verifyData.data.payload.roomId,
                //     }
                // })

                // logic to send data except the sender

                Users.forEach(user => {
                    if (user.roomId.includes(verifyData.data.payload.roomId)) {
                        // send the data
                        user.socket.send(JSON.stringify({
                            type: "CHAT",
                            stroke: verifyData.data.payload.message
                        }))
                    }


                })
            }



            // living the room
            if (parseData.type === "LEAVE") {
                Users.filter(user => user.userId === decodedToken.id)
            }

        })

    } catch (error) {
        if (error) {
            socket.send(JSON.stringify({
                message: "Invalid token"
            }))
            socket.close();
        }
    }

})