"use client";
import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() !== "" && desc.trim() !== "") {
      setMainTask([...mainTask, { title, desc, completed: false }]);
      setDesc("");
      setTitle("");
      toast.success("Task Added Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      alert("Please enter both task title and description.");
    }
  };

  const deleteHandler = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
    toast.success("Task Deleted", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const completeHandler = (i) => {
    let copytask = [...mainTask];
    copytask[i].completed = true;
    setMainTask(copytask);
    toast.success("Task Completed", {
      // Corrected this line
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  let renderTask = <h2>No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between mb-8">
          <div className="flex items-center justify-between w-2/3" key={i}>
            <h5
              className={
                t.completed
                  ? "line-through text-2xl font-semibold"
                  : "text-2xl font-semibold"
              }
            >
              {t.title}
            </h5>
            <h6
              className={
                t.completed
                  ? "line-through text-lg font-medium"
                  : "text-lg font-medium"
              }
            >
              {t.desc}
            </h6>
          </div>
          <div>
            <button
              onClick={() => {
                deleteHandler(i);
              }}
              className="bg-red-400 text-white px-4 py-2 rounded font bold mr-2"
            >
              Delete
            </button>
            {!t.completed && (
              <button
                onClick={() => {
                  completeHandler(i);
                }}
                className="bg-green-400 text-white px-4 py-2 rounded font bold"
              >
                Complete
              </button>
            )}
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">
        TO DO LIST:
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-5 px-4 py-2"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-5 px-4 py-2"
          placeholder="Enter Description Here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          className={`bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5 ${title.trim() === "" || desc.trim() === ""
            ? "opacity-50 cursor-not-allowed"
            : ""
            }`}
          disabled={title.trim() === "" || desc.trim() === ""}
        >
          Add Task
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-300">{renderTask}</div>
      <footer className="bg-gray-800 text-white p-4 text-center">
        Copyright &#169; Naveen Shukla
      </footer>
      <ToastContainer />
    </>
  );
};

export default Page;
