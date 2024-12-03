"use client";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
    },
  });
  if (error) {
    console.error("Error signing in..", error);
  }

  if (data) {
    console.log("SIgnin succesfull", data);
    return { success: true, data };
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out...", error);
  }
}
