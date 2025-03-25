import { Radius } from "lucide-react";
import { IActionType } from "../drawCanvas/drawShape";



export function lineDimension(startX: number, startY: number, endX: number, endY: number, clientX: number, clientY: number, actionType: IActionType) {
    const radian = Math.atan2((endY - startY), (endX - startX))
    const angle = (radian * 180) / Math.PI
    if (actionType === "move") {

    }

    if (actionType === 'r-resize') {
        const dx = clientX - startX
        const dy = clientY - startY
        const ex = dx + Math.cos(radian)
        // const ey = dy +Math.sin()

        return {
            startX,
            startY,
            endX,
            endY
        }
    }

    return null
}