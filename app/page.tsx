"use client"

import { fabric } from "fabric";

import Live from "@/components/Live";
import { Room } from "./Room";
import Navbar from "@/components/Navbar";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import { useEffect, useRef, useState } from "react";
import { ActiveElement, CustomFabricObject } from "@/types/type";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null >(null)
  const isDrawing = useRef(false)

  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<string | null>("rectangle")

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name:"",
    value:"",
    icon:"",
  })

  const handleActiveElement = (elem:ActiveElement) => {
    setActiveElement(elem)

    selectedShapeRef.current = elem?.value as string
  }

  useEffect(()=>{
    const canvas = initializeFabric({canvasRef, fabricRef})

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas, 
        isDrawing,
        shapeRef,
        selectedShapeRef
      })
    })

    window.addEventListener("resize", () => {
      handleResize({fabricRef})
    })

  },[])

  return (
    <main className="h-screen border-red-200 flex flex-col overflow-hidden">
      <Navbar 
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
      />

      <section className="flex-grow flex flex-row">
        <LeftSideBar />
        <Live canvasRef={canvasRef} />
        <RightSideBar />
      </section>

    </main>

  );
}