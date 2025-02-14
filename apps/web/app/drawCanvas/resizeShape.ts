
import { Shapes } from "./getShapes";
import { IAction } from "../components/MainCanva";
import { clearCanvas } from ".";



export function resizeShape(canvas: HTMLCanvasElement, existingShapes: Shapes[], ctx: CanvasRenderingContext2D, clientX: number, clientY: number, selectedShape: Shapes[]) {

    existingShapes.forEach(x => {
        if (x.type === "rect") {
            if (x.startX - 4 < clientX && x.startX + 4 > clientX || x.startY - 4 < clientY && x.startY + 4 > clientY || x.startX + x.width - 4 < clientX && x.startX + x.width + 4 > clientX || x.startY + x.height - 4 < clientY && x.startY + x.height + 4 > clientY) {
                canvas.style.cursor = "move"
                selectedShape.length = 0;
                selectedShape.push(x);
            }
        }
        if (x.type === "line") {
            const length = Math.sqrt(Math.pow(x.endX - x.startX, 2) + Math.pow(x.endY - x.startY, 2));
            const rigthLenght = Math.sqrt(Math.pow(clientX - x.startX, 2) + Math.pow(clientY - x.startY, 2))
            const leftLenght = Math.sqrt(Math.pow(x.endX - clientX, 2) + Math.pow(x.endY - clientY, 2))
            const onLine = Math.ceil(length) === Math.ceil(rigthLenght + leftLenght)
            if (onLine) {
                canvas.style.cursor = "move"
                selectedShape.length = 0;
                selectedShape.push(x);
            }
        }
        if (x.type === "circle") {
            const length = Math.sqrt(Math.pow(x.startX - clientX, 2) + Math.pow(x.startY - clientY, 2))
            const onInnerCircle = Math.ceil(length) > Math.ceil(x.radius - 3) && Math.ceil(length) < Math.ceil(x.radius + 3)

            if (onInnerCircle) {
                canvas.style.cursor = "move";
                selectedShape.length = 0;
                selectedShape.push(x);
            }
        }
    })

}


