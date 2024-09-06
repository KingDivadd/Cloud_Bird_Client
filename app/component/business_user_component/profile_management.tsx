'use client'
import React, {useState, useEffect} from 'react'
import { BiSolidPencil } from "react-icons/bi";
import Modal from "../modal"
import { get_auth_request } from '@/app/api';
import { useRouter } from 'next/navigation';
import { readable_date_time } from '../helper';


interface Profile_props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_profiles_pages?: number; // Now optional and can be undefined
    total_number_of_profiles?: number; // Now optional and can be undefined
    profiles: any;
}  

const Profile_management = () => {

    const router = useRouter()
    const [selectedItem, setSelectedItem] = useState(null)
    const [modalFor, setModalFor] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [page_number, setPage_number] = useState(1)
    const [alert, setAlert] = useState({message: '', type: ''})

    const [profile_box, setProfile_box] = useState<Profile_props | null>(null);
    const [filtered_profile_box, setFiltered_profile_box] = useState<Profile_props | null>(null);


    useEffect(()=>{
        get_paginated_profiles(page_number)
    }, [showModal])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }


    async function get_paginated_profiles(pg_number:number) {
        try {
                
            const response = await get_auth_request(`app/all-paginated-profile/${pg_number}`)
            
            if (response.status == 201 || response.status == 200){

                setProfile_box(response.data)
                
                setFiltered_profile_box(response.data)
                
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


    function add_profile() {
        setSelectedItem(null); setModalFor('add'); setShowModal(true);
    }
    
    function edit_profile(data:any) {
        setSelectedItem(data); setModalFor('edit'); setShowModal(true);
    }

    function delete_profile(data:any) {
        setSelectedItem(data); setModalFor('delete'); setShowModal(true);
    }

    
    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = profile_box?.total_number_of_profiles_pages

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
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = profile_box?.total_number_of_profiles_pages || 1;
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
                    <h4 className="text-sm font-medium text-white flex items-center gap-[10px]">All Profiles <p className="text-sky-500">{profile_box?.total_number_of_profiles || "--"}</p> </h4>

                    <button className="h-[50px] min-w-[150px] px-5 rounded-[3px] text-white bg-blue-600 hover:bg-blue-700 text-white text-sm " onClick={add_profile}>
                        Add Profile
                    </button>
                    
                </span>

                <div className="w-full h-[50px] bg-[#475569] rounded-[3px] px-[10px] flex items-center justify-between ">
                    <p className="text-sm text-white w-[15%] ">Profile Id</p>
                    <p className="text-sm text-white w-[15%] ">Profile Name</p>
                    <p className="text-sm text-white w-[15%] ">Phone Number</p>
                    <p className="text-sm text-white w-[10%] ">Credit Score</p>
                    <p className="text-sm text-white w-[10%] ">Disputes</p>
                    <p className="text-sm text-white w-[10%] ">Repairs</p>
                    <p className="text-sm text-white w-[15%] ">Last Updated</p>
                    <p className="text-sm text-white w-[10%] text-end  ">Action</p>
                </div>

                <div className="w-full flex-1  flex flex-col items-start justify-start overflow-y-auto">
                    {filtered_profile_box == null ? 
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="test-sm text-white font-medium">Loading...</p>
                    </div>
                    :
                    <div className="w-full h-full flex flex-col">
                        

                        {filtered_profile_box.profiles.length ? filtered_profile_box?.profiles.map((data:any, ind:number)=>{

                            const {profile_id,  profile_ind, first_name, last_name, phone_number, credit_score, disputes, repairs, updated_at} = data
                            return(
                                <span key={ind} className={(ind % 2) == 1 ? "w-full h-[50px]  hover:bg-slate-700 rounded-[3px] px-[10px] flex items-center justify-between" : "w-full h-[50px] bg-slate-800 hover:bg-slate-700 rounded-[3px] px-[10px] flex items-center justify-between"}>
                                    <p className="text-sm text-white w-[15%] ">{profile_ind}</p>
                                    <p className="text-sm text-white w-[15%] flex items-center gap-[5px] ">{first_name} {last_name}</p>
                                    <p className="text-sm text-white w-[15%] ">{phone_number}</p>
                                    <p className="text-sm text-white w-[10%] ">{credit_score || 0}</p>
                                    <p className="text-sm text-white w-[10%] ">{disputes || 0}</p>
                                    <p className="text-sm text-white w-[10%] ">{repairs || 0}</p>
                                    <p className="text-sm text-white w-[15%] ">{readable_date_time(Number(updated_at))}</p>
                                    <p className="text-sm text-sky-500 w-[10%] flex items-center justify-end gap-[10px] hover:underline hover:cursor-pointer " onClick={()=> edit_profile(data)}><BiSolidPencil size={20} /> Edit </p>
                                </span>
                            )
                        })
                        :
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-sm text-white ">No Profile added yet</p>
                        </div>
                    
                    }


                    </div>}

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
                        <p className="text-sm text-white">Showing 1-15 of {(profile_box && profile_box?.total_number_of_profiles) || 0}</p>
                    </span>
                    
                </span>

                {
                    showModal && 
                    <Modal modalFor={modalFor} setModalFor={setModalFor} showModal={showModal} setShowModal={setShowModal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} modalSource='profile' />
                }

            </div>
        </div>
    )
}

export default Profile_management