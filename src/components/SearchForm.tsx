"use client";

import type React from "react";
import { useState } from "react";
import InputMask from "react-input-mask";
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

interface FormData {
  cnpj: string;
  ie: string;
  isActive: boolean;
  companyType: string;
  industry: string;
  locations: string[];
}

export default function SearchForm() {
  const [formData, setFormData] = useState<FormData>({
    cnpj: "",
    ie: "",
    isActive: false,
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
    setFormData((prevData) => ({
      ...prevData,
      cnpj: event.target.value,
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
              <InputMask
                mask="99.999.999/9999-99"
                value={formData.cnpj}
                onChange={handleCnpjChange}
                maskChar="_"
              >
                {() => (
                  <TextField
                    fullWidth
                    id="cnpj"
                    name="cnpj"
                    label="CNPJ"
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
            </Grid>
            <Grid item xs={12}>
              
            <Box display="flex" justifyContent="flex-end">
             <Button type="submit" variant="outlined" color="primary">
                Limpar
              </Button>
              <Button style={{marginLeft: '5px'}} type="submit" variant="contained" color="primary">
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
