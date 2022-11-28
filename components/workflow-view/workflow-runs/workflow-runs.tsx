import {
  CardHeader,
  Divider,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import RunsListSidebar from "./list-sidebar";
import RunDetail from "./detail";
import { useAuth } from "@contexts/auth";
import { useWorkflowRunsList } from "@lib/apiclient/workflowRuns";
import WithLoader from "../../with-loader";
import { WorkflowRunItem } from "@pb/controlplane/v1/response_messages";

export const WorkflowRuns = ({ workflowID }: { workflowID: string }) => {
  const [currentRunID, setCurrentRunID] = useState("");
  const { apiClient } = useAuth();
  const { isLoading, data } = useWorkflowRunsList(workflowID, apiClient);

  return (
    <Card raised>
      <CardHeader title="Latest Runs" />
      <Divider />
      <CardContent sx={{ padding: 0 }}>
        <WithLoader loading={isLoading}>
          {data?.result && data.result.length > 0 && (
            <Grid container>
              <Grid item xs={3} xl={2}>
                <RunsListSidebar
                  runs={data?.result!}
                  onSelect={setCurrentRunID}
                />
              </Grid>
              <Grid item xs={9} xl={10}>
                <RunDetail runID={currentRunID} />
              </Grid>
            </Grid>
          )}
          {data?.result && data.result.length == 0 && (
            <Typography variant="h5" align="center" mt={4}>
              There are no runs yet
            </Typography>
          )}
        </WithLoader>
      </CardContent>
    </Card>
  );
};