import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ZERO } from "../../utils";

interface IAuctionTimingProps {
  endTime: string;
}

interface IEndingTimeInfo {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}

const AuctionTimeEnding = ({ endTime }: IAuctionTimingProps): JSX.Element => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [endingTimeInfo, setEndingTimeInfo] = useState<IEndingTimeInfo>();

  /**
   * Get remaining time by providing timestamp
   * @param total {number}
   */
  const getTimeRemaining = (total: number): void => {
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / (1000 * 3600 * 24));
    setEndingTimeInfo({
      seconds,
      minutes,
      hours,
      days,
    });
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      const remainTime = dayjs(endTime).diff(dayjs(new Date()));

      if (remainTime <= ZERO) {
        setEndingTimeInfo({
          days: ZERO,
          hours: ZERO,
          minutes: ZERO,
          seconds: ZERO,
        });
        setRemainingTime(ZERO);
      } else {
        setRemainingTime(remainTime);
        getTimeRemaining(remainTime);
      }
    }, 1000);

    return () => clearTimeout(interval);
  }, [remainingTime]);

  return (
    <div className="outline outline-1 outline-zinc-300 flex flex-col rounded-lg p-3 my-6">
      <span className="font-medium text-2xl text-zinc-700 mb-6">
        Temps restant :
      </span>
      {remainingTime <= ZERO ? (
        <span>Enchère terminée</span>
      ) : (
        <div className="flex justify-around">
          <div className="flex flex-col  justify-center items-center">
            <span className="text-3xl font-semibold text-zinc-900">
              {endingTimeInfo?.days}
            </span>
            <span className="text-xl text-zinc-400">Jour(s)</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-3xl font-semibold text-zinc-900">
              {endingTimeInfo?.hours}
            </span>
            <span className="text-xl text-zinc-400">Heure(s)</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-3xl font-semibold text-zinc-900">
              {endingTimeInfo?.minutes}
            </span>
            <span className="text-xl text-zinc-400">Minute(s)</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-3xl font-semibold text-zinc-900">
              {endingTimeInfo?.seconds}
            </span>
            <span className="text-xl text-zinc-400">Seconde(s)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionTimeEnding;
