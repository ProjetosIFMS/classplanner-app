"use client";

import { useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_components/auth/AuthContext";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user } = useAuth();
  const userRole = user?.role.toLowerCase();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push(`/${userRole}/dashboard`);
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [router, user]);

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <ShieldAlert className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Acesso não autorizado
        </h1>
        <p className="text-gray-600 mb-6">
          Você não tem acesso a essa página. Redirecionando para a dashboard...
        </p>
        <div className="animate-pulse">
          <div className="h-1 w-full bg-red-200 rounded">
            <div className="h-1 bg-red-500 rounded w-1/3 transition-all duration-3000 ease-in-out"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
