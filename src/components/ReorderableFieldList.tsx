import { ReactNode } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface ReorderableFieldListProps {
  children: ReactNode[];
  onMoveUp: (idx: number) => void;
  onMoveDown: (idx: number) => void;
}

export default function ReorderableFieldList({
  children,
  onMoveUp,
  onMoveDown,
}: ReorderableFieldListProps) {
  return (
    <Box>
      {children.map((child, idx) => (
        <Stack direction="row" alignItems="center" key={idx} spacing={1} mb={1}>
          <Box flex={1}>{child}</Box>
          <Stack direction="column" spacing={0}>
            <IconButton
              size="small"
              onClick={() => onMoveUp(idx)}
              disabled={idx === 0}
            >
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onMoveDown(idx)}
              disabled={idx === children.length - 1}
            >
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
}
