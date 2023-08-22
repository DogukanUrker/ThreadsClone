import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../dependencies";
import { getNumberOfDays } from "../utils";

export default function Links() {
  let { userName } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${API}fetchThreads/`).then((json) => setData(json.data));
  }, []);
  const renderThreads = () => {
    return data.map((thread) => {
      return (
        <div className="m-8">
          <div>{thread.author}</div>
          <div>{thread.thread}</div>
          <div>{getNumberOfDays(thread.date)}</div>
        </div>
      );
    });
  };
  return (
    <>
      <div>
        <div className="w-fit">
          <h1 className="font-semibold text-3xl mb-8 ">{userName}</h1>
          {renderThreads()}
        </div>
      </div>
    </>
  );
}
