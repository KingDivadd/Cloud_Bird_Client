'use client'
import { get_auth_request } from '@/app/api'
import { User_Management_Props } from '@/types'
import React, {useState, useEffect} from 'react'
import { MdEdit, MdDeleteForever } from 'react-icons/md'
import DeleteModal from './user_delete_modal'


const User_management = () => {
    const [addUsers, setAddUsers] = useState(false)
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
        handle_new_filter(dropdown)
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
        
        get_all_users()

    }, [addUsers, showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_all_users() {

        console.log('started fetching');
        
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
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-slate-200 text-slate-800' : ''
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

    function edit_user(data:any) {
        setSelectedUser(data)
        setAddUsers(true)
    }

    function delete_user(data:any) {
        console.log('deleting user ', data)
        setShowModal(!showModal) 
        setSelectedUser(data)
    }

    return (
        <div className="w-full flex items-start justif-start p-[15px] " style={{height: 'calc(100vh - 70px)'}}>
            <div className="w-full h-full flex items-start justify-start bg-slate-700 rounded-[10px] ">
                {/*  */}
                
                <div className="w-full min-h-[150px] flex flex-col rounded-[5px] ">
                    <span className="w-full h-[50px] flex flex-row items-center justify-start bg-slate-800 rounded-t-[5px] border-b border-slate-600 ">
                        <p className="text-sm font-normal w-[13%] px-2 text-slate-200 ">Last Name</p>
                        <p className="text-sm font-normal w-[13%] px-2 text-slate-200 ">First Name</p>
                        <p className="text-sm font-normal w-[29%] px-2 text-slate-200 ">Email</p>
                        <p className="text-sm font-normal w-[12.5%] px-2 text-slate-200 ">Role</p>
                        <p className="text-sm font-normal w-[12.5%] px-2 text-slate-200 ">Status</p>
                        <p className="text-sm font-normal w-[10%] px-2 text-slate-200 ">Action</p>
                        <p className="text-sm font-normal w-[10%] px-2 text-slate-200 "></p>
                    </span>

                    <div className="w-full flex flex-col justify-start items-start user-list-cont overflow-y-auto ">
                        
                        {filtered_users !== null ?
                        
                            <div className='h-auto w-full flex flex-col justify-start '>
                            { filtered_users?.users.map((data:any, ind:number)=>{
                                const {last_name, first_name, email, user_role, active_status} = data
                                return (
                                    <span key={ind} className="recent-activity-table-list " >
                                        <p className="text-sm w-[13%] px-2 text-slate-200 "> {last_name} </p>
                                        <p className="text-sm w-[13%] px-2 text-slate-200 "> {first_name} </p>
                                        <p className="text-sm w-[29%] px-2 text-slate-200 "> {email} </p>
                                        <p className="text-sm w-[12.50%] px-2 text-slate-200 "> {user_role} </p>
                                        <p className={active_status ? "text-sm text-green-500 w-[12.5%] px-2 text-slate-200 ": "text-sm text-red-500 w-[15%] px-2 text-slate-200 "}>{active_status ? "Active" : "InActive"}</p>
                                        <p className="text-sm w-[10%] px-2 text-slate-200 flex flex-row items-center justify-start gap-2 text-slate-600 hover:text-lime-600" onClick={()=>{edit_user(data)}} ><MdEdit size={16} /> Edit</p>
                                        
                                        <p className="text-sm w-[10%] px-2 text-slate-200 flex flex-row items-center justify-start gap-2 text-slate-600 hover:text-red-400"  onClick={()=>delete_user(data)} ><MdDeleteForever size={18} /> Delete</p>
                                    </span>
                                )
                            })}
                            </div>
                        
                        :

                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-md font-normal text-slate-200 ">Loading Data...</p>
                            </div>
                        
                        }
                    </div>
                    
                    <span className="w-full h-[45px] flex flex-row items-center justify-between bg-slate-800 rounded-b-[5px] border-t border-slate-600 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-sm text-slate-200 cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-sm text-slate-200 cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-sm text-slate-200">Showing 1-15 of {app_users?.total_number_of_users || 0}</p>
                        </span>
                    </span>
                </div>
            </div>

            {showModal && <DeleteModal showModal={showModal} setShowModal={setShowModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser}  />}
        </div>

    )
}

export default User_management