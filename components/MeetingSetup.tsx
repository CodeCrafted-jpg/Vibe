"use client"

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({ setIsSetUpComplete }: {
    setIsSetUpComplete: (value: boolean) => void
}) => {

    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)
    const call = useCall()
    if (!call) {
        throw new Error("useCall must be within the stream call")
    }

    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.camera.disable()
            call?.microphone.disable()
        } else {
            call?.camera.enable()
            call?.microphone.enable()
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone])
    return (
        <div className='flex h-screen w-full items-center flex-col justify-center gap-3 text-white'>
            <h1 className='text-2xl font-bold'>Setup</h1>
            <VideoPreview />
            <div className='flex h-16 justify-center items-center gap-3'>
                <label className='flex items-center justify-center gap-2 font-medium '>
                    <input type="checkbox"
                        checked={isMicCamToggledOn}
                        onChange={(e) => setIsMicCamToggledOn(e.target.checked)} />
                    join with mic and camera off
                </label>
                <DeviceSettings />
                <Button className='rounded-md bg-green-500 px-4 py-2.5'
                    onClick={() => {
                        call.join()
                        setIsSetUpComplete(true)
                    }}>
                    Join Meeting
                </Button>
            </div>
        </div>
    )
}

export default MeetingSetup