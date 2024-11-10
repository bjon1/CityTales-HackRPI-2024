import { useState, useEffect } from 'react'
import Map from './components/Map'
import './App.css'

const App = () => {

  const [destinations, setDestinations] = useState([
      {
        name: 'Central Park',
        location: {
          lat: 40.785091,
          lng: -73.968285
        },
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Central_Park_New_York_City_New_York_23.jpg',
        data: 'Central Park is an urban park in New York City located between the Upper West and Upper East Sides of Manhattan. It is the most visited urban park in the United States.',
        is_explored: false
      },
      {
        name: 'Statue of Liberty',
        location: {
          lat: 40.689247,
          lng: -74.044502
        },
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg',
        data: 'The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor. It was a gift from France to the United States.',
        is_explored: false
      },
      {
        name: 'Times Square',
        location: {
          lat: 40.758896,
          lng: -73.985130
        },
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        data: 'Times Square is a major commercial intersection, tourist destination, entertainment center, and neighborhood in Midtown Manhattan, New York City.',
        is_explored: false
      },
      {
        name: 'Brooklyn Bridge',
        location: {
          lat: 40.706086,
          lng: -73.996864
        },
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Brooklyn_Bridge_Postdlf.jpg',
        data: 'The Brooklyn Bridge is a hybrid cable-stayed/suspension bridge in New York City, connecting the boroughs of Manhattan and Brooklyn.',
        is_explored: false
      },
      {
        name: 'Empire State Building',
        location: {
          lat: 40.748817,
          lng: -73.985428
        },
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Empire_State_Building_by_David_Shankbone_crop.jpg',
        data: 'The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan, New York City. It was the world\'s tallest building for nearly 40 years.',
        is_explored: false
      }
  ])

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations')
        const data = await response.json()
        console.log(data)
        setDestinations(data)
      } catch (error) {
        console.error(error)
      }
    }
    // fetchDestinations()
    console.log(destinations)
  }, [])
  

  return (
    <>
      <Map destinations={destinations}/>
    </>
  )
}

export default App
