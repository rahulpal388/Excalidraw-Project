"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsChatSchema = exports.WsJoinSchema = exports.StrokeSchema = exports.RoomSchema = exports.SigninSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    username: zod_1.z.string().min(3).max(10),
    password: zod_1.z.string()
});
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.RoomSchema = zod_1.z.object({
    id: zod_1.z.number(),
    roomname: zod_1.z.string().min(3).max(10)
});
exports.StrokeSchema = zod_1.z.object({
    id: zod_1.z.number(),
    roomname: zod_1.z.string(),
});
exports.WsJoinSchema = zod_1.z.object({
    type: zod_1.z.string(),
    payload: zod_1.z.object({
        roomId: zod_1.z.number()
    })
});
exports.WsChatSchema = zod_1.z.object({
    type: zod_1.z.string(),
    payload: zod_1.z.object({
        message: zod_1.z.string(),
        roomId: zod_1.z.number(),
    })
});
