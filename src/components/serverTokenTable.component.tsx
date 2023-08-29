'use client'

import { Button, Table, Badge, Modal, Label, TextInput, Select } from "flowbite-react";
import { GiKeyring, GiPencilRuler, GiSemiClosedEye, GiTrashCan } from 'react-icons/gi';
import { useEffect, useState } from "react";
import { serverToken } from "@/types/tables/types";
import Moment from 'react-moment';
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function ServerTokenTable() {

    const [data, setData] = useState<serverToken[]>()
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch('/api/admin/server/token')
        .then((res) => res.json())
        .then((data) => {
            var allTokens : serverToken[] = data.allServerTokens.map((item : serverToken) => ({
                id: item.id,
                name: item.name,
                token: item.token,
                active: item.active,
                createdAt: item.createdAt,
            }));

            setData(allTokens)
            setLoading(false)
        })
    }, [])

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm();

    const {
        handleSubmit: newTokenSubmit,
        register: newTokenRegister,
        formState: { errors: newTokenErrors },
    } = useForm();

    const [openModal, setOpenModal] = useState<string | undefined>();
    const [buttonLoading, setButtonLoading] = useState<boolean>();
    const props = { openModal, setOpenModal, buttonLoading, setButtonLoading };

    const reloadTableData = () => {
        fetch('/api/admin/server/token')
        .then((res) => res.json())
        .then((data) => {
            var allTokens : serverToken[] = data.allServerTokens.map((item : serverToken) => ({
                id: item.id,
                name: item.name,
                token: item.token,
                active: item.active,
                createdAt: item.createdAt,
            }));

            setData(allTokens)
            setLoading(false)
        })
    }

    const updateEditModalFormValues = (data : serverToken) => {
        setValue('editTokenId', data.id);
        setValue('editTokenName', data.name);
        setValue('editTokenStatus', data.active);

        props.setOpenModal(`editToken`);
    }

    const onSubmitNewToken = async (data: any) => {
        props.setButtonLoading(true);

        try {
            const response = await axios.post('/api/admin/server/token', { name: data.newTokenName });
            console.log(response.data.message);
            props.setOpenModal(undefined);
            props.setButtonLoading(false);
            toast.success("Server Token Created", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            reloadTableData();
        } catch (error) {
            console.error('Error creating server token:', newTokenErrors);
            props.setButtonLoading(false);
            toast.error("Server Token Failed", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    };

    const onSubmitUpdate = async (data: any) => {

        props.setButtonLoading(true);

        try {
            const response = await axios.patch('/api/admin/server/token', { id:data.editTokenId, name: data.editTokenName, active: JSON.parse(data.editTokenStatus) });

            console.log(response.data.message);
            props.setOpenModal(undefined);
            props.setButtonLoading(false);
            toast.success("Server Token Updated", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            reloadTableData();
        } catch (error) {
            console.error('Error creating server token:', error);
            props.setButtonLoading(false);
            toast.error("Server Token Update Failed", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    };

    

    return(
    <>
        <div className='mb-4'>
            <Button color="gray" onClick={() => props.setOpenModal('openTokenModal')}>
                <GiKeyring className="mr-3 h-4 w-4" />
                <p>
                    New Token
                </p>
            </Button>
        </div>

        <Table>
            <Table.Head>
                <Table.HeadCell>
                    Name
                </Table.HeadCell>
                <Table.HeadCell>
                    Status
                </Table.HeadCell>
                <Table.HeadCell>
                    Created At
                </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">
                        Edit
                    </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                { !isLoading && data &&

                    data.map((row : serverToken) =>{
                        return(
                        <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {row.name}
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                {row.active && <Badge color="success"><span>Active</span></Badge>}
                                {!row.active && <Badge color="failure">Inactive</Badge>}
                            </Table.Cell>
                            <Table.Cell>
                                <Moment format="MMM DD, YYYY">
                                    {row.createdAt}
                                </Moment>
                            </Table.Cell>
                            <Table.Cell className="justify-end">
                                <Button.Group>
                                    <Button color="gray">
                                        <GiSemiClosedEye className="mr-3 h-4 w-4" />
                                        Show Token
                                    </Button>
                                    <Button color="gray" onClick={() => updateEditModalFormValues(row) }>
                                        <GiPencilRuler className="mr-3 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button color="gray">
                                        <GiTrashCan className="mr-3 h-4 w-4" />
                                        Delete
                                    </Button>
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                        )
                    })
                }
                {
                    isLoading &&
                    <>
                        <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded"></div>
                            </Table.Cell>
                        </Table.Row>
                    </>
                }
            </Table.Body>
        </Table>

        <Modal  
            show={props.openModal === `editToken`} 
            onClose={() => props.setOpenModal(undefined)}
        >
            <Modal.Header>Update Server Token</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <form  onSubmit={handleSubmit(onSubmitUpdate)}>
                        <div className="block">
                            <Label
                                htmlFor="editTokenId"
                                value="Token ID"
                            />
                        </div>
                        <TextInput
                            {...register('editTokenId', { required: true })}
                            className="mb-2"
                            id="editTokenId"
                            placeholder="123456"
                            required
                            disabled
                            type="text"
                        />
                        <div className="block">
                            <Label
                                htmlFor="editTokenName"
                                value="Token Name"
                            />
                        </div>
                        <TextInput
                            {...register('editTokenName', { required: true })}
                            className="mb-2"
                            id="editTokenName"
                            placeholder="my new holdfast token"
                            required
                            type="text"
                        />
                        {errors.name && <p>Token name is required</p>}

                        <Label htmlFor="editTokenStatus">
                            Token Status
                        </Label>
                        <Select {...register('editTokenStatus', { required: true })} id="editTokenStatus" className="mb-2">
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </Select>

                        {props.buttonLoading &&
                            <Button isProcessing disabled>
                                Submit
                            </Button>
                        }
                        {!props.buttonLoading &&
                            <Button type="submit">
                                Submit
                            </Button>
                        }
                    </form>
                </div>
            </Modal.Body>
        </Modal>

        <Modal  
            show={props.openModal === `viewToken`} 
            onClose={() => props.setOpenModal(undefined)}
        >
            <Modal.Header>View Server Token</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                        <div className="block">
                            <Label
                                htmlFor="editTokenId"
                                value="Token ID"
                            />
                        </div>
                        <TextInput
                            className="mb-2"
                            id="editTokenId"
                            placeholder="123456"
                            required
                            disabled
                            type="text"
                        />
                        <div className="block">
                            <Label
                                htmlFor="editTokenName"
                                value="Token Name"
                            />
                        </div>
                        <TextInput
                            className="mb-2"
                            id="editTokenName"
                            placeholder="my new holdfast token"
                            required
                            type="text"
                        />
                        {errors.name && <p>Token name is required</p>}

                        <Label htmlFor="isTokenActive">
                            Token Status
                        </Label>
                        <Select id="isTokenActive" className="mb-2">
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </Select>

                </div>
            </Modal.Body>
        </Modal>

        <Modal 
            show={props.openModal === 'openTokenModal'} 
            onClose={() => props.setOpenModal(undefined)}
        >

            <Modal.Header>Add New Server Token</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <form onSubmit={newTokenSubmit(onSubmitNewToken)}>
                        <div className="block">
                            <Label
                                htmlFor="tokenName"
                                value="Token Name"
                            />
                        </div>
                        <TextInput
                            {...newTokenRegister('newTokenName', { required: true })}
                            className="mb-2"
                            id="tokenName"
                            placeholder="my new holdfast token"
                            required
                            type="text"
                        />
                        {errors.name && <p>Token name is required</p>}

                        {props.buttonLoading &&
                            <Button isProcessing disabled>
                                Submit
                            </Button>
                        }
                        {!props.buttonLoading &&
                            <Button type="submit">
                                Submit
                            </Button>
                        }
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    </>)
}