import React from 'react';

const Test = ({ closeModal }) => {
    return (
        <div className="o-container font-serif flex flex-col bg-slate-100 p-2 w-full md:w-8/12 lg:w-6/12 xl:w-5/12 transform translate-x-1/2 translate-y-1/2 absolute rounded-2xl">
            <div className="cross absolute top-1 right-2 " onClick={closeModal}>
                <h1 className=' bg-red-400 w-8 p-0.5 text-center text-white rounded-sm'>X</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="image flex items-center justify-center">
                    <img src='./public/Images/p1.png' className='rounded-lg ml-4' alt="Newsletter" />
                </div>
                <div className="info p-5">
                    <h2 className='font-bold p-2 ml-7'>
                        GET OUR WEEKLY <span className='bg-yellow-200 p-1 text-3xl'>NEWSLETTER</span>
                    </h2>
                    <p className='mt-3 md:mt-5 p-3 '>
                        Get weekly updates on Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deserunt amet velit ad omnis rem vitae quos eos labore earum?
                    </p>
                    <h3 className='text-lg md:text-xl lg:text-2xl font-bold mt-3 md:mt-5'>Subscribe now!</h3>
                </div>
            </div>
            <div className="subscribe flex flex-col md:flex-row mt-5">
                <input placeholder='Enter email address' className='w-full md:w-9/12 h-10 text-center rounded-md mb-3 md:mb-0'></input>
                <button className='bg-gradient-to-r from-orange-500 to-yellow-500 h-10 p-3 text-white rounded-lg' onClick={closeModal}>SUBSCRIBE!</button>
            </div>
        </div>
    );
};

export default Test;