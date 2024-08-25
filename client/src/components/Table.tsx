/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Column } from "../types/type";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

interface TableProps {
  columns: Column[];
  data: any[];
  onEdit: (id: string) => string;
  onDelete: (id: string) => void;
  aproved?: (id: string) => void;
  rejected?: (id: string) => void;
  isLoading?: boolean;
  isErorr?: boolean;
}
const Table: React.FC<TableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  aproved,
  rejected,
  isLoading,
  isErorr,
}) => {
  const { pathname } = useLocation();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.title}
              </th>
            ))}

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {item[col.key]}
                </td>
              ))}

              {isLoading ? (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Loading...
                </td>
              ) : isErorr ? (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Error loading data.
                </td>
              ) : (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pathname !== "/admin_page/seller_req" && (
                      <Link
                        to={
                          pathname == "/admin_page/categories"
                            ? onEdit(item.categoryId)
                            : onEdit(item.id)
                        }
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        Edit
                      </Link>
                    )}
                    {pathname == "/admin_page/seller_req" && (
                      <>
                        <button
                          onClick={() => aproved && aproved(item.id)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          Approved
                        </button>
                        <button
                          onClick={() => rejected && rejected(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Rejected
                        </button>
                      </>
                    )}
                    {pathname !== "/admin_page/seller_req" && (
                      <button
                        onClick={() =>
                          pathname == "/admin_page/categories"
                            ? onDelete(item.categoryId)
                            : onDelete(item.id)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
