import { Shapes } from "../drawCanvas/getShapes";



export function onDimondShape(shape: Shapes, clientX: number, clientY: number, where: "inside" | "outside" | "both"): boolean {
    if (shape.type === "dimond") {
        const Cy = shape.startY + shape.height
        const inDimond = Math.abs(clientX - shape.startX) + Math.abs(clientY - Cy) <= (shape.width + 10) / 2
        const outDimond = Math.abs(clientX - shape.startX) + Math.abs(clientY - Cy) > (shape.height - 10) / 2

        const onDimond = where === "both" ? inDimond && outDimond : where === "inside" ? inDimond : outDimond
        if (onDimond) {
            return true
        }
    }
    return false
}