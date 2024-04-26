
import { Button, Table } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { deleteUser, fetchUsers } from '../api/userApis';
import UserModal from '../modals/UserModal';
import ActionModal from "../modals/ActionModal.tsx";

type userData = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    actions: string[]
}

function Users() {

    const [users, setUsers] = useState<userData[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<userData>();

    const getUsers = () => {
        fetchUsers()
            .then(data => setUsers(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUsers()
    }, [])

    const toggleModal = (id?: string|null) => {

        if(id) {
            const user = users.find((user: userData) => user.id === id);
            setSelectedUser(user);
        }

        setShowModal(!showModal)
    }

    const toggleActionModal = (id?: string|null) => {

        if(id) {
            const user = users.find((user: userData) => user.id === id);
            setSelectedUser(user);
        }

        setShowActionModal(!showActionModal)
    }

    const handleDelete = (id: string) => {
        deleteUser(id)
            .then(() => {
                setUsers(users.filter((user: userData) => user.id !== id))
            })
            .catch(err => console.log(err))
    }
    
    return (
        <>
        <div className='h-screen flex flex-col p-3 gap-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl'>Users</h1>
                <Button color="blue" className='px-4' onClick={() => toggleModal(null)}>Add User</Button>
            </div>

            <div className='overflow-x-auto border rounded-md'>
                {/* Table with three columns Name, Email and Actions */}
                <Table striped border={1} className='w-full text-center'>
                    <Table.Head className='bg-gray-100'>
                        <Table.HeadCell>
                            Name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Email
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Actions
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            users.map((user: userData) => (
                                <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {user.firstname} {user.lastname}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.email}
                                    </Table.Cell>
                                    <Table.Cell className='flex gap-2 justify-center'>
                                        <Button color="blue" className='px-4 bg-blue-500' onClick={() => toggleModal(user.id)}>Edit</Button>
                                        <Button color={"failure"} className='px-4 bg-red-500' onClick={() => handleDelete(user.id)}>Delete</Button>
                                        <Button color={"success"} className='px-4' onClick={() => toggleActionModal(user.id)}>Run Action</Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
            </div>
        </div>
        <UserModal showModal={showModal} closeModal={toggleModal} user={selectedUser}  getUsers={getUsers} setSelectedUser={setSelectedUser}/>
            <ActionModal showModal={showActionModal} closeModal={toggleActionModal} user={selectedUser} />
        </>
    ) 
}

export default Users