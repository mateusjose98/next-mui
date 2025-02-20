"use client";

import { Container, Box, Typography } from "@mui/material";
import TopBar from "../components/TopBar";
import SearchForm from "../components/SearchForm";
import ResultsTable from "../components/ResultsTable";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          mt: { xs: 8, sm: 9 }, // Increased top margin
          mb: 4,
          pt: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          color="textPrimary"
          sx={{ fontWeight: "bold", mb: 3, mt: 2 }}
        >
          Consulta de empresa
        </Typography>
        <SearchForm />
        <ResultsTable />
      </Container>
    </Box>
  );
}
