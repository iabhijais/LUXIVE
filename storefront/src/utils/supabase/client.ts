
import { createBrowserClient } from '@supabase/ssr'
import type { AuthChangeEvent } from '@supabase/supabase-js';

const MOCK_STORAGE_KEY = 'luxive_mock_session';
let hasWarnedAboutMockSupabase = false;

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

type MockUser = typeof MOCK_USER;

type MockSession = {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
  refresh_token: string;
  user: MockUser;
  expires_at: number;
};

type MockAuthCallback = (event: AuthChangeEvent, session: MockSession | null) => void;
type MockAuthArgs = { email: string; password: string };
type MockSignUpArgs = MockAuthArgs & { options?: { data?: { full_name?: string; phone?: string } } };
type MockQueryResponse<T = unknown> = { data: T; error: null };

const createMockSession = (): MockSession => ({
  access_token: 'mock-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'mock-refresh-token',
  user: MOCK_USER,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
});

const getStoredSession = (): MockSession | null => {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(MOCK_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

class MockSupabaseClient {
  auth = {
    getUser: async () => {
      const session = getStoredSession();
      return { data: { user: session?.user ?? null }, error: null };
    },
    getSession: async () => {
      return { data: { session: getStoredSession() }, error: null };
    },
    signInWithPassword: async ({ email }: MockAuthArgs) => {
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
    signUp: async ({ email, options }: MockSignUpArgs) => {
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
    updateUser: async ({ data }: { data: Record<string, string> }) => {
      const session = getStoredSession();
      if (session) {
        session.user.user_metadata = { ...session.user.user_metadata, ...data };
        localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(session));
      }
      return { data: { user: session?.user ?? null }, error: null };
    },
    signOut: async () => {
      console.log('Mock Signout');
      if (typeof window !== 'undefined') {
        localStorage.removeItem(MOCK_STORAGE_KEY);
      }
      return { error: null };
    },
    onAuthStateChange: (callback: MockAuthCallback) => {
      // In a real mock we'd listen to storage events or similar, 
      // but here we just return a dummy subscription.
      // We can immediately fire with current session.
      if (typeof window !== 'undefined') {
          const session = getStoredSession();
          if (session) callback('SIGNED_IN', session);
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

  from() {
    const emptyArrayResponse: MockQueryResponse<unknown[]> = { data: [], error: null };
    const emptyObjectResponse: MockQueryResponse<null> = { data: null, error: null };

    return {
      select: () => ({
        eq: async () => emptyArrayResponse,
      }),
      update: () => ({
        eq: async () => emptyObjectResponse,
      }),
      insert: () => ({
        select: async () => emptyArrayResponse,
      }),
      delete: () => ({
        eq: async () => emptyObjectResponse,
      }),
    };
  }

  rpc = async () => ({ data: null, error: null });

  storage = {
    from: () => ({
      remove: async () => ({ data: null, error: null }),
      upload: async () => ({ data: null, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: `/mock-storage/${path}` } }),
    }),
  };
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Check if we have valid-looking Supabase credentials. 
  // If they are placeholders or missing, return the Mock Client.
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project.supabase.co')) {
    if (!hasWarnedAboutMockSupabase) {
      console.warn('Supabase credentials missing or placeholders detected. Using Mock Supabase Client.');
      hasWarnedAboutMockSupabase = true;
    }
    return new MockSupabaseClient() as unknown as ReturnType<typeof createBrowserClient>;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
