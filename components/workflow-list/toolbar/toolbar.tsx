import { Box, Button, Typography } from "@mui/material";

export const WorkflowListToolbar = () => (
  <Box>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Workflows
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button color="primary" variant="contained">
          Add Workflow
        </Button>
      </Box>
    </Box>
  </Box>
);
