import { z } from "zod"


export const CreateUserSchema = z.object({
    email: z.string(),
    username: z.string().min(3).max(10),
    password: z.string()
})

export const SigninSchema = z.object({
    email: z.string(),
    password: z.string()
})


export const RoomSchema = z.object({
    id: z.number(),
    roomname: z.string().min(3).max(10)
})

export const StrokeSchema = z.object({
    id: z.number(),
    roomname: z.string(),
})


export const WsJoinSchema = z.object({
    type: z.string(),
    payload: z.object({
        roomId: z.number()
    })
})

export const WsChatSchema = z.object({
    type: z.string(),
    payload: z.object({
        message: z.string(),
        roomId: z.number(),
    })
})