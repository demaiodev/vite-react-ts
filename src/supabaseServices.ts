import { supabase } from "./supabaseClient";

export async function getCurrentUserId() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      return user.id;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}
