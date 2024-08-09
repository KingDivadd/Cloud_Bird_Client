'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import Alert from '../alert'
import { IoIosWarning } from "react-icons/io";
import { DropDownBlankTransparent } from '../dropDown'
import ImageUploader, {FlexibleImageUploader } from '../imageUploader'
import MyDatePicker from '../datePicker'
import { CiWarning } from 'react-icons/ci'
import { delete_auth_request, get_auth_request, patch_auth_request, post_auth_request } from '../../api/index';


interface Lead_Management_Props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedLead: any;
    setSelectedLead: (selectedLead: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;

}

const Lead_Management_Modal = ({ showModal, setShowModal, selectedLead, setSelectedLead, modalFor}: Lead_Management_Props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [approve_loading, setApprove_loading] = useState(false)
    const [all_staff, setAll_staff] = useState([])
    const [filtered_staff, setFiltered_staff] = useState([])
    const [auth, setAuth] = useState({name: '', email: '', phone_number: '', company_name: '', assigned_to: '', assigned_name: '',})

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function delete_user() {
        setLoading(true)
        const response = await delete_auth_request(`user/delete-user-account/${selectedLead.user_id}`)

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

    function filter_user(e: React.ChangeEvent<HTMLInputElement>) {

        const value = e.target.value
            
        const filtered_items = all_staff.filter((data: { first_name: string, last_name: string }) =>
            data.first_name.toLowerCase().includes(value.toLowerCase()) ||
            data.last_name.toLowerCase().includes(value.toLowerCase())
        );
    
        setFiltered_staff(value === '' ? all_staff : filtered_items);
    }
    
    useEffect(() => {
        if (modalFor == 'add'){
            get_all_staff()
        }else if (modalFor == 'edit'){
            get_all_staff()
            const {name, phone_number, company_name, email, assigned_to} = selectedLead
            
            setAuth({...auth, name: name, phone_number: phone_number, company_name: company_name, email: email,  assigned_name: `${assigned_to.last_name} ${assigned_to.first_name}`, assigned_to: assigned_to.user_id    })
        }
    }, [])

    async function get_all_staff() {
        try {
            const response = await get_auth_request(`user/all-staff`)
            if (response.status == 200 || response.status == 201){

                setAll_staff(response.data.staffs)

                setFiltered_staff(response.data.staffs)
                            
                }else{       
                                
                showAlert(response.response.data.err, "error")
                
            }
        } catch (err) {
            showAlert('Error occured ', 'error')
        }
    }

    async function create_lead(e:any) {
        e.preventDefault()
        if (!auth.name || !auth.phone_number || !auth.email || !auth.assigned_to) {
            showAlert('Please fill required fields', 'error')
        }else{
            try {
                setLoading(true)
                
                const response = await post_auth_request(`user/create-lead`, { name: auth.name, company_name: auth.company_name, phone_number: auth.phone_number, email: auth.email, assigned_to: auth.assigned_to })
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

    async function update_lead(e:any) {
        e.preventDefault()
        if (!auth.name || !auth.phone_number || !auth.email || !auth.assigned_to) {
            showAlert('Please fill required fields', 'error')
        }else{
            try {
                setLoading(true)
                
                const response = await patch_auth_request(`lead/edit-lead/${selectedLead.lead_id}`, 
                    { name: auth.name, company_name: auth.company_name, phone_number: auth.phone_number, email: auth.email, assigned_to: auth.assigned_to })
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

    async function delete_lead(e:any) {
        e.preventDefault()
        try {
            setLoading(true)
            
            const response = await delete_auth_request(`lead/delete-lead/${selectedLead.lead_id}`)
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
                <div className={ modalFor == 'delete' ? "w-full h-screen pt-[150px] rounded-lg overflow-hidden shadow-xl transform transition-all": "w-full h-screen pt-[30px] rounded-lg overflow-hidden shadow-xl transform transition-all" } role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-[70%] mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-start justify-start gap-5 bg-slate-900  rounded-b-[5px]  rounded-[5px]  ">
                            <div className="w-full min-h-[250px] flex flex-col justify-start items-center p-[10px] ">

                                {/* below is to upload new permit */}
                                {modalFor == 'delete' && 
                                
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] ">
                                    <span className="w-full flex flex-row items-start justify-between border-b border-slate-200 h-[40px]">
                                        <p className="text-md font-semibold  text-slate-200 ">{selectedLead.name} </p>

                                        
                                    </span>

                                    <div className="w-full flex flex-col items-center justify-center gap-[34px]">
                                        <p className="text-md font-normal text-center text-slate-200 ">Are you sure you want to delete lead
                                            <strong> {selectedLead.name}</strong> assigned to <strong>{selectedLead.assigned_to.last_name} {selectedLead.assigned_to.first_name} </strong> </p>
                                            
                                        <p className="text-xs text-slate-200 flex items-center justify-center gap-2 "> <CiWarning size={20} />   Please note action is not reaversible </p>

                                            <button className=" w-[150px] h-[45px] text-white bg-slate-600 rounded-[5px] hover:bg-red-500 flex items-center justify-center"  disabled={loading} onClick={delete_lead} >
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
                                        <p className="text-md font-semibold  text-slate-200 ">New Lead </p>
                                    </span>

                                    <form  action="" className="w-full flex items-start justify-between gap-[15px]">
                                        <div className="w-1/2 flex flex-col items-start justify-start gap-[24px] ">
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-200">Name</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='name' value={auth.name} onChange={handle_change} className='dark-normal-input' />
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-200">Phone Number</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name="phone_number" value={auth.phone_number} onChange={handle_change} className='dark-normal-input' />
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-200">Email</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name="email" value={auth.email} onChange={handle_change} className='dark-normal-input' />
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-200">Company Name</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name="company_name" value={auth.company_name} onChange={handle_change} className='dark-normal-input' />
                                                </span>
                                            </span>
                                            
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-200">Assigned to</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="text" name='assigned_name' value={auth.assigned_name} onChange={handle_change} className='dark-normal-input' />
                                                </span>
                                            </span>
                                            
                                        </div>

                                        <div className="w-1/2 flex flex-col item-start justify-start">
                                            <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                                <p className="text-[15px] text-slate-200">Select Staff</p>
                                                <span className="h-[40px] w-full ">
                                                    <input type="email" name='assigned_to' placeholder='Enter  name to filter' onChange={filter_user} className='dark-normal-input' />
                                                </span>
                                                <div className="w-full h-[375px] flex flex-col items-start justify-start overflow-y-auto p-[10px] bg-slate-800 rounded-[5px] ">
                                                    <div className="w-full flex flex-col items-start justify-start">
                                                        {filtered_staff.map((data, ind)=>{
                                                            const {first_name, last_name, user_id, user_role } = data
                                                            return(
                                                                <span key={ind} className="w-full flex items-center justify-between hover:bg-slate-600 px-[10px] gap-[10px] ">

                                                                    <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer " onClick={()=> setAuth({...auth, assigned_name: `${last_name} ${first_name}`, assigned_to:  user_id })} >

                                                                        <p className="text-start text-[15px] text-slate-200 " >{ind + 1}. </p>

                                                                        <p className="text-start text-[15px] text-slate-200 " >{last_name} </p>

                                                                        <p className=" text-start text-[15px] text-slate-200 " > {first_name} </p>

                                                                    </span>
                                                                        
                                                                    <p key={ind} className=" text-start text-[15px] hover:bg-slate-600 text-slate-200 text-end " > {user_role} </p>


                                                                </span>
                                                            )
                                                        })}

                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                        
                                    </form>

                                    <div className="w-full flex items-center justify-between gap-[24px]">

                                        <div className="w-1/2"></div>

                                        <button className=" w-1/2 h-[45px] text-white bg-slate-800 rounded-[5px] hover:bg-slate-900 flex items-center justify-center text-[15px] "  disabled={loading} onClick={create_lead} >
                                            {loading ? (
                                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                            ) : 'Create Lead'}

                                        </button>

                                    </div>


                                </div>
                                }

                                {modalFor == 'edit' && 
                                <div className="w-full flex flex-col items-start justify-start gap-[25px] bg-slate-600 rounded-[4px] p-[15px] ">
                                <span className="w-full flex flex-row items-start justify-start border-b border-slate-200 h-[40px]">
                                    <p className="text-md font-semibold  text-slate-200 ">Edit Lead</p>
                                </span>

                                <form  action="" className="w-full flex items-start justify-between gap-[15px]">
                                    <div className="w-1/2 flex flex-col items-start justify-start gap-[24px] ">
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px] text-slate-200">Name</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='name' value={auth.name} onChange={handle_change} className='dark-normal-input' />
                                            </span>
                                        </span>
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px] text-slate-200">Phone Number</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name="phone_number" value={auth.phone_number} onChange={handle_change} className='dark-normal-input' />
                                            </span>
                                        </span>
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px] text-slate-200">Email</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name="email" value={auth.email} onChange={handle_change} className='dark-normal-input' />
                                            </span>
                                        </span>
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px] text-slate-200">Company Name</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name="company_name" value={auth.company_name} onChange={handle_change} className='dark-normal-input' />
                                            </span>
                                        </span>
                                        
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px] text-slate-200">Assigned to</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="text" name='assigned_name' value={auth.assigned_name} onChange={handle_change} className='dark-normal-input' />
                                            </span>
                                        </span>
                                        
                                    </div>

                                    <div className="w-1/2 flex flex-col item-start justify-start">
                                        <span className="w-full flex flex-col items-self justify-self gap-[10px] ">
                                            <p className="text-[15px] text-slate-200">Select Staff</p>
                                            <span className="h-[40px] w-full ">
                                                <input type="email" name='assigned_to' placeholder='Enter  name to filter' onChange={filter_user} className='dark-normal-input' />
                                            </span>
                                            <div className="w-full h-[375px] flex flex-col items-start justify-start overflow-y-auto p-[10px] bg-slate-800 rounded-[5px] ">
                                                <div className="w-full flex flex-col items-start justify-start">
                                                    {filtered_staff.map((data, ind)=>{
                                                        const {first_name, last_name, user_id, user_role } = data
                                                        return(
                                                            <span key={ind} className="w-full flex items-center justify-between hover:bg-slate-600 px-[10px] gap-[10px] ">

                                                                <span className="h-[35px] flex items-center justify-start gap-[10px] w-full cursor-pointer " onClick={()=> setAuth({...auth, assigned_name: `${last_name} ${first_name}`, assigned_to:  user_id })} >

                                                                    <p className="text-start text-[15px] text-slate-200 " >{ind + 1}. </p>

                                                                    <p className="text-start text-[15px] text-slate-200 " >{last_name} </p>

                                                                    <p className=" text-start text-[15px] text-slate-200 " > {first_name} </p>

                                                                </span>
                                                                    
                                                                <p key={ind} className=" text-start text-[15px] hover:bg-slate-600 text-slate-200 text-end " > {user_role} </p>


                                                            </span>
                                                        )
                                                    })}

                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    
                                </form>

                                <div className="w-full flex items-center justify-between gap-[24px]">

                                    <div className="w-1/2"></div>

                                    <button className=" w-1/2 h-[45px] text-white bg-slate-800 rounded-[5px] hover:bg-slate-900 flex items-center justify-center text-[15px] "  disabled={loading} onClick={update_lead} >
                                        {loading ? (
                                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                        ) : 'Update Lead'}

                                    </button>

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

export default Lead_Management_Modal