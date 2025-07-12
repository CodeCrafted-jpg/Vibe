'use client';

import { useEffect, useState } from "react";
import { useGetCalls } from "@/hooks/useGetCalls";
import MeetingType from "@/components/ui/MeetingType";

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

  const { upcomingCalls } = useGetCalls();
  const [nextMeetingTime, setNextMeetingTime] = useState<string | null>(null);

  useEffect(() => {
    if (upcomingCalls && upcomingCalls.length > 0) {
      // Sort by nearest upcoming call
      const sorted = [...upcomingCalls].sort((a, b) => {
        const aTime = a.state.startsAt?.getTime() || 0;
        const bTime = b.state.startsAt?.getTime() || 0;
        return aTime - bTime;
      });

      const next = sorted[0];
      const startsAt = next?.state.startsAt;

      if (startsAt) {
        const formatted = startsAt.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
        setNextMeetingTime(formatted);
      }
    }
  }, [upcomingCalls]);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            {nextMeetingTime
              ? `Upcoming Meeting at: ${nextMeetingTime}`
              : 'No Upcoming Meetings'}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingType />
    </section>
  );
};

export default Home;
