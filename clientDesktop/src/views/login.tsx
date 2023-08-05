import { useNavigate, Navigate } from "react-router";
import { fetchToken, setToken, setUsername } from "../utils/auth";
import { useState } from "react";
import axios from "axios";
import { API } from "../dependencies";
export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (username == "" && password == "") {
      return;
    } else {
      axios
        .post(`${API}login`, {
          username: username,
          password: password,
        })
        .then(function(response) {
          if (response.data.token) {
            setToken(response.data.token);
            setUsername(response.data.user);
            navigate("/profile");
          }
        })
        .catch(function(error) {
          alert("user not found");
          console.log(error, "error");
        });
    }
  };

  return (
    <div>
      <div className="grid h-screen place-items-center select-none">
        {fetchToken() ? (
          <Navigate to="/profile" />
        ) : (
          <div className="container mx-auto w-64 p-4 bg-zinc-800 rounded-2xl">
            <form className="flex items-stretch flex-wrap">
              <input
                type="text"
                autoComplete="new-password"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="block mx-auto my-2 border-2 text-center border-solid border-zinc-400 p-1 rounded-md transition duration-200 outline-zinc-700 bg-zinc-800/50 text-white focus:outline-none focus:ring focus:ring-zinc-400"
              />
              <input
                type="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="block mx-auto my-2 border-2 text-center border-solid border-zinc-400 p-1 rounded-md transition duration-200 outline-zinc-700 bg-zinc-800/50 text-white focus:outline-none focus:ring focus:ring-zinc-400"
              />
              <button
                type="button"
                onClick={login}
                className="block m-auto my-2 bg-zinc-500 p-2 text-base font-medium hover:bg-zinc-600 transition duration-200 rounded-md text-slate-50"
              >
                Login
              </button>
              <div className="mt-1 text-sm text-center w-full text-white">
                Don't have an account?&ensp;
                <a
                  href="/signup"
                  className="text-zinc-500 hover:text-zinc-600 transition duration-150 font-semibold"
                >
                  Signup
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
