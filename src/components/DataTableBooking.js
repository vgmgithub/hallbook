import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import Swal from 'sweetalert2'

function DataTableBooking({ data }) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    // Define columns configuration
    const formatDate = (dateString) => {
      // Parse the date string into a Date object
      const date = new Date(dateString);
      
      // Format the date as dd-mm-yyyy
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${
        (date.getMonth() + 1).toString().padStart(2, '0') // Months are 0-indexed, so we add 1
      }-${date.getFullYear()}`;
  
      return formattedDate;
  };
  const navigate = useNavigate();
  const handleDelete = async(data) => {
    // Handle edit action with _id here
    const venueId = data.original._id;
    console.log('Delete', data.original._id);
    try {
      // Send a DELETE request to the server to delete the venue by ID
      const response = await fetch(`${BASE_URL}:5000/api/venues/${venueId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Venue was deleted successfully
        console.log('Venue deleted successfully');
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        navigate('/home');
        // Refresh the list of venues or update the UI as needed
      } else {
        // Handle errors or show error messages to the user
        console.error('Error deleting venue:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function confirm(row) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
       
        console.log('Delete confirm', row.original._id);
        handleDelete(row);
      }
    })
  }
    const columns = useMemo(
      () => [
        {
          Header: 'ID',
          accessor: 'serialNumber', // Use an accessor that does not exist in your data
            Cell: ({ row }) => row.index + 1,
        },
        {
            Header: 'Venue Name',
            accessor: 'venue_name',
        },
        {
            Header: 'Location',
            accessor: 'venue_location',
        },
        {
            Header: 'Booking Dates',
            accessor: (row) => `${formatDate(row.booking_date)}`,
            // Cell: ({ value }) => formatDate(value)
        },
        // {
        //     Header: 'Facility',
        //     accessor: 'facilities',
        // },  
        {
          Header: 'Booked By',
          accessor: 'user_name',
            },
        {
            Header: 'Booked On',
            accessor: 'booked_on',
        },
  
      ],
      []
    );
   
    // Use the useTable hook to create the table instance
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      state,
      setGlobalFilter,
      page,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
    } = useTable(
      {
        columns,
        data, // Pass the data retrieved from the API
        initialState: { pageIndex: 0, pageSize: 5 },
      },
      useGlobalFilter, // Enable global filtering
      useSortBy, // Enable sorting
      usePagination // Enable pagination
    );
  
    const { globalFilter, pageIndex } = state;
  
    // Render the table
    return (
      <div>
        <input
          type="text"
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button  className='btn btn-primary' onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button> &nbsp;&nbsp;
          <button className='btn btn-primary' onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>&nbsp;&nbsp;
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {page.length}
            </strong>{' '}
          </span>
        </div>
      </div>
    );
  }
  

  export default DataTableBooking;
  