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
  Icon,
} from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";

interface Company {
  id: number;
  nome: string;
  inscricao: string;
  quantidade: string;
}

const dummyData: Company[] = [
  {
    id: 132132,
    nome: "Sefaz soluções LTDA",
    inscricao: "23123123222",
    quantidade: "7",
  },
  {
    id: 44441,
    nome: "Sefaz soluções LTDA",
    inscricao: "23123123222",
    quantidade: "7",
  },
  {
    id: 555551,
    nome: "Sefaz soluções LTDA",
    inscricao: "23123123222",
    quantidade: "7",
  },
  {
    id: 66661,
    nome: "Sefaz soluções LTDA",
    inscricao: "23123123222",
    quantidade: "7",
  },

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
    <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Identificador</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Inscrição estadual</TableCell>
                <TableCell>Qte. filiais</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((company) => (
                  <TableRow key={company.id}>
                    <TableCell component="th" scope="row">
                      {company.id}
                    </TableCell>
                    <TableCell>{company.nome}</TableCell>
                    <TableCell>{company.inscricao}</TableCell>
                    <TableCell>{company.quantidade}</TableCell>
                    <TableCell>
                     <RemoveRedEye />
                    </TableCell>
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
      </>
  );
}
