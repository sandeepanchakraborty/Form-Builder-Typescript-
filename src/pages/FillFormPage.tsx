import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import type { FormSchema, FieldConfig } from "../redux/formSlice";

const getInitialValue = (field: FieldConfig) => {
  switch (field.type) {
    case "number":
      return field.defaultValue ?? "";
    case "checkbox":
      return [];
    default:
      return "";
  }
};

const FillFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormSchema | null>(null);
  const [values, setValues] = useState<Record<string, any>>({});
  // const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("upliance_forms") || "[]");
    const found = saved.find((f: FormSchema) => f.id === id);
    setForm(found || null);
    if (found) {
      const initial: Record<string, any> = {};
      found.fields.forEach((field: any) => {
        initial[field.id] = getInitialValue(field);
      });
      setValues(initial);
    }
  }, [id]);

  if (!form) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          width: "100vw",
          bgcolor: "#111",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            p: 5,
            borderRadius: 3,
            boxShadow: "0 2px 16px 0 rgba(255, 255, 0, 0.25)",
            border: "2px solid #ffe600",
            background: "rgba(40, 40, 10, 0.85)",
            color: "#ffe600",
            display: "inline-block",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: '#ffe600', textShadow: '1px 1px 6px #000' }}>
            Form not found.
          </Typography>
          <Button
            sx={{ mt: 2, px: 4, py: 1.5, fontWeight: 700, color: '#ffe600', borderColor: '#ffe600', background: 'rgba(0,0,0,0.2)', boxShadow: '0 1px 4px 0 #ffe60055', '&:hover': { background: '#ffe600', color: '#222', borderColor: '#ffe600' } }}
            variant="outlined"
            onClick={() => navigate("/myforms")}
          >
            Back to My Forms
          </Button>
        </Paper>
      </Box>
    );
  }

  const handleChange = (field: FieldConfig, value: any) => {
    setValues((prev) => ({ ...prev, [field.id]: value }));
  };

  const handleCheckboxChange = (field: FieldConfig, option: string) => {
    setValues((prev) => {
      const arr = Array.isArray(prev[field.id]) ? [...prev[field.id]] : [];
      if (arr.includes(option)) {
        return { ...prev, [field.id]: arr.filter((v) => v !== option) };
      } else {
        return { ...prev, [field.id]: [...arr, option] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    // Save filled form data to localStorage, including field metadata for label lookup
    const filledForms = JSON.parse(localStorage.getItem("filledForms") || "[]");
    filledForms.push({
      id: crypto.randomUUID(),
      formId: form.id,
      formName: form.name,
      filledData: values,
      fields: form.fields.map((f) => ({ id: f.id, label: f.label })),
      filledAt: new Date().toISOString(),
    });
    localStorage.setItem("filledForms", JSON.stringify(filledForms));
    navigate("/filled");
  };

  // Removed summary page. Now redirects to /filled after submit.

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        width: "100vw",
        bgcolor: "#111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        pt: 6,
        fontFamily: "Inter, Roboto, Arial",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 4,
          mb: 3,
          borderRadius: 4,
          width: "100%",
          maxWidth: 600,
          bgcolor: "rgba(20,20,20,0.92)",
          boxShadow: "0 4px 32px 0 rgba(255, 255, 0, 0.18)",
          border: "2px solid #ffe600",
          mx: "auto",
          color: "#ffe600",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, mb: 2, color: "#ffe600", letterSpacing: 1 }}
        >
          {form.name}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {form.fields.map((field) => (
              <Paper
                key={field.id}
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(34,34,34,0.95)",
                  boxShadow: "0 2px 12px 0 rgba(255, 255, 0, 0.10)",
                  border: "1.5px solid #ffe600",
                  color: "#ffe600",
                }}
              >
                <Typography fontWeight={700} sx={{ mb: 1, color: "#ffe600", fontSize: 18 }}>
                  {field.label}{" "}
                  {field.required && (
                    <span style={{ color: "#ff1744", fontWeight: 700 }}>*</span>
                  )}
                </Typography>
                {(() => {
                  switch (field.type) {
                    case "text":
                    case "date":
                      return (
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="medium"
                          value={values[field.id]}
                          onChange={(e) => handleChange(field, e.target.value)}
                          required={field.required}
                          sx={{
                            bgcolor: "#222",
                            borderRadius: 1,
                            input: { color: "#ffe600", fontWeight: 600 },
                            label: { color: "#ffe600" },
                            "& .MuiInputLabel-root": { color: "#ffe600" },
                            "& .MuiOutlinedInput-root": {
                              color: "#ffe600",
                              borderColor: "#ffe600",
                            },
                          }}
                          InputLabelProps={{ style: { color: "#ffe600" } }}
                        />
                      );
                    case "number":
                      return (
                        <TextField
                          type="number"
                          fullWidth
                          variant="outlined"
                          size="medium"
                          value={values[field.id]}
                          onChange={(e) => handleChange(field, e.target.value)}
                          required={field.required}
                          sx={{
                            bgcolor: "#222",
                            borderRadius: 1,
                            input: { color: "#ffe600", fontWeight: 600 },
                            label: { color: "#ffe600" },
                            "& .MuiInputLabel-root": { color: "#ffe600" },
                            "& .MuiOutlinedInput-root": {
                              color: "#ffe600",
                              borderColor: "#ffe600",
                            },
                          }}
                          InputLabelProps={{ style: { color: "#ffe600" } }}
                        />
                      );
                    case "textarea":
                      return (
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="medium"
                          multiline
                          minRows={3}
                          value={values[field.id]}
                          onChange={(e) => handleChange(field, e.target.value)}
                          required={field.required}
                          sx={{
                            bgcolor: "#222",
                            borderRadius: 1,
                            input: { color: "#ffe600", fontWeight: 600 },
                            label: { color: "#ffe600" },
                            "& .MuiInputLabel-root": { color: "#ffe600" },
                            "& .MuiOutlinedInput-root": {
                              color: "#ffe600",
                              borderColor: "#ffe600",
                            },
                          }}
                          InputLabelProps={{ style: { color: "#ffe600" } }}
                        />
                      );
                    case "select":
                      return (
                        <TextField
                          select
                          fullWidth
                          variant="outlined"
                          size="medium"
                          value={values[field.id]}
                          onChange={(e) => handleChange(field, e.target.value)}
                          required={field.required}
                          sx={{
                            bgcolor: "#222",
                            borderRadius: 1,
                            input: { color: "#ffe600", fontWeight: 600 },
                            label: { color: "#ffe600" },
                            "& .MuiInputLabel-root": { color: "#ffe600" },
                            "& .MuiOutlinedInput-root": {
                              color: "#ffe600",
                              borderColor: "#ffe600",
                            },
                          }}
                          InputLabelProps={{ style: { color: "#ffe600" } }}
                        >
                          {(field.options || []).map((opt, idx) => (
                            <MenuItem key={idx} value={opt} sx={{ color: "#111", fontWeight: 700 }}>
                              {opt}
                            </MenuItem>
                          ))}
                        </TextField>
                      );
                    case "radio":
                      return (
                        <Stack direction="row" spacing={2}>
                          {(field.options || []).map((opt, idx) => (
                            <FormControlLabel
                              key={idx}
                              control={
                                <Checkbox
                                  checked={values[field.id] === opt}
                                  onChange={() => handleChange(field, opt)}
                                  sx={{ color: "#ffe600" }}
                                />
                              }
                              label={<span style={{ color: "#ffe600", fontWeight: 600 }}>{opt}</span>}
                            />
                          ))}
                        </Stack>
                      );
                    case "checkbox":
                      return (
                        <Stack direction="row" spacing={2}>
                          {(field.options || []).map((opt, idx) => (
                            <FormControlLabel
                              key={idx}
                              control={
                                <Checkbox
                                  checked={
                                    Array.isArray(values[field.id]) &&
                                    values[field.id].includes(opt)
                                  }
                                  onChange={() => handleCheckboxChange(field, opt)}
                                  sx={{ color: "#ffe600" }}
                                />
                              }
                              label={<span style={{ color: "#ffe600", fontWeight: 600 }}>{opt}</span>}
                            />
                          ))}
                        </Stack>
                      );
                    case "derived":
                      return (
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="medium"
                          value={values[field.id]}
                          disabled
                          label="Derived Field (computed)"
                          sx={{
                            bgcolor: "#222",
                            borderRadius: 1,
                            input: { color: "#ffe600", fontWeight: 600 },
                            label: { color: "#ffe600" },
                            "& .MuiInputLabel-root": { color: "#ffe600" },
                            "& .MuiOutlinedInput-root": {
                              color: "#ffe600",
                              borderColor: "#ffe600",
                            },
                          }}
                          InputLabelProps={{ style: { color: "#ffe600" } }}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </Paper>
            ))}
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                fontWeight: 700,
                mt: 2,
                color: "#ffe600",
                bgcolor: "#111",
                borderRadius: 2,
                boxShadow: "0 1px 4px 0 #ffe60055",
                '&:hover': { bgcolor: "#222", color: "#ffe600" },
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default FillFormPage;
