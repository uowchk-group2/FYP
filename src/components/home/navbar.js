import { useState } from 'react'

import { Navbar, Button, Modal } from '@mantine/core';

import { Plus } from 'tabler-icons-react';

import NavBarItem from "./navbarItem";
import NewOrder from '../order/newOrder'

const NavBar = ({ data, params }) => {
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
                let chosen = false;
                if (params != undefined && item.id === parseInt(params[0])) { chosen = true }
                return <NavBarItem key={i} data={item} chosen={chosen} />
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