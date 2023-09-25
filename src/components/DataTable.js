
import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';


function DataTable({ data }) {
    // Define columns configuration

    const columns = useMemo(
      () => [
        {
          Header: 'ID',
          accessor: 'serialNumber', // Use an accessor that does not exist in your data
            Cell: ({ row }) => row.index + 1,
        },
        {
            Header: 'Client Name',
            accessor: 'name',
        },
        {
            Header: 'Contact No',
            accessor: 'mobileNumber',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Location',
            accessor: 'city',
        },  
        {
          Header: 'Username',
          accessor: 'username',
            },
        {
            Header: 'Password',
            accessor: 'password',
        },
      ],
      []
    );
  
    // Use the useTable hook to create the table instance
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
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
        initialState: { pageIndex: 0, pageSize: 10 },
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
  
  export default DataTable;
  