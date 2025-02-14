import axios from "axios";
import { HTTP_BACKEND, Token } from "../../config";
import { initDraw } from ".";
import { RefObject } from "react";
import { IAction, IShapeType } from "../components/MainCanva";
import { resizeShape } from "./resizeShape";


export type Shapes = {
    type: "rect",
    startX: number,
    startY: number;
    height: number;
    width: number,
    display: boolean
} | {
    type: "circle",
    startX: number,
    startY: number,
    radius: number,
    display: boolean
} | {
    type: "line",
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    display: boolean
}

let exsistingShapes: Shapes[] = [];

export async function setExistingShapeFunction() {
    exsistingShapes = await getExistingStrokes("chats")
}


export function mainFunction(canvaRef: RefObject<HTMLCanvasElement | null>, roomId: string, socket: WebSocket, shapeTypeRef: RefObject<IShapeType>, action: IAction, isResize: boolean) {


}




export async function getExistingStrokes(roomname: string) {
    const response = await axios.post(`${HTTP_BACKEND}/strokes`,
        { roomname: `${roomname}` }, // Data goes here
        {
            headers: {
                token: `${Token}`,
                "Content-Type": "application/json"
            }
        }
    );

    const data = response.data.strokes
    const shape = data.map((x: { stroke: string }) => {
        const messageData = JSON.parse(x.stroke);
        return messageData
    })

    return shape

}
