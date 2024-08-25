/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Column } from "../../../types/type";
import useSocket from "../../../hooks/useSocket";
import Table from "../../../components/Table";
import {
  useGetAllSellerReqQuery,
  useUpdateSellerReqMutation,
} from "../../../features/seller_req/api/seller_reqSlice";
import { toast } from "react-toastify";

const Seller_req_page = () => {
  const socket = useSocket();
  const [requests, setRequests] = useState<any[]>([]);
  const [updateSellerReq] = useUpdateSellerReqMutation();
  const { isLoading, isError, data } = useGetAllSellerReqQuery();

  useEffect(() => {
    if (socket) {
      socket.on("newSellerRequest", (newRequest) => {
        setRequests((prevRequests) => [newRequest, ...prevRequests]);
      });

      return () => {
        socket.off("newSellerRequest");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (data) {
      setRequests(data.requests.filter((req) => req.status === "pending"));
    }
  }, [data]);

  const handleApprove = async (id: string) => {
    const res = await updateSellerReq({ id, status: "approved" });
    res.data && toast.success(res.data.message);
  };

  const handleReject = async (id: string) => {
    const res = await updateSellerReq({ id, status: "rejected" });
    res.data && toast.success(res.data.message);
  };

  const columns: Column[] = [
    { key: "id", title: "ID request" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
  ];

  return (
    <div className="p-4">
      <Table
        columns={columns}
        data={requests}
        aproved={handleApprove}
        rejected={handleReject}
        onEdit={() => ""}
        onDelete={() => ""}
        isLoading={isLoading}
        isErorr={isError}
      />
    </div>
  );
};

export default Seller_req_page;
