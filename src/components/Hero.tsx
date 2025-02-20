import { Box, Typography, Avatar } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        pt: 8,
        pb: 6,
        mt: 8,
        textAlign: "center",
      }}
    >
      <Avatar
        alt="Profile Picture"
        src="/profile-picture.jpg"
        sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        John Doe
      </Typography>
      <Typography variant="subtitle1">
        Welcome to your company search dashboard
      </Typography>
    </Box>
  );
}
