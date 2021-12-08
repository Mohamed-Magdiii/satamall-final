import React from "react";

function DisplayTags({ data }) {
  return (
    <>
      {data.map((d,i) => {
        return <td key={i} className="min-w-125px text-center">{d}</td>;
      })}
    </>
  );
}

export default DisplayTags;
