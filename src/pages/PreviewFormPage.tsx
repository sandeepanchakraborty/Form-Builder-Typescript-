import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Box,
  Paper,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import type { FieldConfig } from "../redux/formSlice";

import { useNavigate } from "react-router-dom";

interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: FieldConfig[];
}

interface PreviewFormPageProps {
  forms?: FormSchema[];
  selectedFormId?: string;
  setSelectedFormId?: (id: string) => void;
  form?: FormSchema;
  navigate?: (path: string) => void;
}

const PreviewFormPage: React.FC<PreviewFormPageProps> = (props) => {
  const navigate = props.navigate || useNavigate();
  const [forms, setForms] = useState<FormSchema[]>(props.forms || []);
  const [selectedFormId, setSelectedFormId] = useState<string>(
    props.selectedFormId || ""
  );
  const [form, setForm] = useState<FormSchema | null>(props.form || null);

  // Load forms from localStorage if not provided
  useEffect(() => {
    if (!props.forms) {
      const saved = JSON.parse(localStorage.getItem("upliance_forms") || "[]");
      setForms(saved);
    }
  }, [props.forms]);

  // Update selected form when selectedFormId or forms change
  useEffect(() => {
    if (selectedFormId && forms.length > 0) {
      const found = forms.find((f) => f.id === selectedFormId);
      setForm(found || null);
    } else {
      setForm(null);
    }
  }, [selectedFormId, forms]);

  // If parent provides setSelectedFormId, use it
  const handleSelectChange = (id: string) => {
    setSelectedFormId(id);
    if (props.setSelectedFormId) props.setSelectedFormId(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        minHeight: "calc(100vh - 64px)",
        width: "100vw",
        background: "#111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "48px 8px 0 8px",
        fontFamily: "Inter, Roboto, Arial",
        overflowX: "hidden",
      }}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          type: "spring",
          stiffness: 80,
        }}
        style={{ width: "100%", maxWidth: 900 }}
      >
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
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
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
                  background:
                    "linear-gradient(90deg, #ffe600 60%, #fff700 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 900,
                  display: "inline-block",
                }}
              >
                Preview Form
              </span>
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Box sx={{ width: "100%", maxWidth: 600, mb: 3, mx: "auto" }}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#ffe600",
                  border: "1.5px solid #fff700",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>Select a form to preview</InputLabel>
                  <Select
                    value={selectedFormId || ""}
                    label="Select a form to preview"
                    onChange={(e) => handleSelectChange(e.target.value)}
                    sx={{ bgcolor: "#fff", borderRadius: 1 }}
                  >
                    {(Array.isArray(forms) ? forms : []).map((f) => (
                      <MenuItem key={f.id} value={f.id}>
                        {f.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Box>
          </motion.div>
          {form ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}
            >
              <Paper
                elevation={3}
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
                  sx={{
                    fontWeight: 900,
                    mb: 1,
                    color: "#ffe600",
                    letterSpacing: 1,
                  }}
                >
                  {form.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 3, color: "#ffe600", fontWeight: 500 }}
                >
                  Created: {new Date(form.createdAt).toLocaleString()}
                </Typography>
                <Stack spacing={3}>
                  {Array.isArray(form?.fields) && form.fields.length === 0 ? (
                    <Typography color="#ffe600" sx={{ fontWeight: 600 }}>
                      No fields in this form.
                    </Typography>
                  ) : (
                    <form>
                      <Stack spacing={3}>
                        {(Array.isArray(form?.fields) ? form.fields : []).map(
                          (field) => (
                            <motion.div
                              key={field.id}
                              whileHover={{
                                scale: 1.025,
                                boxShadow:
                                  "0 8px 32px 0 rgba(255, 255, 0, 0.25)",
                              }}
                              transition={{ type: "spring", stiffness: 200 }}
                              style={{ marginBottom: 0 }}
                            >
                              <Paper
                                elevation={1}
                                sx={{
                                  p: 2,
                                  borderRadius: 2,
                                  bgcolor: "rgba(34,34,34,0.95)",
                                  boxShadow:
                                    "0 2px 12px 0 rgba(255, 255, 0, 0.10)",
                                  border: "1.5px solid #ffe600",
                                  color: "#ffe600",
                                }}
                              >
                                <Typography
                                  fontWeight={700}
                                  sx={{ mb: 1, color: "#ffe600", fontSize: 18 }}
                                >
                                  {field.label}{" "}
                                  {field.required && (
                                    <span
                                      style={{
                                        color: "#ff1744",
                                        fontWeight: 700,
                                      }}
                                    >
                                      *
                                    </span>
                                  )}
                                </Typography>
                                {field.type === "text" ||
                                field.type === "number" ||
                                field.type === "date" ? (
                                  <TextField
                                    type={
                                      field.type === "number"
                                        ? "number"
                                        : field.type === "date"
                                        ? "date"
                                        : "text"
                                    }
                                    fullWidth
                                    disabled
                                    variant="outlined"
                                    size="medium"
                                    value={
                                      field.defaultValue !== undefined
                                        ? field.defaultValue
                                        : ""
                                    }
                                    sx={{
                                      bgcolor: "#222",
                                      borderRadius: 1,
                                      input: {
                                        color: "#ffe600",
                                        fontWeight: 600,
                                      },
                                      label: { color: "#ffe600" },
                                      "& .MuiInputLabel-root": {
                                        color: "#ffe600",
                                      },
                                      "& .MuiOutlinedInput-root": {
                                        color: "#ffe600",
                                        borderColor: "#ffe600",
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { color: "#ffe600" },
                                    }}
                                  />
                                ) : field.type === "textarea" ? (
                                  <TextField
                                    fullWidth
                                    disabled
                                    variant="outlined"
                                    size="medium"
                                    multiline
                                    minRows={3}
                                    value={
                                      field.defaultValue !== undefined
                                        ? field.defaultValue
                                        : ""
                                    }
                                    sx={{
                                      bgcolor: "#222",
                                      borderRadius: 1,
                                      input: {
                                        color: "#ffe600",
                                        fontWeight: 600,
                                      },
                                      label: { color: "#ffe600" },
                                      "& .MuiInputLabel-root": {
                                        color: "#ffe600",
                                      },
                                      "& .MuiOutlinedInput-root": {
                                        color: "#ffe600",
                                        borderColor: "#ffe600",
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { color: "#ffe600" },
                                    }}
                                  />
                                ) : field.type === "select" ? (
                                  <TextField
                                    select
                                    fullWidth
                                    disabled
                                    variant="outlined"
                                    size="medium"
                                    value={
                                      field.defaultValue !== undefined
                                        ? field.defaultValue
                                        : ""
                                    }
                                    sx={{
                                      bgcolor: "#222",
                                      borderRadius: 1,
                                      input: {
                                        color: "#ffe600",
                                        fontWeight: 600,
                                      },
                                      label: { color: "#ffe600" },
                                      "& .MuiInputLabel-root": {
                                        color: "#ffe600",
                                      },
                                      "& .MuiOutlinedInput-root": {
                                        color: "#ffe600",
                                        borderColor: "#ffe600",
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { color: "#ffe600" },
                                    }}
                                  >
                                    {(field.options || []).map((opt, idx) => (
                                      <MenuItem
                                        key={idx}
                                        value={opt}
                                        sx={{ color: "#111", fontWeight: 700 }}
                                      >
                                        {opt}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                ) : field.type === "radio" ? (
                                  <Stack direction="row" spacing={2}>
                                    {(field.options || []).map((opt, idx) => (
                                      <FormControlLabel
                                        key={idx}
                                        control={
                                          <Checkbox
                                            checked={field.defaultValue === opt}
                                            disabled
                                            sx={{ color: "#ffe600" }}
                                          />
                                        }
                                        label={
                                          <span
                                            style={{
                                              color: "#ffe600",
                                              fontWeight: 600,
                                            }}
                                          >
                                            {opt}
                                          </span>
                                        }
                                      />
                                    ))}
                                  </Stack>
                                ) : field.type === "checkbox" ? (
                                  <Stack direction="row" spacing={2}>
                                    {(field.options || []).map((opt, idx) => (
                                      <FormControlLabel
                                        key={idx}
                                        control={
                                          <Checkbox
                                            checked={
                                              Array.isArray(
                                                field.defaultValue
                                              ) &&
                                              field.defaultValue.includes(opt)
                                            }
                                            disabled
                                            sx={{ color: "#ffe600" }}
                                          />
                                        }
                                        label={
                                          <span
                                            style={{
                                              color: "#ffe600",
                                              fontWeight: 600,
                                            }}
                                          >
                                            {opt}
                                          </span>
                                        }
                                      />
                                    ))}
                                  </Stack>
                                ) : field.type === "derived" ? (
                                  <TextField
                                    fullWidth
                                    disabled
                                    variant="outlined"
                                    size="medium"
                                    value={
                                      field.defaultValue !== undefined
                                        ? field.defaultValue
                                        : ""
                                    }
                                    label="Derived Field (computed)"
                                    sx={{
                                      bgcolor: "#222",
                                      borderRadius: 1,
                                      input: {
                                        color: "#ffe600",
                                        fontWeight: 600,
                                      },
                                      label: { color: "#ffe600" },
                                      "& .MuiInputLabel-root": {
                                        color: "#ffe600",
                                      },
                                      "& .MuiOutlinedInput-root": {
                                        color: "#ffe600",
                                        borderColor: "#ffe600",
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { color: "#ffe600" },
                                    }}
                                  />
                                ) : null}
                              </Paper>
                            </motion.div>
                          )
                        )}
                      </Stack>
                    </form>
                  )}
                </Stack>
              </Paper>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              style={{
                width: "100%",
                minHeight: 320,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 32,
              }}
            >
              <Box
                sx={{
                  background: "rgba(40, 40, 10, 0.85)",
                  p: 5,
                  borderRadius: 3,
                  boxShadow: "0 2px 16px 0 rgba(255, 255, 0, 0.25)",
                  border: "2px solid #ffe600",
                  minWidth: 340,
                  maxWidth: 420,
                  textAlign: "center",
                  mx: "auto",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: "#ffe600",
                    textShadow: "1px 1px 6px #000",
                  }}
                >
                  No form selected for preview.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/my-forms")}
                  sx={{
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    color: "#ffe600",
                    borderColor: "#ffe600",
                    background: "rgba(0,0,0,0.2)",
                    boxShadow: "0 1px 4px 0 #ffe60055",
                    "&:hover": {
                      background: "#ffe600",
                      color: "#222",
                      borderColor: "#ffe600",
                    },
                  }}
                >
                  BACK TO MY FORMS
                </Button>
              </Box>
            </motion.div>
          )}
        </Paper>
      </motion.div>
    </motion.div>
  );
};

export default PreviewFormPage;
