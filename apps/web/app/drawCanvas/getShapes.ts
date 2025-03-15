import axios from "axios";
import { HTTP_BACKEND, Token } from "../../config";
import { IColors, IStyles } from "../components/MainComponent";

export interface IPencileEndDimension {
    endX: number,
    endY: number,
}

export type Shapes = {
    type: "rect",
    startX: number,
    startY: number;
    height: number;
    width: number,
    stroke:IColors
    background:IColors
    strokeWidth:IStyles["strokeWidth"]
    selected: boolean,
    display: boolean
} | {
    type: "circle",
    startX: number,
    startY: number,
    radiusX: number,
    radiusY: number,
    stroke:IColors
    background:IColors
    strokeWidth:IStyles["strokeWidth"]
    selected: boolean,
    display: boolean
} | {
    type: "line",
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    stroke:IColors
    selected: boolean,
    display: boolean
} | {
    type: "dimond",
    startX: number,
    startY: number,
    distance: number,
    stroke:IColors
    background:IColors
    strokeWidth:IStyles["strokeWidth"]
    selected: boolean,
    display: boolean
} | {
    type: "text",
    top: number,
    left: number,
    textSize: number,
    width: number,
    text: string,
    stroke:IColors
    selected: boolean,
    display: boolean
} | {
    type: "pencile",
    startX: number,
    startY: number,
    endDimension: IPencileEndDimension[],
    stroke:IColors
    selected: boolean,
    display: boolean
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
