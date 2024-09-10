'use client'
import React, {useState, useEffect} from 'react'
import {FileUploader} from "../file_uploader"
import {post_auth_request} from "../../api/index"
import { useRouter } from 'next/navigation'
import Alert from '../alert'
import { readable_date_time } from '../helper'
import { DropDownBlankTransparent } from '../dropDown'


interface User_props {
    modalFor: string,
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
}

const User_modal = ({modalFor, showModal, setShowModal,  selectedItem, setSelectedItem }: User_props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false); 
    const [user, setUser] = useState({first_name: '', last_name: '', email: '', phone_number: '', password: '' })
    const [inputError, setInputError] = useState({ first_name_error: false, last_name_error: false, email_error: false, phone_number_error: false, password_error: false  });
    const [alert, setAlert] = useState({message: '', type: ''})

    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        user_role: false
    });
    const [dropElements, setDropElements] = useState({
        user_role: 'User'

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
        setUser({...user, [title]:dropdown.toLowerCase()})
        // handle_new_filter(dropdown.replace(/ /g, '_'))
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }



    useEffect(() => {
        if (user.last_name) {setInputError({ ...inputError, last_name_error: user.last_name === "" })}
        if (user.first_name) {setInputError({ ...inputError, first_name_error: user.first_name === "" })}
        if (user.email) {setInputError({ ...inputError, email_error: user.email === "" })}
        if (user.phone_number) {setInputError({ ...inputError, phone_number_error: user.phone_number === "" })}
        if (user.password) {setInputError({ ...inputError, password_error: user.password === "" })}
    }, [user]);

    useEffect(() => {
        if (modalFor == 'edit' || modalFor == 'view') {   
            const {user_id, user_ind, first_name, last_name, email, phone_number, avatar,  } = selectedItem
            
            setUser({...user, first_name, last_name, email, phone_number })

        }
    }, [])


    function handleChange(e:any) {
        const name = e.target.name; const value = e.target.value;
        if (name == 'credit_score') {
            setUser({...user, [name]: Number(value)})
        }else{
            setUser({...user, [name]: value})
        }        
    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function add_user(e:any) {
        e.preventDefault();
        if (!user.first_name || !user.last_name || !user.email || !user.phone_number || !user.password) {

            setInputError({...inputError, first_name_error: user.first_name === "", last_name_error: user.last_name === "", email_error: user.email === "", phone_number_error: user.phone_number === "", password_error: user.password == ""  });

            showAlert("Please Enter all Fields", "warning")
        }else{

            setLoading(true);
            
            try {

                const response = await post_auth_request('app/add-user', user)
                
                if (response.status == 201 || response.status == 200){
                    
                    showAlert(response.data.msg, "success")

                    setUser({first_name: '', last_name: '', email: '', phone_number: "", password: '' })
                    
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

    return (
        <div className="relative w-full h-full flex flex-col items-start justify-start">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                {alert.message && <Alert message={alert.message} type={alert.type} />}
            </span>
            {
                modalFor == 'add' && 
                <div className="w-[80vw] min-h-[80vh] p-[25px] flex flex-col items-start justify-start gap-[20px] ">
                    <span className="w-full pb-[10px] flex items-center justify-between border-b border-slate-700 ">
                        <h4 className="text-sm font-medium text-white ">Add user </h4>

                    </span>

                    <form action="" className='w-full h-full  flex flex-col items-start justify-between'>
                        <div className="w-full h-flex-1 flex items-start justify-between gap-[25px]">

                            <div className="w-1/2 flex flex-col items-start justify-between  h-[500px]  ">
                            
                                <span className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <h4 className="text-sm  text-slate-200 ">Last Name</h4>
                                    <input type="text" name='last_name' className={inputError.last_name_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={user.last_name} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <h4 className="text-sm  text-slate-200 ">First Name</h4>
                                    <input type="text" name='first_name' className={inputError.first_name_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={user.first_name} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <h4 className="text-sm  text-slate-200 ">Email</h4>
                                    <input type="email" name='email' className={inputError.email_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={user.email} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <h4 className="text-sm  text-slate-200 ">Phone Number</h4>
                                    <input type="text" name='phone_number' className={inputError.phone_number_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={user.phone_number} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <h4 className="text-sm  text-slate-200 ">Password</h4>
                                    <input type="text" name='password' className={inputError.password_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={user.password} onChange={handleChange} />
                                </span>


                            </div>
                            
                            <div className="w-1/2 flex flex-col items-end justify-between h-[500px] gap-[20px]  ">

                                <span className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <h4 className="text-sm  text-slate-200 ">User Type</h4>
                                    
                                    <span className="w-full h-[50px]">

                                        <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'user_role'} dropArray={['Single User', 'Business User' ]} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus}  /> 
                                    </span>

                                </span>

                            
                                <span className="w-full flex flex-col items-end justify-start ">
                                    <button className=" w-1/2 h-[50px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-700 flex items-center justify-center text-sm" onClick={add_user} disabled={loading}>
                                    {loading ? (
                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        ) : 'Submit'}
                                    </button>
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
                        <h4 className="text-sm font-medium text-white ">Add user </h4>

                    </span>

                    <form action="" className='w-full h-full  flex flex-col items-start justify-between'>
                        <div className="w-full h-flex-1 flex items-start justify-between gap-[25px]">

                            <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] ">
                            
                                <span className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <h4 className="text-sm  text-slate-200 ">Last Name</h4>
                                    <input type="text" name='last_name' className={inputError.last_name_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={user.last_name} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <h4 className="text-sm  text-slate-200 ">First Name</h4>
                                    <input type="text" name='first_name' className={inputError.first_name_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={user.first_name} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <h4 className="text-sm  text-slate-200 ">Email</h4>
                                    <input type="email" name='email' className={inputError.email_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={user.email} onChange={handleChange} />
                                </span>

                                <span className="w-full flex flex-col items-start justify-start gap-[15px] ">
                                    <h4 className="text-sm  text-slate-200 ">Phone Number</h4>
                                    <input type="text" name='phone_number' className={inputError.phone_number_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={user.phone_number} onChange={handleChange} />
                                </span>

                            </div>
                            
                            <div className="w-1/2 flex flex-col items-end justify-start gap-[20px] ">
                                
                                
                            
                                {/* <span className="w-full flex flex-col items-end justify-start ">
                                    {user.report_data === "" ?  
                                    <button className=" w-1/2 h-[50px] text-white bg-blue-600 rounded-[3px] flex items-center justify-center text-sm"  disabled>
                                    {loading ? (
                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        ) : 'Submit'}
                                    </button>
                                    :
                                    <button className=" w-1/2 h-[50px] text-white bg-amber-600 rounded-[3px] hover:bg-amber-700 flex items-center justify-center text-sm" onClick={add_user} disabled={loading}>
                                    {loading ? (
                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        ) : 'Update'}
                                    </button>}
                                </span> */}
                                
                            </div>
                            

                        </div>

                        

                    </form>
                </div>
            }

            {
                modalFor == 'view' && 
                <div className="w-[80vw] p-[25px] flex flex-col items-start justify-start gap-[20px] ">
                    <span className="w-full pb-[10px] flex items-center justify-between border-b border-slate-700 ">
                        <h4 className="text-sm font-medium text-white ">{selectedItem.user_ind} </h4>
                        <h4 className="text-sm font-medium text-white ">{selectedItem.user_role == "single_user" ? "Single User" : "Business User"} </h4>
                    </span>

                    <form action="" className='h-[60vh] w-full h-full  flex items-start justify-between '>

                        <div className="w-1/2 h-full flex flex-col items-start justify-start gap-[20px] ">
                        
                            <h4 className="text-sm w-full font-medium text-slate-200 ">Basic User Information</h4>

                            <span className="w-full flex  items-start justify-start gap-[15px] ">
                                <h4 className="text-sm w-[30%] text-slate-200 ">Last Name</h4>
                                <h4 className="text-sm w-[70%] text-start text-slate-200 ">{selectedItem.last_name}</h4>
                            </span>

                            <span className="w-full flex  items-start justify-start gap-[15px] ">
                                <h4 className="text-sm w-[30%] text-slate-200 ">First Name</h4>
                                <h4 className="text-sm w-[70%] text-start text-slate-200 ">{selectedItem.first_name}</h4>
                            </span>

                            <span className="w-full flex  items-start justify-start gap-[15px] ">
                                <h4 className="text-sm w-[30%] text-slate-200 ">Email</h4>
                                <h4 className="text-sm w-[70%] text-start text-slate-200 ">{selectedItem.email}</h4>
                            </span>

                            <span className="w-full flex  items-start justify-start gap-[15px] ">
                                <h4 className="text-sm w-[30%] text-slate-200 ">Phone</h4>
                                <h4 className="text-sm w-[70%] text-start text-slate-200 ">{selectedItem.phone_number}</h4>
                            </span>

                            <span className="w-full flex  items-start justify-start gap-[15px] ">
                                <h4 className="text-sm w-[30%] text-slate-200 ">User Type</h4>
                                <h4 className="text-sm w-[70%] text-start text-slate-200 ">{selectedItem.user_role == "single_user" ? "Single User" : "Business User"}</h4>
                            </span>

                            <span className="w-full flex  items-start justify-start gap-[15px] ">
                                <h4 className="text-sm w-[30%] text-slate-200 ">Created At</h4>
                                <h4 className="text-sm w-[70%] text-start text-slate-200 ">{readable_date_time(Number(selectedItem.created_at))}</h4>
                            </span>

                            <span className="w-full flex  items-start justify-start gap-[15px] ">
                                <h4 className="text-sm w-[30%] text-slate-200 ">Updated At</h4>
                                <h4 className="text-sm w-[70%] text-start text-slate-200 ">{readable_date_time(Number(selectedItem.updated_at))}</h4>
                            </span>

                        </div>
                        
                        <div className="w-1/2 h-full flex flex-col items-end justify-start gap-[20px] overflow-y-auto  ">

                            <h4 className="text-sm w-full font-medium text-slate-200 ">Profile Information</h4>
                            
                            {selectedItem.profiles.map((data:any, ind: number)=>{
                                const {created_at, updated_at, first_name, last_name, email, phone_number, profile_ind, credit_score,  } = data
                                return (
                                    
                                    <div key={ind} className="w-full flex flex-col items-start justify-start gap-[20px] ">
                        
                                        <span className="text-sm w-full flex items-center justify-start gap-[10px] ">
                                            <h4 className="text-sm  text-slate-200 ">PROFILE:</h4>
                                            <h4 className="text-sm  text-slate-200 font-medium ">{profile_ind}</h4>
                                            
                                        </span>

                                        <span className="w-full flex  items-start justify-start gap-[15px] ">
                                            <h4 className="text-sm w-[30%] text-slate-200 ">Credit Score</h4>
                                            <h4 className="text-sm w-[70%] text-start text-slate-200 ">{credit_score}</h4>
                                        </span>

                                        <span className="w-full flex  items-start justify-start gap-[15px] ">
                                            <h4 className="text-sm w-[30%] text-slate-200 ">Last Name</h4>
                                            <h4 className="text-sm w-[70%] text-start text-slate-200 ">{last_name}</h4>
                                        </span>

                                        <span className="w-full flex  items-start justify-start gap-[15px] ">
                                            <h4 className="text-sm w-[30%] text-slate-200 ">First Name</h4>
                                            <h4 className="text-sm w-[70%] text-start text-slate-200 ">{first_name}</h4>
                                        </span>

                                        <span className="w-full flex  items-start justify-start gap-[15px] ">
                                            <h4 className="text-sm w-[30%] text-slate-200 ">Email</h4>
                                            <h4 className="text-sm w-[70%] text-start text-slate-200 ">{email}</h4>
                                        </span>

                                        <span className="w-full flex  items-start justify-start gap-[15px] ">
                                            <h4 className="text-sm w-[30%] text-slate-200 ">Phone</h4>
                                            <h4 className="text-sm w-[70%] text-start text-slate-200 ">{phone_number}</h4>
                                        </span>

                                        <span className="w-full flex  items-start justify-start gap-[15px] ">
                                            <h4 className="text-sm w-[30%] text-slate-200 ">Created At</h4>
                                            <h4 className="text-sm w-[70%] text-start text-slate-200 ">{readable_date_time(Number(created_at))}</h4>
                                        </span>

                                        <span className="w-full flex  items-start justify-start gap-[15px] ">
                                            <h4 className="text-sm w-[30%] text-slate-200 ">Updated At</h4>
                                            <h4 className="text-sm w-[70%] text-start text-slate-200 ">{readable_date_time(Number(updated_at))}</h4>
                                        </span>

                                    </div>
                                )
                            })}
                            
                        </div>

                    </form>
                </div>
            }


        </div>
    )
}

export default User_modal