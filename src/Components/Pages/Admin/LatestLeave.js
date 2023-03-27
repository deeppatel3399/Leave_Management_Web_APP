import React from "react";

const LatestLeave = (props) => {
  return (
    <>
      <div className="bg-primary rounded-xl px-4 py-2 flex-col mr-2">
        <div className="mb-2">
          <div className="text-center text-white font-bold">{props.name}</div>

          <div className="flex flex-row justify-around my-1">
            <div className="font-bold  text-primary-dark">
              From Date:{" "}
              <span className="text-white  font-semibold">{props.from}</span>
            </div>
            <div className="font-bold  text-primary-dark">
              To Date:{" "}
              <span className="text-white  font-semibold">{props.to}</span>
            </div>
            <div className="font-bold  text-primary-dark">
              Days:{" "}
              <span className="text-white  font-semibold">{props.days}</span>
            </div>
          </div>

          <div className="font-bold ml-1 text-primary-dark p-0">
            Note:{" "}
            <p className="text-white h-4 m-0 break-words font-normal text-sm">
              {props.note}
            </p>
          </div>
        </div>

        <hr className="mb-2 rounded-lg" />
{/* 
        <div className="bg-primary-dark rounded-lg p-2">
          {disVal === false ? (
            <div>
              <p className="text-white  font-semibold">Your Note</p>
              <textarea
                className="w-full border-black rounded-md"
                value={managerNote}
                onChange={(e) => setManagerNote(e.target.value)}
              ></textarea>
            </div>
          ) : (
            <div>
              <p className="text-white  font-semibold">Your Note</p>
              <div className="w-full border-black rounded-md bg-white text-black px-3 py-1 h-10">
                {leaveData.managerNote}
              </div>
            </div>
          )}

          <div className="flex flex-row justify-evenly mt-2">
            {disVal === false ? (
              <>
                <button
                  className="rounded-lg w-24 bg-success-dark hover:bg-success text-center text-white font-semibold h-7"
                  onClick={accept}
                >
                  <i className="fa-solid fa-check font-bold"></i>
                </button>
                <button
                  className="rounded-lg w-24 bg-error-dark hover:bg-error text-center text-white font-semibold h-7"
                  onClick={reject}
                >
                  <i className="fa-solid fa-xmark font-bold"></i>
                </button>
              </>
            ) : (
              <>
                <div>
                  {leaveData.status === "Accepted" ? (
                    <p className="text-success font-semibold">
                      <span className="text-white font-bold text-base">
                        Status -{" "}
                      </span>{" "}
                      {leaveData.status}
                    </p>
                  ) : leaveData.status === "Cencelled" ? (
                    <p className="text-error font-bold">
                      <span className="text-white font-bold text-base">
                        Status -{" "}
                      </span>
                      {leaveData.status}
                    </p>
                  ) : (
                    <p className="text-error font-bold">
                      <span className="text-white font-bold text-base">
                        Status -{" "}
                      </span>
                      {leaveData.status}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default LatestLeave;
