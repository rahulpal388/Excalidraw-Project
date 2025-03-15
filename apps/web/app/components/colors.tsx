import { CloudRain, Ellipsis, Minus } from "lucide-react"
import { IStyles } from "./MainComponent"
import { ReactNode, useState } from "react"
import { on } from "events"



export function SelecetColors({ Style }: {
    Style: IStyles
}) {
    const [currentStroke, setCurrentStroke] = useState<IStyles["stroke"]>("rgba(255, 255, 255, 1)")
    const [currentBackground, setCurrentBackground] = useState<IStyles["background"]>("rgba(18,18,18,1)")
    const [currentFill, setCurrentFill] = useState<IStyles["fill"]>("fill")
    const [currentStrokeWIdth, setCurrentStrokeWidth] = useState<IStyles["strokeWidth"]>(3)

    return (
        <div className="fixed top-24 ml-4 left-1  px-4 py-2  flex flex-col gap-2  bg-[#232329] rounded">
            <div className="flex flex-col gap-2">
                <h5 className="text-white  text-sm">Stroke</h5>
                <div className="flex gap-2">
                    <Colors color="bg-white" active={currentStroke === "rgba(255, 255, 255, 1)"} onClick={() => {
                        Style.stroke = "rgba(255, 255, 255, 1)"
                        setCurrentStroke("rgba(255, 255, 255, 1)")
                    }} />
                    <Colors color="bg-red-600" active={currentStroke === "rgba(239, 68, 68, 1)"} onClick={() => {
                        Style.stroke = "rgba(239, 68, 68, 1)"
                        setCurrentStroke("rgba(239, 68, 68, 1)")
                    }} />
                    <Colors color="bg-green-600" active={currentStroke === "rgba(34, 197, 94, 1)"} onClick={() => {
                        Style.stroke = "rgba(34, 197, 94, 1)"
                        setCurrentStroke("rgba(34, 197, 94, 1)")
                    }} />
                    <Colors color="bg-orange-600" active={currentStroke === "rgba(249, 115, 22, 1)"} onClick={() => {
                        Style.stroke = "rgba(249, 115, 22, 1)"
                        setCurrentStroke("rgba(249, 115, 22, 1)")
                    }} />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h5 className="text-white  text-sm">Background</h5>
                <div className="flex gap-2">
                    <Colors color="bg-[#121212]" active={currentBackground === "rgba(18,18,18,1)"} onClick={() => {
                        Style.background = "rgba(18,18,18,1)"
                        setCurrentBackground("rgba(18,18,18,1)")
                    }} />
                    <Colors color="bg-red-600" active={currentBackground === "rgba(239, 68, 68, 1)"} onClick={() => {
                        Style.background = "rgba(239, 68, 68, 1)"
                        setCurrentBackground("rgba(239, 68, 68, 1)")
                    }} />
                    <Colors color="bg-green-600" active={currentBackground === "rgba(34, 197, 94, 1)"} onClick={() => {
                        Style.background = "rgba(34, 197, 94, 1)"
                        setCurrentBackground("rgba(34, 197, 94, 1)")
                    }} />
                    <Colors color="bg-orange-600" active={currentBackground === "rgba(249, 115, 22, 1)"} onClick={() => {
                        Style.background = "rgba(249, 115, 22, 1)"
                        setCurrentBackground("rgba(249, 115, 22, 1)")
                    }} />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h5 className="text-white  text-sm">Stroke Width</h5>
                <div className="flex gap-2">
                    <StrokeWidth active={currentStrokeWIdth === 3} children={<Minus className="stroke-white " strokeWidth={1} size={28} />} onClick={() => {
                        Style.strokeWidth = 3
                        setCurrentStrokeWidth(3)
                    }} />
                    <StrokeWidth active={currentStrokeWIdth === 4} children={<Minus className="stroke-white " strokeWidth={2.7} size={28} />} onClick={() => {
                        Style.strokeWidth = 4
                        setCurrentStrokeWidth(4)
                    }} />
                    <StrokeWidth active={currentStrokeWIdth === 5} children={<Minus className="stroke-white " strokeWidth={1} size={28} />} onClick={() => {
                        Style.strokeWidth = 5
                        setCurrentStrokeWidth(5)
                    }} />

                </div>
            </div>

        </div>
    )
}



function Colors({ color, active, onClick }: {
    color: "rgba(255, 255, 255, 1)" | "bg-[#121212]" | "bg-red-600" | "bg-orange-600" | "bg-green-600" | "bg-pink-600" | "bg-white"
    active: boolean
    onClick: () => void
}) {

    return <div className={`p-[2px] border-[1.5px] rounded border-[#232329] hover:border-white  ${active && "border-blue-500 hover:border-blue-500"} `} onClick={onClick}>
        <div className={`${color} w-5 h-5 rounded cursor-pointer`} ></div>
    </div>
}


function Fill({ onClick, active }: {
    onClick: () => void
    active: boolean
}) {
    return <div className={`w-7 h-7  flex justify-center items-center rounded-md hover:opacity-80 hover:cursor-pointer ${active ? "bg-blue-400" : "bg-[#363541]"}`} onClick={onClick}>
        <div className="w-4 h-4 bg-white rounded"></div>
    </div>
}

function StrokeWidth({ active, onClick, children }: {
    active: boolean,
    onClick: () => void
    children: ReactNode
}) {
    return <div className={`${active ? "bg-blue-500" : "bg-[#363541]"} rounded-md  hover:opacity-80 hover:cursor-pointer`} onClick={onClick} >
        {children}
    </div>
}