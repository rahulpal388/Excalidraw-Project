import { IAction, IStyles } from "../components/MainComponent";
import { rectangle } from "../drawShape/rectangle";
import { clearCanvas } from "./clearCanva";
import { circle } from "../drawShape/circle";
import { arrow } from "../drawShape/line";
import { Shapes } from "./getShapes";
import { CanvaChangeShapeUpdate, CanvaShapeUpdate } from "../shapeUpdates/shapeUpdate";
import { onShape } from "./onShapes";
import { drawExistingShape } from "./drawExistingShape";
import { markSelectedShape } from "./markSelectedShape";
import { onMarkedLine, onMarkedShape } from "../selectShapeFunctions/markedShape";
import { rectangleDimension } from "../findDimension/rectangleDimension";
import { circleDimension } from "../findDimension/circleDimension";
import { dimond } from "../drawShape/dimond";

// when you are clearning the canva you can specify the height and width so, it good to not clear the whole canva only the visual part is enough and it also get grids of the drawing of the shape that are not visiual on the sereen #fix it 

// move IAction name to IShape


export type IActionType = "move" | "l-resize" | "r-resize" | "t-resize" | "b-resize" | "none" | "t-cl-resize" | "t-cr-resize" | "b-cl-resize" | "b-cr-resize" | "rotate"

export let isSelected = { value: false }
export let existingShapes: Shapes[] = []

export class Draw {
    private sCanva: HTMLCanvasElement
    private dCanva: HTMLCanvasElement
    private sCtx: CanvasRenderingContext2D
    private dCtx: CanvasRenderingContext2D
    action: IAction
    style: IStyles
    socket: WebSocket
    setSelectedTool: React.Dispatch<React.SetStateAction<IAction>>
    existingShapes: Shapes[] = []
    currentShape: { value: Shapes } = {} as { value: Shapes }
    startX = 0
    startY = 0
    endY = 0
    endX = 0
    clientX = 0
    clientY = 0
    clicked = false
    height = 0
    width = 0
    radiusX = 0
    radiusY = 0
    isOnShape: { value: boolean } = { value: false }
    actionType: IActionType = "none"
    moveX = 0
    moveY = 0
    top = 0
    left = 0
    shape: Shapes = {} as Shapes


    constructor(sCanav: HTMLCanvasElement, dCanva: HTMLCanvasElement, sCtx: CanvasRenderingContext2D, dCtx: CanvasRenderingContext2D, action: IAction, style: IStyles, setSelectedTool: React.Dispatch<React.SetStateAction<IAction>>, socket: WebSocket) {
        this.sCanva = sCanav
        this.dCanva = dCanva
        this.sCtx = sCtx
        this.dCtx = dCtx
        this.action = action
        this.style = style
        this.setSelectedTool = setSelectedTool
        this.socket = socket


        this.dCanva.addEventListener("mousedown", this.dCanvaDown)
        this.dCanva.addEventListener("mousemove", this.dCanvaMove)
        this.dCanva.addEventListener("mouseup", this.dCanvaUp)
        this.sCanva.addEventListener("mousedown", this.sCanvaDown)
        this.sCanva.addEventListener("mouseup", this.sCanvaUp)
        this.sCanva.addEventListener("mousemove", this.sCanvaMove)
    }

