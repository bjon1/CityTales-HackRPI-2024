import { useState, useEffect } from 'react'
import MapComponent from './components/MapComponent'
import './App.css'

const App = () => {

  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations')
        const historical_data = await response.json()
        console.log(historical_data)
        setDestinations(historical_data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDestinations()
    console.log(destinations)
  }, [])
  
  const resetWindow = () => {
    const reset = async () => {
      await fetch('/api/reset')
    }

    reset()
    window.location.reload()
 
  }

  return (
    <>
      <MapComponent destinations={destinations} setDestinations={setDestinations}/>
      <button 
        onClick={() => resetWindow()} 
        style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
        }}
      >
          Reset
      </button>

    </>
  )
}

export default App
