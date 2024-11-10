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
  

  return (
    <>
      <MapComponent destinations={destinations}/>
    </>
  )
}

export default App
