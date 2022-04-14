import {
    Timeline,
    Text
} from '@mantine/core';


const DeliveryTimeline = (props) => {
    let record = props.data

    return (
        <Timeline
            active={0}
            bulletSize={24}
            lineWidth={4}
            style={{ padding: 25 }}
        >

            {record.map((item, i) => {
                return (
                    <Timeline.Item
                        title={
                            <Text size="xl" weight={700}>{item.status}</Text>
                        }
                    >
                        <Text>{item.location} </Text>
                        <Text>{item.description}</Text>
                        <Text size="xs" mt={4}>
                            {item.time}
                        </Text>

                    </Timeline.Item>
                )

            })}

        </Timeline >
    )
}

export default DeliveryTimeline;