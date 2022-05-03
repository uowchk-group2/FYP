import { useState } from 'react'

import {
    Navbar,
    Button,
    ActionIcon,
    Modal
} from '@mantine/core';

import { Plus } from 'tabler-icons-react';

import NavBarItem from "./navbarItem";
import NewOrder from '../order/newOrder'

const NavBar = ({ data }) => {
    const [addNew, setAddNew] = useState(false)

    return (
        <Navbar width={{ base: 300 }} >
            <Navbar.Section style={{ padding: 20, textAlign: "center" }}>
                <Button
                    variant='filled'
                    onClick={() => { setAddNew(true) }}
                >
                    <Plus color="white" />
                    Purchase Order
                </Button>
            </Navbar.Section>

            {[...data].map((item, i) => {
                return <NavBarItem key={i} data={item} />
            })}


            <Modal
                size="xl"
                opened={addNew}
                onClose={() => { setAddNew(false) }}
            >

                <NewOrder />
            </Modal>


        </Navbar>
    )
}

export default NavBar;