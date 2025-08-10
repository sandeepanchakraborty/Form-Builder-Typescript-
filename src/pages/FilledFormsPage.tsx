import React, { useEffect, useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";

interface FilledForm {
  id: string;
  formName: string;
  filledData: Record<string, any>;
  fields: { id: string; label: string }[];
  filledAt: string;
}

const FilledFormsPage: React.FC = () => {
  const [filledForms, setFilledForms] = useState<FilledForm[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("filledForms");
    if (data) {
      let forms: FilledForm[] = JSON.parse(data);
      // Patch legacy entries missing fields[]
      const allFormDefs = JSON.parse(
        localStorage.getItem("upliance_forms") || "[]"
      );
      forms = forms.map((entry) => {
        if (!entry.fields || !Array.isArray(entry.fields)) {
          // Try to find the form definition by formId
          const def = allFormDefs.find((f: any) => f.id === entry.formId);
          if (def && def.fields) {
            return {
              ...entry,
              fields: def.fields.map((f: any) => ({
                id: f.id,
                label: f.label,
              })),
            };
          }
        }
        return entry;
      });
      setFilledForms(forms);
    }
  }, []);

  return (
    <AnimatedPage style={{ paddingTop: 48, paddingBottom: 24 }}>
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 950,
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
          fontWeight={900}
          gutterBottom
          sx={{
            color: "#ffe600",
            textShadow: "0 2px 16px #000, 0 1px 0 #ffe600",
            letterSpacing: 2,
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
            Submitted Forms
          </span>
        </Typography>
        {filledForms.length === 0 ? (
          <Typography
            color="#ffe600"
            textAlign="center"
            sx={{ mt: 6, fontSize: 24, fontWeight: 600, letterSpacing: 1 }}
          >
            No forms have been filled yet.
          </Typography>
        ) : (
          <Stack spacing={5} sx={{ mt: 2 }}>
            {filledForms.map((entry) => (
              <Paper
                key={entry.id}
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 4 },
                  borderRadius: 4,
                  bgcolor: "#ffe600",
                  boxShadow: "0 4px 24px 0 rgba(255, 230, 0, 0.25)",
                  border: "1.5px solid #fff700",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.025)",
                    boxShadow: "0 8px 32px 0 rgba(255, 230, 0, 0.45)",
                  },
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{
                      color: "#111",
                      letterSpacing: 1,
                      fontFamily: "Inter, Roboto, Arial",
                    }}
                  >
                    {entry.formName}
                  </Typography>
                  <Chip
                    label={new Date(entry.filledAt).toLocaleString()}
                    size="medium"
                    sx={{
                      bgcolor: "#111",
                      color: "#ffe600",
                      fontWeight: 700,
                      fontSize: 16,
                      px: 2,
                      letterSpacing: 1,
                    }}
                  />
                </Stack>
                <Divider sx={{ my: 2, borderColor: "#fff700" }} />
                <List>
                  {entry.fields && Array.isArray(entry.fields)
                    ? entry.fields.map((field) => {
                        const value = entry.filledData[field.id];
                        return (
                          <ListItem
                            key={field.id}
                            disablePadding
                            sx={{ mb: 1 }}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  fontWeight={700}
                                  sx={{ color: "#111", fontSize: 18 }}
                                >
                                  {field.label || field.id}
                                </Typography>
                              }
                              secondary={
                                <span
                                  style={{
                                    color: "#333",
                                    fontWeight: 500,
                                    fontSize: 16,
                                  }}
                                >
                                  {Array.isArray(value)
                                    ? value.join(", ")
                                    : typeof value === "boolean"
                                    ? value
                                      ? "Yes"
                                      : "No"
                                    : value?.toString() ?? ""}
                                </span>
                              }
                            />
                          </ListItem>
                        );
                      })
                    : Object.entries(entry.filledData).map(([id, value]) => (
                        <ListItem key={id} disablePadding sx={{ mb: 1 }}>
                          <ListItemText
                            primary={
                              <Typography
                                fontWeight={700}
                                sx={{ color: "#111", fontSize: 18 }}
                              >
                                {id}
                              </Typography>
                            }
                            secondary={
                              <span
                                style={{
                                  color: "#333",
                                  fontWeight: 500,
                                  fontSize: 16,
                                }}
                              >
                                {Array.isArray(value)
                                  ? value.join(", ")
                                  : typeof value === "boolean"
                                  ? value
                                    ? "Yes"
                                    : "No"
                                  : value?.toString() ?? ""}
                              </span>
                            }
                          />
                        </ListItem>
                      ))}
                </List>
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>
    </AnimatedPage>
  );
};

export default FilledFormsPage;
