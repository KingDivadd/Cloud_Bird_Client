'use client'
import React, {useState, useEffect} from 'react'
import {FileUploader} from "../file_uploader"
import { post_auth_request } from '@/app/api'
import { useRouter } from 'next/navigation'
import Alert from '../alert'


interface Profile_props {
    modalFor: string,
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
}

const Profile_modal = ({modalFor, showModal, setShowModal,  selectedItem, setSelectedItem }: Profile_props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false); 
    const [profile, setProfile] = useState({first_name: '', last_name: '', email: '', phone_number: '', credit_score: 0, report_data: '' })
    const [inputError, setInputError] = useState({ first_name_error: false, last_name_error: false, email_error: false, phone_number_error: false, report_data_error: false  });
    const [alert, setAlert] = useState({message: '', type: ''})


    useEffect(() => {
        if (profile.last_name) {setInputError({ ...inputError, last_name_error: profile.last_name === "" })}
        if (profile.first_name) {setInputError({ ...inputError, first_name_error: profile.first_name === "" })}
        if (profile.email) {setInputError({ ...inputError, email_error: profile.email === "" })}
        if (profile.phone_number) {setInputError({ ...inputError, phone_number_error: profile.phone_number === "" })}
    }, [profile]);

    useEffect(() => {
        if (modalFor == 'edit') {   
            const {profile_id, profile_ind, first_name, last_name, email, phone_number, credit_score, credit_reports} = selectedItem

            const report_data = credit_reports.length ? credit_reports[0].report_data : ""
            setProfile({...profile, first_name, last_name, email, phone_number, credit_score, report_data, })
        }
    }, [])


    function handleChange(e:any) {
        const name = e.target.name; const value = e.target.value;
        if (name == 'credit_score') {
            setProfile({...profile, [name]: Number(value)})
        }else{
            setProfile({...profile, [name]: value})
        }        
    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function add_profile(e:any) {
        e.preventDefault();
        if (!profile.first_name || !profile.last_name || !profile.email || !profile.phone_number) {
            setInputError({...inputError, first_name_error: profile.first_name === "", last_name_error: profile.last_name === "", email_error: profile.email === "", phone_number_error: profile.phone_number === "", report_data_error: profile.report_data === "" });

            showAlert("Please Enter all Fields", "warning")
        }else{

            setLoading(true);
            
            try {
                
                const response = await post_auth_request('app/add-profile', profile)
                
                if (response.status == 201 || response.status == 200){
                    
                    showAlert(response.data.msg, "success")

                    setProfile({first_name: '', last_name: '', email: '', phone_number: '', credit_score: 0, report_data: '' })
                    
                    setLoading(false)

                    setTimeout(() => {
                        setShowModal(false)
                    }, 2000);

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
                    setLoading(false)
                    return;
                }

            } catch (err:any) {        
                console.log(err)        
                showAlert('Something went worong, try again later ', 'error')
                setLoading(false)
            }
        }
    }

    const handleFileUpload = (fileUrl:string) => {
        console.log('Received file URL from settings:', fileUrl);
        setProfile({...profile, report_data: fileUrl})
    };

    return (
        <div className="relative w-full h-full flex flex-col items-start justify-start">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                {alert.message && <Alert message={alert.message} type={alert.type} />}
            </span>
            {
                modalFor == 'add' && 
                <div className="w-[80vw] min-h-[80vh] p-[25px] flex flex-col items-start justify-start gap-[20px] ">
                    <span className="w-full pb-[10px] flex items-center justify-between border-b border-slate-700 ">
                        <h4 className="text-sm font-medium text-white ">Add Profile </h4>

                    </span>

                    <form action="" className='w-full h-full  flex flex-col items-start justify-between'>
                        <div className="w-full h-flex-1 flex items-start justify-between gap-[25px]">

                            <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">
                            
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">Last Name</h4>
                                    <input type="text" name='last_name' className={inputError.last_name_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={profile.last_name} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">First Name</h4>
                                    <input type="text" name='first_name' className={inputError.first_name_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={profile.first_name} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">Email</h4>
                                    <input type="email" name='email' className={inputError.email_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={profile.email} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">Phone Number</h4>
                                    <input type="text" name='phone_number' className={inputError.phone_number_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={profile.phone_number} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">Credit Score</h4>
                                    <input type="number" name='credit_score' className={'signup-input bg-slate-300 focus:bg-slate-200'} value={profile.credit_score} onChange={handleChange} />
                                </span>


                            </div>
                            
                            <div className="w-1/2 flex flex-col items-end justify-start gap-[20px] ">
                                
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">Credit File</h4>
                                    <FileUploader id='credit_file' title='Select Credit File' url='' onFileUpload={handleFileUpload} />
                                </span>
                            
                                <span className="w-full flex flex-col items-end justify-start ">
                                    {profile.report_data === "" ?  
                                    <button className=" w-1/2 h-[50px] text-white bg-blue-600 rounded-[3px] flex items-center justify-center text-sm"  disabled>
                                    {loading ? (
                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        ) : 'Submit'}
                                    </button>
                                    :
                                    <button className=" w-1/2 h-[50px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-sm" onClick={add_profile} disabled={loading}>
                                    {loading ? (
                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        ) : 'Submit'}
                                    </button>}
                                </span>
                                
                            </div>
                            

                        </div>

                        

                    </form>
                </div>
            }

            {
                modalFor == 'edit' && 
                <div className="w-[80vw] min-h-[80vh] p-[25px] flex flex-col items-start justify-start gap-[20px] ">
                    <span className="w-full pb-[10px] flex items-center justify-between border-b border-slate-700 ">
                        <h4 className="text-sm font-medium text-white ">Add Profile </h4>

                    </span>

                    <form action="" className='w-full h-full  flex flex-col items-start justify-between'>
                        <div className="w-full h-flex-1 flex items-start justify-between gap-[25px]">

                            <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">
                            
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">Last Name</h4>
                                    <input type="text" name='last_name' className={inputError.last_name_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={profile.last_name} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">First Name</h4>
                                    <input type="text" name='first_name' className={inputError.first_name_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={profile.first_name} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">Email</h4>
                                    <input type="email" name='email' className={inputError.email_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={profile.email} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">Phone Number</h4>
                                    <input type="text" name='phone_number' className={inputError.phone_number_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={profile.phone_number} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">Credit Score</h4>
                                    <input type="number" name='credit_score' className={'signup-input bg-slate-300 focus:bg-slate-200'} value={profile.credit_score} onChange={handleChange} />
                                </span>


                            </div>
                            
                            <div className="w-1/2 flex flex-col items-end justify-start gap-[20px] ">
                                
                                <span className="w-full flex flex-col items-start justify-start gap-2">
                                    <h4 className="text-sm  text-slate-200 ">Credit Report Document</h4>
                                    <FileUploader id='credit_file' title='Select Credit File' url={profile.report_data || ""} onFileUpload={handleFileUpload} />
                                </span>
                            
                                <span className="w-full flex flex-col items-end justify-start ">
                                    {profile.report_data === "" ?  
                                    <button className=" w-1/2 h-[50px] text-white bg-blue-600 rounded-[3px] flex items-center justify-center text-sm"  disabled>
                                    {loading ? (
                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        ) : 'Submit'}
                                    </button>
                                    :
                                    <button className=" w-1/2 h-[50px] text-white bg-amber-600 rounded-[3px] hover:bg-amber-700 flex items-center justify-center text-sm" onClick={add_profile} disabled={loading}>
                                    {loading ? (
                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        ) : 'Update'}
                                    </button>}
                                </span>
                                
                            </div>
                            

                        </div>

                        

                    </form>
                </div>
            }
        </div>
    )
}

export default Profile_modal