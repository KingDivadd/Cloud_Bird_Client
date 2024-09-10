'use client'
import React, {useState, useEffect} from 'react'
import { BiSolidPencil } from "react-icons/bi";
import Modal from "../modal"
import {get_auth_request} from "../../api/index"
import { useRouter } from 'next/navigation';
import { readable_date_time } from '../helper';
import { DropDownBlankTransparent } from '../dropDown';


interface User_props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_users_pages?: number; // Now optional and can be undefined
    total_number_of_users?: number; // Now optional and can be undefined
    users: any;
}  

const User_management = () => {

    const router = useRouter()
    const [selectedItem, setSelectedItem] = useState(null)
    const [modalFor, setModalFor] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [page_number, setPage_number] = useState(1)
    const [alert, setAlert] = useState({message: '', type: ''})

    const [user_box, setUser_box] = useState<User_props | null>(null);
    const [filtered_user_box, setFiltered_user_box] = useState<User_props | null>(null);

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        user: false
    });
    const [dropElements, setDropElements] = useState({
        user: 'User'

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
        handle_new_filter(dropdown.replace(/ /g, '_'))
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }

    function handle_new_filter(item: string) {
        if (user_box && item.toLocaleLowerCase() == 'all') {            
            // If no filter is provided, reset to the original list
            setFiltered_user_box(user_box);
        
        } 
        else if (item && user_box) {            
            const new_users = user_box.users.filter((data: any) => {
                const user_role = data.user_role?.toLowerCase() || '';

                return (
                    user_role === item.toLowerCase()
                );
            });
    
            setFiltered_user_box({ ...user_box, users: new_users });
        } else {
            // If no filter is provided, reset to the original list
            setFiltered_user_box(user_box);
        }
    }

    useEffect(()=>{
        get_paginated_users(page_number)
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }


    async function get_paginated_users(pg_number:number) {
        try {
                
            const response = await get_auth_request(`app/all-paginated-users/${pg_number}`)
            
            if (response.status == 201 || response.status == 200){

                setUser_box(response.data)
                
                setFiltered_user_box(response.data)

                console.log(' users ', response.data)
                
            }else{
                showAlert(response.response.data.err, "warning")
                if ( response.response.status == 401) {
                    sessionStorage.clear()
                    localStorage.clear()
                    showAlert("Session Expired, Login again. ", "warning")
                    setTimeout(() => {
                        router.push('/auth/login')
                    }, 2000);
                }
                return;
            }

        } catch (err:any) {        
            showAlert('Something went worong, try again later ', 'error')
        }
    }


    function add_user() {
        setSelectedItem(null); setModalFor('add'); setShowModal(true);
    }
    
    function edit_user(data:any) {
        setSelectedItem(data); setModalFor('edit'); setShowModal(true);
    }
    
    function view_user(data:any) {
        setSelectedItem(data); setModalFor('view'); setShowModal(true);
    }

    function delete_user(data:any) {
        setSelectedItem(data); setModalFor('delete'); setShowModal(true);
    }

    
    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = user_box?.total_number_of_users_pages

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

        setPage_number(new_page_number);
        get_paginated_users(new_page_number);
    }

    function handleFilter(e: any) {
        const value = e.target.value.toLowerCase();

        // setFilters({ ...filters, filter_input: value });
    
        if (user_box && user_box.users) {
            if (value.trim() !== '') {
                const filtered_leads = user_box.users.filter((data: any) => {

                    const user_ind = data.user_ind?.toLowerCase() || '';
                    const user_name = data.first_name?.toLowerCase() || data.last_name?.toLowerCase() || '';
                    const email = data.email?.toLowerCase() || '';
                    const phone_number = data.phone_number || ''
                    
                    return (
                        user_ind.includes(value) ||
                        user_name.includes(value) ||
                        email.includes(value) || 
                        phone_number.includes(value)
                    );
                });
                
    
                setFiltered_user_box({...filtered_user_box, users: filtered_leads});
            } else {
                setFiltered_user_box(user_box); // Reset to the original list
            }
        }
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = user_box?.total_number_of_users_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-600 text-white' : ''
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
                page_number === i ? 'bg-blue-700 text-white' : ''
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

    return (
        <div className="w-full h-[100vh] flex items-start justify-center bg-[#475569] gap-[40px] px-[75px] py-[20px] overflow-y-auto ">
            <div className="w-full h-full bg-slate-900 rounded-[5px] flex flex-col items-start justify-start gap-[10px] p-[15px] sticky top-0 ">

                <span className="w-full pb-[10px] flex items-center justify-between border-b border-slate-700 ">
                    <h4 className="text-sm font-medium text-white flex items-center gap-[10px]">All Users <p className="text-sky-500">{filtered_user_box?.users.length || "--"}</p> </h4>

                    <span className="flex items-center justify-end gap-[15px] ">

                        <span className="w-[300px]">

                            <input onChange={handleFilter} name='filter-input' placeholder='search by name, user id, or email' type="text" className={'signup-input bg-[#475569] text-white '} />
                        </span>

                        <span className="w-[200px] h-[50px]">

                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'user'} dropArray={['Single User', 'Business User', 'All', ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                        </span>

                        {/* <button className="h-[50px] min-w-[150px] px-5 rounded-[3px] text-white bg-blue-600 hover:bg-blue-700 text-white text-sm " onClick={add_user}>
                            Add user
                        </button> */}

                    </span>

                    
                </span>

                <div className="w-full h-[50px] bg-[#475569] rounded-[3px] px-[10px] flex items-center justify-between ">
                    <p className="text-sm text-white w-[7.5%] ">User Id</p>
                    <p className="text-sm text-white w-[15%] ">User Name</p>
                    <p className="text-sm text-white w-[25%] ">Email</p>
                    <p className="text-sm text-white w-[10%] ">User Type</p>
                    <p className="text-sm text-white w-[8%] ">Profile(s)</p>
                    <p className="text-sm text-white w-[12.5%] ">Phone Number</p>
                    <p className="text-sm text-white w-[14.5%] ">Last Updated</p>
                    <p className="text-sm text-white w-[10%] text-start ">Action</p>
                </div>

                <div className="w-full flex-1  flex flex-col items-start justify-start overflow-y-auto">
                    <div className="w-full flex flex-col">

                        {filtered_user_box == null ? 
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="test-sm text-white font-medium">Loading...</p>
                        </div>
                        :
                        <div className="w-full h-full flex flex-col ">

                            {filtered_user_box.users.length ? filtered_user_box?.users.map((data:any, ind:number)=>{

                                const {user_id,  user_ind, first_name, last_name, phone_number, email, user_role, updated_at, profiles} = data
                                return(
                                    <span key={ind} className={(ind % 2) == 1 ? "w-full h-[50px]  hover:bg-slate-700 rounded-[3px] px-[10px] flex items-center justify-between" : "w-full h-[50px] bg-slate-800 hover:bg-slate-700 rounded-[3px] px-[10px] flex items-center justify-between"}>
                                        <p className="text-sm text-white w-[7.5%] ">{user_ind}</p>
                                        <p className="text-sm text-white w-[15%] flex items-center gap-[5px] ">{first_name} {last_name}</p>
                                        <p className="text-sm text-white w-[25%] ">{email}</p>
                                        <p className="text-sm text-white w-[10%] ">{user_role == "single_user" ? "Single" : user_role == "business_user" ? "Business" : "" }</p>
                                        <p className="text-sm text-white w-[8%] ">{profiles.length}</p>
                                        <p className="text-sm text-white w-[12.5%] ">{phone_number}</p>
                                        <p className="text-sm text-white w-[14.5%]  ">{readable_date_time(Number(updated_at))}</p>
                                        <span className="w-[10%] flex items-center justify-between pl-[5px]">
                                            <p className="text-sm text-sky-500  hover:underline hover:cursor-pointer " onClick={()=> view_user(data)}> View </p>

                                            {/* <p className="text-sm text-sky-500 flex items-center justify-end gap-[10px] hover:underline hover:cursor-pointer " onClick={()=> edit_user(data)}><BiSolidPencil size={17} /> Edit </p> */}
                                        </span>
                                    </span>
                                )
                            })
                            :
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-sm text-white ">No user added yet</p>
                            </div>
                        
                        }
                        </div>}

                    </div>
                </div>

                <span className="w-full  h-[50px] pt-[5px] flex items-center justify-between border-t border-slate-700">
                    
                    <span className="flex flex-row items-center justify-start gap-3 h-full">
                        <p className="text-sm cursor-pointer text-white" onClick={() => app_users_action('prev')}>Prev</p>
                        <span className="w-auto h-full flex flex-row items-center justify-start">
                        {render_page_numbers()}
                        </span>
                        <p className="text-sm cursor-pointer text-white" onClick={() => app_users_action('next')}>Next</p>
                    </span>
                    <span className="flex flex-row items-center justify-end gap-3 h-full">
                        <p className="text-sm text-white">Showing 1-15 of {(user_box && filtered_user_box?.users.length) || 0}</p>
                    </span>
                    
                </span>

                {
                    showModal && 
                    <Modal modalFor={modalFor} setModalFor={setModalFor} showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} modalSource='user' />
                }

            </div>
        </div>
    )
}

export default User_management

