import React from "react";

function DisplayData({ userData }) {
  return (
    <>
      {
        userData.map((data) => {
          return (
            <td className="">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column w-100">
                  <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                    {data}
                  </span>
                </div>
              </div>
            </td>
          )
        })
      }
    </>
  );
}

export default DisplayData;
