import { useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "./cursor/LiveCursors";
import React, { useCallback } from "react";

export default function Live() {
    const others = useOthers()
    const [myPresence, updateMyPresence] = useMyPresence() as any;

    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault()
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y

        updateMyPresence({ cursor: { x, y } })
    }, [])

    const handlePointerLeave = useCallback((event: React.PointerEvent) => {
        event.preventDefault()
        updateMyPresence({ cursor: null, message: null })
    }, [])

    const handlePointerDown = useCallback((event: React.PointerEvent) => {
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y

        updateMyPresence({ cursor: { x, y } })
    }, [])

    return (
        <div onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}

            className="h-screen w-full flex justify-center items-center border-2 border-green-200"
        >
            <h1 className="text-2xl text-white"> FigPro -- a Figma Alternative &#128526; !!</h1>

            <LiveCursors others={others} />
        </div>
    )
}
