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
  companyName: string;
  cnpj: string;
  dateFrom: string;
  dateTo: string;
  isActive: boolean;
  companyType: string;
  industry: string;
  locations: string[];
}

export default function SearchForm() {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    cnpj: "",
    dateFrom: "",
    dateTo: "",
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
    <Card sx={{ mb: 4 }}>
      <CardHeader
        title="Company Search"
        titleTypographyProps={{ variant: "h5" }}
        sx={{ backgroundColor: "secondary.main", color: "text.primary" }}
      />
      <CardContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="company-name"
                name="companyName"
                label="Search for a company"
                variant="outlined"
                value={formData.companyName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
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
              <TextField
                fullWidth
                id="date-from"
                name="dateFrom"
                label="Date From"
                type="date"
                value={formData.dateFrom}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="date-to"
                name="dateTo"
                label="Date To"
                type="date"
                value={formData.dateTo}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isActive}
                    onChange={handleChange}
                    name="isActive"
                  />
                }
                label="Active Companies Only"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="company-type"
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="public"
                    control={<Radio />}
                    label="Public"
                  />
                  <FormControlLabel
                    value="private"
                    control={<Radio />}
                    label="Private"
                  />
                  <FormControlLabel
                    value="both"
                    control={<Radio />}
                    label="Both"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="industry-label">Industry</InputLabel>
                <Select
                  labelId="industry-label"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  label="Industry"
                  onChange={handleChange}
                >
                  <MenuItem value="tech">Technology</MenuItem>
                  <MenuItem value="finance">Finance</MenuItem>
                  <MenuItem value="healthcare">Healthcare</MenuItem>
                  <MenuItem value="retail">Retail</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="locations-label">Locations</InputLabel>
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
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="usa">USA</MenuItem>
                  <MenuItem value="europe">Europe</MenuItem>
                  <MenuItem value="asia">Asia</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>

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
    </Card>
  );
}
