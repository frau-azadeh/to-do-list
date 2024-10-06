import React from 'react';

interface AssignedToFilterProps {
  assignedFilter: string[];
  setAssignedFilter: React.Dispatch<React.SetStateAction<string[]>>;
  assignedToList: string[];
}

const AssignedToFilter: React.FC<AssignedToFilterProps> = ({
  assignedFilter,
  setAssignedFilter,
  assignedToList,
}) => {
  const handleAssignedFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAssignedFilter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2">Filter by Assigned To:</h2>
      {assignedToList.map((assignedTo) => (
        <div key={assignedTo}>
          <label>
            <input
              type="checkbox"
              value={assignedTo}
              onChange={handleAssignedFilterChange}
              checked={assignedFilter.includes(assignedTo)}
              className="mr-2"
            />
            {assignedTo}
          </label>
        </div>
      ))}
    </div>
  );
};

export default AssignedToFilter;