import { useState, useEffect } from 'react'
import { AdvancedMarker } from '@vis.gl/react-google-maps';


const UserPosition = ({destinations, setDestinations}) => {
    const [position, setPosition] = useState({ lat: 40.705203, lng: -73.888930 });
    const [updatedDestinations, setUpdatedDestinations ] = useState([{}])

    const handleDrag = (e) => {
        if (e.latLng) {
            setPosition({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            });
        }
        console.log(position)
    };

    const fetchAreaExplored = async (coords) => {
        try {
            const coordinatesStr = `${coords[0]},${coords[1]}`;
            const radius = 0.005;
            const response = await fetch(`/api/check_radius_explored?coordinates=${coordinatesStr}&radius=${radius}`);
            const updatedDestinations = await response.json();
            
            setDestinations((prevDestinations) =>
                prevDestinations.map((destination) => {
                    const match = updatedDestinations.find(
                        (updated) => 
                            updated.coordinates[0] === destination.coordinates[0] &&
                            updated.coordinates[1] === destination.coordinates[1]
                    );
                    return match ? { ...destination, is_explored: match.is_explored } : destination;
                })
            );
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleCollision = (e) => {    
        let coords = []
        if(e.latLng) {
            coords = [e.latLng.lat(), e.latLng.lng()]
        }
        fetchAreaExplored(coords)
    }

    return (
        <div>

            <AdvancedMarker
                position={position}
                gmpDraggable={true}
                title={"This marker is draggable."}
                onDrag={handleDrag} // Attach the onDrag handler
                onDragEnd={handleCollision}
                zIndex={999}
            >
                <img src={"https://i.imgur.com/yQ0WvpV.png'%7D"}/>
            </AdvancedMarker>
        </div>
    );


}

export default UserPosition