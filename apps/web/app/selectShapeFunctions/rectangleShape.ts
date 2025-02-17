import { Shapes } from "../drawCanvas/getShapes";


export function onRectangleShape(shape: Shapes, clientX: number, clientY: number, onClick: () => void) {
    if (shape.type === "rect") {
        const leftSide = shape.startX - 4 < clientX && shape.startX + 4 > clientX && shape.startY < clientY && shape.startY + shape.height > clientY
        const rightSide = shape.startX + shape.width - 4 < clientX && shape.startX + shape.width + 4 > clientX && shape.startY < clientY && shape.startY + shape.height > clientY
        const topSide = shape.startY - 4 < clientY && shape.startY + 4 > clientY && shape.startX < clientX && shape.startX + shape.width > clientX
        const bottomSide = shape.startY + shape.height - 4 < clientY && shape.startY + shape.height + 4 > clientY && shape.startX < clientX && shape.startX + shape.width > clientX


        if (leftSide || rightSide || topSide || bottomSide) {
            onClick()
        }
    }

}