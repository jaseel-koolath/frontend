import { redirect } from "next/navigation";

export default function DashboardComponent() {
  redirect("/dashboard/workflows")

  // NOTE: if we don't add this return the compiler will fail
  return "";
}
