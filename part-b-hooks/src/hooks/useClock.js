import { useEffect, useState } from 'react'

function getCurrentTime() {
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

function useClock() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime)

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  return currentTime
}

export default useClock
