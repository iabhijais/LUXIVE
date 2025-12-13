
import { createBrowserClient } from '@supabase/ssr'

const MOCK_STORAGE_KEY = 'luxive_mock_session';

// Simple mock user data
const MOCK_USER = {
  id: 'mock-user-id',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'demo@luxive.com',
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  app_metadata: { provider: 'email', providers: ['email'] },
  user_metadata: { full_name: 'Demo User' },
  identities: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const createMockSession = () => ({
  access_token: 'mock-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'mock-refresh-token',
  user: MOCK_USER,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
});

class MockSupabaseClient {
  auth = {
    getSession: async () => {
      if (typeof window === 'undefined') return { data: { session: null }, error: null };
      const stored = localStorage.getItem(MOCK_STORAGE_KEY);
      return { data: { session: stored ? JSON.parse(stored) : null }, error: null };
    },
    signInWithPassword: async ({ email, password }: any) => {
      console.log('Mock Login:', email);
      const session = createMockSession();
      session.user.email = email;
      if (typeof window !== 'undefined') {
        localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(session));
      }
      // Trigger a custom event so onAuthStateChange can pick it up if needed, 
      // but usually apps polling getSession or relying on the callback might need manual trigger.
      // For simplicity, we just return success.
      return { data: { user: session.user, session }, error: null };
    },
    signUp: async ({ email, password, options }: any) => {
        console.log('Mock Signup:', email);
        const session = createMockSession();
        session.user.email = email;
        if(options?.data?.full_name) {
            session.user.user_metadata.full_name = options.data.full_name;
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(session));
        }
        return { data: { user: session.user, session }, error: null };
    },
    signOut: async () => {
      console.log('Mock Signout');
      if (typeof window !== 'undefined') {
        localStorage.removeItem(MOCK_STORAGE_KEY);
      }
      return { error: null };
    },
    onAuthStateChange: (callback: any) => {
      // In a real mock we'd listen to storage events or similar, 
      // but here we just return a dummy subscription.
      // We can immediately fire with current session.
      if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(MOCK_STORAGE_KEY);
          if (stored) callback('SIGNED_IN', JSON.parse(stored));
      }
      
      return {
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      };
    },
  };
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Check if we have valid-looking Supabase credentials. 
  // If they are placeholders or missing, return the Mock Client.
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project.supabase.co')) {
    console.warn('Supabase credentials missing or placeholders detected. Using Mock Supabase Client.');
    return new MockSupabaseClient() as any;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
