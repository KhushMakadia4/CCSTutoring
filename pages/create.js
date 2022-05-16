import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Button, Form } from "react-bootstrap";
import { ChevronDownIcon, LoginIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
// import { Button } from "react-bootstrap";
import { db, storage } from "../utils/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Create() {
  const [postType, setPostType] = useState("Post Type");
  const [imgNumAllow, setImgNumAllow] = useState(0);
  const [images, setImages] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

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
      // console.log("files", files)
      // console.log("allFiles", allFiles);
      // setImages(files)
      // console.log("images", images[0]);
      // console.log(files.map((f) => f));
      let tempArr = [];
      allFiles.forEach((f) => {
        tempArr.push(f.file);
      });
      setImages(tempArr);
      images.forEach((f) => console.log(f));
    }
  };

  const checkFieldsSatisfied = () => {
    return (
      postType !== "Post Type" &&
      document.getElementById("titlePost").value !== "" &&
      document.getElementById("descPost").value !== ""
    );
  };

  const handleUpload = async () => {
    if (checkFieldsSatisfied) {
      switch (postType) {
        case "Quick Question":
          console.log(
            Timestamp.now().seconds + "" + Timestamp.now().nanoseconds
          );
          const storageRef = ref(
            storage,
            "images/" +
              user.email +
              "/" +
              Timestamp.now().seconds +
              "" +
              Timestamp.now().nanoseconds
          ); //! replace second parameter with user email
          const title = document.getElementById("titlePost").value;
          const description = document.getElementById("descPost").value;
          let urlPostIm = "";
          await uploadBytes(storageRef, images[0]).then(async (snapshot) => {
            console.log("File uploaded", snapshot);
            await getDownloadURL(storageRef).then((url) => {
              urlPostIm = url;
            });
          });

          const postObj = {
            title: title,
            description: description,
            image: urlPostIm,
            resolved: false,
            // createdBy: "kmakadia4@gmail.com",
            createdBy: user.fullName,
          };
          console.log(postObj);

          const docRef = await addDoc(collection(db, "quickqs"), postObj);
          console.log("DOCID: ", docRef.id);

          // await addDoc(collection(db, "users/kmakadia4@gmail.com/posts"), {
          await addDoc(collection(db, "users/" + user.email + "/posts"), {
            postId: docRef.id,
            postType: "quickq",
          }); //!replace with logged in user

          router.push("/");
          break;
        case "Tutor Question":
          const Ttitle = document.getElementById("titlePost").value;
          const Tdescription = document.getElementById("descPost").value;
          let TurlPostIm = [];
          Promise.all(
            images.map(async (im, i) => {
              // uploadBytes
              console.log(
                Timestamp.now().seconds + "" + Timestamp.now().nanoseconds
              );
              const storageRef = ref(
                storage,
                "images/" +
                  user.email +
                  "/" +
                  Timestamp.now().seconds +
                  "" +
                  Timestamp.now().nanoseconds +
                  "" +
                  i
              );
              await uploadBytes(storageRef, im).then(async (snapshot) => {
                console.log("File uploaded");
                await getDownloadURL(storageRef).then((url) => {
                  TurlPostIm.push(url);
                });
              });
            })
          ).then(async () => {
            console.log("URL List", TurlPostIm);
            console.log("user upload create", user.fullName);

            const TpostObj = {
              title: Ttitle,
              description: Tdescription,
              image: TurlPostIm,
              resolved: false,
              // createdBy: "kmakadia4@gmail.com",
              createdBy: user.fullName,
            };
            console.log(TpostObj);

            const TdocRef = await addDoc(collection(db, "tutorqs"), TpostObj);
            console.log("DOCID: ", TdocRef.id);

            // await addDoc(collection(db, "users/kmakadia4@gmail.com/posts"), {
            await addDoc(collection(db, "users/" + user.email + "/posts"), {
              postId: TdocRef.id,
              postType: "tutorq",
            }); //!replace with logged in user

            router.push("/");
          });

          break;
      }
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
          id="titlePost"
          type="text"
          placeholder="Title"
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        />
      </div>
      <div className="mb-3 pt-0">
        <input
          id="descPost"
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
      <button
        onClick={handleUpload}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Create Post
      </button>
    </div>
  );
}
