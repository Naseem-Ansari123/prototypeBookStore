import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../zustand/useSession";
import { httpRequest } from "../lib/http";

const AuthGuard = () => {
  const { user, logout, setUser } = useSession();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    if (!user?.token) { setChecking(false); return; }

    httpRequest.get("/users/me", {
      headers: { Authorization: `Bearer ${user.token}` },
    }).then(({ data }) => {
      if (active) setUser({ ...user, user: data.user });
    }).catch(() => {
      if (active) logout();
    }).finally(() => {
      if (active) setChecking(false);
    });
    return () => { active = false; };
  }, [user?.token]);

  if (!user?.token) return <Navigate to="/login" replace />;
  if (checking) return <div className="min-h-screen flex items-center justify-center">Checking session...</div>;
  return <Outlet />;
};

export default AuthGuard;
