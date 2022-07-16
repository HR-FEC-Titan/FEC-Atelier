import React, { useMemo } from 'react';
import { useTable } from 'react-table';

import '../../../dist/comparisonTable.css'

const ComparisonTable = (props) => {
  var mainProdName = props.mainProdData.name;
  var relatedProdName = '';

  const tableColumns = [
    {
      Header: 'Current Product Value',
      accessor: 'value'
    },
    {
      Header: 'Characteristic',
      accessor: 'feature'
    },
    {
      Header: 'Compared Product Value',
      accessor: 'relatedProdvalue'
    }
  ];

  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => props.tableData);

  const tableInstance = useTable({
    columns: columns,
    data: data
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <table { ...getTableProps() } >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr { ...headerGroup.getHeaderGroupProps() } >
            {headerGroup.headers.map(column => (
              <th { ...column.getHeaderProps() } >
                { column.render('Header') }
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody { ...getTableBodyProps() } >
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr { ...row.getRowProps() } >
              {row.cells.map((cell) => {
                return (
                  <td { ...cell.getCellProps() } >
                    { cell.render('Cell') }
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ComparisonTable;