    dCanvaDown = (e: MouseEvent) => {
        this.startX = Math.ceil(window.scrollX) + e.clientX
        this.startY = Math.ceil(window.scrollY) + e.clientY
        this.clicked = true

    }
    dCanvaMove = (e: MouseEvent) => {
        this.clientX = Math.ceil(window.scrollX) + e.clientX
        this.clientY = Math.ceil(window.scrollY) + e.clientY
        this.dCanva.style.cursor = "crosshair"

        if (this.clicked) {
            this.height = this.clientY - this.startY;
            this.width = this.clientX - this.startX
            if (this.action.type !== "pointer") {
                if (this.action.type === "rect") {
                    clearCanvas(this.dCtx, this.dCanva, "dymanic")
                    rectangle(this.startX, this.startY, this.width, this.height, this.dCtx, this.style.stroke, this.style.strokeWidth, this.style.background, "rounded")

                }
                if (this.action.type === "circle") {
                    clearCanvas(this.dCtx, this.dCanva, "dymanic")
                    circle(this.startX, this.startY, Math.abs(this.width), Math.abs(this.height), this.dCtx, this.style.stroke, this.style.strokeWidth, this.style.background)
                }
                if (this.action.type === "arrow") {
                    clearCanvas(this.dCtx, this.dCanva, "dymanic")
                    arrow(this.startX, this.startY, this.clientX, this.clientY, this.style.stroke, this.style.strokeWidth, this.dCtx)
                }
                if (this.action.type === "dimond ") {
                    clearCanvas(this.dCtx, this.dCanva, "dymanic")
                    dimond(this.startX, this.startY, this.width, this.height, this.style.stroke, this.style.strokeWidth, this.style.background, this.dCtx)
                }
            }
            if (isSelected.value && this.actionType !== "none") {
                const shape = this.shape
                this.moveX = this.clientX - this.startX;
                this.moveY = this.clientY - this.startY

                let currentMovingShape: Shapes = {} as Shapes

                // move the shape and resize the shapw
                if (shape.type === "rect") {
                    const dimension = rectangleDimension(shape.startX, shape.startY, shape.width, shape.height, this.clientX, this.clientY, this.actionType, { a: this.left, b: this.top })
                    if (!dimension) return
                    const { startX, startY, height, width, cursorType, markX, markY, markHeight, markWidth } = dimension
                    this.dCanva.style.cursor = cursorType
                    clearCanvas(this.dCtx, this.dCanva, "dymanic")
                    rectangle(startX, startY, width, height, this.dCtx, shape.stroke, shape.strokeWidth, shape.background, "rounded")
                    currentMovingShape = {
                        id: this.shape.id,
                        type: "rect",
                        startX: markX,
                        startY: markY,
                        height: markHeight,
                        width: markWidth,
                        selected: true,
                        display: true,
                        stroke: this.style.stroke,
                        background: this.style.background,
                        strokeWidth: this.style.strokeWidth,
                    }
                }
                if (shape.type === "circle") {
                    const dimension = circleDimension(shape.startX, shape.startY, shape.radiusX, shape.radiusY, this.clientX, this.clientY, this.actionType, { a: this.left, b: this.top })
                    if (!dimension) return
                    const { startX, startY, radiusX, radiusY, moveX, moveY, cursorType } = dimension
                    this.dCanva.style.cursor = cursorType
                    clearCanvas(this.dCtx, this.dCanva, "dymanic")
                    circle(startX, startY, Math.abs(radiusX), Math.abs(radiusY), this.dCtx, shape.stroke, shape.strokeWidth, shape.background)
                    currentMovingShape = {
                        id: this.currentShape.value.id,
                        type: "circle",
                        startX: moveX,
                        startY: moveY,
                        radiusX,
                        radiusY,
                        selected: true,
                        display: true,
                        stroke: this.style.stroke,
                        background: this.style.background,
                        strokeWidth: this.style.strokeWidth,
                    }
                }
                markSelectedShape(this.dCtx, currentMovingShape, this.actionType)
            }


        }

    }

    dCanvaUp = (e: MouseEvent) => {
        this.clientX = Math.ceil(window.scrollX) + e.clientX
        this.clientY = Math.ceil(window.scrollY) + e.clientY
        this.clicked = false

        if (this.action.type !== "pointer") {

            const id = existingShapes.length + 1
            if (this.action.type == "rect") {
                CanvaShapeUpdate(this.sCtx, this.sCanva, this.dCtx, this.dCanva, this.socket, existingShapes, this.style, {
                    id,
                    type: "rect",
                    startX: this.startX,
                    startY: this.startY,
                    height: this.height,
                    width: this.width,
                    stroke: this.style.stroke,
                    strokeWidth: this.style.strokeWidth,
                    background: this.style.background,
                    display: true,
                    selected: false
                })
                this.setSelectedTool({ type: "pointer" })
                return

            }
            if (this.action.type === "circle") {
                CanvaShapeUpdate(this.sCtx, this.sCanva, this.dCtx, this.dCanva, this.socket, existingShapes, this.style, {
                    id,
                    type: "circle",
                    startX: this.startX,
                    startY: this.startY,
                    radiusY: Math.abs(this.height),
                    radiusX: Math.abs(this.width),
                    stroke: this.style.stroke,
                    strokeWidth: this.style.strokeWidth,
                    background: this.style.background,
                    display: true,
                    selected: false
                })
                this.setSelectedTool({ type: "pointer" })
                return
            }

            if (this.action.type === "arrow") {
                CanvaShapeUpdate(this.sCtx, this.sCanva, this.dCtx, this.dCanva, this.socket, existingShapes, this.style, {
                    id,
                    type: "arrow",
                    startX: this.startX,
                    startY: this.startY,
                    endX: this.clientX,
                    endY: this.clientY,
                    stroke: this.style.stroke,
                    strokeWidth: this.style.strokeWidth,
                    display: true,
                    selected: false
                })
                this.setSelectedTool({ type: "pointer" })
                return
            }
            if (this.action.type === "dimond ") {
                CanvaShapeUpdate(this.sCtx, this.sCanva, this.dCtx, this.dCanva, this.socket, existingShapes, this.style, {
                    id,
                    type: "dimond",
                    startX: this.startX,
                    startY: this.startY,
                    width: this.width,
                    height: this.height,
                    stroke: this.style.stroke,
                    strokeWidth: this.style.strokeWidth,
                    background: this.style.background,
                    display: true,
                    selected: false
                })
                this.setSelectedTool({ type: "pointer" })
                return
            }
        }


        if (this.moveX === 0 && this.moveY === 0) {
            clearCanvas(this.dCtx, this.dCanva, "dymanic")
            this.dCanva.style.display = "none"
            existingShapes.forEach(x => {
                if (x.id === this.shape.id && x.selected) {
                    x.display = true
                    x.selected = false
                }
            })
            clearCanvas(this.sCtx, this.sCanva, "static")
            drawExistingShape(existingShapes, this.sCtx, this.style)
            isSelected.value = false
            this.actionType = "none"
            return
        }

        const index = existingShapes.findIndex(x => x.id === this.shape.id)
        existingShapes.splice(index, 1)
        const id = this.shape.id

        let changeShape: Shapes = {} as Shapes

        if (this.shape.type === "rect") {
            const { startX, startY, width, height, stroke, background, strokeWidth } = this.shape
            const dimension = rectangleDimension(startX, startY, width, height, this.clientX, this.clientY, this.actionType, { a: this.left, b: this.top })
            if (!dimension) return
            changeShape = {
                id,
                type: "rect",
                startX: dimension.x,
                startY: dimension.y,
                height: Math.abs(dimension.height),
                width: Math.abs(dimension.width),
                stroke,
                background,
                strokeWidth,
                selected: true,
                display: true
            }

        }
        if (this.shape.type === "circle") {
            const { startX, startY, radiusX, radiusY, stroke, strokeWidth, background } = this.shape

            const dimension = circleDimension(startX, startY, radiusX, radiusY, this.clientX, this.clientY, this.actionType, { a: this.left, b: this.top })
            if (!dimension) return
            changeShape = {
                id,
                type: "circle",
                startX: dimension.startX,
                startY: dimension.startY,
                radiusX: Math.abs(dimension.radiusX),
                radiusY: Math.abs(dimension.radiusY),
                stroke,
                background,
                strokeWidth,
                selected: true,
                display: true
            }
        }
        CanvaChangeShapeUpdate(this.sCtx, this.sCanva, this.dCtx, this.dCanva, existingShapes, this.actionType, changeShape, this.style)
        this.shape = changeShape
        this.actionType = "none"

    }

