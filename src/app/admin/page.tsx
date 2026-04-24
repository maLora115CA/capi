import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Get some quick stats
  const textsCount = await prisma.contentBlock.count();
  const servicesCount = await prisma.serviceCard.count();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Textos Dinámicos</h3>
          <p className="text-3xl font-bold text-gray-900">{textsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Tarjetas de Servicio</h3>
          <p className="text-3xl font-bold text-gray-900">{servicesCount}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Estado del Sistema</h3>
          <p className="text-xl font-bold text-green-600 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            En línea
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Bienvenido al Gestor de Contenido</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Desde aquí puedes modificar los textos principales de tu página web y editar las tarjetas de los planes de servicio. 
          Cualquier cambio que realices aquí se reflejará instantáneamente en la página pública.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/admin/content" className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
            Editar Textos
          </a>
          <a href="/admin/services" className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors">
            Editar Tarjetas
          </a>
        </div>
      </div>
    </div>
  );
}
