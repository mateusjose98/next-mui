"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CardHeader,
} from "@mui/material";

interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
}

const dummyData: Company[] = [
  {
    id: 1,
    name: "Tech Corp",
    industry: "Technology",
    location: "San Francisco",
  },
  { id: 2, name: "Green Energy Ltd", industry: "Energy", location: "London" },
  {
    id: 3,
    name: "Global Foods",
    industry: "Food & Beverage",
    location: "New York",
  },
  // Add more dummy data as needed
];

export default function ResultsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card>
      <CardHeader
        title="Search Results"
        titleTypographyProps={{ variant: "h5" }}
        sx={{ backgroundColor: "secondary.main", color: "text.primary" }}
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="company results table">
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((company) => (
                  <TableRow key={company.id}>
                    <TableCell component="th" scope="row">
                      {company.name}
                    </TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.location}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dummyData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
}