    sCanvaMove = (e: MouseEvent) => {
        const clientX = Math.ceil(window.scrollX) + e.clientX
        const clientY = Math.ceil(window.scrollY) + e.clientY
        this.moveX = 0
        this.moveY = 0
        this.isOnShape.value = onShape(existingShapes, clientX, clientY, this.currentShape)
        this.sCanva.style.cursor = this.isOnShape.value ? "move" : "default"
        if (isSelected.value) {
            const x = this.shape
            if (x.type === "rect" && x.selected) {
                this.actionType = onMarkedShape(x.startX, x.startY, x.width, x.height, clientX, clientY, this.sCanva)
                return;
            }

            if (x.type === "circle" && x.selected) {
                this.actionType = onMarkedShape(x.startX - x.radiusX, x.startY - x.radiusY, 2 * x.radiusX, 2 * x.radiusY, clientX, clientY, this.sCanva)
                return;
            }
            if (x.type === "dimond" && x.selected) {
                this.actionType = onMarkedShape(x.startX - this.width, x.startY, x.width * 2, x.height * 2, clientX, clientY, this.sCanva)
                return;
            }

            if (x.type === "arrow" && x.selected) {
                this.actionType = onMarkedLine(x.startX, x.startY, x.endX, x.endY, clientX, clientY, this.sCanva, this.style)
                return;

            }

        }




    }


    sCanvaUp = (e: MouseEvent) => {
        this.clicked = false
        if (this.isOnShape.value) {

            this.shape = { ...this.currentShape.value }
            this.shape.selected = true
            existingShapes.forEach(x => {
                if (x.id === this.shape.id) {
                    x.selected = true
                }
            })
            isSelected.value = true
            clearCanvas(this.sCtx, this.sCanva, "static")
            drawExistingShape(existingShapes, this.sCtx, this.style)
            markSelectedShape(this.sCtx, this.currentShape.value, this.actionType)

        } else {
            isSelected.value = false
            clearCanvas(this.sCtx, this.sCanva, "static")
            drawExistingShape(existingShapes, this.sCtx, this.style)
        }
    }


    sCanvaDown = (e: MouseEvent) => {
        this.clientX = e.clientX + Math.ceil(window.scrollX)
        this.clientY = e.clientY + Math.ceil(window.scrollY)
        if (isSelected.value && this.actionType !== "none") {
            if (this.actionType === "move") {
                if (this.shape.type === "rect" || this.shape.type === "circle") {
                    this.left = this.clientX - this.shape.startX
                    this.top = this.clientY - this.shape.startY
                }

            }
            this.clicked = true
            clearCanvas(this.sCtx, this.sCanva, "static")
            existingShapes.forEach(x => {
                if (x.id === this.shape.id && x.selected) {
                    x.display = false
                }
            })
            drawExistingShape(existingShapes, this.sCtx, this.style)
            this.dCanva.style.display = "block"
            clearCanvas(this.dCtx, this.dCanva, "dymanic")
            drawExistingShape([this.shape], this.dCtx, this.style)
            markSelectedShape(this.dCtx, this.shape, this.actionType)
        }

    }


}