import { useStatsService } from '../services/useStatsService'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import { useMemo } from 'react'
import { DefaultColumnFilter } from '../components/DefaultColumnFilter'
import { fuzzyTextFilterFn } from '../functions'
import { useCookies } from 'react-cookie'
import { signoutRequested } from '../redux/user/actions'
import { useDispatch } from 'react-redux'

let statistics = []

export const Table = () => {
  const [, , removeCooke] = useCookies()
  const dispatch = useDispatch()
  const { stats } = useStatsService()

  if (!stats.loading) {
    statistics = stats.data.map(({ statistic, name, id }) => ({
      id,
      country: JSON.parse(name)?.en,
      confirmed: statistic?.confirmed,
      recovered: statistic?.recovered,
      death: statistic?.death,
      updated: statistic?.created_at
    }))
  }
  // eslint-disable-next-line
  const data = useMemo(() => statistics, [stats])

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Country',
        accessor: 'country'
      },
      {
        Header: 'Confirmed',
        accessor: 'confirmed'
      },
      {
        Header: 'Recovered',
        accessor: 'recovered'
      },
      {
        Header: 'Death',
        accessor: 'death'
      },
      {
        Header: 'Updated At',
        accessor: 'updated'
      }
    ],
    []
  )

  fuzzyTextFilterFn.autoRemove = val => !val

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      }
    }),
    []
  )

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        filterTypes
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    )

  const handleLogout = () => {
    removeCooke('authToken')
    dispatch(signoutRequested())
  }

  return (
    <div>
      <span style={{ color: 'red', cursor: 'pointer' }} onClick={handleLogout}>
        Logout
      </span>
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip'
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
