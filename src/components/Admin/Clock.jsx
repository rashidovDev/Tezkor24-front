import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  // Format the time as HH:mm:ss
  const formattedTime = currentTime.toLocaleTimeString();
  const d = new Date()
  let month = d.getMonth() + 1
  let year = d.getFullYear()
  let day = d.getDate()

  return (
    <div className='flex items-center justify-end pr-5 py-1 text-[20px] main-bg px-2 rounded-[15px]'>
          <div className='pr-2'>{formattedTime}</div> <div>{`${day}${'/'}${month}${'/'}${year}`}</div>
    </div>
  );
};

export default Clock;