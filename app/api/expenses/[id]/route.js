import { supabase } from "@/lib/supabase";

export async function DELETE(req, {params}) {
  const { id } = params

  const { error } = await supabase.from('messages').delete().eq('id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}