"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateServiceCard(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const featuresString = formData.get("features") as string;
  const features = featuresString.split("\n").map(f => f.trim()).filter(f => f.length > 0);
  const highlighted = formData.get("highlighted") === "true";

  await prisma.serviceCard.update({
    where: { id },
    data: { 
      title,
      description,
      features,
      highlighted
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/services");
}
