const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase;

function isHttpUrl(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url);
}

if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  if (!isHttpUrl(SUPABASE_URL)) {
    // Provide a clear error to help debugging deployment misconfiguration.
    throw new Error('Invalid SUPABASE_URL: must be a valid HTTP or HTTPS URL (e.g. https://<project>.supabase.co). Do NOT set a postgres:// connection string in SUPABASE_URL.');
  }
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
} else {
  // In test or partially-configured environments we export a minimal safe stub.
  // Tests should mock `src/supabaseClient.js` where needed.
  console.warn('Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set. Exporting stub supabase client.');
  supabase = {
    from: () => ({
      select: () => ({ order: async () => ({ data: [], error: null }) })
    }),
    auth: {
      getUser: async () => ({ data: null, error: null })
    }
  };
}

module.exports = supabase;
