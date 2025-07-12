'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Loader from './loader';
import MeetingCard from './MeetingCard';
import { useGetCalls } from '@/hooks/useGetCalls';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  // Handle call recordings fetch safely
  useEffect(() => {
    let isMounted = true;

    const fetchRecordings = async () => {
      if (!callRecordings || type !== 'recordings') return;

      const callData = await Promise.all(
        callRecordings.map(async (call) => {
          try {
            if (!call.id || typeof call.queryRecordings !== 'function') return null;
            const res = await call.queryRecordings();
            return res;
          } catch (error) {
            console.warn(`Failed to fetch recordings for call ${call.id}`, error);
            return null;
          }
        })
      );

      const allRecordings = callData
        .filter((res): res is NonNullable<typeof res> => res !== null)
        .flatMap((res) => res.recordings);

      if (isMounted) setRecordings(allRecordings);
    };

    fetchRecordings();

    return () => {
      isMounted = false;
    };
  }, [type, callRecordings]);

  // Choose which calls to display
  const calls = (() => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'upcoming':
        return upcomingCalls;
      case 'recordings':
        return recordings;
      default:
        return [];
    }
  })();

  // Choose which message to show if empty
  const noCallsMessage = (() => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  })();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => {
          const isRecording = type === 'recordings';

          const key = isRecording
            ? (meeting as CallRecording).url
            : (meeting as Call).id;

          const title =
            (meeting as Call).state?.custom?.description ||
            (meeting as CallRecording).filename?.substring(0, 20) ||
            'Personal Meeting';

          const date =
            (meeting as Call).state?.startsAt?.toLocaleString?.() ||
            (meeting as CallRecording).start_time?.toLocaleString?.() ||
            '';

          const link = isRecording
            ? (meeting as CallRecording).url
            : `${process.env.NEXT_PUBLIC_DATA_URL}/meeting/${(meeting as Call).id}`;

          const handleClick = () =>
            router.push(isRecording ? (meeting as CallRecording).url : `/meeting/${(meeting as Call).id}`);

          return (
            <MeetingCard
              key={key}
              icon={
                type === 'ended'
                  ? '/icons/previous.svg'
                  : type === 'upcoming'
                    ? '/icons/upcoming.svg'
                    : '/icons/recordings.svg'
              }
              title={title}
              date={date}
              isPreviousMeeting={type === 'ended'}
              link={link}
              buttonIcon1={isRecording ? '/icons/play.svg' : undefined}
              buttonText={isRecording ? 'Play' : 'Start'}
              handleClick={handleClick}
            />
          );
        })
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
