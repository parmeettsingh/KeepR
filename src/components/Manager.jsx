import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("🦄 Copied to clipboard!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current;
    console.log(passwordRef.current.src);
    if (passwordRef.current) {
      passwordRef.current.type =
        passwordRef.current.type === "password" ? "text" : "password";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" });
      console.log({ ...form, id: uuidv4() });
      toast("🦄 Password saved!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: 🦄 Password not saved!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword = (id) => {
    const updatedPasswords = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    toast("🦄 Password deleted!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const editPassword = (id) => {
    setform(passwordArray.find((item) => item.id === id));
    const updatedPasswords = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="text-white md:mycontainer p-3 sm:p-4 md:p-0 min-h-[85vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-yellow-500"> &lt;</span>
          <span>Keep</span>
          <span className="text-yellow-500">R/&gt;</span>
        </h1>
        <p className="text-lg text-center mb-4">Keep your password save..</p>

        <div className="text-black flex flex-col p-4 gap-8 items-center w-full max-w-3xl mx-auto">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-yellow-500 w-full p-3 sm:p-4 py-1"
            type="text"
            name="site"
            id="site"
          />

          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-yellow-500 w-full p-3 sm:p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-yellow-500 w-full p-3 sm:p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[6px] top-[6px] sm:right-[10px] sm:top-[8px] cursor-pointer"
                onClick={showPassword}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/dicvhxpz.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#000000,secondary:#eee966"
                ></lord-icon>
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 rounded-full px-6 sm:px-8 py-2 w-full sm:w-fit text-white bg-violet-800 hover:bg-violet-600 border border-yellow-500"
          >
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover"
              stroke="bold"
              state="hover-swirl"
              colors="primary:#000000,secondary:#eee966"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords overflow-x-auto mt-6">
          <h2 className="font-bold text-2xl py-3 text-center md:text-left">
            Your Saved Passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-center text-gray-300 py-4">
              No passwords saved yet.
            </div>
          )}
          {passwordArray.length != 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm sm:text-base rounded-md mb-10 border-collapse">
                <thead className="bg-yellow-500 text-black">
                  <tr>
                    <th className="py-2 px-3">Site</th>
                    <th className="py-2 px-3">Username</th>
                    <th className="py-2 px-3">Password</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-black">
                  {passwordArray.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 border border-white text-center break-all">
                        <div className="flex items-center justify-center gap-1 flex-wrap">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>{item.site}</span>
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/jectmwqf.json"
                              trigger="hover"
                              stroke="bold"
                              state="hover-squeeze"
                              colors="primary:#121331,secondary:#8930e8"
                              style={{
                                width: "25px",
                                height: "25px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center break-all">
                        <div className="flex items-center justify-center gap-1 flex-wrap">
                          {item.username}
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/jectmwqf.json"
                              trigger="hover"
                              stroke="bold"
                              state="hover-squeeze"
                              colors="primary:#121331,secondary:#8930e8"
                              style={{
                                width: "25px",
                                height: "25px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center break-all">
                        <div className="flex items-center justify-center gap-1 flex-wrap">
                          {item.password}
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/jectmwqf.json"
                              trigger="hover"
                              stroke="bold"
                              state="hover-squeeze"
                              colors="primary:#121331,secondary:#8930e8"
                              style={{
                                width: "25px",
                                height: "25px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center">
                        <div className="flex justify-center gap-2">
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/exymduqj.json"
                              trigger="in"
                              delay="1500"
                              stroke="bold"
                              state="in-dynamic"
                              colors="primary:#121331,secondary:#8930e8"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() => deletePassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/jzinekkv.json"
                              trigger="morph"
                              stroke="bold"
                              state="morph-trash-in"
                              colors="primary:#121331,secondary:#8930e8"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
