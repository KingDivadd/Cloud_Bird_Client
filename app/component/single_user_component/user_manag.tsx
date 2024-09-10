'use client'
import React, {useState, useEffect} from 'react'
import { ImgUploader } from '../file_uploader';
import { get_auth_request, patch_auth_request } from '@/app/api';
import { useRouter } from 'next/navigation';
import Alert from '../alert';

const User_manag = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({first_name: '', last_name: '', email: '', phone_number: '', password: '', avatar: '', profiles: [], credit_score: 0, user_id: '' })
    const [inputError, setInputError] = useState({ first_name_error: false, last_name_error: false, email_error: false, phone_number_error: false, password_error: false  });
    const [user_profile, setUser_profile] = useState<{avatar:string, email: string, first_name: string, last_name: string, password: string, profiles:any, } | null>(null)
    const [alert, setAlert] = useState({message: '', type: ''})

    useEffect(()=>{
        get_user_profile()
    },[])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_user_profile() {
        try {

            const response = await get_auth_request(`app/user-managment`)
            
            if (response.status == 201 || response.status == 200){

                setUser_profile(response.data.profile)
                
                const {user_id, avatar, email, first_name, last_name, password, profiles, phone_number} = response.data.profile

                if (profiles.length ) {

                    const score = profiles[0].credit_score

                    setUser({...user,  avatar, email, first_name, last_name, profiles, phone_number, user_id, credit_score: score})

                }else{

                    setUser({...user,  avatar, email, first_name, last_name, profiles, phone_number, user_id ,credit_score: 0})

                }

                
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

    useEffect(() => {
        if (user.last_name) {setInputError({ ...inputError, last_name_error: user.last_name === "" })}
        if (user.first_name) {setInputError({ ...inputError, first_name_error: user.first_name === "" })}
        if (user.email) {setInputError({ ...inputError, email_error: user.email === "" })}
        if (user.phone_number) {setInputError({ ...inputError, phone_number_error: user.phone_number === "" })}
        if (user.password) {setInputError({ ...inputError, password_error: user.password === "" })}
    }, [user]);

    function handleChange(e:any) {
        const name = e.target.name; const value = e.target.value;
        if (name == 'credit_score') {
            setUser({...user, [name]: Number(value)})
        }else{
            setUser({...user, [name]: value})
        }        
    }


    async function save_changes(){
        if (!user.first_name || !user.last_name || !user.credit_score || !user.email || !user.phone_number) {
            showAlert("Please fill all fields", "warning")
        }else{
            setLoading(true)
            try {

                const payload = {avatar: user.avatar, first_name: user.first_name, last_name: user.last_name, phone_number: user.phone_number, password: user.password, credit_score: user.credit_score}

                const response = await patch_auth_request(`app/edit-user-management/${user.user_id}`, payload)
                
                if (response.status == 201 || response.status == 200){

                    showAlert("Profile updated successfully", "success")
    
                    setUser_profile(response.data.profile)
                    
                    const {avatar, email, first_name, last_name, password, profiles, phone_number} = response.data.profile
    
                    setUser({...user, avatar, email, first_name, last_name, profiles, phone_number })
    
                    // if (profiles.length && profiles[0].credit_score) {

                    //     const score = profiles[0].credit_score

                    //     setUser({...user, credit_score: score})

                    // }else{

                    //     setUser({...user, credit_score: 0})

                    // }
    

                    setLoading(false)
                    
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
                setLoading(false)

                showAlert('Something went worong, try again later ', 'error')
            }
        }
    }

    const handleFileUpload = (fileUrl:string) => {
        setUser({...user, avatar: fileUrl})
    };

    return (
        <div className="w-full relative flex items-start justify-center bg-[#475569] gap-[40px] px-[75px] py-[40px]">
            <span className="w-[90%] md:w-1/2  flex items-center justify-end absolute top-[20px] right-[20px] z-20 ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
            </span>

            <div className="w-1/2 flex flex-col items-start justify-start gap-[40px] ">
            
                <div className="w-full flex flex-col items-center justify-start rounded-[5px] bg-slate-900 p-[25px] shadow-md">
                    <span className="w-[250px] h-[265px] flex items-start justify-center ">
                        <ImgUploader id='user_image' title='' url={user_profile?.avatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"} onFileUpload={handleFileUpload} type='' />
                    </span>
                </div>


                <div className="flex w-full flex-col items-start justify-start  gap-[40px] bg-slate-900 p-[25px] rounded-[5px] ">
                    <span className="w-full flex flex-col items-start justify-start gap-[15px] ">
                        <h4 className="text-sm  text-slate-200 ">Credit Score</h4>
                        <input type="text" name='credit_score' className={'signup-input bg-slate-300 focus:bg-slate-200'} value={user.credit_score} onChange={handleChange} />
                    </span>
                </div>

                <button className="mt-[54px] w-full h-[50px] text-white bg-teal-600 rounded-[3px] hover:bg-teal-700 flex items-center justify-center text-sm" onClick={save_changes} disabled={loading}>
                    {loading ? (
                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    ) : 'Save Changes'}
                </button>

            </div>

            <div className="w-1/2 flex flex-col items-start justify-start gap-[40px] ">
            
                <div className="flex w-full flex-col items-start justify-start  gap-[40px] bg-slate-900 p-[25px] rounded-[5px] ">
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
                        <input type="email" name='email' disabled className={inputError.email_error ? 'signup-input-error bg-slate-300' : 'signup-input bg-slate-300 focus:bg-slate-200'} value={user.email} onChange={handleChange} />
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

            </div>

        </div>
    )
}

export default User_manag