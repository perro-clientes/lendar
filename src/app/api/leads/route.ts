import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validations/leads";
import { crearClienteSupabaseServer } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const supabase = crearClienteSupabaseServer();
    const { error } = await supabase.from("leads").insert(parsed.data);

    if (error) {
      console.error("Error al guardar lead:", error);
      return NextResponse.json({ error: "No se pudo guardar la simulación" }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "No se pudo guardar la simulación" }, { status: 500 });
  }
}
