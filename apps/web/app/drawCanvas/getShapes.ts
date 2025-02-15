import axios from "axios";
import { HTTP_BACKEND, Token } from "../../config";


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
    radiusX: number,
    radiusY: number,
    display: boolean
} | {
    type: "line",
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    display: boolean
} | {
    type: "dimond",
    startX: number,
    startY: number,
    distance: number,
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
