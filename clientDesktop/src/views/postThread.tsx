import { useNavigate, Navigate } from "react-router";
import { fetchUsername, fetchToken } from "../utils/auth";
import { useState } from "react";
import axios from "axios";
import { API } from "../dependencies";

export default function PostThread() {
  const navigate = useNavigate();
  const [thread, setThread] = useState("");
  const [media, setMedia] = useState("");
  const addThread = () => {
    if (thread == "") {
      return;
    } else {
      axios
        .post(`${API}postThread`, {
          id: "",
          author: fetchUsername(),
          thread: thread,
          media: "",
          date: "",
          time: "",
          likes: [],
          repost: [],
        })
        .then(function(response) {
          console.log(response);
          navigate(`/user/${fetchUsername()}`);
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
          <div className="container mx-auto p-4 rounded-2xl flex flex-col w-fit">
            <form>
              <textarea
                name=""
                id=""
                cols="50"
                rows="15"
                className="block bg-transparent border rounded-md p-2 w-96"
                onChange={(event) => setThread(event.target.value)}
              ></textarea>
              <button
                className="block m-auto mt-6 bg-zinc-500 p-2 text-base font-medium hover:bg-zinc-600 transition duration-200 rounded-md text-slate-50"
                type="button"
                onClick={addThread}
              >
                Post
              </button>
            </form>
          </div>
        ) : (
          <Navigate to="/login" />
        )}
      </div>
    </div>
  );
}
