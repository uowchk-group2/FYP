import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Button } from '@mantine/core';

import { convertToTimeString } from '../../../functions/date'

const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
}

const grayMark = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "gray",
    fillOpacity: 1,
    strokeWeight: 0.0,
    rotation: 0,
    scale: 1.5,
};

const greenMark = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "green",
    fillOpacity: 1,
    strokeWeight: 0.0,
    rotation: 0,
    scale: 1.5,
};


const RouteMap = (props) => {
    const checkpoints = props.data
    const [latestCheckpoint, setLastCheckpoint] = useState({})
    const [currentTitle, setCurrentTitle] = useState("")

    useEffect(() => {
        if (checkpoints != undefined && checkpoints.length !== 0) {
            for (let point of checkpoints) {
                if (point.arrivalActual === null) {
                    setLastCheckpoint(point)
                    break;
                }
            }
            if (Object.keys(latestCheckpoint).length === 0){
                setLastCheckpoint(checkpoints[checkpoints.length - 1])
            }
        }

    })

    if (checkpoints != undefined && checkpoints.length !== 0) {
        const changeInfoWindow = (data) => {
            setLastCheckpoint(data)
        }
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyDQb2utsA9n51gCrgSHkl8yaRJR-myziXQ"
            >
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '400px' }}
                    center={{ lat: latestCheckpoint.lat, lng: latestCheckpoint.lng }}
                    zoom={15}
                >
                    {[...checkpoints].map((item, i) => {
                        console.log(item)
                        return <Marker
                            icon={(item.arrivalActual != null) ? greenMark : grayMark}
                            position={{ lat: item.lat, lng: item.lng }}
                            onClick={() => { changeInfoWindow(item) }} />
                    })}



                    <InfoWindow
                        position={{ lat: latestCheckpoint.lat, lng: latestCheckpoint.lng }}
                    >
                        <div style={divStyle}>
                            <h2>Next: {latestCheckpoint.title}</h2>
                            <h3>Estimated Arrival time: {convertToTimeString(latestCheckpoint.arrivalExpected)}</h3>
                            <h3>Distance to go: {latestCheckpoint.prevDistance / 1000} km</h3>
                        </div>
                    </InfoWindow>



                </GoogleMap>
            </LoadScript>
        )

    }

}

export default RouteMap