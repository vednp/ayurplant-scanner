import React from "react";
import data from "../data";

export default function Hero() {
  return (
    <div>
      <h1 className="text-3xl p-3">Plant Records</h1>
      {data.map((plant) => {
        return (
          <div key={plant.id} className="p-3">
            <p>{plant.botanicalName}</p>
            <a
              href={`https://ayurplant-scanner.vercel.app/plant/${plant.id}`}
              className="text-blue-500 underline"
            >
              {" "}
              See Details
            </a>
          </div>
        );
      })}
    </div>
  );
}
