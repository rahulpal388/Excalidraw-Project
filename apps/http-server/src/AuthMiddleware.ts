import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"


interface IRequestBody {
    id: number
}


export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.token;

    if (!token) {
        res.status(404).json({
            messsage: "token is undefine"
        })
        return;
    }


    try {
        const decodedToken = jwt.verify(token as string, JWT_SECRET)

        // return if the type of decodedtoken is string

        if (typeof decodedToken === "string") return;

        (req.body as IRequestBody).id = decodedToken.id;
        next();

    } catch (err) {
        if (err) {
            res.status(404).json({
                message: "invalid token"
            })
        }
    }



}