import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "./../atoms/ModalAtom";
import initializeAuth from "./../Firebase/Firebase.init";

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const [selectedfile, setSelectedFile] = useState(null);
  const captionRef = useRef(null);
  const { data: session } = useSession();
  const [feedImg, setFeedImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { db, app, storage } = initializeAuth();

  const addImgToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setFeedImg(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session?.user?.username,
      captionRef: captionRef.current.value,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    const imgRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imgRef, selectedfile, "data_url").then(
      async (snapshot) => {
        const downLoadURL = await getDownloadURL(imgRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downLoadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div>
                {selectedfile ? (
                  <div>
                    <div>
                      <img
                        src={selectedfile}
                        onClick={() => setSelectedFile(null)}
                        alt=""
                        className="w-full object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                    onClick={() => filePickerRef.current.click()}
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Upload a Photo
                  </Dialog.Title>

                  <div>
                    <input
                      type="file"
                      hidden
                      ref={filePickerRef}
                      onChange={addImgToPost}
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      className="border-none focus:ring-0 text-center"
                      placeholder="Please enter a caption..."
                      ref={captionRef}
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    disabled={!selectedfile}
                    className="modal-btn disabled:opacity-30 disabled:cursor-not-allowed"
                    type="button"
                    onClick={uploadPost}
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
