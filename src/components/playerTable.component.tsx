'use client'

import { Button, Table, Badge, Modal, Label, TextInput, Select, Alert, Pagination, Tooltip, Checkbox, Radio, Textarea, Dropdown } from "flowbite-react";
import { GiServerRack, GiPencilRuler, GiBigGear, GiTrashCan, GiInfo, GiScrollUnfurled } from 'react-icons/gi';
import { HiStatusOffline, HiStatusOnline, HiOutlineClock } from 'react-icons/hi';
import { useEffect, useRef, useState } from "react";
import { holdfastUser } from "@/types/tables/types";
import Moment from 'react-moment';
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { SearchStatusScreen } from "./statusMessages.component";
import { CopyToClipboard } from "./copyToClipboard.component";
import { User } from "@/types/user/types";



export default function PlayerTable(user: User) {

    // Init page states
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageCount, setPageCount] = useState<number>(1);
    const [pageTotal, setPageTotal] = useState<number>(0);
    const [openModal, setOpenModal] = useState<string | undefined>();
    const [buttonLoading, setButtonLoading] = useState<boolean>();
    const props = { openModal, setOpenModal, buttonLoading, setButtonLoading };
    const [data, setData] = useState<holdfastUser[]>()
    const [isLoading, setLoading] = useState(true)
    const [tableSelection, setTableSelection] = useState<holdfastUser[]>(new Array<holdfastUser>)
    const rowCheckboxRef= useRef<HTMLInputElement[]>(new Array<HTMLInputElement>);
    
    // Get Inital Page Data
    useEffect(() => {
        fetch(`/api/admin/players?page=0&page_size=${pageSize}`)
        .then((res) => res.json())
        .then((data) => {
            var allPlayers : holdfastUser[] = data.players.map((item : holdfastUser) => ({
                id: item.id,
                steamId: item.steamId,
                isOnline: item.isOnline,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                role: item.role
            }));

            console.log(allPlayers);

            let pageCalc = Math.ceil(parseInt(data.page.total) / pageSize);
            setPageTotal(parseInt(data.page.total))
            setPageCount(pageCalc)
            setData(allPlayers)
            setLoading(false)
        })
    }, [])

    // listen for table page size change
    useEffect(() => {
        reloadTableData(page, pageSize);
    }, [pageSize]);

    const handleRowSelection = ( data : holdfastUser) => { 
    
        let newSelection = [...tableSelection];
        let index = newSelection.indexOf(data);
        if (index !== -1) {
            newSelection.splice(index, 1);
        } else {
             newSelection.push(data);
        }
        setTableSelection(newSelection);
        
    };

    const uncheckAllRowSelections = () => {
        rowCheckboxRef.current.forEach((checkbox) => {
            checkbox.checked = false;
        });
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
        handleSubmit: deleteServerSubmit,
    } = useForm();

    // Refresh table data
    const reloadTableData = (page : number, page_size : number) => {
        fetch(`/api/admin/players?page=${page}&page_size=${page_size}`)
        .then((res) => res.json())
        .then((data) => {
            var allPlayers : holdfastUser[] = data.players.map((item : holdfastUser) => ({
                id: item.id,
                steamId: item.steamId,
                isOnline: item.isOnline,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                role: item.role
            }));

            let pageCalc = Math.ceil(parseInt(data.page.total) / pageSize);
            uncheckAllRowSelections();
            setTableSelection(new Array<holdfastUser>);
            setPageTotal(parseInt(data.page.total))
            setPageCount(pageCalc)
            setData(allPlayers)
            setLoading(false)
        })
    }

    
    const updateDeleteModalFormValues = (data : holdfastUser) => {
        props.setOpenModal(`deleteServer`);
    }

    const onSubmitDelete = async (data: any) => {

        props.setButtonLoading(true);

        tableSelection.forEach(async server => {
            try {
                const response = await axios.delete('/api/admin/server', { data: {id : server.id} });
    
                console.log(response.data.message);
                props.setOpenModal(undefined);
                props.setButtonLoading(false);
                toast.success(`Server Deleted`, {
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
                toast.error(`Server Failed Deletion`, {
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
        });

    };

    const onSubmitPageSize = async (data: any) => {
        setPage(0);
        setPageSize(parseInt(data.pageSize));
    };

    return(
    <>
        {/* Table Options */}
        <div className='mb-4 flex'>
            <div className="w-full mt-2">
                <div className="flex flex-col items-start justify-between space-y-3 md:flex-row md:items-center md:space-y-0">
                    {/* Table Options */}
                    <div className="inline-flex">
                    </div>
                    
                    {/* Table Settings */}
                    {!isLoading && (data !== undefined && data?.length > 0) &&
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
                                            value="10"
                                            checked
                                        />
                                        <Label htmlFor="10">
                                            10
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2" >
                                        <input
                                            {...newPageSizeRegister('pageSize')}
                                            type="radio"
                                            value="25"
                                        />
                                        <Label htmlFor="25">
                                            25
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2" >
                                        <input
                                            {...newPageSizeRegister('pageSize')}
                                            type="radio"
                                            value="50"
                                        />
                                        <Label htmlFor="50">
                                            50
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2" >
                                        <input
                                            {...newPageSizeRegister('pageSize')}
                                            type="radio"
                                            value="100"
                                        />
                                        <Label htmlFor="100">
                                            100
                                        </Label>
                                    </div>

                                    <Button className="mt-2" size="sm" color="gray" type="submit">
                                        Apply
                                    </Button>
                                </form>
                            </Dropdown.Header>
                        </Dropdown>
                    }
                </div>
            </div>
            
        </div>

        {/* No Data State */}
        { !isLoading && data == undefined || data?.length == 0 &&
            <SearchStatusScreen title="No Players Found" message="Start your Holdfast server and see players join!" />
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
                <div className="w-full mt-2">
                    <nav className="flex flex-col items-start justify-between space-y-3 md:flex-row md:items-center md:space-y-0"
                        aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span
                            className="font-semibold text-gray-900 dark:text-white">0-0</span> of <span
                            className="font-semibold text-gray-900 dark:text-white">0</span>
                        </span>
                        
                        <Pagination
                            currentPage={1}
                            onPageChange={ page=>{} }
                            showIcons
                            totalPages={1}
                        />
                    </nav>
                </div>
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
                            Steam ID
                        </Table.HeadCell>
                        <Table.HeadCell className="w-4">
                            Status
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Role
                        </Table.HeadCell>
                        <Table.HeadCell className="w-36">
                            Join Date
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Last Online
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        { !isLoading && data &&

                            data.map((row : holdfastUser) =>{
                                return(
                                <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="w-4">
                                        <Checkbox ref={(element) => { if(element != null)rowCheckboxRef.current.push(element); }} onChange={ () => handleRowSelection(row) } defaultValue='false' />
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-60 truncate">
                                        <div className="inline-flex">
                                            <CopyToClipboard content={row.steamId} />
                                            <span className="ml-2">{row.steamId}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="w-4 px-10">
                                        {row.isOnline==true && (<Tooltip content="Player Online"><Badge className="animate-pulse" color="success" icon={HiStatusOnline} /></Tooltip>)}
                                        {row.isOnline==false && (<Tooltip content="Player Offline"><Badge color="failure" icon={HiStatusOffline} /></Tooltip>)}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/4 truncate">
                                        {!row.role && (<p>None</p>)}
                                        {row.role && (<p>{row.role}</p>)}
                                    </Table.Cell>
                                    <Table.Cell className="w-36">
                                        {!row.createdAt && (<p>Never</p>)}
                                        {row.createdAt && (
                                            <Moment format="MMM DD, YYYY h:mm:ss">
                                                {row.createdAt}
                                            </Moment>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell className="w-36">
                                        {!row.updatedAt && (<p>Never</p>)}
                                        {row.updatedAt && (
                                            <Moment format="MMM DD, YYYY h:mm:ss">
                                                {row.updatedAt}
                                            </Moment>
                                        )}
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

        {/* Delete Server Modal */}
        <Modal  
            show={props.openModal === `deleteServer`} 
            onClose={() => props.setOpenModal(undefined)}
        >
            <Modal.Header>Delete Server Instances</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <form onSubmit={deleteServerSubmit(onSubmitDelete)}>
                        <h5>Are you sure you want to delete the following Server Instances?</h5>

                        <Table hoverable className="max-w-full mt-2">
                            <Table.Head>
                                <Table.HeadCell className="bg-gray-50 dark:bg-gray-600">
                                    ID
                                </Table.HeadCell>
                                <Table.HeadCell className="bg-gray-50 dark:bg-gray-600">
                                    Name
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                { tableSelection.length > 0 &&
                                    tableSelection.map((row : holdfastUser) => {
                                        return(
                                            <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-60 truncate">
                                                    <div className="inline-flex">
                                                        <span className="ml-2">{row.id}</span>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/4 truncate">
                                                    {row.steamId}
                                                </Table.Cell>
                                            </Table.Row>                                            
                                        )
                                    })
                                }
                            </Table.Body>
                        </Table>

                        <Alert
                            className="my-4"
                            color="failure"
                            icon={GiInfo}
                            >
                            <span>
                                <p>
                                    Once deleted, all related server entities are deleted as well.
                                </p>
                            </span>
                        </Alert>
                        
                        <div className="flex items-center gap-2">
                            
                            {props.buttonLoading &&
                                <Button color="failure" isProcessing disabled>
                                    <p>
                                        Delete Servers
                                    </p>
                                </Button>
                            }
                            {!props.buttonLoading &&
                                <Button color="failure" type="submit">
                                    <GiTrashCan className="mr-2 h-5 w-5" />
                                    <p>
                                        Delete Servers
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
    </>)
}