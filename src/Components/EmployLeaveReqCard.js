import React from 'react';
import ReadMoreReact from 'read-more-react';

const EmployLeaveReqCard = (props)=> 
{
  return (
    <>

    <div className='bg-primary rounded-xl p-4 flex-col mr-3 mb-5 relative'>

        <div className='mb-5'>

            <div className='text-center text-white text-xl font-bold'>{props.name}</div>

            <div className='flex flex-row justify-around my-2'>
            <div className='font-bold text-lg text-primary-dark'>From Date: <span className='text-white text-base font-semibold'>{props.from}</span></div>
            <div className='font-bold text-lg text-primary-dark'>To Date: <span className='text-white text-base font-semibold'>{props.to}</span></div>
            </div>

            
            <div className='font-bold text-lg text-primary-dark'>Days: <span className='text-white text-base font-semibold'>{props.days}</span></div>

            <div className='font-bold text-lg text-primary-dark'>Note: </div>
            <p className='text-white text-base font-semibold w-11/12 h-10 m-0 absolute break-words'>{props.note}</p>
            

        </div>

        <hr className='mb-5 rounded-lg'/>

        <div className='bg-primary-dark rounded-lg p-2'>

           <div>
            <p className='text-white text-lg font-semibold'>Your Note</p>
            <textarea className='w-full border-black'></textarea>
           </div>

           <div className='flex flex-row justify-evenly mt-5'>
            <button className='rounded-lg w-24 bg-success-dark hover:bg-success text-center text-white font-semibold text-base h-9'>Approved</button>
            <button className='rounded-lg w-24 bg-error-dark hover:bg-error text-center text-white font-semibold text-base h-9'>Decline</button>
           </div>

        </div>

    </div>

    </>
  );
};

export default EmployLeaveReqCard;