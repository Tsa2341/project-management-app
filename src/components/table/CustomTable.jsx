import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import Loading from "../Loading"
import CustomTableHead from "./CustomTableHead"
import TableInput from "../TableInput"
import clsx from "clsx"

const CustomTableMain = ({
  name = "data",
  searchText,
  handleClick,
  data,
  rows
}) => {
  const [filteredData, setFilteredData] = useState(data)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState({
    direction: "asc",
    id: null
  })

  function handleRequestSort(event, property) {
    const id = property
    let direction = "desc"

    if (order.id === property && order.direction === "desc") {
      direction = "asc"
    }

    setOrder({
      direction,
      id
    })
  }

  useEffect(() => {
    if (searchText.length !== 0) {
      setFilteredData(
        _.filter(data, (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
      )
      setPage(0)
    } else {
      setFilteredData(data)
    }
  }, [data, searchText])

  function handleChangePage(event, value) {
    setPage(value)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value)
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loading />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <Box className="flex flex-1 items-center justify-center p-20">
        <Typography color="text.secondary" variant="h5">
          There are no {name}!
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Box className="w-full overflow-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CustomTableHead
            rows={rows}
            order={order}
            onRequestSort={handleRequestSort}
            rowCount={filteredData.length}
          />

          <TableBody>
            {_.orderBy(
              filteredData,
              [
                (o) => {
                  switch (order.id) {
                    // case "categories": {
                    //   return o.categories[0]
                    // }
                    default: {
                      return o[order.id]
                    }
                  }
                }
              ],
              [order.direction]
            ).map((n) => {
              return (
                <TableRow
                  className="h-72 cursor-pointer"
                  hover
                  tabIndex={-1}
                  key={n.id}
                  onClick={(event) => handleClick(n, event)}
                >
                  <TableCell
                    key="-"
                    className="p-4 md:p-16"
                    component="th"
                    scope="row"
                  />
                  {rows.map((row) => (
                    <TableCell
                      key={row.id}
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align={row.align}
                      {...(row.disablePadding && { padding: "none" })}
                    >
                      {row.format ? row.format(n[row.id], n) : n[row.id]}
                    </TableCell>
                  ))}
                  <TableCell
                    key="--"
                    className="p-4 md:p-16"
                    component="th"
                    scope="row"
                  />
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        className="shrink-0 border-t-1 py-10 px-10"
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

const CustomTable = ({
  title,
  handleClick,
  data,
  rows,
  name,
  className,
  ...props
}) => {
  const [searchText, setSearchText] = useState("")

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <Paper className={clsx(className)} {...props}>
      <Stack
        gap={2}
        className="flex flex-col sm:flex-row justify-between items-center p-20"
      >
        <Box>
          <Typography
            className="text-2xl font-extrabold "
            color="text.secondary"
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <TableInput {...{ searchText, handleChange }} />
        </Box>
      </Stack>

      <CustomTableMain {...{ searchText, name, handleClick, data, rows }} />
    </Paper>
  )
}

export default CustomTable
