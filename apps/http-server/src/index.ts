import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CreateUserSchema, RoomSchema, SigninSchema, StrokeSchema } from "@repo/common/type"
import { Client } from "@repo/db/prismaClinet"
import AuthMiddleware from "./AuthMiddleware";
import { JWT_SECRET } from "@repo/backend-common/config"
import cors from "cors"




const app = express()
const saltRound = 12;

app.use(express.json())
app.use(cors())

app.post("/signup", async (req, res) => {
    const payload = CreateUserSchema.safeParse(req.body);

    if (!payload.success) {
        res.status(400).json({
            message: "wrong formate"
        })
        return;
    }


    try {

        const response = await Client.user.findFirst({
            where: {
                email: payload.data.email
            }
        })

        // if user not exist create user
        if (!response) {
            const salt = bcrypt.genSaltSync(saltRound);
            const hashPassword = bcrypt.hashSync(payload.data.password, salt);
            await Client.user.create({
                data: {
                    email: payload.data.email,
                    username: payload.data.username,
                    password: hashPassword
                }
            }).then(() => {
                res.status(200).json({
                    message: "user created"
                })
            })
        } else {
            // if user exist don't create user 

            res.status(409).json({
                message: "User already exist"
            })
        }


    } catch (err) {
        if (err) {
            res.status(500).json({
                message: "Server error"
            })
        }
    }


})

app.get("/signin", async (req, res) => {
    const payload = SigninSchema.safeParse(req.body);

    if (!payload.success) {
        res.status(400).json({
            message: "wrong formate"
        })
        return;
    }

    const response = await Client.user.findFirst({
        where: {
            email: payload.data.email
        }
    })

    // if user not found
    if (!response) {
        res.status(404).json({
            message: "user not found signup first"
        })
        return;
    }

    // check password
    const verifyPassword = bcrypt.compareSync(payload.data.password, response.password);

    if (verifyPassword) {
        // create jwt token
        const token = jwt.sign({
            id: response.id
        }, JWT_SECRET)


        res.status(200).json({
            token
        })


    } else {
        // incorrect password
        res.status(401).json({
            message: "Incorerect password"
        })
    }


})


app.get("/create/room", AuthMiddleware, async (req, res) => {
    const payload = RoomSchema.safeParse(req.body);
    console.log(req.body)
    if (!payload.success) {
        res.status(404).json({
            message: "invalid formate"
        })
        return;
    }

    try {
        await Client.room.create({
            data: {
                userId: req.body.id,
                roomname: payload.data.roomname
            }
        }).then((response) => {
            res.status(200).json({
                roomId: response.id
            })
        })



    } catch (error) {
        if (error) {
            res.status(404).json({
                message: "error while creating room"
            })
        }
    }


})


app.post("/strokes", AuthMiddleware, async (req, res) => {
    const payload = StrokeSchema.safeParse(req.body);
    if (!payload.success) {
        res.status(404).json({
            message: "invalid formate"
        })
        return;
    }

    try {
        console.log(payload.data.roomname)
        // await Client.room.findFirst({
        //     where: {
        //         roomname: payload.data.roomname
        //     }
        // }).then(async (data) => {
        //     if (!data) return;
        //     console.log(data)
        //     const response = await Client.strokes.findMany({
        //         where: {
        //             roomId: data.id
        //         }
        //     })


        res.status(200).json({
            strokes: []
        })
        // })

    } catch (error) {
        if (error) {
            res.status(500).json({
                messeage: "error while getting room strokes"
            })
        }
    }

})


app.post("/room/delete", AuthMiddleware, async (req, res) => {
    const payload = RoomSchema.safeParse(req.body);
    if (!payload.success) {
        res.status(404).json({
            message: "invalid formate"
        })
    }

    try {
        const response = await Client.room.findFirst({
            where: {
                roomname: payload.data?.roomname
            }
        })

        await Client.strokes.findFirst({
            where: {
                roomId: response?.id
            }
        }).then(async (response) => {
            await Client.strokes.delete({
                where: {
                    id: response?.id
                }
            })
        })

        await Client.room.delete({
            where: {
                id: response?.id
            }
        })



        res.status(200).json({
            message: "room deleted"
        })
    } catch (error) {
        if (error) {
            res.status(500).json({
                message: "Error while deleting the room"
            })
        }
    }
})


app.listen(8080, () => {
    console.log("listening on port 8080.........")
})