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
                options={{
                    styles: [
                        {
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#edf7d2"  // Light green base for the background
                                }
                            ]
                        },
                        {
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"  // Hide icons
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#4caf50"  // Darker green for text
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "color": "#b9e6b9"  // Light green background for text labels
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.land_parcel",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#81c784"  // Lighter green for land parcels
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#66bb6a"  // Green for points of interest labels
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#7d7c7a"  // Light green for roadways
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#7d7c7a"  // Darker green for highways
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#c9c19f"  // Medium light green for arterial roads
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#c9c19f"  // Very light green for local roads
                                }
                            ]
                        },
                        {
                            "featureType": "transit.station",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#388e3c"  // Greenish for transit stations
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#b2dfdb"  // Light teal green for water bodies
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#81c784"  // Lighter green for water labels
                                }
                            ]
                        }
                    ]
                }}
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
