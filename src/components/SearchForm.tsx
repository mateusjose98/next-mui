"use client";
import ClearIcon from '@mui/icons-material/Clear';
import type React from "react";
import { useState } from "react";
import InputMask from "react-input-mask";
import SearchIcon from '@mui/icons-material/Search';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { Search } from "@mui/icons-material";

interface FormData {
  cnpj: string;
  ie: string;
  isActive: boolean;
  buscarNucleoIe: boolean;
  companyType: string;
  industry: string;
  locations: string[];
}

export default function SearchForm() {
  const [formData, setFormData] = useState<FormData>({
    cnpj: "",
    ie: "",
    isActive: false,
    buscarNucleoIe: false,
    companyType: "",
    industry: "",
    locations: [],
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const handleCpfCnpjChange = (event) => {
      // Get only the numbers from the data input
      let data = event.target.value.replace(/\D/g, "");
      // Checking data length to define if it is cpf or cnpj
      if (data.length > 11) {
        // It's cnpj
        let cnpj = `${data.substr(0, 2)}.${data.substr(2, 3)}.${data.substr(
          5,
          3
        )}/`;
        if (data.length > 12) {
          cnpj += `${data.substr(8, 4)}-${data.substr(12, 2)}`;
        } else {
          cnpj += data.substr(8);
        }
        data = cnpj;
      } else {
        // It's cpf
        let cpf = "";
        let parts = Math.ceil(data.length / 3);
        for (let i = 0; i < parts; i++) {
          if (i === 3) {
            cpf += `-${data.substr(i * 3)}`;
            break;
          }
          cpf += `${i !== 0 ? "." : ""}${data.substr(i * 3, 3)}`;
        }
        data = cpf;
      }
      return data;
    };
    const valor = handleCpfCnpjChange(event);
    setFormData((prevData) => ({
      ...prevData,
      cnpj: valor,
    }));
  };

  const handleMultiSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenDialog(true);
  };

  return (
<>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ m: 2 }}
        >
          <Grid container spacing={2}>
           
            <Grid item xs={6}>
            <TextField
                value={formData.cnpj}
                onChange={(value) => handleCnpjChange(value)}
                id="cpfCnpj"
                label="CNPJ/CPF"
                defaultValue={''}
                fullWidth
      />
            </Grid>

            <Grid item xs={6}>
              <InputMask
                mask="99.999.999/9999-99"
                value={formData.ie}
                onChange={handleCnpjChange}
                maskChar="_"
              >
                {() => (
                  <TextField
                    fullWidth
                    id="ie"
                    name="ie"
                    label="Inscrição Estadual"
                    variant="outlined"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isActive}
                    onChange={handleChange}
                    name="isActive"
                  />
                }
                label="Buscar por núcleo CNPJ"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.buscarNucleoIe}
                    onChange={handleChange}
                    name="buscarNucleoIe"
                  />
                }
                label="Buscar por núcleo IE"
              />
            </Grid>
            
            
          
           
            {/* <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="locations-label">Situação</InputLabel>
                <Select
                  labelId="locations-label"
                  id="locations"
                  name="locations"
                  multiple
                  value={formData.locations}
                  onChange={handleMultiSelectChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Locations"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.1 }}>
                      {(selected as string[]).map((value) => (
                        <Chip style={{ height: 20 }} key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="Todos">Todos</MenuItem>
                  <MenuItem value="Inativa">Inativa</MenuItem>
                  <MenuItem value="Ativa">Ativa</MenuItem>
                  <MenuItem value="Homlogação">Homlogação</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12}>
              
            <Box display="flex" justifyContent="flex-end">
             <Button startIcon={<ClearIcon />} type="submit" variant="outlined" color="primary">
                Limpar
              </Button>
              <Button startIcon={<SearchIcon />} style={{marginLeft: '5px'}} type="submit" variant="contained" color="primary">
                Pesquisar
              </Button>
            </Box>
             
            </Grid>
          </Grid>
        </Box>
     

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Search Parameters</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Company Name: {formData.companyName}
          </Typography>
          <Typography variant="body1">CNPJ: {formData.cnpj}</Typography>
          <Typography variant="body1">
            Date From: {formData.dateFrom}
          </Typography>
          <Typography variant="body1">Date To: {formData.dateTo}</Typography>
          <Typography variant="body1">
            Active Companies Only: {formData.isActive ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1">
            Company Type: {formData.companyType}
          </Typography>
          <Typography variant="body1">Industry: {formData.industry}</Typography>
          <Typography variant="body1">
            Locations: {formData.locations.join(", ")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}
