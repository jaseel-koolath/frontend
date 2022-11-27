import React from "react";
import { CircularProgress, Container, Grid } from "@mui/material";

export const WithLoader = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <Container fixed>
        <Grid
          sx={{ height: "100vh" }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return <>{children}</>;
};
