import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, LoginIcon } from "@heroicons/react/solid";
import { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import {Button} from "react-bootstrap"

export default function Create() {
  const [postType, setPostType] = useState("Post Type");
  const [imgNumAllow, setImgNumAllow] = useState(0);
  const [images, setImages] = useState([]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log("change status", status, meta);
  };

  const handleSubmit = (files, allFiles) => {
    if (allFiles.length > 3) {
      alert("You have selected way too many files");
    } else {
      console.log(files.map((f) => f));
      allFiles.forEach((f) => f.remove());
    }
  };

  return (
    <div>
      <h1>CREATE A POST</h1>
      <hr></hr>
      <br></br>

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            {postType}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-10 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => {
                      setPostType("Quick Question");
                      setImgNumAllow(1);
                      // document.getElementById("imgDropzone").remove();
                    }}
                  >
                    Quick Question
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => {
                      setPostType("Tutor Question");
                      setImgNumAllow(3);
                    }}
                  >
                    Tutor Question
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <br></br>
      <br></br>
      <div className="mb-3 pt-0">
        <input
          id="dayNum"
          type="text"
          placeholder="Title"
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        />
      </div>
      <div className="mb-3 pt-0">
        <input
          id="dayName"
          type="text"
          placeholder="Description"
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        />
      </div>

      <br></br>
      <h1>
        Select Image(s) (Maximum of{" "}
        {postType === "Tutor Question" ? "3 " : "1 "})
      </h1>
      {/*  */}
      <Dropzone
        id="imgDropzone"
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/png"
        maxFiles={imgNumAllow}
        inputContent={(files, extra) =>
          extra.reject || files.length > imgNumAllow
            ? imgNumAllow + " PNG Images only"
            : "Drag Images or Click to Browse"
        }
        styles={{
          dropzone: { minHeight: 200, maxHeight: 250 },
          dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
          inputLabel: (files, extra) =>
            extra.reject || files.length > imgNumAllow ? { color: "red" } : {},
        }}
      />
      <br></br>
      <button onClick={handleUpload} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Post</button>

    </div>
  );
}