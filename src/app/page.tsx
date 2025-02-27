"use client";

import { Container, Box, Typography, Paper } from "@mui/material";
import TopBar from "../components/TopBar";
import SearchForm from "../components/SearchForm";
import ResultsTable from "../components/ResultsTable";
import { LineAxis } from "@mui/icons-material";

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
         Pesquisa contribuinte
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
        <SearchForm />
      
        <ResultsTable />
        </Paper>
      </Container>
    </Box>
  );
}
