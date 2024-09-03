import ReactPaginate from "react-paginate";
import { Product } from "../types/type";

type Props = {
  itemsPerPage: number;
  data: Product[];
  setPage: (page: number) => void;
};

const Pagination = ({ itemsPerPage, data, setPage }: Props) => {
  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        previousLabel="Previous"
        onPageChange={(e) => {
          setPage(e.selected + 1);
        }}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        containerClassName="flex justify-center items-center space-x-2 mt-8"
        pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200"
        activeClassName="bg-blue-400 rounded-full"
        previousLinkClassName="w-24 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200"
        nextLinkClassName="w-24 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200"
        breakLinkClassName="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
      />
    </>
  );
};

export default Pagination;
