import React from "react";

function DisplayTags({ data }) {
  return (
    <>
      {data.map((d) => {
        return <td className="min-w-125px text-center">{d}</td>;
      })}
    </>
  );
}

export default DisplayTags;
