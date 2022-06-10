import { useState } from 'react'

import { Navbar, Button, Modal, Tabs, Input } from '@mantine/core';

import { Plus } from 'tabler-icons-react';

import NavBarItem from "./navbarItem";
import NewOrder from '../order/newOrder'

const NavBar = ({ data, params }) => {
    const [addNew, setAddNew] = useState(false)
    const [tabChosen, setTabChosen] = useState(0)
    const [searchString, setSearchString] = useState("")


    console.log(data)

    const onTabChange = (active, tabKey) => {
        console.log(tabKey)
        setTabChosen(active)
    }


    return (
        <Navbar width={{ base: 300 }} >
            <Navbar.Section style={{ padding: 10, textAlign: "center" }}>
                <Button
                    variant='filled'
                    onClick={() => { setAddNew(true) }}
                >
                    <Plus color="white" />
                    Purchase Order
                </Button>
            </Navbar.Section>

            <Input
            style={{paddingLeft:20, paddingRight:20}}
                placeholder="Search by id or goods name"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value.toLowerCase())}
            />

            <Tabs position="center" active={tabChosen} onTabChange={onTabChange}>
                <Tabs.Tab label="All" tabKey="All"></Tabs.Tab>
                <Tabs.Tab label="Incomplete" tabKey="Incomplete"></Tabs.Tab>
                <Tabs.Tab label="Completed" tabKey="Completed"></Tabs.Tab>
            </Tabs>

            {[...data].map((item, i) => {
                if (searchString === "" || (searchString != "" && (item.id.toString().includes(searchString) || item.goods.toLowerCase().includes(searchString)))) {

                    if (tabChosen === 0 || (tabChosen === 1 && !item.allDelivered) || (tabChosen === 2 && item.allDelivered)) {
                        let chosen = false;
                        if (params != undefined && item.id === parseInt(params[0])) { chosen = true }
                        return <NavBarItem key={i} data={item} chosen={chosen} />
                    }
                }
            })}


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