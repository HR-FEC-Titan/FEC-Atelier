import React, { useMemo } from 'react';
import { useTable } from 'react-table';

import '../../../dist/comparisonTable.css'

const ComparisonTable = (props) => {
  var mainProdName = props.mainProdData.name;
  var relatedProdName = props.comparedProdName;

  const tableColumns = [
    {
      Header: 'Current Product Value',
      accessor: 'mainProdValue'
    },
    {
      Header: 'Characteristic',
      accessor: 'value'
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
        <th>{mainProdName}</th>
        <th>Characteristic</th>
        <th>{relatedProdName}</th>
      </thead>
      <tbody { ...getTableBodyProps() } >
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr { ...row.getRowProps() } >
              {row.cells.map((cell) => {
                return (
                  <td { ...cell.getCellProps() } style={{ textAlign: "center" }}>
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