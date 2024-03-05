import React from "react";

export default function Photos_column(props: { photos: JSX.Element[] }) {
  return <div className="flex flex-col p-2">{props.photos}</div>;
}
