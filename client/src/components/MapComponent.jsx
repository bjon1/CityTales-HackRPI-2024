import { useState, useEffect } from 'react'
import {APIProvider, Map, Marker, InfoWindow} from '@vis.gl/react-google-maps';

const API_KEY = import.meta.env.VITE_API_KEY;

const MapComponent = ({ destinations }) => {
    const [selectedDestination, setSelectedDestination] = useState(null); // Holds the position of the clicked marker

    const base = 'data:image/png;base64,'
    
    useEffect(() => {
        console.log(selectedDestination)
    }, [selectedDestination])

    return(

        <APIProvider apiKey={API_KEY}>
            <Map
                style={{width: '100vw', height: '100vh'}}
                defaultCenter={{lat: 40.705203, lng: -73.888930}}
                defaultZoom={12}
                maxZoom={14}
                minZoom={12}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
               {destinations.map((destination, index) => (
                    <Marker
                        key={index}
                        position={{ lat: destination.location[0], lng: destination.location[1] }}
                        onClick={() => setSelectedDestination(destination)} // Set clicked destination
                        icon={base + destination.image}
                    />
                ))}

                {selectedDestination && (
                    <InfoWindow
                        anchor={0}
                        position={{ lat: selectedDestination.location[0] + 0.003, lng: selectedDestination.location[1] }}
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

            </Map>
        </APIProvider>

    );
};

export default MapComponent;
