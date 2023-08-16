import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../dependencies";
export default function Thread() {
  let { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${API}fetchThreadByID/${id}`).then((json) => setData(json.data));
  }, []);
  console.log(data);
  return (
    <>
      <div className="w-[40%] mx-auto mt-12 p-2 border-1 border-neutral-600 flex justify-between ">
        <div>[PROFILEPICTURE]</div>
        <div>
          <div>{data.author}</div>
          <div>{data.thread}</div>
          <div>[BUTTONS]</div>
        </div>
        <div></div>
      </div>
    </>
  );
}
