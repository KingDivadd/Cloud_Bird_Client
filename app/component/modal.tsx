'use client'
import React, { useState, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'
import { IoIosWarning } from "react-icons/io";
import { CiWarning } from 'react-icons/ci'
import { IoCheckmark } from 'react-icons/io5';
import Profile_modal from "../component/business_user_component/profile_modal"
import Alert from "./alert"


interface Modal_props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;
    modalSource: string

}

const Modal = ({ showModal, setShowModal, selectedItem, setSelectedItem, modalFor, setModalFor, modalSource}: Modal_props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [approve_loading, setApprove_loading] = useState(false)
    const [all_staff, setAll_staff] = useState< {staffs:any} |  null>(null)
    const [filtered_staff, setFiltered_staff] = useState< {staffs:any} |  null>(null)
    const [auth, setAuth] = useState({customer_first_name: '', customer_last_name: '', city: '', state: '', zip: '', address: '', email: '', phone_number: '', assigned_to: '', assigned_name: '', appointment_date: '', disposition: '', gate_code: ''})
    const [showCalender, setShowCalender] = useState(false)
    const [clicked_appointment_date, setClicked_appointment_date] = useState('')
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        disposition: false
    });
    const [dropElements, setDropElements] = useState({
        disposition: 'Disposition'

    })

    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({...dropElements, [dropdown]: 'Disposition'});

    };

    const handleSelectDropdown = (dropdown: any, title:any)=>{
        setAuth({...auth, disposition: dropdown})
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }

    function handleCloseModal() {
        setSelectedItem(null)
        setShowModal(false)
        setModalFor('')
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
                <div className="w-full h-screen flex items-center justify-center overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-auto mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-auto flex flex-col items-start justify-start gap-5 bg-slate-900  rounded-b-[5px]  rounded-[3px]  ">
                            <div className="w-full flex flex-col items-start justify-start">

                                {/* below is to upload new permit */}
                                {modalFor == 'delete' && 
                                
                                <></>
                                }

                                {(modalFor == 'add' && modalSource == 'profile') &&  <Profile_modal setShowModal={setShowModal} showModal={showModal} modalFor={modalFor}  selectedItem={selectedItem} setSelectedItem={setSelectedItem}  /> }

                                {(modalFor == 'edit' && modalSource == 'profile') &&  <Profile_modal setShowModal={setShowModal} showModal={showModal} modalFor={modalFor}  selectedItem={selectedItem} setSelectedItem={setSelectedItem}  /> }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal
