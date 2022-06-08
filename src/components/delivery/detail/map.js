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
const redMark = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "red",
    fillOpacity: 1,
    strokeWeight: 0.0,
    rotation: 0,
    scale: 1.5,
};


const RouteMap = (props) => {
    const checkpoints = props.data
    const [chosenCheckpoint, setChosenCheckpoint] = useState({})
    const [chosenCheckpointIndex, setChosenCheckpointIndex] = useState(0)
    const [autoPoint, setAutoPoint] = useState({})

    useEffect(() => {
        if (checkpoints != undefined && checkpoints.length !== 0) {
            let newAutoPoint = {}
            let newAutoPointIndex = 0
            let checkPointSet = false
            for (let i = 0; i < checkpoints.length; i++) {
                if (checkpoints[i].arrivalActual === null) {
                    if (Object.keys(chosenCheckpoint).length === 0) {
                        checkPointSet = true
                        setChosenCheckpoint(checkpoints[i])
                        setChosenCheckpointIndex(i)
                    }
                    newAutoPoint = checkpoints[i]
                    newAutoPointIndex = i
                    break;
                }
            }
            if (Object.keys(chosenCheckpoint).length === 0 && !checkPointSet) {
                setChosenCheckpoint(checkpoints[checkpoints.length - 1])
                setChosenCheckpointIndex(checkpoints.length - 1)
            }

            if (Object.keys(newAutoPoint).length != 0) {
                if (Object.keys(autoPoint).length === 0) { //If first time
                    setAutoPoint(newAutoPoint)

                } else if ((Object.keys(autoPoint).length != 0)) {
                    if (autoPoint.title != newAutoPoint.title) {
                        //If new checkpoint clicked
                        setChosenCheckpoint(newAutoPoint)
                        setChosenCheckpointIndex(newAutoPointIndex)
                        setAutoPoint(newAutoPoint)
                    }
                }
            }


        }

    })

    const jumpButton = (option) => {
        if (option === "prev") {
            setChosenCheckpoint(checkpoints[chosenCheckpointIndex - 1])
            setChosenCheckpointIndex(chosenCheckpointIndex - 1)
        } else {
            setChosenCheckpoint(checkpoints[chosenCheckpointIndex + 1])
            setChosenCheckpointIndex(chosenCheckpointIndex + 1)
        }
    }

    if (checkpoints != undefined && checkpoints.length !== 0) {
        const changeInfoWindow = (data) => {
            setChosenCheckpoint(data)
        }

        return (
            <>
                <LoadScript
                    googleMapsApiKey="AIzaSyDQb2utsA9n51gCrgSHkl8yaRJR-myziXQ"
                >
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '500px' }}
                        center={{ lat: chosenCheckpoint.lat, lng: chosenCheckpoint.lng }}
                        clickableIcons={false}
                        options={{
                            styles: [
                                {
                                    featureType: "poi",
                                    elementType: "labels",
                                    stylers: [
                                        { visibility: "off" }
                                    ]
                                }
                            ]
                        }}
                        zoom={15}
                    >
                        {[...checkpoints].map((item, i) => {
                            return (
                                <Marker
                                    label={i.toString()}
                                    icon={(item.arrivalActual === null) ? grayMark :
                                        (new Date(item.arrivalActual).getTime() > new Date(item.arrivalExpected).getTime()) ? redMark : greenMark
                                    }
                                    position={{ lat: item.lat, lng: item.lng }}
                                    onClick={() => { changeInfoWindow(item) }} >
                                    {
                                        (item.title === chosenCheckpoint.title) ?
                                            <InfoWindow
                                                position={{ lat: chosenCheckpoint.lat, lng: chosenCheckpoint.lng }}
                                            >
                                                <div style={divStyle}>
                                                    <h2>{item.arrivalActual === null ? "Next:" : ""} {chosenCheckpoint.title}</h2>
                                                    <h3>Estimated Arrival time: {convertToTimeString(chosenCheckpoint.arrivalExpected)}</h3>
                                                    {(item.arrivalActual != null) ?
                                                        <h3>
                                                            <b>Actual Arrival Time:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            {convertToTimeString(item.arrivalActual)}&nbsp;

                                                            <span
                                                                style={{ color: (new Date(item.arrivalActual).getTime() > new Date(item.arrivalExpected).getTime()) ? "red" : "green" }}>
                                                                <b>
                                                                    ({(new Date(item.arrivalActual).getTime() > new Date(item.arrivalExpected).getTime()) ?
                                                                        "+" + ((new Date(item.arrivalActual).getTime() - new Date(item.arrivalExpected).getTime()) / 1000) + " seconds" :
                                                                        "-" + ((new Date(item.arrivalExpected).getTime() - new Date(item.arrivalActual).getTime()) / 1000) + " seconds"
                                                                    })
                                                                </b>
                                                            </span>
                                                        </h3>
                                                        : <></>
                                                    }
                                                    <h3>Distance from previous checkpoint: {chosenCheckpoint.prevDistance / 1000} km</h3>


                                                </div>
                                            </InfoWindow>
                                            : <></>
                                    }

                                </Marker>
                            )
                        })}

                    </GoogleMap>
                </LoadScript>
                <Button
                    onClick={() => { jumpButton("prev") }}
                    disabled={(chosenCheckpointIndex === 0) ? true : false}
                >
                    Previous Checkpoint
                </Button>

                <Button
                    onClick={() => { jumpButton("next") }}
                    disabled={(chosenCheckpointIndex === checkpoints.length - 1) ? true : false}
                >
                    Next Checkpoint
                </Button>
            </>
        )

    }

}

export default RouteMap