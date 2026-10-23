import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://balgchkmciaydnxkmyzx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbGdjaGttY2lheWRueGtteXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MjMwNDksImV4cCI6MjEwODI5OTA0OX0.P83G2juvazOlPZeWqzAc-wIMjblXjekcASX5FtzhDSo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
