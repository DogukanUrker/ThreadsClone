import { useState, useEffect } from "react";
import axios from "axios";
import { fetchUsername } from "../utils/auth";
import { useNavigate } from "react-router";
import { API } from "../dependencies";
export default function Profile() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("Token");
    navigate("/");
  };
  useEffect(() => {
    axios
      .get(`${API}fetchUserByUsername/${fetchUsername()}`)
      .then((json) => setData(json.data));
  }, []);
  console.log(data);
  return (
    <>
      <div className="w-fit mt-4 text-center mx-auto text-white transition duration-200">
        <h1>{fetchUsername()}</h1>
        <button
          className="inline-block ml-2 mr-3 py-2 px-6 bg-gray-700 hover:bg-gray-800 text-sm text-white font-bold rounded-md transition duration-200"
          onClick={Logout}
        >
          sign out
        </button>
      </div>
      <input
        type="hidden"
        value={data.id}
        className="block bg-transparent border-2 border-zinc-900 text-center p-2 my-4 mx-auto rounded-md focus:ring-2 focus:outline-none focus:ring-zinc-700"
      />
      <input
        type="text"
        value={data.username}
        className="block bg-transparent border-2 border-zinc-900 text-center p-2 my-4 mx-auto rounded-md focus:ring-2 focus:outline-none focus:ring-zinc-700"
      />
      <input
        type="text"
        value={data.name}
        className="block bg-transparent border-2 border-zinc-900 text-center p-2 my-4 mx-auto rounded-md focus:ring-2 focus:outline-none focus:ring-zinc-700"
      />
      <input
        type="text"
        value={data.bio}
        className="block bg-transparent border-2 border-zinc-900 text-center p-2 my-4 mx-auto rounded-md focus:ring-2 focus:outline-none focus:ring-zinc-700"
      />
      <input
        type="text"
        value={data.link}
        className="block bg-transparent border-2 border-zinc-900 text-center p-2 my-4 mx-auto rounded-md focus:ring-2 focus:outline-none focus:ring-zinc-700"
      />
      <input type="checkbox" name="" value={data.private} />
      <button className="block mx-auto py-3 px-6 bg-gray-700 hover:bg-gray-800 text-sm text-white font-bold rounded-md transition duration-200">
        Save Changes
      </button>
      <div className="mt-12 w-fit mx-auto"></div>
    </>
  );
}
