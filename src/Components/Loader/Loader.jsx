import React from "react";
import styles from "./Loader.module.css";
import { Circles } from "react-loader-spinner";
export default function Loader() {
  return (
    <>
      <div className="container h-screen mx-auto">
        <div className="flex justify-center items-center">
          <Circles
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    </>
  );
}
