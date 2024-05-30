import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
   'https://qecibrgkamoswnaafsvb.supabase.co',
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlY2licmdrYW1vc3duYWFmc3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyOTI3NjgsImV4cCI6MjAxNDg2ODc2OH0.XTI_u-Cbs8FdKwcAEQvLd9bRFm1NZQgm0HyXhiOSsQE', 
   {
      auth: {
         storageKey: 'auth_key',
      }
   }
)