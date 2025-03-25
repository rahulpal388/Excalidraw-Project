// import { IAction, IStyles } from "../components/MainComponent";
// import { clearCanvas } from "./clearCanva";
// import { drawExistingShape } from "./drawExistingShape";
// import { drawShape, IselectedShape } from "./drawShape";
// import { getExistingStrokes, Shapes } from "./getShapes";



// export let sCtx: CanvasRenderingContext2D | null
// let dCtx: CanvasRenderingContext2D | null

// export async function initDraw(roomId: string, socket: WebSocket, dCanvas: HTMLCanvasElement, sCanvas: HTMLCanvasElement, action: React.RefObject<IAction>, textAreaRef: React.RefObject<HTMLTextAreaElement | null>, setSelectedTool: React.Dispatch<React.SetStateAction<IAction>>, Style: IStyles, styleRef: HTMLDivElement) {

//     // existingShapes = await getExistingStrokes("chats")

//     sCtx = sCanvas.getContext("2d");
//     dCtx = dCanvas.getContext('2d')

//     if (!sCtx) return
//     if (!dCtx) return

//     sCtx.fillStyle = "rgba(18,18,18,1)"
//     dCtx.fillStyle = "rgba(255, 255, 255, 0)"

//     socket.onmessage = (e) => {
//         const data = JSON.parse(e.data);
//         const message = JSON.parse(data.stroke)
//         if (data.type == "CHAT") {
//             const shape = message
//             existingShapes.push(shape);
//             clearCanvas(sCtx, sCanvas, "static");
//             drawExistingShape(existingShapes, sCtx, Style)
//         }
//     }



//     clearCanvas(sCtx, sCanvas, "static");
//     drawExistingShape(existingShapes, sCtx, Style)
//     drawShape(dCanvas, sCanvas, dCtx, sCtx, socket, action, existingShapes, textAreaRef, setSelectedTool, Style, styleRef)

// }







