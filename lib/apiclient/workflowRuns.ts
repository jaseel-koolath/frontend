import useSWR from 'swr'
import ApiClient, { swrResp } from "./client";
import { WorkflowRunServiceClientImpl, WorkflowRunServiceListResponse, WorkflowRunServiceViewResponse } from '../../gen/controlplane/v1/workflowrun';

export function useWorkflowRunsList(workflowID: string, client: ApiClient | undefined) {
  const shouldFetch = client != undefined
  const { data, error } = useSWR(shouldFetch ? ["workflow-runs", workflowID] : null, (k: string) => getWorkflowRuns(workflowID, client!))
  return swrResp(data, error)
}

function getWorkflowRuns(workflowID: string, apiClient: ApiClient): Promise<WorkflowRunServiceListResponse> {
  var client = new WorkflowRunServiceClientImpl(apiClient.grpcClient)
  return client.List({ workflowId: workflowID })
}

export function useWorkflowRunsDescribe(runID: string, client: ApiClient | undefined) {
  const shouldFetch = client != undefined
  const { data, error } = useSWR(shouldFetch ? ["workflow-run-describe", runID] : null, (k: string) => describeWorkflowRun(runID, client!))
  return swrResp(data, error)
}

function describeWorkflowRun(workflowRunID: string, apiClient: ApiClient): Promise<WorkflowRunServiceViewResponse> {
  var client = new WorkflowRunServiceClientImpl(apiClient.grpcClient)
  return client.View({ id: workflowRunID })
}