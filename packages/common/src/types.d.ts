import { z } from "zod";
export declare const CreateUserSchema: z.ZodObject<{
    email: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    username: string;
    password: string;
}, {
    email: string;
    username: string;
    password: string;
}>;
export declare const SigninSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const RoomSchema: z.ZodObject<{
    id: z.ZodNumber;
    roomname: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    roomname: string;
}, {
    id: number;
    roomname: string;
}>;
export declare const StrokeSchema: z.ZodObject<{
    id: z.ZodNumber;
    roomname: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    roomname: string;
}, {
    id: number;
    roomname: string;
}>;
export declare const WsJoinSchema: z.ZodObject<{
    type: z.ZodString;
    payload: z.ZodObject<{
        roomId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        roomId: number;
    }, {
        roomId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    type: string;
    payload: {
        roomId: number;
    };
}, {
    type: string;
    payload: {
        roomId: number;
    };
}>;
export declare const WsChatSchema: z.ZodObject<{
    type: z.ZodString;
    payload: z.ZodObject<{
        message: z.ZodString;
        roomId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        message: string;
        roomId: number;
    }, {
        message: string;
        roomId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    type: string;
    payload: {
        message: string;
        roomId: number;
    };
}, {
    type: string;
    payload: {
        message: string;
        roomId: number;
    };
}>;
//# sourceMappingURL=types.d.ts.map