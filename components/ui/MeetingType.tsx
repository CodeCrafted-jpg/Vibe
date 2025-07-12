"use client"
import React, { useState } from 'react';
import HomeCard from '../HomeCard';
import MeetingModal from "../MeetingModal"
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/hooks/use-toast"
import { Textarea } from './textarea';
import ReactDatePicker from 'react-datepicker';
import { Input } from "@/components/ui/input"


const MeetingType = () => {
  const router = useRouter()
  const toast = useToast()
  const [meetingState, setMeetingState] =
    useState<'isScheduledMeeting' | 'isjoiningMeeting' | 'isInstantMeeting' | undefined>()
  const user = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDtails, setCallDetails] = useState<Call>()
  const createMeeting = async () => {
    if (!client || !user) return

    try {
      const id = crypto.randomUUID()
      const call = client.call("default", id)
      if (!call) throw new Error("failed to create call")
      const stratsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || "instant meeting"


      await call.getOrCreate({
        data: {
          starts_at: stratsAt,
          custom: {
            description
          }

        }
      })
      setCallDetails(call)
      if (!values.description) {
        router.push(`Meeting/${call.id} `)
      }

      toast.toast({
        title: "Meeting Created Successfully",
      });

    } catch (error) {
      console.log(error)
      toast.toast({
        title: "Failed to create Meeting",

      })
    }
  }
  const meetingLink = `${process.env.NEXT_PUBLIC_DATA_URL}/meeting/${callDtails?.id}`
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className="bg-orange-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan a meeting"
        handleClick={() => setMeetingState('isScheduledMeeting')}
        className="bg-blue-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Checkout your recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-purple-1"
      />
      <HomeCard
        img="/icons/join-Meeting.svg"
        title="Join Meeting"
        description="Via in invitation link"
        handleClick={() => setMeetingState('isjoiningMeeting')}
        className="bg-yellow-1"
      />

      {!callDtails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduledMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create a meeting"
          handleClick={createMeeting}

        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base font-normal leading-[22px] text-sky-2' >Add a description</label>
            <Textarea className='border-none bg-dark-1 focus-visible:ring-0 focus-visible:ring-offset-0 '
              onChange={(e) => {
                setValues({ ...values, description: e.target.value })
              }} />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : <MeetingModal
        isOpen={meetingState === 'isScheduledMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Meeting created"
        className="text-center"
        buttonText="copy meeting link"
        handleClick={() => {
          navigator.clipboard.writeText(meetingLink)
          toast.toast({
            title: "link copied"
          })
        }}
        image={"/icons/checked.svg"}
        buttonIcon={"/icons/copy.svg"}


      />
      }
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}

      />

      <MeetingModal
        isOpen={meetingState === 'isjoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={()=>router.push(values.link)}

      >
      <Input type="text"
      placeholder='    meeting link....'
        onChange={(e) => setValues({ ...values, link: e.target.value })}
      className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0
      cursor text-white">
      
      </Input>
      </MeetingModal>


    </section>
  );
};

export default MeetingType;
