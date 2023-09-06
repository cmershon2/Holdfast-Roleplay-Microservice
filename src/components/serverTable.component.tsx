'use client'

import { Button, Table, Badge, Modal, Label, TextInput, Select, Alert, Pagination, Tooltip, Checkbox, Radio } from "flowbite-react";
import { GiServerRack, GiPencilRuler, GiSemiClosedEye, GiTrashCan, GiInfo } from 'react-icons/gi';
import { HiStatusOffline, HiStatusOnline, HiOutlineClock } from 'react-icons/hi';
import { useEffect, useState } from "react";
import { servers } from "@/types/tables/types";
import Moment from 'react-moment';
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function ServerTable() {

    // Init page states
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageCount, setPageCount] = useState<number>(1);
    const [openModal, setOpenModal] = useState<string | undefined>();
    const [buttonLoading, setButtonLoading] = useState<boolean>();
    const props = { openModal, setOpenModal, buttonLoading, setButtonLoading };
    const [data, setData] = useState<servers[]>()
    const [isLoading, setLoading] = useState(true)
    
    // Get Inital Page Data
    useEffect(() => {
        fetch('/api/admin/server?page=0&page_size=5')
        .then((res) => res.json())
        .then((data) => {
            var allServers : servers[] = data.servers.map((item : servers) => ({
                id: item.id,
                name: item.name,
                status: item.status,
                description: item.description,
                lastRunDate: item.lastRunDate
            }));

            let pageCalc = Math.ceil(parseInt(data.total) / pageSize);
            setPageCount(pageCalc)
            setData(allServers)
            setLoading(false)
        })
    }, [])

    // Form Handlers
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm();

    //New Server Form
    const {
        handleSubmit: newServerSubmit,
        register: newServerRegister,
        formState: { errors: newServerErrors },
    } = useForm();

    const {
        register: viewTokenRegister,
        setValue: setViewTokenValue
    } = useForm();

    const {
        handleSubmit: deleteTokenSubmit,
        register: deleteTokenRegister,
        setValue: setDeleteTokenValue
    } = useForm();

    // Refresh table data
    const reloadTableData = (page : number, page_size : number) => {
        fetch(`/api/admin/server?page=${page}&page_size=${page_size}`)
        .then((res) => res.json())
        .then((data) => {
            var allServers : servers[] = data.servers.map((item : servers) => ({
                id: item.id,
                name: item.name,
                status: item.status,
                description: item.description,
                lastRunDate: item.lastRunDate
            }));

            let pageCalc = Math.ceil(parseInt(data.total) / pageSize);
            setPageCount(pageCalc)
            setData(allServers)
            setLoading(false)
        })
    }

    // Handle Form Init
    const updateEditModalFormValues = (data : servers) => {
        setValue('editTokenId', data.id);
        setValue('editTokenName', data.name);

        props.setOpenModal(`editToken`);
    }

    const updateDeleteModalFormValues = (data : servers) => {
        setDeleteTokenValue('deleteTokenId', data.id);
        setDeleteTokenValue('deleteTokenName', data.name);

        props.setOpenModal(`deleteToken`);
    }

    // Handle Form Submissions
    const onSubmitNewServer = async (data: any) => {
        props.setButtonLoading(true);

        try {
            const response = await axios.post('/api/admin/server', { name: data.newServerName });
            console.log(page, pageSize);
            props.setOpenModal(undefined);
            props.setButtonLoading(false);
            toast.success("Server Created", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            reloadTableData(page, pageSize);
        } catch (error : any) {
            console.error('Error creating server token:', newServerErrors);
            let errorMessage = "Server Creation Failed";
            props.setButtonLoading(false);

            if(error.response.data.errorCode == "P2002"){
                errorMessage = "Server Name Already Exists";
            }
            toast.error(errorMessage, {
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
            reloadTableData(page, pageSize);
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

    const onSubmitDelete = async (data: any) => {

        props.setButtonLoading(true);

        try {
            const response = await axios.delete('/api/admin/server/token', { data: {serverTokenId :data.deleteTokenId} });

            console.log(response.data.message);
            props.setOpenModal(undefined);
            props.setButtonLoading(false);
            toast.success("Server Token Deleted", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            reloadTableData(page, pageSize);
        } catch (error) {
            console.error('Error deleting server token:', error);
            props.setButtonLoading(false);
            toast.error("Server Token Deletion Failed", {
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
        <div className='mb-4 flex'>
            <Button className="mr-2" color="gray" onClick={() => props.setOpenModal('openTokenModal')}>
                <GiServerRack className="mr-3 h-4 w-4" />
                <p>
                    New Server
                </p>
            </Button>

            <Button.Group className="mx-2">
                <Button color="gray">
                    <GiSemiClosedEye className="mr-3 h-4 w-4" />
                    Log
                </Button>
                <Button color="gray" onClick={() => console.log("TODO: Edit") }>
                    <GiPencilRuler className="mr-3 h-4 w-4" />
                    Edit
                </Button>
                <Button color="gray" onClick={() => console.log("TODO: DELETE")}>
                    <GiTrashCan className="mr-3 h-4 w-4" />
                    Delete
                </Button>
            </Button.Group>
        </div>

        {/* No Data State */}
        { !isLoading && data == undefined || data?.length == 0 &&
            <Alert color="info">
                <p>
                    It looks like you don't have any Server Tokens yet, let's make one to connect to your Holdfast server!
                </p>
            </Alert>
        }

        {/* Table Loading State */}
        { isLoading &&
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
                    <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell className="w-4">
                            <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell className="w-4">
                            <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell className="w-4">
                            <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell className="w-4">
                            <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell className="w-4">
                            <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white h-16 dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell className="w-4">
                            <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        }
        
        {/* Table Visible State */}
        { !isLoading && (data !== undefined && data?.length > 0) &&
            <>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell className="w-4">
                        </Table.HeadCell>
                        <Table.HeadCell className="w-4">
                            Status
                        </Table.HeadCell>
                        <Table.HeadCell className="w-36">
                            Last Run Date
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Description
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        { !isLoading && data &&

                            data.map((row : servers) =>{
                                return(
                                <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="w-4">
                                        <Radio
                                            id={"select-"+row.id}
                                            name="row-select"
                                            value={row.id}
                                        />
                                    </Table.Cell>
                                    <Table.Cell className="w-4 px-10">
                                        {row.status=="TIMEOUT" && (<Tooltip content="Server Timed Out"><Badge icon={HiOutlineClock} color="warning"></Badge></Tooltip>)}
                                        {row.status=="ONLINE" && (<Tooltip content="Server Live"><Badge className="animate-pulse" color="success" icon={HiStatusOnline} /></Tooltip>)}
                                        {row.status=="OFFLINE" && (<Tooltip content="Server Offline"><Badge color="failure" icon={HiStatusOffline} /></Tooltip>)}
                                    </Table.Cell>
                                    <Table.Cell className="w-36">
                                        {!row.lastRunDate && (<p>Never</p>)}
                                        {row.lastRunDate && (
                                            <Moment format="MMM DD, YYYY">
                                                {row.lastRunDate}
                                            </Moment>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {row.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {row.description}
                                    </Table.Cell>
                                </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
                <Pagination
                    currentPage={page + 1}
                    onPageChange={ page=>{ reloadTableData(page-1, pageSize); setPage(page-1) } }
                    showIcons
                    totalPages={pageCount}
                />
            </>
        }

        {/* Update Server */}
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

        {/* Server Log */}
        <Modal  
            show={props.openModal === `viewToken`} 
            onClose={() => props.setOpenModal(undefined)}
        >
            <Modal.Header>View Server Token</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <form>
                    <Alert
                        color="failure"
                        icon={GiInfo}
                        >
                        <span>
                            <p>
                                Server tokens should be kept private and set to "Inactive" when not in use
                            </p>
                        </span>
                        </Alert>
                        <div className="block mt-4">
                            <Label
                                htmlFor="viewTokenName"
                                value="Token Name"
                            />
                        </div>
                        <TextInput
                            {...viewTokenRegister('viewTokenName')}
                            className="mb-2"
                            id="viewTokenName"
                            placeholder="my new holdfast token"
                            disabled
                            type="text"
                        />

                        <div className="block">
                            <Label
                                htmlFor="viewToken"
                                value="Token"
                            />
                        </div>
                        <TextInput
                            {...viewTokenRegister('viewToken')}
                            className="mb-2"
                            id="viewToken"
                            placeholder="my new holdfast token"
                            readOnly
                            type="text"
                        />

                    </form>
                </div>
            </Modal.Body>
        </Modal>

        {/* Delete Server */}
        <Modal  
            show={props.openModal === `deleteToken`} 
            onClose={() => props.setOpenModal(undefined)}
        >
            <Modal.Header>Delete Server Token</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <form onSubmit={deleteTokenSubmit(onSubmitDelete)}>
                        <h5>Are you sure you want to delete the following Server Token?</h5>
                        <div className="block mt-4">
                            <Label
                                htmlFor="deleteTokenId"
                                value="Token ID"
                            />
                        </div>
                        <TextInput
                            {...deleteTokenRegister('deleteTokenId')}
                            className="mb-2"
                            id="deleteTokenId"
                            placeholder="my holdfast token id"
                            disabled
                            type="text"
                        />

                        <div className="block mt-2">
                            <Label
                                htmlFor="deleteTokenName"
                                value="Token Name"
                            />
                        </div>
                        <TextInput
                            {...deleteTokenRegister('deleteTokenName')}
                            className="mb-4"
                            id="deleteTokenName"
                            placeholder="my new holdfast token"
                            disabled
                            type="text"
                        />

                        <Alert
                            className="mb-4"
                            color="failure"
                            icon={GiInfo}
                            >
                            <span>
                                <p>
                                    After deletion, all servers using the token will no longer be able to reach the Holdfast Roleplay Admin
                                </p>
                            </span>
                        </Alert>
                        
                        <div className="flex items-center gap-2">
                            
                            {props.buttonLoading &&
                                <Button color="failure" isProcessing disabled>
                                    <p>
                                        Delete Token
                                    </p>
                                </Button>
                            }
                            {!props.buttonLoading &&
                                <Button color="failure" type="submit">
                                    <GiTrashCan className="mr-2 h-5 w-5" />
                                    <p>
                                        Delete Token
                                    </p>
                                </Button>
                            }

                            <Button color="gray" onClick = {() => props.setOpenModal(undefined)}>
                                Cancel
                            </Button>
                        </div>

                    </form>
                </div>
            </Modal.Body>
        </Modal>

        {/* Create Server */}
        <Modal 
            show={props.openModal === 'openTokenModal'} 
            onClose={() => props.setOpenModal(undefined)}
        >

            <Modal.Header>Add New Server</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <form onSubmit={newServerSubmit(onSubmitNewServer)}>
                        <div className="block">
                            <Label
                                htmlFor="serverName"
                                value="Server Name"
                            />
                        </div>
                        <TextInput
                            {...newServerRegister('newServerName', { required: true })}
                            className="mb-2"
                            id="serverName"
                            placeholder="my new holdfast server"
                            required
                            type="text"
                        />
                        {errors.name && <p>Server name is required</p>}

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