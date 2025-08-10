import { useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
// ...existing imports...
import FieldEditor from "../components/FieldEditor";
import ReorderableFieldList from "../components/ReorderableFieldList";
import { v4 as uuidv4 } from "uuid";
import type { FieldConfig } from "../redux/formSlice";
import AddIcon from "@mui/icons-material/Add";

const emptyField = (): FieldConfig => ({
  id: Date.now().toString(),
  type: "text",
  label: "New Field",
  required: false,
  validation: {},
});

const CreateFormPage = () => {
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState("");

  const handleAddField = () => {
    setFields([...fields, emptyField()]);
  };

  const handleFieldChange = (idx: number, updated: FieldConfig) => {
    setFields(fields.map((f, i) => (i === idx ? updated : f)));
  };

  const handleDeleteField = (idx: number) => {
    setFields(fields.filter((_, i) => i !== idx));
  };

  const handleMoveFieldUp = (idx: number) => {
    if (idx === 0) return;
    const newFields = [...fields];
    [newFields[idx - 1], newFields[idx]] = [newFields[idx], newFields[idx - 1]];
    setFields(newFields);
  };

  const handleMoveFieldDown = (idx: number) => {
    if (idx === fields.length - 1) return;
    const newFields = [...fields];
    [newFields[idx], newFields[idx + 1]] = [newFields[idx + 1], newFields[idx]];
    setFields(newFields);
  };

  const handleOpenSaveDialog = () => setSaveDialogOpen(true);
  const handleCloseSaveDialog = () => setSaveDialogOpen(false);

  const handleSaveForm = () => {
    if (!formName.trim()) return;
    const formSchema = {
      id: uuidv4(),
      name: formName.trim(),
      createdAt: new Date().toISOString(),
      fields,
    };
    const saved = JSON.parse(localStorage.getItem("upliance_forms") || "[]");
    saved.push(formSchema);
    localStorage.setItem("upliance_forms", JSON.stringify(saved));
    setFields([]);
    setFormName("");
    setSaveDialogOpen(false);
  };

  return (
    <AnimatedPage>
      <Box sx={{ maxWidth: 950, mx: "auto", mt: 4 }}>
        <Paper
          elevation={12}
          sx={{
            p: { xs: 2, sm: 5 },
            mb: 4,
            borderRadius: 6,
            boxShadow: "0 8px 32px 0 rgba(255, 255, 0, 0.25)",
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
              Create a New Form
            </span>
          </Typography>
          <Paper
            sx={{
              p: 2,
              mb: 3,
              boxShadow: 2,
              borderRadius: 3,
              bgcolor: "#ffe600",
              border: "1.5px solid #fff700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddField}
                color="primary"
                sx={{
                  fontWeight: 700,
                  px: 3,
                  bgcolor: "#111",
                  color: "#ffe600",
                  "&:hover": { bgcolor: "#222", color: "#ffe600" },
                }}
              >
                Add Field
              </Button>
              <Button
                variant="outlined"
                color="success"
                sx={{
                  fontWeight: 700,
                  px: 3,
                  ml: 2,
                  borderColor: "#111",
                  color: "#111",
                  bgcolor: "#ffe600",
                  "&:hover": { bgcolor: "#fff700", borderColor: "#111" },
                }}
                disabled={fields.length === 0}
                onClick={handleOpenSaveDialog}
              >
                Save Form
              </Button>
            </Stack>
          </Paper>
          <Dialog open={saveDialogOpen} onClose={handleCloseSaveDialog}>
            <DialogTitle
              sx={{ fontWeight: 800, color: "#ffe600", bgcolor: "#111" }}
            >
              Save Form
            </DialogTitle>
            <DialogContent sx={{ bgcolor: "#222" }}>
              <TextField
                autoFocus
                margin="dense"
                label="Form Name"
                fullWidth
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                sx={{ input: { color: "#ffe600", fontWeight: 700 } }}
              />
            </DialogContent>
            <DialogActions sx={{ bgcolor: "#222" }}>
              <Button
                onClick={handleCloseSaveDialog}
                sx={{ color: "#ffe600", fontWeight: 700 }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveForm}
                disabled={!formName.trim()}
                sx={{ color: "#ffe600", fontWeight: 700 }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Box>
            {fields.length === 0 ? (
              <Typography
                color="#ffe600"
                sx={{
                  textAlign: "center",
                  mt: 6,
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                No fields added yet.
              </Typography>
            ) : (
              <ReorderableFieldList
                onMoveUp={handleMoveFieldUp}
                onMoveDown={handleMoveFieldDown}
              >
                {fields.map((field, idx) => (
                  <FieldEditor
                    key={field.id}
                    field={field}
                    allFields={fields}
                    onChange={(updated) => handleFieldChange(idx, updated)}
                    onDelete={() => handleDeleteField(idx)}
                  />
                ))}
              </ReorderableFieldList>
            )}
          </Box>
        </Paper>
      </Box>
    </AnimatedPage>
  );
};

export default CreateFormPage;
