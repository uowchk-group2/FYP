import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Button, Group } from '@mantine/core';

import { convertToTimeString } from '../../../functions/date'

const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
}

const grayMark = {
    path: "M157.66667,86c0,39.57792 -32.08875,71.66667 -71.66667,71.66667c-39.57792,0 -71.66667,-32.08875 -71.66667,-71.66667c0,-39.57792 32.08875,-71.66667 71.66667,-71.66667c39.57792,0 71.66667,32.08875 71.66667,71.66667z",
    fillColor: "gray",
    fillOpacity: 1,
    strokeWeight: 0.0,
    rotation: 0,
    scale: 0.2,
};

const greenMark = {
    path: "M157.66667,86c0,39.57792 -32.08875,71.66667 -71.66667,71.66667c-39.57792,0 -71.66667,-32.08875 -71.66667,-71.66667c0,-39.57792 32.08875,-71.66667 71.66667,-71.66667c39.57792,0 71.66667,32.08875 71.66667,71.66667z",
    fillColor: "green",
    fillOpacity: 1,
    strokeWeight: 0.2,
    rotation: 0,
    scale: 0.2,
};
const redMark = {
    path: "M157.66667,86c0,39.57792 -32.08875,71.66667 -71.66667,71.66667c-39.57792,0 -71.66667,-32.08875 -71.66667,-71.66667c0,-39.57792 32.08875,-71.66667 71.66667,-71.66667c39.57792,0 71.66667,32.08875 71.66667,71.66667z",
    fillColor: "red",
    fillOpacity: 1,
    strokeWeight: 0.0,
    rotation: 0,
    scale: 0.2,
};


const RouteMap = (props) => {
    const checkpoints = props.data
    const [chosenCheckpoint, setChosenCheckpoint] = useState({})
    const [chosenCheckpointIndex, setChosenCheckpointIndex] = useState(0)
    const [autoPoint, setAutoPoint] = useState({})

    let mobileView = props.mobileView

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
                                    key={i}
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
                                                    <h2>{item.arrivalActual === null ? "[Upcoming] " : "[Arrived] "} {chosenCheckpoint.title}</h2>
                                                    <h3>Estimated Arrival time: {mobileView ? <br /> : <></>}
                                                        {convertToTimeString(chosenCheckpoint.arrivalExpected)}</h3>
                                                    {(item.arrivalActual != null) ?
                                                        <h3>
                                                            <b>Actual Arrival Time:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            {mobileView ? <br /> : <></>}
                                                            {convertToTimeString(item.arrivalActual)}&nbsp;

                                                            <span
                                                                style={{ color: (new Date(item.arrivalActual).getTime() > new Date(item.arrivalExpected).getTime()) ? "red" : "green" }}>
                                                                {mobileView ? <br /> : <></>}
                                                                <b>
                                                                    ({(new Date(item.arrivalActual).getTime() > new Date(item.arrivalExpected).getTime()) ?
                                                                        ((new Date(item.arrivalActual).getTime() - new Date(item.arrivalExpected).getTime()) / 1000) + " Seconds Late" :
                                                                        ((new Date(item.arrivalExpected).getTime() - new Date(item.arrivalActual).getTime()) / 1000) + " Seconds Early"
                                                                    })
                                                                </b>
                                                            </span>
                                                        </h3>
                                                        : <></>
                                                    }
                                                    <h3>Distance from previous checkpoint:&nbsp;
                                                        {mobileView ? <br /> : <></>}
                                                        {chosenCheckpoint.prevDistance / 1000} km</h3>


                                                </div>
                                            </InfoWindow>
                                            : <></>
                                    }

                                </Marker>
                            )
                        })}

                    </GoogleMap>
                </LoadScript>

                <Group grow={mobileView} style={{ padding: 5 }}>
                    <Button
                        onClick={() => { jumpButton("prev") }}
                        disabled={(chosenCheckpointIndex === 0) ? true : false}
                    >
                        {mobileView ? "Previous" : "Previous Checkpoint"}
                    </Button>
                    <Button
                        onClick={() => { jumpButton("next") }}
                        disabled={(chosenCheckpointIndex === checkpoints.length - 1) ? true : false}
                    >
                        {mobileView ? "Next" : "Next Checkpoint"}
                    </Button>
                </Group>
            </>
        )

    }

}

export default RouteMap
