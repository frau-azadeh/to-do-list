interface PaginationProps {
  currentPage: number;
  totalTasks: number;
  tasksPerPage: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalTasks,
  tasksPerPage,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handlePrevPage}
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {Math.ceil(totalTasks / tasksPerPage)}
      </span>
      <button
        onClick={handleNextPage}
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
        disabled={currentPage === Math.ceil(totalTasks / tasksPerPage)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;