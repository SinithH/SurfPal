import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://bpjuylwpkgedsxlixjqx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwanV5bHdwa2dlZHN4bGl4anF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxODU1MDEsImV4cCI6MjAyNTc2MTUwMX0.G2lKFeo0pvRYXxaeE2gWYKkCbqYciQbeI61rv1-CRKs"
)