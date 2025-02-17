import { Shapes } from "../drawCanvas/getShapes";



export function onCircleShape(shape: Shapes, clientX: number, clientY: number, onClick: () => void) {
    if (shape.type === "circle") {
        const radiusX = Math.ceil(shape.radiusX)
        const radiusY = Math.ceil(shape.radiusY)
        const eq1 = Math.pow(clientX - shape.startX, 2) / Math.pow(radiusX + 4, 2)
        const eq2 = Math.pow(clientY - shape.startY, 2) / Math.pow(radiusY + 4, 2)
        const eq3 = Math.pow(clientX - shape.startX, 2) / Math.pow(radiusX - 4, 2)
        const eq4 = Math.pow(clientY - shape.startY, 2) / Math.pow(radiusY - 4, 2)
        const onInnerCircle = eq3 + eq4 > 1
        const onOuterCircle = eq1 + eq2 < 1

        if (onInnerCircle && onOuterCircle) {
            onClick()
        }
    }


}