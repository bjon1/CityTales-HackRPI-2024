import { useState, useEffect } from 'react'
import {APIProvider, Map, Marker, InfoWindow} from '@vis.gl/react-google-maps';
import UserPosition from './UserPosition'


const API_KEY = import.meta.env.VITE_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;

const MapComponent = ({ destinations, setDestinations }) => {
    const [selectedDestination, setSelectedDestination] = useState(null); // Holds the position of the clicked marker

    const base = 'data:image/png;base64,'
    
    useEffect(() => {
        console.log(selectedDestination)
    }, [selectedDestination])

    return(

        <APIProvider apiKey={API_KEY}>
            <Map
                style={{
                    width: '100vw',
                    height: '100vh',
                }}
                defaultCenter={{lat: 40.705203, lng: -73.888930}}
                defaultZoom={12}
                maxZoom={14}
                minZoom={12}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId={MAP_ID}
            >

                {destinations.filter((destination) => destination.image != null).map((destination, index) => (
                    <>
                        <Marker
                            key={index}
                            position={{ lat: destination.coordinates[0], lng: destination.coordinates[1] }}
                            onClick={() => setSelectedDestination(destination)}
                            icon={base + destination.image}
                            zIndex={1} // First marker with lower z-index
                        />
                        
                        {!destination.is_explored && (
                            <Marker
                                key={`explored-${index}`}
                                position={{ lat: destination.coordinates[0], lng: destination.coordinates[1] }}
                                onClick={() => setSelectedDestination(destination)}
                                icon={{
                                    url: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678129-lock-25.png',
                                    anchor: new google.maps.Point(12.5, 40), // Adjust anchor to move lock icon slightly up
                                }}
                                zIndex={2} // Higher z-index for the lock marker
                            />
                        )}

                    </>
                ))}




                {selectedDestination && (
                    <InfoWindow
                        anchor={0}
                        position={{ lat: selectedDestination.coordinates[0] + 0.003, lng: selectedDestination.coordinates[1] }}
                        onCloseClick={() => setSelectedDestination(null)}
                        maxWidth={300}
                        pixelOffset={0}
                    >
                        <div>
                            <h4>{selectedDestination.name}</h4>
                            <p>{selectedDestination.historical_data}</p>
                        </div>
                    </InfoWindow>
                )}

                <UserPosition destinations={destinations} setDestinations={setDestinations}/>

            </Map>
        </APIProvider>

    );
};

export default MapComponent;
