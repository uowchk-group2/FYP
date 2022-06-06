import React from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
}

const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "gray",
    fillOpacity: 1,
    strokeWeight: 0.0,
    rotation: 0,
    scale: 1.5,
    // anchor: new google.maps.Point(15, 30),
};


const RouteMap = (props) => {

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDQb2utsA9n51gCrgSHkl8yaRJR-myziXQ"
        >
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={{ lat: 22.3203169, lng: 114.1695231 }}
                zoom={10}
            >
                { /* Child components, such as markers, info windows, etc. */}

                <Marker  position={{ lat: 22.3203169, lng: 114.1695231 }} />
                <Marker icon={svgMarker} label="Hi" position={{ lat: 22.4788962, lng: 114.0456789 }} />
                <Marker position={{ lat: 22.4713253, lng: 114.0547891 }} />
                <InfoWindow
                    position={{ lat: 22.4713253, lng: 114.0547891 }}
                >
                    <div style={divStyle}>
                        <h1>InfoWindow</h1>
                    </div>
                </InfoWindow>



            </GoogleMap>
        </LoadScript>
    )

}

export default RouteMap