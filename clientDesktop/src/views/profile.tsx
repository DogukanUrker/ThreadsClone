import { useState, useEffect } from "react";
import axios from "axios";
import { fetchUsername } from "../utils/auth";
import { useNavigate } from "react-router";
import { API } from "../dependencies";
import { setPublic, setPrivate, saveChanges } from "../utils";
export default function Profile() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [mail, setMail] = useState("");
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
      <div className="w-fit mx-auto text-center my-4">
        <p className="mb-1 font-medium text-slate-50/75">username</p>
        <input
          type="text"
          value={data.username}
          onChange={(e) => setUsername(e.target.value)}
          className="block bg-transparent border-2 border-zinc-900 text-center p-2 rounded-md focus:ring-2 focus:outline-none focus:ring-zinc-700"
        />
      </div>
      <div className="w-fit mx-auto text-center my-4">
        <p className="mb-1 font-medium text-slate-50/75">name</p>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setName(e.target.value)}
          className="block bg-transparent border-2 border-zinc-900 text-center p-2 rounded-md focus:ring-2 focus:outline-none focus:ring-zinc-700"
        />
      </div>
      <div className="w-fit mx-auto text-center my-4">
        <p className="mb-1 font-medium text-slate-50/75">mail</p>
        <input
          type="text"
          value={data.email}
          onChange={(e) => setMail(e.target.value)}
          className="block bg-transparent border-2 border-zinc-900 text-center p-2 rounded-md focus:ring-2 focus:outline-none focus:ring-zinc-700"
        />
      </div>
      <div className="w-fit mx-auto text-center my-4">
        <p className="mb-1 font-medium text-slate-50/75">bio</p>
        <input
          type="text"
          value={data.bio}
          onChange={(e) => setBio(e.target.value)}
          className="block bg-transparent border-2 border-zinc-900 text-center p-2 rounded-md focus:ring-2 focus:outline-none focus:ring-zinc-700"
        />
      </div>
      <div className="w-fit mx-auto text-center my-4">
        <p className="mb-1 font-medium text-slate-50/75">bio url</p>
        <input
          type="text"
          value={data.link}
          onChange={(e) => setLink(e.target.value)}
          className="block bg-transparent border-2 border-zinc-900 text-center p-2 rounded-md focus:ring-2 focus:outline-none focus:ring-zinc-700"
        />
      </div>
      <button
        onClick={() => saveChanges(data.id, username, name, bio, link, mail)}
        className="block mx-auto py-3 px-6 mb-6 bg-gray-700 hover:bg-gray-800 text-sm text-white font-bold rounded-md transition duration-200"
      >
        Save Changes
      </button>
      {data.private ? (
        <div>
          <button
            onClick={() => setPublic(data.id)}
            className="block mx-auto py-3 px-6 bg-gray-700 hover:bg-gray-800 text-sm text-white font-bold rounded-md transition duration-200"
          >
            set account visibility to PUBLIC
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setPrivate(data.id)}
            className="block mx-auto py-3 px-6 bg-gray-700 hover:bg-gray-800 text-sm text-white font-bold rounded-md transition duration-200"
          >
            set account visibility to PRIVATE
          </button>
        </div>
      )}
      <div className="mt-12 w-fit mx-auto"></div>
    </>
  );
}
