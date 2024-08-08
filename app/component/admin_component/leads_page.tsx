'use client'
import React, {useState, useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {DropDownBlank, DropDownBlankTransparent} from '../dropDown';
import Alert from '../alert';
import { User_Management_Props } from '@/types';
import { get_auth_request } from '@/app/api';
import User_Management_Modal from './user_management_modal'


const Leads_page = () => {

    const [modalFor, setModalFor] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    const [alert, setAlert] = useState({type: '', message: ''})
    const [page_number, setPage_number] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [app_users, setApp_users] = useState<User_Management_Props | null>(null);
    const [filtered_users, setFiltered_users] = useState<User_Management_Props | null>(null); 

    const [filters, setFilters] = useState({filter_input: '', active_status: '', user_role: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        user_role: false, status: false
    });
    const [dropElements, setDropElements] = useState({
        user_role: 'User Role', status: 'Status'

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
    
        if (app_users && app_users.users) {
            if (value.trim() !== '') {
                const new_app_users = app_users.users.filter((data: any) => {
                const firstName = data.first_name?.toLowerCase() || '';
                const lastName = data.last_name?.toLowerCase() || '';
                const otherNames = data.other_names?.toLowerCase() || '';
                const email = data.email?.toLowerCase() || '';
        
                return (
                    firstName.includes(value) ||
                    lastName.includes(value) ||
                    otherNames.includes(value) ||
                    email.includes(value)
                );
                });
        
                setFiltered_users({ ...app_users, users: new_app_users });
            } else {
                setFiltered_users(app_users); // Reset to the original list
            }
        }
    }

    async function handle_new_filter(item: string) {
        if (app_users && item.toLocaleLowerCase() == 'all') {
            console.log(app_users);
            
            // If no filter is provided, reset to the original list
            setFiltered_users(app_users);
        
        } 
        else if (item && app_users) {
            console.log(item);
            
            const new_app_users = app_users.users.filter((data: any) => {
                const user_role = data.user_role?.toLowerCase() || '';
                const active_status = data.active_status ? 'active' : 'inactive';
    
                // Check if the filter item matches either the user_role or active_status
                return (
                    user_role === item.toLowerCase() ||
                    active_status === item.toLowerCase()
                );
            });
    
            setFiltered_users({ ...app_users, users: new_app_users });
        } else {
            // If no filter is provided, reset to the original list
            setFiltered_users(app_users);
        }
    }

    useEffect(() => {
        
        get_all_users(page_number)

    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_users(page_number:number) {

        const response = await get_auth_request(`user/all-users/${page_number}`)

        if (response.status == 200 || response.status == 201){
            
            setApp_users(response.data.data)      
            
            setFiltered_users(response.data.data)

            console.log(response.data.data.users);
            
            showAlert(response.data.msg, "success")
        }else{
        console.log(response);
        
        showAlert(response.response.data.err, "error")
        }
    }

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = app_users?.total_number_of_pages

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

        get_all_users(new_page_number)
        console.log('new page number ', new_page_number);

        setPage_number(new_page_number);
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = app_users?.total_number_of_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer text-slate-200 ${
                page_number === i ? 'bg-slate-600 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
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
                onClick={() => app_users_action(i)}
            >
                {i}
            </p>
            );
        }
        }

        return pages;
    };

    function add_new_user(){
        setModalFor('add')
        setShowModal(true)
        setSelectedUser(null)
    }
    

    function edit_user(data:any) {
        setModalFor('edit')
        setShowModal(true)
        setSelectedUser(data)
    }

    function delete_user(data:any) {
        setModalFor('delete')
        setShowModal(true) 
        setSelectedUser(data)
    }

    return (
        <div className="w-full h-full p-[10px] pb-[10px] ">
            
            <div className="relative w-full h-full flex flex-col items-start justify-start gap-[25px] ">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>
                <span className="w-full flex flex-row items-center justify-between">
                    <span className="h-full flex flex-row items-center justify-start gap-4">
                        <p className="text-md font-semibold text-slate-200">All Users</p>
                        <p className="text-sm text-slate-200">{app_users?.total_number_of_users}</p>
                    </span>
                    <span className="flex flex-row items-start justify-start gap-4">
                        <span className=" flex flex-row items-center justif-start gap-5 h-[40px] ">
                            <span className="h-[40px] min-w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'status'} dropArray={['Active', 'Inactive', 'Not Approved']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                            <span className="w-[250px] h-[40px] ">
                                <input type="text" name="filter-input" onChange={handleFilter} placeholder='Enter name or email' id="" className='dark-normal-input  ' />
                            </span>
                            <span className="h-[40px] min-w-[150px]">
                                <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'user_role'} dropArray={['Admin', 'Client', 'Client Manager', 'Team Member', 'Affiliate', 'All']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                            </span>
                        </span>

                        <button className="h-[40px] px-4 bg-slate-600 hover:bg-salte-700 text-slate-200 rounded-[3px] flex items-center justify-center text-[16px]" onClick={add_new_user}>Add New User</button>

                    </span>
                </span>

                {/* user table */}

                <div className="w-full min-h-[150px] flex flex-col rounded-[5px] border border-slate-600">
                    <span className="w-full h-[40px] flex flex-row items-center justify-start bg-slate-600 rounded-t-[5px] border-b border-slate-600 rounded-t-[4px]">
                        <p className="text-[16px] font-normal w-[11%] px-2 text-slate-200 ">Last Name</p>
                        <p className="text-[16px] font-normal w-[11%] px-2 text-slate-200 ">First Name</p>
                        <p className="text-[16px] font-normal w-[24%] px-2 text-slate-200 ">Email</p>
                        <p className="text-[16px] font-normal w-[16.5%] px-2 text-slate-200 ">Role</p>
                        <p className="text-[16px] font-normal w-[15%] px-2 text-slate-200 ">Status</p>
                        <p className="text-[16px] font-normal w-[10%] px-2 text-slate-200 ">Action</p>
                        <p className="text-[16px] font-normal w-[10%] px-2 text-slate-200 "></p>
                    </span>
                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_users !== null ?
                        
                            <div className='h-auto w-full flex flex-col justify-start '>
                            { filtered_users?.users.map((data:any, ind:number)=>{
                                const {last_name, first_name, email, user_role, active_status, is_staff, is_approved} = data
                                return (
                                    <span key={ind} className="recent-activity-table-list " >
                                        <p className="text-[15px] w-[11%] px-2 text-slate-200 "> {last_name} </p>
                                        <p className="text-[15px] w-[11%] px-2 text-slate-200 "> {first_name} </p>
                                        <p className="text-[15px] w-[24%] px-2 text-slate-200 "> {email} </p>
                                        <p className="text-[15px] w-[16.50%] px-2 text-slate-200 "> {user_role.replace(/_/g, ' ')} </p>
                                        
                                        <p className={`text-[15px] px-2 ${is_staff ? 
                                            is_approved
                                                ? active_status
                                                    ? "text-green-500 w-[15%]"
                                                    : "text-red-500 w-[15%]"
                                                : "text-red-500 w-[15%]"
                                                : active_status
                                                ? "text-green-500 w-[15%]"
                                                : "text-red-500 w-[15%]"
                                            }`}>
                                            {is_staff
                                                ? is_approved
                                                ? active_status
                                                    ? "Active"
                                                    : "Not Active"
                                                : "Not Approved"
                                                : active_status
                                                ? "Active"
                                                : "Not Active"}
                                            </p>


                                        <p className="text-[15px] w-[10%] px-2 text-slate-200 flex flex-row items-center justify-start gap-2 text-slate-200 hover:text-lime-600 cursor-pointer" onClick={()=>{edit_user(data)}} ><MdEdit size={16} /> Edit</p>
                                        
                                        <p className="text-[15px] w-[10%] px-2 text-slate-200 flex flex-row items-center justify-start gap-2 text-slate-200 hover:text-red-400 cursor-pointer"  onClick={()=>delete_user(data)} ><MdDeleteForever size={18} /> Delete</p>
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
                            <p className="text-[15px] text-slate-200 cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-[15px] text-slate-200 cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-[15px] text-slate-200">Showing 1 - 15 of {app_users?.total_number_of_users || 0}</p>
                        </span>
                    </span>
                </div>
            </div>

            {showModal && <User_Management_Modal showModal={showModal} setShowModal={setShowModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser} modalFor={modalFor} setModalFor={setModalFor}  />}
        </div>
    )
}

export default Leads_page