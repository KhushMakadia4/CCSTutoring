import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, LoginIcon } from '@heroicons/react/solid'
import { useState } from 'react'

export default function Create() {

  const [postType, setPostType] = useState("Post Type")
  const [images, setImages] = useState([])
  
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const fileSelectedHandler = (e) =>{
  console.log(e.target.files[0].name);
  setImages([...images, e.target.files])
}


  return (
    <div>

        <h1>CREATE A POST</h1>
        <hr></hr>
        <br></br>

        <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {postType}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={()=>{
                    setPostType("Quick Question")
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
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={()=>{
                    setPostType("Tutor Question")
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
      <h1>Select Image(s) ({postType==="Quick Question" ? "1 ": "3 "} allowed)</h1>
      <input type="file" multiple onChange={fileSelectedHandler}/>
    </div>
  );
}
