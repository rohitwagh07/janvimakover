import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const user = await login(form.email.trim().toLowerCase(), form.password);
      toast.success(`Welcome back, ${user.name}! 🌸`);
      router.push(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fillAdmin = () =>
    setForm({ email: "admin@janvimakeover.com", password: "Admin@1234" });
  const fillUser = () =>
    setForm({ email: "priya@example.com", password: "User@1234" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🌸</div>
            <h1
              className="text-2xl font-bold text-gray-800"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to Janvi Makeover
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="you@example.com"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "🌸 Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-rose-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>

          {/* Demo Credentials - clickable */}
          <div className="mt-5 p-4 bg-pink-50 rounded-2xl border border-pink-100">
            <p className="text-xs text-gray-500 text-center font-semibold mb-3">
              🔑 Demo Credentials (Click to fill)
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={fillAdmin}
                className="w-full text-left text-xs bg-white border border-rose-200 rounded-xl px-3 py-2.5 hover:bg-rose-50 transition-colors"
              >
                <span className="font-bold text-rose-600">👑 Admin:</span>
                <span className="text-gray-600 ml-2">
                  admin@janvimakeover.com
                </span>
                <span className="text-gray-400 ml-2">/ Admin@1234</span>
              </button>
              <button
                type="button"
                onClick={fillUser}
                className="w-full text-left text-xs bg-white border border-pink-200 rounded-xl px-3 py-2.5 hover:bg-pink-50 transition-colors"
              >
                <span className="font-bold text-pink-600">👤 User:</span>
                <span className="text-gray-600 ml-2">priya@example.com</span>
                <span className="text-gray-400 ml-2">/ User@1234</span>
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Run <code className="bg-gray-100 px-1 rounded">npm run seed</code>{" "}
              first if not working
            </p>
          </div>

          <p className="text-center mt-5">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-rose-500"
            >
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
