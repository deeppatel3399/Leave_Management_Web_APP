import React,{ useEffect,useState } from 'react';
import axios from 'axios';

const EmployLeaveReqCard = (props)=> 
{

  const[leaveData,setLeaveData] = useState(props.leavListData);
  const[managerNote,setManagerNote] = useState("");
  const[disVal,setDisVal] = useState(false);

  const accept = ()=>
  {
    const leaveId = leaveData._id;

    axios.post('leave/acceptupdateleave',{
      leaveId,
      status:'Accepted',
      managerNote,
      days:props.days
    }).then((data)=>{
      console.log(data);
      if(data.data.status===200)
      {
        alert("Leave Update Successfully");
      }
    });
  };
  const reject = ()=>
  {
    const leaveId = leaveData._id;
    const employId = leaveData.employId;

    axios.post('leave/rejectupdateleave',{
      leaveId:leaveId,
      employId,
      status:'Rejected',
      managerNote,
      days:props.days
    }).then((data)=>{
      console.log(data);
      if(data.data.status===200)
      {
        alert("Leave Update Successfully");
      }
    });
  };

  useEffect(()=>{
    if(leaveData.status==="Accepted" || leaveData.status==="Rejected" || leaveData.status==="Cancelled")
    {
      setDisVal(true);
    }
    else
    {
      setDisVal(false);
    }
  },[disVal]);


  return (

    <div className='bg-light rounded-xl px-4 py-2 flex-col mr-2'>

        <div className='mb-2'>

            <div className='text-center text-primary-dark font-bold text-lg'>{props.name}</div>

            <div className='flex flex-row justify-around my-1'>
            <div className='font-bold text-lg text-primary-dark'>From Date: <span className='text-black text-base font-semibold'>{props.from}</span></div>
            <div className='font-bold text-lg text-primary-dark'>To Date: <span className='text-black text-base  font-semibold'>{props.to}</span></div>
            <div className='font-bold text-lg text-primary-dark'>Days: <span className='text-black text-base   font-semibold'>{props.days}</span></div>
            </div>

            <div className='font-bold ml-3 text-lg text-primary-dark p-0'>Note: <p className='text-black h-4 m-0 break-words font-normal text-base'>{props.note}</p>
            </div>
            
        </div>

        <hr className='mb-2 rounded-lg'/>

        <div className='bg-primary-dark rounded-lg p-2'>

         {disVal===false?
           <div>
            <p className='text-white text-md  font-semibold'>Your Note</p>
            <textarea className='w-full border-black rounded-md' value={managerNote} onChange={(e)=>setManagerNote(e.target.value)}></textarea>
           </div>
         :<div>
          <p className='text-white text-md  font-semibold'>Your Note</p>
          <div className='w-full border-black rounded-md bg-white text-black px-3 py-1 h-10'>{leaveData.managerNote}</div>
          </div>
         }

           <div className='flex flex-row justify-evenly mt-2'>
            {
              disVal===false?
              <>
              <button className='rounded-lg w-24 bg-success-dark hover:bg-success text-center text-primary-dark font-semibold h-7' onClick={accept}><i className="fa-solid fa-check font-bold"></i></button>
              <button className='rounded-lg w-24 bg-error-dark hover:bg-error text-center text-primary-dark font-semibold h-7' onClick={reject}><i className="fa-solid fa-xmark font-bold"></i></button></>:
              <>
                <div>
                <p className='text-white font-bold'><span className='text-white font-bold text-base'>Status - </span>{props.status}</p>
                </div>
              </>
             }
           </div>

        </div>

    </div>

  );
};

export default EmployLeaveReqCard;