import CursorSVG from '@/public/assets/CursorSVG'
import { CursorChatProps, CursorMode } from '@/types/type'
import React from 'react'

export default function CursorChat({ cursor, cursorState, setCursorState, updateMyPresence }: any) {


  return (
    <div className='absolute top-0 left-0' style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}>
      {/* {cursorState.mode === CursorMode.Chat &&  */}
      <>
        <CursorSVG color="#000" />

        <div className='absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-2xl'>

          {cursorState.previousMessage && (
            <div>
              {cursorState.previousMessage}
            </div>
          )}

          <input
            type='text'
            className='z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none'
            autoFocus={true}
          />

        </div>

      </>
      {/* } */}
    </div>
  )
}
