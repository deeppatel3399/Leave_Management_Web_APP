import React from "react";

const LatestLeave = (props) => {
  return (
    <>
      <div className="bg-light rounded-xl px-4 py-2 w-4/5">
        <div className="mb-3">
          <div className="text-center text-primary-dark font-bold text-lg">{props.name}</div>

          <div className="flex flex-row justify-around my-1">
            <div className="font-bold  text-primary-dark text-lg">
              From Date:{" "}
              <span className="text-black text-md font-semibold">
                {props.fromDate}
              </span>
            </div>
            <div className="font-bold  text-primary-dark text-lg">
              To Date:{" "}
              <span className="text-black text-md  font-semibold">{props.toDate}</span>
            </div>
            <div className="font-bold  text-primary-dark text-lg">
              Days:{" "}
              <span className="text-black text-md  font-semibold">{props.days}</span>
            </div>
          </div>

          <div className="font-bold ml-1 text-primary-dark text-lg p-0">
            Note:{" "}
            <p className="text-black h-4 m-0 break-words font-bold text-base">
              {props.note}
            </p>
          </div>
        </div>

        <hr className="mb-3 rounded-lg" />

        <div className="bg-primary-dark rounded-lg p-2">
          <div>
            <p className="text-white text-base font-semibold mb-3">Manager Note</p>
            <div className="w-full border-black rounded-md bg-white text-black px-3 py-1 h-10">
              {props.managerNote}
            </div>
          </div>

          {/* <div className="flex flex-row justify-evenly mt-2">
            <button
              className="rounded-lg w-24 bg-success-dark hover:bg-success text-center text-white font-semibold h-7"
              //   onClick={accept}
            >
              <i className="fa-solid fa-check font-bold"></i>
            </button>
            <button
              className="rounded-lg w-24 bg-error-dark hover:bg-error text-center text-white font-semibold h-7"
              //   onClick={reject}
            >
              <i className="fa-solid fa-xmark font-bold"></i>
            </button>
          </div> */}
          <div className="text-center my-3">
            {props.status==="Accepted"?
            <p className="text-success font-bold">
              <span className="text-white font-bold text-lg">Status - </span>{" "}
              {props.status}<span className="text-white"> By Manager</span>
            </p>
            :props.status==='Rejected'?
            <p className="text-error font-bold">
            <span className="text-white font-bold text-lg">Status - </span>{" "}
            {props.status}<span className="text-white"> By Manager</span>
            </p>
            :            
            <p className="text-yellow-500 font-bold">
            <span className="text-white font-bold text-lg">Status - </span>{" "}
            {props.status}<span className="text-white"> By Employee</span>
            </p>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestLeave;
