import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../dependencies";
export default function User() {
  /* let { userName } = useParams(); */
  let { username } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}fetchUserByUsername/${username}`)
      .then((json) => setData(json.data));
  }, []);
  /* useEffect(() => {
    axios
      .get(`${API}fetchThreads/${userName}`)
      .then((json) => setData(json.data));
  }, []);
  const renderThreads = () => {
    return data.map((thread) => {
      return (
        <div>
          <div>{thread.author}</div>
          <div>{thread.thread}</div>
        </div>
      );
    });
  }; */
  return (
    <>
      <div
        className={
          "select-none text-center place-items-center w-fit mx-auto mt-16"
        }
      >
        <div className="w-fit border p-8 rounded-lg border-slate-50/25">
          <div className="flex flex-row justify-between w-96">
            <div className="mt-6 text-left">
              <div className="font-semibold text-xl n-0 ">{data.name}</div>
              <div className="font-semibold text-md m-0 ">{data.username}</div>
            </div>
            <div>
              <img src={data.profilePicture} className="w-24 rounded-full" />
            </div>
          </div>
          <div className="font-semibold w-full text-left mt-2">{data.bio}</div>
          <div className="flex flex-row justify-between w-64 h-fit mt-8">
            <div className="font-semibold">{data.followers}</div>
            <div>•</div>
            <a
              rel="noopener noreferrer"
              href={data.link}
              target="_blank"
              className="font-semibold text-slate-50/25"
            >
              {data.link}
            </a>
          </div>
        </div>
        {/* <div>{renderThreads()}</div> */}
      </div>
    </>
  );
}
