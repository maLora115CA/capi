import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateServiceCard } from "@/app/actions/services";

export default async function ServicesAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const services = await prisma.serviceCard.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tarjetas de Servicio</h1>
      <p className="text-gray-600 mb-8">Administra los planes y servicios que ofreces.</p>

      {services.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg border border-yellow-200">
          Aún no hay servicios en la base de datos.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Tarjeta #{service.order + 1}</h3>
                {service.highlighted && (
                  <span className="bg-brand-sage text-white text-xs px-2 py-1 rounded-full">Destacado</span>
                )}
              </div>
              
              <form action={updateServiceCard} className="space-y-4 flex-1 flex flex-col">
                <input type="hidden" name="id" value={service.id} />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={service.title}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage outline-none transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    name="description"
                    defaultValue={service.description}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage outline-none transition-all resize-y"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Características (una por línea)</label>
                  <textarea
                    name="features"
                    defaultValue={service.features.join('\n')}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage outline-none transition-all resize-y"
                    placeholder="Ejemplo: Compañía activa&#10;Paseos locales"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id={`highlighted-${service.id}`}
                    name="highlighted"
                    value="true"
                    defaultChecked={service.highlighted}
                    className="w-4 h-4 text-brand-sage rounded border-gray-300 focus:ring-brand-sage"
                  />
                  <label htmlFor={`highlighted-${service.id}`} className="text-sm font-medium text-gray-700">
                    Resaltar esta tarjeta (estilo verde)
                  </label>
                </div>

                <div className="flex justify-end pt-4 mt-auto">
                  <button
                    type="submit"
                    className="bg-[#333333] hover:bg-black text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm w-full"
                  >
                    Guardar Tarjeta
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
