
import { Shapes } from "./getShapes";
import { findDistance } from "./findDistance";



export function selectShape(canvas: HTMLCanvasElement, existingShapes: Shapes[], ctx: CanvasRenderingContext2D, clientX: number, clientY: number, selectedShape: Shapes[]) {

    existingShapes.forEach(x => {
        if (x.type === "rect") {
            const leftSide = x.startX - 4 < clientX && x.startX + 4 > clientX && x.startY < clientY && x.startY + x.height > clientY
            const rightSide = x.startX + x.width - 4 < clientX && x.startX + x.width + 4 > clientX && x.startY < clientY && x.startY + x.height > clientY
            const topSide = x.startY - 4 < clientY && x.startY + 4 > clientY && x.startX < clientX && x.startX + x.width > clientX
            const bottomSide = x.startY + x.height - 4 < clientY && x.startY + x.height + 4 > clientY && x.startX < clientX && x.startX + x.width > clientX


            if (leftSide || rightSide || topSide || bottomSide) {
                canvas.style.cursor = "move"
                selectedShape.length = 0;
                selectedShape.push(x);
            }
        }
        if (x.type === "line") {
            const length = findDistance(x.startX, x.startY, x.endX, x.endY)
            const rigthLenght = findDistance(x.startX, x.startY, clientX, clientY)
            const leftLenght = findDistance(x.endX, x.endY, clientX, clientY)
            const onLine = Math.ceil(length) === Math.ceil(rigthLenght + leftLenght)
            if (onLine) {
                canvas.style.cursor = "move"
                selectedShape.length = 0;
                selectedShape.push(x);
            }
        }
        if (x.type === "circle") {
            const radiusX = Math.ceil(x.radiusX)
            const radiusY = Math.ceil(x.radiusY)
            const eq1 = Math.pow(clientX - x.startX, 2) / Math.pow(radiusX + 4, 2)
            const eq2 = Math.pow(clientY - x.startY, 2) / Math.pow(radiusY + 4, 2)
            const eq3 = Math.pow(clientX - x.startX, 2) / Math.pow(radiusX - 4, 2)
            const eq4 = Math.pow(clientY - x.startY, 2) / Math.pow(radiusY - 4, 2)
            const onInnerCircle = eq3 + eq4 > 1
            const onOuterCircle = eq1 + eq2 < 1


            if (onInnerCircle && onOuterCircle) {
                canvas.style.cursor = "move";
                selectedShape.length = 0;
                selectedShape.push(x);
            }
        }


        if (x.type === "dimond") {
            const Cy = x.startY + x.distance / 2
            const inDimond = Math.abs(clientX - x.startX) + Math.abs(clientY - Cy) <= (x.distance + 10) / 2
            const outDimond = Math.abs(clientX - x.startX) + Math.abs(clientY - Cy) > (x.distance - 10) / 2
            if (outDimond && inDimond) {
                canvas.style.cursor = "move"
                selectedShape.length = 0;
                selectedShape.push(x)
            }

        }



    })

}


