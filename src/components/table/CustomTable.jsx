import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@mui/material"
import _ from "lodash"
import React, { useState } from "react"
import Loading from "../Loading"
import CustomTableHead from "./CustomTableHead"

const CustomTable = ({ name = "data", handleClick, data, rows }) => {
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

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <Box className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no {name}!
        </Typography>
      </Box>
    )
  }

  return (
    <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
      <CustomTableHead
        rows={rows}
        order={order}
        onRequestSort={handleRequestSort}
        rowCount={data.length}
      />

      <TableBody>
        {_.orderBy(
          data,
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
  )
}

export default CustomTable
