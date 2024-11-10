
import {AdvancedMarker, Pin} from '@vis.gl/react-google-maps';

const CustomizedMarker = ({location, is_explored}) => {

    return (
        <>
            <AdvancedMarker position={{lat: location.lat, lng: location.lng}}>
                <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
        </>
    )

}

export default CustomizedMarker