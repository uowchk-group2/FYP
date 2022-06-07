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
    const [chosenCheckpoint, setChosenCheckpoint] = useState({})
    const [autoPoint, setAutoPoint] = useState({})

    useEffect(() => {
        if (checkpoints != undefined && checkpoints.length !== 0) {
            let newAutoPoint = {}
            for (let point of checkpoints) {
                if (point.arrivalActual === null) {
                    setChosenCheckpoint(point)
                    newAutoPoint = point
                    break;
                }
            }
            if (Object.keys(chosenCheckpoint).length === 0) {
                setChosenCheckpoint(checkpoints[checkpoints.length - 1])
            }

            if (Object.keys(newAutoPoint).length != 0) {
                if (Object.keys(autoPoint).length === 0) {
                    setAutoPoint(newAutoPoint)
                } else if ((Object.keys(autoPoint).length != 0)) {
                    if (autoPoint.title != newAutoPoint.title) {
                        setChosenCheckpoint(newAutoPoint)
                    }
                }
            }



        }

    })

    if (checkpoints != undefined && checkpoints.length !== 0) {
        const changeInfoWindow = (data) => {
            setChosenCheckpoint(data)
        }

        return (
            <LoadScript
                googleMapsApiKey="AIzaSyDQb2utsA9n51gCrgSHkl8yaRJR-myziXQ"
            >
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '400px' }}
                    center={{ lat: chosenCheckpoint.lat, lng: chosenCheckpoint.lng }}
                    zoom={15}
                >
                    {[...checkpoints].map((item, i) => {
                        console.log(item)
                        return <Marker
                            icon={(item.arrivalActual != null) ? greenMark : grayMark}
                            position={{ lat: item.lat, lng: item.lng }}
                            onClick={() => { changeInfoWindow(item) }} >
                            {
                                (item.title === chosenCheckpoint.title) ?
                                    <InfoWindow
                                        position={{ lat: chosenCheckpoint.lat, lng: chosenCheckpoint.lng }}
                                    >
                                        <div style={divStyle}>
                                            <h2>Next: {chosenCheckpoint.title}</h2>
                                            <h3>Estimated Arrival time: {convertToTimeString(chosenCheckpoint.arrivalExpected)}</h3>
                                            <h3>Distance to go: {chosenCheckpoint.prevDistance / 1000} km</h3>
                                        </div>
                                    </InfoWindow>
                                    : <></>
                            }

                        </Marker>
                    })}



                    {/* <InfoWindow
                        position={{ lat: chosenCheckpoint.lat, lng: chosenCheckpoint.lng }}
                    >
                        <div style={divStyle}>
                            <h2>Next: {chosenCheckpoint.title}</h2>
                            <h3>Estimated Arrival time: {convertToTimeString(chosenCheckpoint.arrivalExpected)}</h3>
                            <h3>Distance to go: {chosenCheckpoint.prevDistance / 1000} km</h3>
                        </div>
                    </InfoWindow> */}



                </GoogleMap>
            </LoadScript>
        )

    }

}

export default RouteMap