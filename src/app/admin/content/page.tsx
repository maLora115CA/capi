import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateContentBlock } from "@/app/actions/content";

export default async function ContentAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const contentBlocks = await prisma.contentBlock.findMany({
    orderBy: { key: 'asc' }
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Textos Generales</h1>
      <p className="text-gray-600 mb-8">Administra los textos principales que aparecen en tu página web.</p>

      {contentBlocks.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg border border-yellow-200">
          Aún no hay textos en la base de datos. Debes ejecutar el script de inicialización (seed).
        </div>
      ) : (
        <div className="space-y-6">
          {contentBlocks.map((block) => (
            <div key={block.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{block.key.replace(/_/g, ' ').toUpperCase()}</h3>
              <form action={updateContentBlock} className="space-y-4">
                <input type="hidden" name="id" value={block.id} />
                <div>
                  <textarea
                    name="value"
                    defaultValue={block.value}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-brand-sage outline-none transition-all resize-y"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#333333] hover:bg-black text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Guardar Cambios
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
