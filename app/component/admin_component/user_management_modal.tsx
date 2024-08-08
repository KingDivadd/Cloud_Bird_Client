'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, {FlexibleImageUploader } from '../imageUploader'
import MyDatePicker from '../datePicker'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request, patch_auth_request, post_auth_request } from '@/app/api';


interface User_Management_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedUser: any;
    setSelectedUser: (selectedUser: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

const User_Management_Modal = ({ showModal, setShowModal, selectedUser, setSelectedUser, modalFor}: User_Management_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [approve_loading, setApprove_loading] = useState(false)
    const [auth, setAuth] = useState({first_name: '', last_name: '', email: '', password: ''})

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function delete_user() {
        setLoading(true)
        const response = await delete_auth_request(`user/delete-user-account/${selectedUser.user_id}`)

        if (response.status == 200 || response.status == 201){
                        
            showAlert(response.data.msg, "success")
            
            setShowModal(false)
            
            setLoading(false)
        }else{
            
            showAlert(response.response.data.err, "error")
            
            setLoading(false)
        }
        
    }

    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value

        setAuth({...auth, [name]: value})
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    async function create_client(e:any) {
        e.preventDefault()
        if (!auth.first_name || !auth.last_name || !auth.email || !auth.password) {
            showAlert('Please fill all fields', 'error')
        }else{
            try {
                setLoading(true)
                const response = await post_auth_request(`user/create-client`, auth)
                if (response.status == 200 || response.status == 201){
                                
                    showAlert(response.data.msg, "success")
                    
                    setShowModal(false)
                    
                    setLoading(false)

                    }else{       
                                    
                    showAlert(response.response.data.err, "error")
                    
                    setLoading(false)
                }
            } catch (err) {
                showAlert('Error occured ', 'error')
                setLoading(false)
            }
        }
    }

    async function approve_user(e:any) {
        e.preventDefault()
        try {
            setApprove_loading(true)
            const response = await patch_auth_request(`user/approve-staff-account/${selectedUser.user_id}`, {})
            if (response.status == 200 || response.status == 201){
                        
                showAlert(response.data.msg, "success")
                
                setShowModal(false)
                
                setApprove_loading(false)
                }else{
                
                showAlert(response.response.data.err, "error")
                
                setApprove_loading(false)
            }
        } catch (err) {
            showAlert('Error occured ', 'error')
            setApprove_loading(false)
        }
        
    }

    async function deactivate_user(e:any) {
        e.preventDefault()
        try {
            setLoading(true)
            const response:any = await patch_auth_request(`user/de-activate-user-account/${selectedUser.user_id}`, {})
            if (response.status == 200 || response.status == 201){
                        
                showAlert(response.data.msg, "success")
                
                setShowModal(false)
                
                setLoading(false)
                }else{                
                showAlert(response.response.data.err, "error")
                
                setLoading(false)
            }
        } catch (err) {
            showAlert('Error occured ', 'error')
            setLoading(false)
        }
        
    }

    async function activate_user(e:any) {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await patch_auth_request(`user/activate-user-account/${selectedUser.user_id}`, {})
            if (response.status == 200 || response.status == 201){
                        
                showAlert(response.data.msg, "success")
                
                setShowModal(false)
                
                setLoading(false)
                }else{
                
                showAlert(response.response.data.err, "error")
                
                setLoading(false)
            }
        } catch (err) {
            showAlert('Error occured ', 'error')
            setLoading(false)
        }
        
    }

    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className={ modalFor == 'delete' ? "w-full h-screen pt-[150px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[50px] rounded-lg overflow-hidden shadow-xl transform transition-all" } role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-[70%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-slate-900  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">

                                {/* below is to upload new permit */}
                                {modalFor == 'delete' && 
                                
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] ">
                                    <span className="w-full flex flex-row items-start justify-between border-b border-slate-200 h-[40px]">
                                        <p className="text-md font-semibold  text-slate-200 ">{selectedUser.last_name} {selectedUser.first_name} </p>

                                        <p className="text-md font-semibold  text-slate-200 ">{selectedUser.user_role == 'CLIENT' ? "CLIENT" :" STAFF"} </p>
                                    </span>

                                    <div className="w-full flex flex-col items-center justify-center gap-[34px]">
                                        <p className="text-md font-normal text-center text-slate-200 ">Are you sure you want to delete 
                                            <strong> {selectedUser.last_name} {selectedUser.first_name}</strong> </p>
                                            
                                        <p className="text-xs text-slate-200 flex items-center justify-center gap-2 "> <CiWarning size={21} />   Please note action is not reaversible </p>

                                            <button className=" w-[150px] h-[45px] text-white bg-slate-600 rounded-[5px] hover:bg-red-500 flex items-center justify-center"  disabled={loading} onClick={delete_user} >
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : 'Delete'}

                                            </button>

                                    </div>

                                    <span className="w-full flex items-center justify-center">
                                    </span>

                                </div>}

                                {modalFor == 'add' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] bg-slate-600 rounded-[4px] p-[15px] ">
                                    <span className="w-full flex flex-row items-start justify-start border-b border-slate-200 h-[40px]">
                                        <p className="text-md font-semibold  text-slate-200 ">New Client </p>
                                    </span>

                                    <form  action="" className="w-full flex flex-col items-center justify-center gap-[24px]">
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px] text-slate-200">First Name</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='first_name' value={auth.first_name} onChange={handle_change} className='dark-normal-input' />
                                            </span>
                                        </span>
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px] text-slate-200">Last Name</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name="last_name" value={auth.last_name} onChange={handle_change} className='dark-normal-input' />
                                            </span>
                                        </span>
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px] text-slate-200">Email</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="email" name='email' value={auth.email} onChange={handle_change} className='dark-normal-input' />
                                            </span>
                                        </span>
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px] text-slate-200">Password</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='password' value={auth.password} onChange={handle_change} className='dark-normal-input' />
                                            </span>
                                        </span>
                                        
                                                                                
                                        <button className=" w-full h-[45px] text-white bg-slate-800 rounded-[5px] hover:bg-slate-900 flex items-center justify-center text-[15px] mt-[10px] "  disabled={loading} onClick={create_client} >
                                            {loading ? (
                                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                            ) : 'Create Client'}

                                        </button>

                                    </form>

                                </div>
                                }

                                {modalFor == 'edit' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] bg-slate-600 rounded-[4px] p-[15px] ">
                                    <span className="w-full flex flex-row items-start justify-between border-b border-slate-200 h-[40px]">
                                        <p className="text-md font-semibold  text-slate-200 ">{selectedUser.last_name} {selectedUser.first_name} </p>

                                        <p className="text-md font-semibold  text-slate-200 ">{selectedUser.user_role == 'CLIENT' ? 'CLIENT' : 'STAFF'} </p>
                                    </span>

                                    <div className="w-full flex flex-col items-center justify-center gap-[24px]">
                                        <span className="w-full flex items-center justify-start gap-[10px] ">
                                            <p className="text-sm text-slate-200 ">Last Name:</p>
                                            <p className="text-sm text-slate-200 font-semibold ">{selectedUser.last_name} </p>
                                        </span>
                                        
                                        <span className="w-full flex items-center justify-start gap-[10px] ">
                                            <p className="text-sm text-slate-200 ">First Name:</p>
                                            <p className="text-sm text-slate-200 font-semibold ">{selectedUser.first_name} </p>
                                        </span>

                                        <span className="w-full flex items-center justify-start gap-[10px] ">
                                            <p className="text-sm text-slate-200 ">Email:</p>
                                            <p className="text-sm text-slate-200 font-semibold ">{selectedUser.email} </p>
                                        </span>

                                        {selectedUser.user_role !== 'CLIENT' && <span className="w-full flex items-center justify-start gap-[10px] ">
                                            <p className="text-sm text-slate-200 ">User Role:</p>
                                            <p className="text-sm text-slate-200 font-semibold ">{selectedUser.user_role.replace(/_/g,' ')} </p>
                                        </span>}

                                        {selectedUser.user_role !== 'CLIENT' && <span className="w-full flex items-center justify-start gap-[10px] ">
                                            <p className="text-sm text-slate-200 ">Approval Status:</p>
                                            <p className={selectedUser.is_approved ? "text-sm text-green-400 font-semibold": "text-sm text-red-300 font-semibold"}>{selectedUser.is_approved ? "Approved": "Not Approved" } </p>
                                        </span>}

                                        <span className="w-full flex items-center justify-start gap-[10px] ">
                                            <p className="text-sm text-slate-200 ">Active Status:</p>
                                            <p className={selectedUser.active_status ? "text-sm text-green-400 font-semibold": "text-sm text-red-400 font-semibold"}>{selectedUser.active_status ? "Active": "Not Active" } </p>
                                        </span>

                                        <div className="w-full h-[40px] flex item-center justify-between ">
                                            {selectedUser.active_status ? <button className=" px-[15px] min-w-[150px] h-[45px] text-white bg-slate-800 rounded-[5px] hover:bg-red-400 flex items-center justify-center text-sm "  disabled={loading} onClick={deactivate_user} >
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : 'Deactivate User'}

                                            </button>: <button className=" px-[15px] min-w-[150px] h-[45px] text-white bg-slate-800 rounded-[5px] hover:bg-green-400 flex items-center justify-center text-sm "  disabled={loading} onClick={activate_user} >
                                                {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : 'Activate User'}

                                            </button> }

                                            {(selectedUser.user_role !== 'CLIENT' && !selectedUser.is_approved) && 
                                            
                                            <button className=" min-w-[150px] px-[10px] h-[45px] text-white bg-slate-800 rounded-[5px] hover:bg-green-600 flex items-center justify-center text-sm"  disabled={approve_loading} onClick={approve_user} >
                                                {approve_loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : 'Approve Staff'}

                                            </button>}
                                        </div>


                                    </div>
                                </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default User_Management_Modal