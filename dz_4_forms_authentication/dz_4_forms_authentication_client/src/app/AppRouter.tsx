import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Suspense, useEffect } from "react";
import { MainPage } from "@/pages/MainPage";
import { LoginPage } from "@/pages/LoginPage";
import { UserCreateFormikPage } from "@/pages/UserCreateEditPages/UserCreatePageFormik";
import { UserCreateRHFPage } from "@/pages/UserCreateEditPages/UserCreatePageRHF";
import { UserEditPage } from "@/pages/UserCreateEditPages/UserEditPage";
import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";
import { useDispatch } from "react-redux";
import { checkAuth } from "@/entities/slices/authSlice";
import { ProtectedRoute } from "@/app/ProtectedRoute";
import type { AppDispatch } from "./store";

import styles from "./AppRouter.module.css";

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";
  if (hideLayout) return <Outlet />;
  return (
    <div className={styles.app_router_header}>
      <Header />
      <div className={styles.app_router_sidebar}>
        <Sidebar />
        <main className={styles.app_router_outlet}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AppRouter() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <main className={styles.app_router}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/create/formik"
                element={
                  <ProtectedRoute>
                    <UserCreateFormikPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/create/react-hook-form"
                element={
                  <ProtectedRoute>
                    <UserCreateRHFPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/edit/:id"
                element={
                  <ProtectedRoute>
                    <UserEditPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </main>
  );
}
