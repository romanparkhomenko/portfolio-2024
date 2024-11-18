import { useCallback, useEffect, useState } from "react";

export const Years = () => {
  // const [count, setCount] = useState(0);
  const [dateObject, setDateObject] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getTimeSinceDate = () => {
    const now = new Date();
    const start = new Date("12/01/2015");
    const diff = now.getTime() - start.getTime();

    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    const days = now.getDate() - start.getDate();
    const hours = now.getHours() - start.getHours();
    const minutes = now.getMinutes() - start.getMinutes();
    const seconds = now.getSeconds() - start.getSeconds();

    return {
      years: years + (months < 0 ? -1 : 0),
      months: (months + 12) % 12,
      days: (days + 30) % 30,
      hours: (hours + 24) % 24,
      minutes: (minutes + 60) % 60,
      seconds: (seconds + 60) % 60,
    };
  };

  const incrementObject = useCallback(() => {
    setDateObject((prev) => {
      const newObject = { ...prev };
      newObject.seconds += 1;
      if (newObject.seconds >= 60) {
        newObject.seconds = 0;
        newObject.minutes += 1;
      }
      if (newObject.minutes >= 60) {
        newObject.minutes = 0;
        newObject.hours += 1;
      }
      if (newObject.hours >= 24) {
        newObject.hours = 0;
        newObject.days += 1;
      }
      if (newObject.days >= 30) {
        newObject.days = 0;
        newObject.months += 1;
      }
      if (newObject.months >= 12) {
        newObject.months = 0;
        newObject.years += 1;
      }
      return newObject;
    });
  }, []);

  useEffect(() => {
    setDateObject(getTimeSinceDate());
    const interval = setInterval(() => {
      incrementObject();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>{dateObject.years} years</p>
      <p>{dateObject.months} months</p>
      <p>{dateObject.days} days</p>
      <p>{dateObject.hours} hours</p>
      <p>{dateObject.minutes} minutes</p>
      <p>{dateObject.seconds} seconds</p>
    </div>
  );
};
