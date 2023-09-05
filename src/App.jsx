import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Demo from './components/Demo'
import { Jelly } from '@uiball/loaders'

import './App.css'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const minDelay = 2500
    const maxDelay = 7000
    const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay
    const startTime = Date.now();

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      // Calculate the percentage based on elapsed time
      const currentPercentage = Math.min((elapsedTime / (maxDelay - minDelay)) * 100, 100);
      setPercentage(currentPercentage);

      if (elapsedTime >= maxDelay - minDelay) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 100)
    setTimeout(() => {
      setIsLoading(false)
    }, randomDelay)
  }, [])
console.log(percentage.toFixed(0))
  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>
      {isLoading ? (
        <>
          <div className='min-h-screen flex items-center justify-center'>
            <Jelly
              size={60}
              speed={0.9}
              color='black'
            />
          </div>
          <div>{percentage.toFixed(0)}%</div>
        </>
      ) : (
        <div className='app'>
          <Hero />
          <Demo />
        </div>
      )}
    </main>
  )
}

export default App