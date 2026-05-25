import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Home = lazy(() => import("@/pages/Home"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));

const Spinner = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh",
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        border: "3px solid var(--blue)",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

export default function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Spinner />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "projects",
          element: (
            <Suspense fallback={<Spinner />}>
              <ProjectsPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return routes;
}


