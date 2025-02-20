import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        py: 1,
      }}
    >
      <Toolbar>
        {/* Logo com altura reduzida */}
        <Image
          src="https://www.fazenda.mg.gov.br/export/system/modules/org.fazenda.mg.gov.br/resources/img/logo2.png"
          alt="Logo"
          width={100}
          height={34} // Altura reduzida em 15%
          style={{ marginRight: "16px" }}
        />

        {/* Botões centralizados */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            gap: 2, // Espaço entre botões
          }}
        >
          <Button sx={buttonStyle}>Home</Button>
          <Button sx={buttonStyle}>Search</Button>
          <Button sx={buttonStyle}>Reports</Button>

          {/* Dropdown para Settings */}
          <Button sx={buttonStyle} onClick={handleMenuOpen}>
            Settings ▼
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: 1 }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>

        {/* Usuário com Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            alt="John Doe"
            src="/path/to/avatar.jpg"
            sx={{ width: 32, height: 32 }}
          />
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: 500, color: "black" }}
          >
            John Doe
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Estilo dos botões
const buttonStyle = {
  color: "primary.main",
  fontWeight: 300,
  textTransform: "none",
  "&:hover": {
    bgcolor: "rgba(0, 0, 0, 0.05)",
    transition: "0.3s",
  },
};
