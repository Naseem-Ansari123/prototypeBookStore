import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminSession } from "../../zustand/adminSession";
import { httpRequest } from "../lib/http";

const AuthGuardAdmin = () => {
  const { admin, adminLogout, setAdmin } = useAdminSession();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    if (!admin?.token) { setChecking(false); return; }

    httpRequest.get("/admins/me", {
      headers: { Authorization: `Bearer ${admin.token}` },
    }).then(({ data }) => {
      if (active) setAdmin({ ...admin, admin: {
        id: data.admin._id,
        adminName: data.admin.ownerName,
        email: data.admin.email,
        storeName: data.admin.storeName,
        address: data.admin.address,
        city: data.admin.city,
        state: data.admin.state,
        pincode: data.admin.pincode,
        logoUri: data.admin.logoUri || "",
        role: "admin",
      }});
    }).catch(() => {
      if (active) adminLogout();
    }).finally(() => {
      if (active) setChecking(false);
    });
    return () => { active = false; };
  }, [admin?.token]);

  if (!admin?.token) return <Navigate to="/admin-login" replace />;
  if (checking) return <div className="min-h-screen flex items-center justify-center">Checking seller session...</div>;
  return <Outlet />;
};

export default AuthGuardAdmin;
