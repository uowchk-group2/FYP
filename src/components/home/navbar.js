import { useState } from 'react'
import { useSelector } from "react-redux";

import { Navbar, Button, Modal, Tabs, Input } from '@mantine/core';

import { Plus } from 'tabler-icons-react';

import NavBardataOrder from "./NavBardataOrder";
import NavBardataDelivery from "./NavBardataDelivery";
import NewOrder from '../order/newOrder'

const NavBar = ({ params }) => {
    //Redux
    const { orders } = useSelector((state) => state.order);
    const { role } = useSelector((state) => state.user);
    const { deliveries } = useSelector((state) => state.delivery);

    const [addNew, setAddNew] = useState(false)
    const [tabChosen, setTabChosen] = useState(0)
    const [searchString, setSearchString] = useState("")


    const onTabChange = (active, tabKey) => {
        setTabChosen(active)
    }

    return (
        <Navbar width={{ base: 300 }} >
            <Navbar.Section style={{ padding: 10, textAlign: "center" }}>
                {/* Allow add new if not driver */}
                {(role != "Driver") ? <Button
                    variant='filled'
                    onClick={() => { setAddNew(true) }}
                >
                    <Plus color="white" />
                    Purchase Order
                </Button>
                    : <></>}
            </Navbar.Section>

            <Input
                style={{ paddingLeft: 20, paddingRight: 20 }}
                placeholder={(role != "Driver") ? "Search by id or goods name" : "Search by id"}
                value={searchString}
                onChange={(e) => setSearchString(e.target.value.toLowerCase())}
            />

            <Tabs grow position="center" active={tabChosen} onTabChange={onTabChange} tabPadding="md" style={{ paddingBottom: 5 }}>
                <Tabs.Tab label="All" tabKey="All"></Tabs.Tab>
                <Tabs.Tab label="Incomplete" tabKey="Incomplete"></Tabs.Tab>
                <Tabs.Tab label="Completed" tabKey="Completed"></Tabs.Tab>
            </Tabs>

            {
                (role != "Driver") ?

                    [...orders].map((item, i) => {
                        if (searchString === "" || (searchString != "" && (item.id.toString().includes(searchString) || item.goods.toLowerCase().includes(searchString)))) {

                            if (tabChosen === 0 || (tabChosen === 1 && !item.allDelivered) || (tabChosen === 2 && item.allDelivered)) {
                                let chosen = false;
                                if (params != undefined && item.id === parseInt(params[0])) { chosen = true }
                                return <NavBardataOrder key={i} data={item} chosen={chosen} />
                            }
                        }
                    })
                    :
                    [...deliveries].map((item, i) => {
                        if (searchString === "" || (searchString != "" && (item.id.toString().includes(searchString) || item.goods.toLowerCase().includes(searchString)))) {

                            if (tabChosen === 0 || (tabChosen === 1 && !item.allDelivered) || (tabChosen === 2 && item.allDelivered)) {
                                let chosen = false;
                                if (params != undefined && item.id === parseInt(params[1])) { chosen = true }
                                return <NavBardataDelivery key={i} data={item} chosen={chosen} />
                            }
                        }
                    })


            }

            <Modal
                size="xl"
                opened={addNew}
                onClose={() => { setAddNew(false) }}
            >
                <NewOrder closeFunction={setAddNew} />
            </Modal>


        </Navbar>
    )
}

export default NavBar;