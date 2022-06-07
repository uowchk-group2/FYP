import { Timeline, Text } from '@mantine/core';

import { convertToTimeString } from '../../../functions/date'



const DeliveryTimeline = (props) => {
    let record = props.data

    if (record != undefined) {
        console.log(record)
        return (
            <Timeline
                active={0}  //-1 if all done
                bulletSize={24}
                lineWidth={4}
                style={{ padding: 25 }}
            >

                {record.slice(0).reverse().map((item, i) => {
                    console.log(item)
                    if (item.arrivalActual != null) {
                        return (
                            <Timeline.Item
                                className='blink_me'
                                style={{ animation: "none" }}
                                key={i}
                                title={
                                    <Text size="xl" weight={700}>
                                        {item.title}
                                    </Text>
                                }
                            >
                                {/* <Text><i>{item.location}</i></Text>
                            <Text>{item.status}</Text> */}
                                <Text size="xs" mt={4}>
                                    <b>Estimated:</b> {convertToTimeString(item.arrivalExpected)}<br />
                                    {(item.arrivalActual != null) ?
                                        <><b>Actual:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            {convertToTimeString(item.arrivalActual)}</>
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