import { useNavigate, Navigate } from "react-router";
import { fetchToken } from "../utils/auth";
import { useState } from "react";
import axios from "axios";
import { API } from "../dependencies";
export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const addUser = () => {
    if (username == "" && email == "" && password == "" && name == "") {
      return;
    } else if (password == confirmPassword) {
      axios
        .post(`${API}signup/`, {
          id: "",
          username: username,
          email: email,
          password: password,
          name: name,
          joinDate: "",
          joinTime: "",
          profilePicture: "",
          bio: "",
          link: "",
          followers: [],
          following: [],
          private: false,
          active: true,
          confirmed: false,
        })
        .then(function(response) {
          console.log(response);
          navigate("/login");
        })
        .catch(function(error) {
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
          <div className="container mx-auto w-64 p-4  rounded-2xl">
            <form className="flex items-stretch flex-wrap">
              <input
                type="text"
                autoComplete="new-password"
                className="block mx-auto text-center my-2 border-2 border-solid border-zinc-400 bg-transparent text-white p-1 rounded-md transition outline-zinc-700 focus:outline-none focus:ring focus:ring-zinc-400"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="username"
              />
              <input
                type="text"
                autoComplete="new-password"
                className="block mx-auto text-center my-2 border-2 border-solid border-zinc-400 bg-transparent text-white p-1 rounded-md transition outline-zinc-700 focus:outline-none focus:ring focus:ring-zinc-400"
                onChange={(event) => setName(event.target.value)}
                placeholder="name"
              />
              <input
                type="email"
                autoComplete="new-password"
                className="block mx-auto text-center my-2 border-2 border-solid border-zinc-400 bg-transparent text-white p-1 rounded-md transition duration-200 outline-zinc-700 focus:outline-none focus:ring focus:ring-zinc-400"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email"
              />
              <input
                type="password"
                autoComplete="new-password"
                className="block mx-auto text-center my-2 border-2 border-solid border-zinc-400 bg-transparent text-white p-1 rounded-md transition duration-200 outline-zinc-700 focus:outline-none focus:ring focus:ring-zinc-400"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="password"
              />
              <input
                type="password"
                autoComplete="new-password"
                className="block mx-auto text-center my-2 border-2 border-solid border-zinc-400 bg-transparent text-white p-1 rounded-md transition duration-200 outline-zinc-700 focus:outline-none focus:ring focus:ring-zinc-400"
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="confirm password"
              />
              <button
                className="block m-auto my-2 bg-zinc-500 p-2 text-base font-medium hover:bg-zinc-600 transition duration-200 rounded-md text-slate-50"
                type="button"
                onClick={addUser}
              >
                Signup
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
