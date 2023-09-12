'use client'

import { Button, Table, Badge, Modal, Label, TextInput, Select, Alert, Pagination, Tooltip, Checkbox, Radio, Textarea, Dropdown } from "flowbite-react";
import { GiServerRack, GiPencilRuler, GiBigGear, GiTrashCan, GiInfo, GiScrollUnfurled } from 'react-icons/gi';
import { HiStatusOffline, HiStatusOnline, HiOutlineClock } from 'react-icons/hi';
import { useEffect, useState } from "react";
import { servers } from "@/types/tables/types";
import Moment from 'react-moment';
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { CopyToClipboard } from "./copyToClipboard.component";

export default function ServerTable() {

    // Init page states
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageCount, setPageCount] = useState<number>(1);
    const [pageTotal, setPageTotal] = useState<number>(0);
    const [openModal, setOpenModal] = useState<string | undefined>();
    const [buttonLoading, setButtonLoading] = useState<boolean>();
    const props = { openModal, setOpenModal, buttonLoading, setButtonLoading };
    const [data, setData] = useState<servers[]>()
    const [isLoading, setLoading] = useState(true)
    const [tableSelection, setTableSelection] = useState<servers[]>(new Array<servers>)
    
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

            let pageCalc = Math.ceil(parseInt(data.page.total) / pageSize);
            setPageTotal(parseInt(data.page.total))
            setPageCount(pageCalc)
            setData(allServers)
            setLoading(false)
        })
    }, [])

    const handleRowSelection = ( data : servers) => { 
    
        let newSelection = [...tableSelection];
        let index = newSelection.indexOf(data);
        if (index !== -1) {
            newSelection.splice(index, 1);
        } else {
             newSelection.push(data);
        }

        console.log(newSelection);

        setTableSelection(newSelection);
        
    };
    
    // Form Handlers
    const {
        handleSubmit: updateSubmit,
        register: updateRegister,
        setValue: updateSetValue,
        formState: { errors: updateErrors },
    } = useForm();

    //New Server Form
    const {
        handleSubmit: newServerSubmit,
        register: newServerRegister,
        formState: { errors: newServerErrors },
    } = useForm();

    //Page Size Form
    const {
        handleSubmit: newPageSizeSubmit,
        register: newPageSizeRegister,
        formState: { errors: newPageSizeErrors },
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

            let pageCalc = Math.ceil(parseInt(data.page.total) / pageSize);
            setTableSelection(new Array<servers>);
            setPageTotal(parseInt(data.page.total))
            setPageCount(pageCalc)
            setData(allServers)
            setLoading(false)
        })
    }

    // Handle Form Init
    const updateEditModalFormValues = () => {
        let data: servers = tableSelection[0]

        updateSetValue('editServerId', data.id);
        updateSetValue('editServerName', data.name);
        updateSetValue('editServerDescription', data.description);

        props.setOpenModal(`editServer`);
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
            const response = await axios.post('/api/admin/server', { name: data.newServerName, description: data.newServerDescription });
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
            const response = await axios.patch('/api/admin/server', { id:data.editServerId, name: data.editServerName, description: data.editServerDescription });

            console.log(response.data.message);
            props.setOpenModal(undefined);
            props.setButtonLoading(false);
            toast.success("Server Updated", {
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
            console.error('Error updating server:', error);
            props.setButtonLoading(false);
            let errorMessage = "Server Creation Failed";
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

    useEffect(() => {
        reloadTableData(page, pageSize);
    }, [pageSize]);

    const onSubmitPageSize = async (data: any) => {
        setPage(0);
        setPageSize(parseInt(data.pageSize));
    };

    return(
    <>
        {/* Table Buttons */}
        <div className='mb-4 flex'>
            <div className="w-full mt-2">
                <div className="flex flex-col items-start justify-between space-y-3 md:flex-row md:items-center md:space-y-0">
                    {/* Table Options */}
                    <div className="inline-flex">
                        <Button className="mr-2" color="gray" onClick={() => props.setOpenModal('createServerModal')}>
                            <GiServerRack className="mr-3 h-4 w-4" />
                            <p>
                                New Server
                            </p>
                        </Button>

                        <Button.Group className="mx-2">
                            {tableSelection.length != 1 ? (
                                <Button color="gray" disabled>
                                    <GiScrollUnfurled className="mr-3 h-4 w-4" />
                                    Execution Log
                                </Button>
                            ):(
                                <Button color="gray">
                                    <GiScrollUnfurled className="mr-3 h-4 w-4" />
                                    Execution Log
                                </Button>
                            )}
                            {tableSelection.length != 1 ? (
                                <Button color="gray" disabled>
                                    <GiPencilRuler className="mr-3 h-4 w-4" />
                                    Edit
                                </Button>
                            ):(
                                <Button color="gray" onClick={ updateEditModalFormValues }>
                                    <GiPencilRuler className="mr-3 h-4 w-4" />
                                    Edit
                                </Button>
                            )}

                            {tableSelection.length == 0 ? (
                                <Button color="gray" disabled>
                                    <GiTrashCan className="mr-3 h-4 w-4" />
                                    Delete
                                </Button>
                            ):(
                                <Button color="gray">
                                    <GiTrashCan className="mr-3 h-4 w-4" />
                                    Delete
                                </Button>
                            )}
                        </Button.Group>
                    </div>
                    

                    {/* Table Settings */}
                    <Dropdown 
                        color="gray"
                        size="lg"
                        inline
                        label={<GiBigGear className="h-6 w-6" />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                Table Settings
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Header>
                            <span className="block text-sm">
                                Page Size
                            </span>
                            <form onSubmit={newPageSizeSubmit(onSubmitPageSize)}>
                                <div className="flex items-center gap-2" >
                                    <input
                                        {...newPageSizeRegister('pageSize')}
                                        type="radio"
                                        checked
                                        value="5"
                                    />
                                    <Label htmlFor="5">
                                        5
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2" >
                                    <input
                                        {...newPageSizeRegister('pageSize')}
                                        type="radio"
                                        value="10"
                                    />
                                    <Label htmlFor="10">
                                        10
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2" >
                                    <input
                                        {...newPageSizeRegister('pageSize')}
                                        type="radio"
                                        value="15"
                                    />
                                    <Label htmlFor="15">
                                        15
                                    </Label>
                                </div>
                        
                                <Button className="mt-2" size="sm" color="gray" type="submit">
                                    Apply
                                </Button>
                            </form>
                        </Dropdown.Header>
                    </Dropdown>
                </div>
            </div>
            
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
            <>
                <Table>
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
                        <Table.Row className="bg-white h-4 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-36">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white h-4 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-36">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white h-4 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-36">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white h-4 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-36">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white h-4 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-36">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white h-4 dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-4">
                                <div className="h-3 dark:bg-slate-700  bg-slate-200 rounded animate-pulse"></div>
                            </Table.Cell>
                            <Table.Cell className="w-36">
                                <div className="h-3 dark:bg-slate-700 bg-slate-200 rounded animate-pulse"></div>
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
                <Pagination
                    currentPage={1}
                    onPageChange={ page=>{ } }
                    showIcons
                    totalPages={1}
                />
            </>
        }
        
        {/* Table Visible State */}
        { !isLoading && (data !== undefined && data?.length > 0) &&
            <>
                <Table hoverable className="max-w-full ">
                    <Table.Head>
                        <Table.HeadCell className="w-4">
                        </Table.HeadCell>
                        <Table.HeadCell className="w-4">
                            ID
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
                                        <Checkbox onChange={ () => handleRowSelection(row) } defaultValue='false' />
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-60 truncate">
                                        <div className="inline-flex">
                                            <CopyToClipboard content={row.id} />
                                            <span className="ml-2">{row.id}</span>
                                        </div>
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
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/4 truncate">
                                        {row.name}
                                    </Table.Cell>
                                    <Table.Cell className="truncate overflow-hidden max-w-sm">
                                        {row.description}
                                    </Table.Cell>
                                </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
                <div className="w-full mt-2">
                    <nav className="flex flex-col items-start justify-between space-y-3 md:flex-row md:items-center md:space-y-0"
                        aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span
                            className="font-semibold text-gray-900 dark:text-white">{ (page*pageSize)+1 }-{((page+1)*pageSize)>pageTotal ? pageTotal : (page+1)*pageSize }</span> of <span
                            className="font-semibold text-gray-900 dark:text-white">{pageTotal}</span>
                        </span>
                        
                        <Pagination
                            currentPage={page + 1}
                            onPageChange={ page=>{ reloadTableData(page-1, pageSize); setPage(page-1) } }
                            showIcons
                            totalPages={pageCount}
                        />
                    </nav>
                </div>
                    
                
            </>
        }

        {/* Update Server Modal */}
        <Modal  
            show={props.openModal === `editServer`} 
            onClose={() => props.setOpenModal(undefined)}
        >
            <Modal.Header>Update Server</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <form  onSubmit={updateSubmit(onSubmitUpdate)}>
                        <div className="block">
                            <Label
                                htmlFor="editServerId"
                                value="Server ID"
                            />
                        </div>
                        <TextInput
                            {...updateRegister('editServerId', { required: true })}
                            className="mb-2"
                            id="editServerId"
                            placeholder="123456"
                            required
                            disabled
                            type="text"
                        />
                        <div className="block">
                            <Label
                                htmlFor="editServerName"
                                value="Server Name"
                            />
                        </div>
                        <TextInput
                            {...updateRegister('editServerName', { required: true })}
                            className="mb-2"
                            id="editServerName"
                            placeholder="My New Holdfast Server"
                            required
                            type="text"
                        />

                        <div className="block">
                            <Label
                                htmlFor="editServerDescription"
                                value="Server Description (Optional)"
                            />
                        </div>
                        <Textarea
                            {...updateRegister('editServerDescription', { required: false })}
                            id="editServerDescription"
                            className="mb-2"
                            placeholder="A short description about your server"
                            required
                            rows={2}
                        />

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

        {/* Server Log Modal */}
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

        {/* Delete Server Modal */}
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

        {/* Create Server Modal */}
        <Modal 
            show={props.openModal === 'createServerModal'} 
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
                            placeholder="My New Holdfast Server"
                            required
                            type="text"
                        />

                        <div className="block">
                            <Label
                                htmlFor="serverDescription"
                                value="Description (Optional)"
                            />
                        </div>
                        <Textarea
                            {...newServerRegister('newServerDescription', { required: false })}
                            id="serverDescription"
                            className="mb-2"
                            placeholder="A short description about your server"
                            required
                            rows={2}
                        />

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