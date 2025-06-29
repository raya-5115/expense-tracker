import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data });
}

export async function POST(req) {
  const body = await req.json();
  const { title, amount, category, date } = body;

  if (!amount || amount <= 0) {
    return Response.json({ error: "masukan jumlah uang" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("expenses")
    .insert([{ title: title, amount: amount, category: category, date: date }]);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data }, { status: 200 });
}
