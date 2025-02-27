import { Shapes } from "./getShapes";
import { isRectangleShape } from "../selectShapeFunctions/rectangleShape";
import { onCircleShape } from "../selectShapeFunctions/circleShape";
import { IActionType } from "./drawShape";
import { CodeSquare } from "lucide-react";
import { onDimondShape } from "../selectShapeFunctions/dimondShape";
import { onLineShape } from "../selectShapeFunctions/lineShape";



export function onShape(sCanvas: HTMLCanvasElement, existingShapes: Shapes[], clientX: number, clientY: number, selectedShape: Shapes[]) {
    selectedShape.length = 0

    existingShapes.forEach(x => {
        if (x.type === "rect") {
            const onRectangle = isRectangleShape(x.startX - 4, x.startY - 4, x.width + 8, x.height + 8, clientX, clientY, "inside") && isRectangleShape(x.startX + 4, x.startY + 4, x.width - 8, x.height - 8, clientX, clientY, "outside")
            if (onRectangle && !x.selected) {
                sCanvas.style.cursor = "move"
                selectedShape.push(x)

            }

        }
        if (x.type === "circle") {
            const onCircle = onCircleShape(x, clientX, clientY, "both")
            if (onCircle && !x.selected) {
                sCanvas.style.cursor = "move"
                selectedShape.push(x)

            }
        }


        if (x.type === "dimond") {
            const onDimond = onDimondShape(x, clientX, clientY, "both")
            if (onDimond && !x.selected) {
                sCanvas.style.cursor = "move"
                selectedShape.push(x)
            }

        }


        if (x.type === "line") {
            const onLine = onLineShape(x, clientX, clientY)
            if (onLine && !x.selected) {
                sCanvas.style.cursor = "move"
                selectedShape.push(x)
            }
        }

    })


}


