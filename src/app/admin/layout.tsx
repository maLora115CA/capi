import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard, FileText, LayoutGrid } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Only show if logged in */}
      {session && (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-xl font-bold text-gray-800">Acompaña Admin</span>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900">
              <LayoutDashboard className="w-5 h-5 text-gray-500" />
              Dashboard
            </Link>
            <Link href="/admin/content" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <FileText className="w-5 h-5 text-gray-400" />
              Textos Generales
            </Link>
            <Link href="/admin/services" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <LayoutGrid className="w-5 h-5 text-gray-400" />
              Tarjetas de Servicios
            </Link>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-sage flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{session.user?.name || 'Administrador'}</p>
                <p className="text-gray-500 truncate">{session.user?.email}</p>
              </div>
            </div>
            <a href="/api/auth/signout" className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium">
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </a>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {session && (
          <header className="md:hidden bg-white h-16 border-b border-gray-200 flex items-center px-4 justify-between">
            <span className="text-lg font-bold">Admin</span>
            <a href="/api/auth/signout" className="text-red-600 text-sm">Salir</a>
          </header>
        )}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
