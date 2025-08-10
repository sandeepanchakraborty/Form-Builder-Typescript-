import {
  Box,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { FieldConfig, FieldType } from "../redux/formSlice";

interface FieldEditorProps {
  field: FieldConfig;
  allFields: FieldConfig[];
  onChange: (field: FieldConfig) => void;
  onDelete: () => void;
}

const fieldTypes: { value: FieldType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "select", label: "Select" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date" },
  { value: "derived", label: "Derived" },
];

export default function FieldEditor({
  field,
  allFields,
  onChange,
  onDelete,
}: FieldEditorProps) {
  // Option management for select/radio
  const handleOptionChange = (idx: number, value: string) => {
    const options = field.options ? [...field.options] : [];
    options[idx] = value;
    onChange({ ...field, options });
  };
  const handleAddOption = () => {
    const options = field.options ? [...field.options, ""] : [""];
    onChange({ ...field, options });
  };
  const handleDeleteOption = (idx: number) => {
    const options = field.options
      ? field.options.filter((_, i) => i !== idx)
      : [];
    onChange({ ...field, options });
  };

  // Derived field config
  const parentCandidates = allFields.filter(
    (f) => f.id !== field.id && f.type !== "derived"
  );

  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        border: "2px solid #ffd54f",
        borderRadius: 4,
        background: "rgba(20,20,20,0.85)",
        boxShadow: "0 4px 32px 0 rgba(255, 213, 79, 0.18)",
        backdropFilter: "blur(10px)",
        fontFamily: "Inter, Roboto, Arial",
        color: "#ffd54f",
        position: "relative",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <FormControl
          sx={{
            minWidth: 120,
            bgcolor: "#222",
            borderRadius: 1,
            "& .MuiInputBase-root": { color: "#ffe600" },
            "& .MuiInputLabel-root": { color: "#ffe600" },
          }}
        >
          <InputLabel sx={{ color: "#ffe600" }}>Type</InputLabel>
          <Select
            value={field.type}
            label="Type"
            onChange={(e) =>
              onChange({ ...field, type: e.target.value as FieldType })
            }
            sx={{ color: "#ffe600", ".MuiSelect-icon": { color: "#ffe600" } }}
          >
            {fieldTypes.map((ft) => (
              <MenuItem
                key={ft.value}
                value={ft.value}
                sx={{ color: "#111", fontWeight: 700 }}
              >
                {ft.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Label"
          value={field.label}
          onChange={(e) => onChange({ ...field, label: e.target.value })}
          sx={{
            bgcolor: "#222",
            borderRadius: 1,
            input: { color: "#ffd54f", fontWeight: 600 },
            label: { color: "#ffd54f" },
            "& .MuiInputLabel-root": { color: "#ffd54f" },
            "& .MuiOutlinedInput-root": {
              color: "#ffd54f",
              borderColor: "#ffd54f",
            },
          }}
          InputLabelProps={{ style: { color: "#ffe600" } }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={field.required}
              onChange={(e) =>
                onChange({ ...field, required: e.target.checked })
              }
              sx={{ color: "#ffd54f" }}
            />
          }
          label={
            <span style={{ color: "#ffe600", fontWeight: 600 }}>Required</span>
          }
        />
        <IconButton
          onClick={onDelete}
          sx={{
            color: "#ff1744",
            bgcolor: "rgba(255,255,255,0.08)",
            "&:hover": { bgcolor: "#ffe600", color: "#111" },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" mt={2}>
        {/* Only show Default Value for number fields */}
        {field.type === "number" && (
          <TextField
            label="Default Value"
            type="number"
            value={field.defaultValue ?? ""}
            onChange={(e) =>
              onChange({ ...field, defaultValue: e.target.value })
            }
          />
        )}
        {/* Validation rules */}
        <TextField
          label="Min Length"
          type="number"
          value={field.validation?.minLength ?? ""}
          onChange={(e) =>
            onChange({
              ...field,
              validation: {
                ...field.validation,
                minLength: e.target.value ? Number(e.target.value) : undefined,
              },
            })
          }
          sx={{
            width: 120,
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
          InputLabelProps={{ style: { color: "#ffd54f" } }}
        />
        <TextField
          label="Max Length"
          type="number"
          value={field.validation?.maxLength ?? ""}
          onChange={(e) =>
            onChange({
              ...field,
              validation: {
                ...field.validation,
                maxLength: e.target.value ? Number(e.target.value) : undefined,
              },
            })
          }
          sx={{
            width: 120,
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
        <FormControlLabel
          control={
            <Checkbox
              checked={!!field.validation?.email}
              onChange={(e) =>
                onChange({
                  ...field,
                  validation: { ...field.validation, email: e.target.checked },
                })
              }
            />
          }
          label="Email"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!!field.validation?.password}
              onChange={(e) =>
                onChange({
                  ...field,
                  validation: {
                    ...field.validation,
                    password: e.target.checked,
                  },
                })
              }
            />
          }
          label="Password (min 8 chars, must contain a number)"
        />
      </Stack>
      {/* Options for select/radio */}
      {(field.type === "select" || field.type === "radio") && (
        <Box mt={2}>
          <Typography variant="subtitle2">Options</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            {field.options?.map((opt, idx) => (
              <Box key={idx} display="flex" alignItems="center">
                <TextField
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <IconButton
                  onClick={() => handleDeleteOption(idx)}
                  size="small"
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            <Button onClick={handleAddOption} size="small" variant="outlined">
              Add Option
            </Button>
          </Stack>
        </Box>
      )}
      {/* Derived field config */}
      {field.type === "derived" && (
        <Box
          mt={2}
          p={2}
          sx={{
            bgcolor: "rgba(255,255,0,0.10)",
            border: "1.5px solid #ffe600",
            borderRadius: 3,
            boxShadow: "0 2px 12px 0 rgba(255, 255, 0, 0.10)",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#ffe600", fontWeight: 700, mb: 1 }}
          >
            Derived Field
          </Typography>
          <FormControl
            sx={{ minWidth: 180, mr: 2, bgcolor: "#222", borderRadius: 1 }}
          >
            <InputLabel sx={{ color: "#ffe600" }}>Parent Fields</InputLabel>
            <Select
              multiple
              value={field.derived?.parentFields || []}
              onChange={(e) =>
                onChange({
                  ...field,
                  derived: {
                    ...field.derived,
                    parentFields: e.target.value as string[],
                    formula: field.derived?.formula || "",
                  },
                })
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[]).map((val) => {
                    const parent = allFields.find((f) => f.id === val);
                    return (
                      <Chip
                        key={val}
                        label={parent?.label || val}
                        sx={{
                          bgcolor: "#ffe600",
                          color: "#111",
                          fontWeight: 700,
                        }}
                      />
                    );
                  })}
                </Box>
              )}
              sx={{ color: "#ffe600", ".MuiSelect-icon": { color: "#ffe600" } }}
            >
              {parentCandidates.map((f) => (
                <MenuItem
                  key={f.id}
                  value={f.id}
                  sx={{ color: "#111", fontWeight: 700 }}
                >
                  {f.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Formula"
            value={field.derived?.formula || ""}
            onChange={(e) =>
              onChange({
                ...field,
                derived: {
                  ...field.derived,
                  formula: e.target.value,
                  parentFields: field.derived?.parentFields || [],
                },
              })
            }
            fullWidth
            sx={{
              mt: 1,
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
            helperText="Use JS expression."
          />
        </Box>
      )}
    </Box>
  );
}
