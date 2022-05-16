import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Button, Form } from "react-bootstrap";
import { ChevronDownIcon, LoginIcon } from "@heroicons/react/solid";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/Firebase";

export default function Login() {
  const [pglogin, setPglogin] = useState(true);
  const router = useRouter();

  const { user, signup, login } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (pglogin) {
      try {
        await login(data.email, data.password).then((userCredential) => {
          console.log("LOGIN Successful pushing to dashboard");
          router.push("/");
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        if (data.email.toString().split("@")[1] == "students.d211.org") {
          await signup(data.email, data.password);

          const userRef = doc(db, "users", data.email.toString());
          await setDoc(userRef, {
            firstName: data.firstName,
            hours: 0,
            tutor: false,
            lastName: data.lastName,
          });
          router.push("/");
        } else {
          alert("Email must be the d211 school assigned email");
        }
      } catch (err) {
        console.log(err);
      }
    }
    console.log(data);
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            {pglogin ? "Log In" : "Sign Up"}
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
                      setPglogin(true);
                      // document.getElementById("imgDropzone").remove();
                    }}
                  >
                    Log In
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
                      setPglogin(false);
                    }}
                  >
                    Sign up
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {pglogin ? (
        <div>
          <h1 className="text-center my-3 ">Login</h1>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                value={data.email}
                required
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                value={data.password}
                required
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      ) : (
        <div>
          <h1 className="text-center my-3 ">Signup</h1>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    firstName: e.target.value,
                  })
                }
                value={data.firstName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    lastName: e.target.value,
                  })
                }
                value={data.lastName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                value={data.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                value={data.password}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Signup
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
