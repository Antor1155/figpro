"use client"

import { fabric } from "fabric";

import Live from "@/components/Live";
import { Room } from "./Room";
import Navbar from "@/components/Navbar";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import { useEffect, useRef } from "react";
import { CustomFabricObject } from "@/types/type";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null >(null)
  const isDrawing = useRef(false)

  const shapeRef = useRef<fabric.object | null>(null)
  const selectedShapeRef = useRef<string | null>(null)

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
      <Navbar />

      <section className="flex-grow flex flex-row">
        <LeftSideBar />
        <Live canvasRef={canvasRef} />
        <RightSideBar />
      </section>

    </main>

  );
}