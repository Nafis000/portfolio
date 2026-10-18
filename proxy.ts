import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

// Public pages stay static; only the admin area needs session cookies.
export const config = {
  matcher: ["/admin/:path*"],
};
