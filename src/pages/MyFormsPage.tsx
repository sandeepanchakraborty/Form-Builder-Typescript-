import React, { useEffect, useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { Box, Typography, Paper, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { FormSchema } from "../redux/formSlice";

const MyFormsPage = () => {
  const [forms, setForms] = useState<FormSchema[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("upliance_forms") || "[]");
    setForms(saved);
  }, []);

  const handlePreview = (form: FormSchema) => {
    navigate(`/preview`, { state: { form } });
  };

  return (
    <AnimatedPage style={{ paddingTop: 48, paddingBottom: 24 }}>
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 900,
          p: { xs: 2, sm: 5 },
          borderRadius: 6,
          boxShadow: "0 8px 32px 0 rgba(255, 255, 0, 0.25)",
          mb: 4,
          bgcolor: "rgba(255,255,0,0.15)",
          backdropFilter: "blur(8px)",
          border: "2px solid #ffe600",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 900,
            letterSpacing: 2,
            color: "#ffe600",
            textShadow: "0 2px 16px #000, 0 1px 0 #ffe600",
            textAlign: "center",
            mb: 4,
            fontFamily: "Inter, Roboto, Arial",
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #ffe600 60%, #fff700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 900,
            }}
          >
            My Forms
          </span>
        </Typography>
        {forms.length === 0 ? (
          <Typography
            color="#ffe600"
            textAlign="center"
            sx={{ mt: 6, fontSize: 22, fontWeight: 600 }}
          >
            No forms saved yet.
          </Typography>
        ) : (
          <Stack spacing={4} sx={{ mt: 2 }}>
            {forms.map((form) => (
              <Paper
                key={form.id}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "#ffe600",
                  boxShadow: "0 4px 24px 0 rgba(255, 230, 0, 0.25)",
                  border: "1.5px solid #fff700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.025)",
                    boxShadow: "0 8px 32px 0 rgba(255, 230, 0, 0.45)",
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: "#111", letterSpacing: 1 }}
                  >
                    {form.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#333", fontWeight: 500 }}
                  >
                    Created: {new Date(form.createdAt).toLocaleString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#333", fontWeight: 500 }}
                  >
                    {form.fields.length} field
                    {form.fields.length !== 1 ? "s" : ""}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      fontWeight: 700,
                      px: 4,
                      borderRadius: 2,
                      bgcolor: "#111",
                      color: "#ffe600",
                      "&:hover": { bgcolor: "#222", color: "#ffe600" },
                    }}
                    onClick={() => handlePreview(form)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      fontWeight: 700,
                      px: 4,
                      borderRadius: 2,
                      borderColor: "#111",
                      color: "#111",
                      bgcolor: "#ffe600",
                      "&:hover": { bgcolor: "#fff700", borderColor: "#111" },
                    }}
                    onClick={() => navigate(`/fill/${form.id}`)}
                  >
                    Fill
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>
    </AnimatedPage>
  );
};

export default MyFormsPage;
