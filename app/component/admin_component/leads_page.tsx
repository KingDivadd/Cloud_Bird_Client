'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import { get_auth_request } from '@/app/api';
import Lead_Management_Modal from './lead_management_modal'


export interface LeadsProps {
    forEach(arg0: (data: any, ind: number) => void): unknown;
    filter(arg0: (lead: any) => any): unknown;
    map(arg0: (data: any) => void): unknown;
    total_number_of_pages:number;
    total_number_of_leads:number;
    leads:any;
}

const Leads_page = () => {

    const [modalFor, setModalFor] = useState('')
    const [selectedLead, setSelectedLead] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [app_leads, setApp_leads] = useState<LeadsProps | null>(null);
    const [filtered_leads, setFiltered_leads] = useState<LeadsProps | null>(null); 

    const [filters, setFilters] = useState({filter_input: '', status: '',})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        status: false
    });
    const [dropElements, setDropElements] = useState({
        status: 'Status'

    })

    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({...dropElements, [dropdown]: 'SELECT'});
    };

    const handleSelectDropdown = (dropdown: any, title:any)=>{
        handle_new_filter(dropdown.toUpperCase().replace(/ /g,'_'))
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }

    async function handleFilter(e: any) {
        const value = e.target.value.toLowerCase();
        setFilters({ ...filters, filter_input: value });
    
        if (app_leads && app_leads.leads) {
            if (value.trim() !== '') {
                const new_app_leads = app_leads.leads.filter((data: any) => {
                const name = data.name?.toLowerCase() || '';
                const last_name = data.assigned_to.last_name?.toLowerCase() || '';
                const first_name = data.assigned_to.frst_name?.toLowerCase() || '';
        
                return (
                    name.includes(value) ||
                    last_name.includes(value) ||
                    first_name.includes(value)
                );
                });
        
                setFiltered_leads({ ...app_leads, leads: new_app_leads });
            } else {
                setFiltered_leads(app_leads); // Reset to the original list
            }
        }
    }

    async function handle_new_filter(item: string) {
        if (app_leads && item.toLocaleLowerCase() == 'all') {
            console.log(app_leads);
            
            // If no filter is provided, reset to the original list
            setFiltered_leads(app_leads);
        
        } 
        else if (item && app_leads) {
            console.log(item);
            
            const new_app_leads = app_leads.leads.filter((data: any) => {
                const status = data.status?.toUpperCase() || '';
    
                // Check if the filter item matches either the lead_role or active_status
                return (
                    status === item.toUpperCase() 
                );
            });
    
            setFiltered_leads({ ...app_leads, leads: new_app_leads });
        } else {
            // If no filter is provided, reset to the original list
            setFiltered_leads(app_leads);
        }
    }

    useEffect(() => {
        
        get_all_leads(page_number)

    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_leads(page_number:number) {

        const response = await get_auth_request(`lead/all-leads/${page_number}`)

        if (response.status == 200 || response.status == 201){
            
            setApp_leads(response.data.data)      
            
            setFiltered_leads(response.data.data)

            console.log(response.data.data.leads);
            
            showAlert(response.data.msg, "success")
        }else{
        console.log(response);
        
        showAlert(response.response.data.err, "error")
        }
    }

    async function app_leads_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = app_leads?.total_number_of_pages

        if (item === 'prev') {
            if (page_number > 1) {
                new_page_number = page_number - 1;
            }
        } else if (item === 'next') {
            if (max_page_number && page_number < max_page_number) {
                new_page_number = page_number + 1;
            }
        } else {
            new_page_number = item;
        }

        get_all_leads(new_page_number)
        console.log('new page number ', new_page_number);

        setPage_number(new_page_number);
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = app_leads?.total_number_of_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer text-slate-200 ${
                page_number === i ? 'bg-slate-600 text-white' : ''
                }`}
                onClick={() => app_leads_action(i)}
            >
                {i}
            </p>
            );
        }
        } else {
        let startPage = Math.max(1, page_number - 1);
        let endPage = Math.min(page_number + 1, max_page_number);

        if (page_number === 1) {
            startPage = 1;
            endPage = max_displayed_pages;
        } else if (page_number === max_page_number) {
            startPage = max_page_number - 2;
            endPage = max_page_number;
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => app_leads_action(i)}
            >
                {i}
            </p>
            );
        }
        }

        return pages;
    };

    function add_new_lead(){
        setModalFor('add')
        setShowModal(true)
        setSelectedLead(null)
    }
    

    function edit_lead(data:any) {
        setModalFor('edit')
        setShowModal(true)
        setSelectedLead(data)
    }

    function delete_lead(data:any) {
        setModalFor('delete')
        // setShowModal(true) 
        setSelectedLead(data)
    }

    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[25px] ">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-md font-semibold text-slate-200">All leads</p>
                        <p className="text-sm text-slate-200">{app_leads?.total_number_of_leads}</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            
                            <span className="w-[250px] h-[40px] ">
                                <input type="text" name="filter-input" onChange={handleFilter} placeholder='Enter lead name' id="" className='dark-normal-input  ' />
                            </span>
                            <span className="h-[40px] min-w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['New', 'Contacted', 'In Progress', 'Converted', 'Closed', 'All']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>

                        <button className="h-[40px] px-4 bg-slate-600 hover:bg-salte-700 text-slate-200 rounded-[3px] flex items-center justify-center text-[16px]" onClick={add_new_lead}>Add New Lead</button>

                    </span>
                </span>

                {/* lead table */}

                <div className="w-full min-h-[150px] flex flex-col rounded-[5px] border border-slate-600">
                    <span className="w-full h-[40px] flex flex-row items-center justify-start bg-slate-600 rounded-t-[5px] border-b border-slate-600 rounded-t-[4px]">
                        <p className="text-[15px] font-normal w-[17.5%] px-2 text-slate-200 ">Name</p>
                        <p className="text-[15px] font-normal w-[17.5%] px-2 text-slate-200 ">Assigned To </p>
                        <p className="text-[15px] font-normal w-[30%] px-2 text-slate-200 ">Email</p>
                        <p className="text-[15px] font-normal w-[12.5%] px-2 text-slate-200 ">Status</p>
                        <p className="text-[15px] font-normal w-[11%] px-2 text-slate-200 ">Action</p>
                        <p className="text-[15px] font-normal w-[11.5%] px-2 text-slate-200 "></p>
                    </span>
                    <div className="w-full flex flex-col justify-start items-start lead-list-cont overflow-y-auto ">
                        
                        {filtered_leads !== null ?
                        
                            <div className='h-auto w-full flex flex-col justify-start '>
                            { filtered_leads?.leads.map((data:any, ind:number)=>{
                                const {name, company_name, email, assigned_to, status} = data
                                return (
                                    <span key={ind} className="recent-activity-table-list " >
                                        <p className="text-[15px] w-[17.5%] px-2 text-slate-200 "> {name} </p>
                                        <p className="text-[15px] w-[17.5%] px-2 text-slate-200 flex gap-[10px] "> {assigned_to.last_name} {assigned_to.first_name} </p>
                                        <p className="text-[15px] w-[30%] px-2 text-slate-200 "> {email} </p>
                                        
                                        <p className={`text-[15px] w-[12.5%] px-2 text-slate-200 `}> {status.replace(/_/,' ')} </p>

                                        <p className="text-[15px] w-[11%] px-2 text-slate-200 flex flex-row items-center justify-start gap-2 text-slate-200 hover:text-lime-600 cursor-pointer" onClick={()=>{edit_lead(data)}} ><MdEdit size={16} /> Edit</p>
                                        
                                        <p className="text-[15px] w-[11.5%] px-2 text-slate-200 flex flex-row items-center justify-start gap-2 text-slate-200 hover:text-red-400 cursor-pointer"  onClick={()=>delete_lead(data)} ><MdDeleteForever size={18} /> Delete</p>
                                    </span>
                                )
                            })}
                            </div>
                        
                        :

                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-[16px] font-normal text-slate-200">Loading Data...</p>
                            </div>
                        
                        }
                    </div>
                    <span className="w-full h-[40px] flex flex-row items-center justify-between  rounded-b-[5px] border-t border-slate-600 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-[15px] text-slate-200 cursor-pointer" onClick={() => app_leads_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-[15px] text-slate-200 cursor-pointer" onClick={() => app_leads_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-[15px] text-slate-200">Showing 1 - 15 of {app_leads?.total_number_of_leads || 0}</p>
                        </span>
                    </span>
                </div>
            </div>

            {showModal && <Lead_Management_Modal showModal={showModal} setShowModal={setShowModal} selectedLead={selectedLead} setSelectedLead={setSelectedLead} modalFor={modalFor} setModalFor={setModalFor}  />}
        </div>
    )
}

export default Leads_page