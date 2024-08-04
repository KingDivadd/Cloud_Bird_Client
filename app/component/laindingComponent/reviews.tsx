import React from 'react'

const Reviews = () => {
    return (
        <div id="reviews" className="w-full flex flex-col items-center justif-start gap-10 pt-[40px] pb-[20px] px-[15px] sm:px-[30px] lg:pl-[40px] xl:px-[70px] ">
            <h3 className="font-bold text-2xl sm:text-3xl text-slate-800">Reviews</h3>

            <div className="w-full flex flex-col md:flex-row items-start justify-between gap-[15px] md:gap-[20px] h-auto">
                {/* left side */}
                <div className="w-full md:w-[50%] flex flex-col items-start justify-start gap-3 h-[250px] md:h-[500px] bg-slate-200 rounded-[10px] "></div>
                <div className="w-full md:w-[50%] flex flex-col items-start justify-start gap-3 h-[500px] ">
                    <div className="w-full h-1/2 bg-slate-200 rounded-[10px] "></div>
                    <div className="w-full h-1/2 bg-slate-200 rounded-[10px] "></div>
                </div>
            </div>

        </div>
    )
}

export default Reviews