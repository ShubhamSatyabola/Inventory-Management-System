
import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import QRCode from "qrcode";
import { Link, useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { deleteProductAsync, selectComponent} from "../productSlice";
import { selectLoggedInUser } from "../../auth/authSlice";



export function Dashboard(){
  const [qrUrls, setQrUrls] = useState([]);
  const data  = useSelector(selectComponent);
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const generateQRCode = async (data) => {
    try {
      const url = await QRCode.toDataURL(data, {
        margin: 5,
        width: 300,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      return url;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  
  useEffect(() => {
    const generateQRCodesForItems = async () => {
      const promises = data.map(async (item) => {
        const qrUrl = await generateQRCode(JSON.stringify(item));
        return qrUrl;
      });

      const qrUrls = await Promise.all(promises);
      setQrUrls(qrUrls);

    };
    generateQRCodesForItems()

  }, [data]);
  
 
  const handleDelete = async (id) => {
    dispatch(deleteProductAsync(id))
  };

  return (
    <div className="border border-blue-900 rounded-sm mx-4 sm:mx-8 lg:mx-14">
      <div className="grid grid-cols-1 lg:grid-cols-7 font-medium text-blue-900 text-base py-6 sm:py-8 lg:py-10 justify-items-center text-nowrap">
        <div className="hidden lg:text-wrap text-ellipsis lg:text-center lg:block lg:col-span-1">
          Name
        </div>
        <div className="hidden lg:text-wrap text-ellipsis lg:text-center lg:block lg:col-span-1">
          Data Received/Quantity
        </div>
        <div className="hidden lg:text-wrap text-ellipsis lg:text-center lg:block lg:col-span-1">
          Data Dispatched/Quantity
        </div>
        <div className="hidden lg:text-wrap text-ellipsis lg:text-center lg:block lg:col-span-1">
          Pending Items
        </div>
        <div className="hidden lg:text-wrap text-ellipsis lg:text-center lg:block lg:col-span-1">
          Status
        </div>
        <div className="hidden lg:text-wrap text-ellipsis lg:text-center lg:block lg:col-span-1">
          QR Code (Click to download)
        </div>
        <div className="hidden lg:text-wrap text-ellipsis lg:text-center lg:block lg:col-span-1">
          Admin Panel
        </div>
      </div>
      <div>
        { data.map((item, index) => (
              <div
                key={item.id}
                className=" lg:grid lg:grid-cols-7 lg:justify-center lg:items-center flex flex-col justify-items-center text-nowrap items-baseline m-2 mb-10 "
              >
                <div className="flex  items-center justify-center">
                  <div className="sm-item-label  font-medium text-lg lg:hidden">
                    Name:
                  </div>
                  <div className="lg:col-span-1">{item.name}</div>
                </div>

                <div className="flex  items-center justify-center">
                  <div className="sm-item-label flex font-medium text-lg lg:hidden">
                    Data Received/Quantity :{" "}
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    {item.date.received_date
                      ? new Date(item.date.received_date)
                          .toISOString()
                          .split("T")[0]
                      : "N/A"}
                    /{item.quantity.received_quantity}
                  </div>
                </div>

                <div className="flex  items-center justify-center">
                  <div className="sm-item-label flex font-medium text-lg lg:hidden">
                    Data Dispatched/Quantity :{" "}
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    {item.date.dispatched_date
                      ? new Date(item.date.dispatched_date)
                          .toISOString()
                          .split("T")[0]
                      : "-----------"}
                    /{item.quantity.dispatched_quantity}
                  </div>
                </div>

                <div className="flex  items-center justify-center">
                  <div className="sm-item-label flex font-medium text-lg lg:hidden">
                    Pending Items :{" "}
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    {item.quantity.received_quantity -
                      item.quantity.dispatched_quantity}
                  </div>
                </div>

                <div div className="flex  items-center justify-center">
                  <div className="sm-item-label flex font-medium text-lg lg:hidden">
                    Status :{" "}
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    {item.quantity.received_quantity -
                      item.quantity.dispatched_quantity ===
                    0
                      ? "Dispatched"
                      : "Pending"}
                  </div>
                </div>

                <div className="flex items-center justify-center ">
                  <div className="sm-item-label flex font-medium text-lg lg:hidden">
                    QR Code (Click to download) :{" "}
                  </div>
                  <div className=" lg:col-span-1 text-center">
                    {qrUrls[index] && (
                      <a
                        href={qrUrls[index]}
                        download={item.id}
                        className="inline-block"
                      >
                        <img
                          src={qrUrls[index]}
                          alt="QR Code"
                          className="mx-auto"
                        />
                      </a>
                    )}
                  </div>
                </div>

                <div div className="flex items-center justify-center">
                  <div className="sm-item-label flex font-medium text-lg lg:hidden">
                    Admin :{" "}
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1 flex text-2xl">
                    <Link to={`/edit/${item.id}`}>
                      <MdEdit className="cursor-pointer m-3" />
                    </Link>
                    {user ? (
                      <MdDelete
                        onClick={() => handleDelete(item.id)}
                        className="cursor-pointer m-3"
                      />
                    ) : (
                      <MdDelete
                        onClick={() => navigate("/login")}
                        className="cursor-pointer m-3"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
