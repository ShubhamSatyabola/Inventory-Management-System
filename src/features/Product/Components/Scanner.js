import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { scanQrAsync } from "../productSlice";


export function Scanner() {
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
 



  useEffect(() => {
    if (data) {
      console.log(data.quantity);
      if (!data.quantity.dispatched_quantity) {
        Generate(data);
      }
      else{
        alert("item already dipatched")
      }
    } else {
      console.log("Invalid or missing data in the scanned result.");
    }
  }, [data]);

  const handleClick = () => {
    fileRef.current.click();
  };

  async function Generate({ id, name, date, quantity }) {
    try {
      const { received_date, dispatched_date } = date;
      const { received_quantity, dispatched_quantity } = quantity;
      const parsedDate = new Date(received_date).toISOString().split("T")[0];

        dispatch(
          scanQrAsync({
            id:id,
            name: name,
            received_quantity: parseInt(received_quantity),
            dispatched_quantity: parseInt(received_quantity),
            received_date: parsedDate,
            dispatched_date: new Date().toISOString().split("T")[0],
          })
        );
      
      navigate("/");
    } catch (error) {
      console.error("Error updating QRData:", error);
    }
  }

 

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);

    try {
      const result = await QrScanner.scanImage(file);
       const jsonData = JSON.parse(result);
      setData(jsonData);
    } catch (error) {
      console.error("Error scanning image:", error);
    }
  };
  
  return (
    <div className="justify-items-center items-center">
      <div className="text-center">
        <div className="text-blue-900 text-xl font-semibold">
          Upload QR Code
        </div>
        <div className="border-black border shadow-2xl  md:w-4/6 mx-auto h-96 bg-fixed flex items-center justify-center">
          {file && (
            <img
              className="max-w-full max-h-full"
              src={URL.createObjectURL(file)}
              alt="Qrcode"
            />
          )}
        </div>
        <button
          className="bg-blue-900 text-white rounded-sm h-9 my-3 w-full md:w-4/6"
          onClick={handleClick}
        >
          Upload
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
