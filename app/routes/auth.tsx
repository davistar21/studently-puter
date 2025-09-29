// src/pages/AuthPage.tsx
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import ThemeToggle from "~/components/ThemeToggle";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  return [
    { title: "Studently | Auth" },
    { name: "description", content: "Log into your account" },
  ];
};

export default function AuthPage() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  // const next = location.search.split("next=")[1];
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const next = searchParams.get("next");
  const [authIntent, setAuthIntent] = useState(false);

  useEffect(() => {
    console.log(isLoading);
    console.log(auth.user?.username);
    console.log(auth.isAuthenticated);
    if (auth.isAuthenticated && next) {
      navigate(next);
    }
  }, [auth.isAuthenticated]);
  // const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-no-repeat bg-center min-h-screen h-[100vh] relative">
      <div className="flex px-3 min-md:mx-10 justify-between items-center w-full">
        {/* <h1 className="">Studently</h1> */}
      </div>

      {/* Headline */}
      {/* <h2 className="!font-semibold">{isLogin ? "Welcome Back" : "Join Us"}</h2> */}

      <div className="w-full max-w-[60vw] bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-16 dark:bg-glass mx-auto mt-[20%] items-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="">Welcome</h1>
          <span>@{auth.user?.username || "new_user"}</span>
          <h2>Log in to continue your journey.</h2>
        </div>{" "}
        <div>
          <>
            {auth.isAuthenticated ? (
              <button
                className="auth-button"
                onClick={() => {
                  setAuthIntent(true);
                  auth.signIn();
                }}
              >
                <p>
                  {authIntent || isLoading ? "Signing you in..." : "Log in"}
                </p>
              </button>
            ) : (
              <button className="auth-button" onClick={auth.signIn}>
                <p>Log in</p>
              </button>
            )}
          </>
        </div>
        {/* Logo */}
        {/* Form */}
        {/* <form>
          <label htmlFor="" className="w-full">
            <input type="email" placeholder="Email" className="" />
          </label>
          <label htmlFor="" className="w-full">
            <input type="password" placeholder="Password" className="" />
          </label>

          {!isLogin && (
            <label htmlFor="" className="w-full">
              <input
                type="password"
                placeholder="Confirm Password"
                className=""
              />
            </label>
          )}
          {isLogin && (
            <div className="flex justify-end ml-auto">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form> */}
        {/* Divider */}
        {/* <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
 */}
        {/* Social Login */}
        {/* <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
          <FcGoogle size={20} />
          <span className="text-sm text-gray-600 font-medium">
            Continue with Google
          </span>
        </button> */}
        {/* Toggle Auth */}
        {/* <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p> */}
      </div>
    </div>
  );
}
