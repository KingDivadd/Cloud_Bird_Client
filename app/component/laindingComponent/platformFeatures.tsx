import React from 'react'

const PlatformFeatures = () => {
    return (
        <div id="platformfeatures" className="w-full min-h-[100vh] flex flex-col items-center justif-start gap-[30px] sm:gap-[45px] pt-[40px] px-[15px] sm:px-[30px] lg:pl-[40px] xl:px-[70px] ">
            <h3 className="font-bold text-2xl sm:text-3xl text-slate-800">Platform Features</h3>

            <div className="w-full flex flex-col justify-start item-center gap-10 h-auto ">

                <div className="flex flex-col lg:flex-row h-auto lg:h-[815px] xl:h-[820px] items-start justify-between gap-[15px] xl:gap-[20px] ">
                    {/* left  */}
                    <div className="w-full lg:w-[60%] h-full flex flex-col items-start justify-start gap-[15px] xl:gap-[20px] ">
                        
                        <span className="bg-slate-200 w-full h-[400px] sm:p-[20px] p-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[10px] ">
                            <h4 className="font-bold text-lg">User Role Management</h4>
                            <p className="text-sm font-light">Tailored access and control for various roles</p>
                            <span className="w-full h-[400px] flex flex-row items-center justify-between  "></span>
                        </span>

                        <span className="bg-slate-200 w-full h-[400px] sm:p-[20px] p-[15px] flex flex-col justify-start items-between gap-3 bg-gray-100 rounded-[10px] ">
                            <h4 className="font-bold text-lg">Integrated Lead Management</h4>
                            <p className="text-sm font-light">Track and manage leads with calender integration</p>
                            <span className="w-full h-[250px] flex flex-row items-center justify-between  "></span>
                        </span>

                    </div>

                    <div className="w-full lg:w-[40%] sm:p-[20px] p-[15px] h-[400px] lg:h-full bg-slate-200">
                        <h4 className="font-bold text-lg">Alerts & Notifications</h4>
                        <p className="text-sm font-light">Track and manage alerts and notifications</p>
                        <span className="w-full h-[250px] flex flex-row items-center justify-between  "></span>
                    </div>
                    {/* right */}
                </div>


            </div>

        </div>

        
    )
}

export default PlatformFeatures