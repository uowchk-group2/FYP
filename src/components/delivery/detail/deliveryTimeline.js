import { Timeline, Text } from '@mantine/core';

import { convertToTimeString } from '../../../functions/date'



const DeliveryTimeline = (props) => {
    let record = props.data
    let showAll = props.showAll

    if (record != undefined) {

        record = showAll ? record : record.slice(0).reverse()
        let showAllCount = 0;

        record.map((item, i) => {
            if (item.arrivalActual != null) showAllCount++;
        })

        return (
            <Timeline
                active={showAll ? showAllCount : 0}  //-1 if all done
                bulletSize={24}
                lineWidth={4}
                style={{ padding: 25 }}
            >

                {record.map((item, i) => {
                    if (showAll || item.arrivalActual != null || (record[i + 1].arrivalActual !== null)) {
                        return (
                            <Timeline.Item
                                className='blink_me'
                                style={{ animation: "none" }}
                                key={i}
                                title={
                                    <Text size="xl" weight={700}>
                                        {((item.arrivalActual != null) ? "" : "Next: ")}{item.title}
                                    </Text>
                                }
                            >
                                <Text size="s" mt={4}>

                                    {
                                        (i != record.length - 1) ?
                                            <><b>Distance: </b>{item.prevDistance / 1000} km<br /></> :
                                            <></>
                                    }

                                    <b>Estimated:</b> {convertToTimeString(item.arrivalExpected)}<br />


                                    {(item.arrivalActual != null) ?
                                        <>
                                            <b>Actual:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                                        </>
                                        : <></>
                                    }
                                </Text>

                            </Timeline.Item>
                        )
                    }

                })}

            </Timeline >
        )
    } else {
        return (<></>)
    }
}

export default DeliveryTimeline;