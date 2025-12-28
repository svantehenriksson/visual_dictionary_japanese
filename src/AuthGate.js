import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function AuthGate({ children }) {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function sendMagicLink(e) {
    e.preventDefault();
    setStatus("Sending magic link...");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // optional: force redirect back to your site
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      setStatus(`Error: ${error.message}`);
      return;
    }
    setStatus("Check your email for the login link.");
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  if (!session) {
    return (
      <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "system-ui" }}>
        <h2>Sign in</h2>
        <p>Enter your email and you’ll get a magic link.</p>

        <form onSubmit={sendMagicLink}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 10, fontSize: 16 }}
          />
          <button style={{ marginTop: 12, padding: "10px 14px", fontSize: 16 }}>
            Send login link
          </button>
        </form>

        {status && <p style={{ marginTop: 12 }}>{status}</p>}
      </div>
    );
  }

  return (
    <div>
      <div style={{ padding: 12, fontFamily: "system-ui", fontSize: 14 }}>
        Logged in as <b>{session.user.email}</b>{" "}
        <button onClick={signOut} style={{ marginLeft: 12 }}>
          Sign out
        </button>
      </div>
      {children}
    </div>
  );
}
