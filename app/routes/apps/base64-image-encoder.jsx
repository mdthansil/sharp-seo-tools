import { Form, useFetcher } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import {
  RiDownloadLine,
  RiFileCopyLine,
  RiUploadCloudLine,
} from "react-icons/ri";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

export const meta = () => {
  return {
    title: "Online QR Code Generator  - Sharp Seo Tools",
    description:
      "QR Code Generator is an online tools that let you generate QR Code instantly for you, It supports URL, VCard, Text, WIFI, Email, SMS, Phone etc...",
    keywords:
      "qrcode, qr code, qr code generator, barcode, barcode generator, online qr, keywords",
  };
};

const initialValues = {
  fileType: null,
  fileName: null,
  fileSize: 0,
};

const actionTypes = {
  select: "select",
  drag: "drag",
  dragEnter: "dragEnter",
  dragLeave: "dragLeave",
};

export default function Base64ImageEncoder() {
  const inputFile = useRef();
  const dropContainer = useRef();

  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState("");

  const handleUploadClick = () => {
    inputFile.current.click();
  };

  const allowDrop = (e) => {
    e.preventDefault();
    dropContainer.current.classList.remove("border-gray-300");
    dropContainer.current.classList.add("border-green-500");
  };

  const handleFile = (event, type = actionTypes.select) => {
    event.preventDefault();

    let file = null;
    if (type == actionTypes.select) {
      file = event.target.files[0];
    }
    if (type == actionTypes.drag) {
      file = event.dataTransfer.files[0];
    }
    if (file && file.size <= 2097152) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setResult(reader.result);
        console.log(reader.result);
        setValues({
          fileType: file.type,
          fileName: file.name,
          fileSize: file.size,
        });
      };
      reader.readAsDataURL(file);
    } else {
      if (file.size > 2097152) {
        toast.error("File size is too large (max 2MB allowed)");
      }
    }
    handleLeave();
  };

  useEffect(() => {
    console.log("the base: ", result);
  });

  const handleLeave = () => {
    dropContainer.current.classList.add("border-gray-300");
    dropContainer.current.classList.remove("border-green-500");
  };

  return (
    <>
      <div className="text-center px-4 mt-8 mb-5 flex flex-col items-center justify-center bg-white rounded-md py-6">
        <h2 className="font-bold text-2xl">Online QR Code Generator</h2>
        <p className="text-sm text-gray-500  mt-1 max-w-xl">
          Whether you want to generate QR Code for URL, VCard, Text, WIFI, Email
          etc. you can simply use this tool to generate it.
        </p>
      </div>
      <section className="bg-white rounded-md p-8">
        <div className="mb-6 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Image to Base64</h2>
        </div>
        <div
          className={`w-full border-2 border-dashed px-4 py-5 cursor-pointer rounded-md border-gray-300`}
          ref={dropContainer}
          onClick={handleUploadClick}
          onDrop={(e) => handleFile(e, actionTypes.drag)}
          onDragOver={allowDrop}
          onDragLeave={handleLeave}>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            hidden
            onChange={handleFile}
            ref={inputFile}
          />
          <div className="flex items-center justify-center space-x-2 text-base text-gray-400">
            <span className="text-green-500">
              <RiUploadCloudLine />
            </span>
            <span>
              <span className="text-green-500">Choose Image</span> or Drop Image
              here.
            </span>
          </div>
          {values.fileName && result && (
            <div className="flex items-center justify-center text-sm mt-3 text-gray-700">
              <div className="bg-gray-200 rounded-md p-1 flex items-center space-x-3">
                <img
                  src={result}
                  alt="Preview"
                  className="w-16 h-auto max-h-16 object-cover rounded-md block"
                />
                <span className="pr-2">{values.fileName}</span>
              </div>
            </div>
          )}
        </div>
        {result && (
          <div className="grid grid-cols-1 gap-5 mt-6">
            <div className="col-span-2 border border-gray-200 rounded-md overflow-hidden">
              <input
                type="text"
                value={result}
                className="w-full p-4 border-b border-gray-100 outline-none"
                onFocus={(e) => e.target.select()}
                readOnly
              />
              <div>
                <button className="text-primary/80 bg-gray-50 hover:bg-gray-100 flex space-x-1 items-center  py-2 px-2 uppercase text-sm font-medium tracking-wide w-full   justify-center">
                  <RiFileCopyLine /> <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="bg-white rounded-md p-8 mt-6">
        <div className="mb-6 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Base64 to Image</h2>
        </div>
        <div
          className={`w-full border-2 border-dashed px-4 py-5 cursor-pointer rounded-md border-gray-300`}
          ref={dropContainer}
          onClick={handleUploadClick}
          onDrop={(e) => handleFile(e, actionTypes.drag)}
          onDragOver={allowDrop}
          onDragLeave={handleLeave}>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            hidden
            onChange={handleFile}
            ref={inputFile}
          />
          <div className="flex items-center justify-center space-x-2 text-base text-gray-400">
            <span className="text-green-500">
              <RiUploadCloudLine />
            </span>
            <span>
              <span className="text-green-500">Choose Image</span> or Drop Image
              here.
            </span>
          </div>
          {values.fileName && result && (
            <div className="flex items-center justify-center text-sm mt-3 text-gray-700">
              <div className="bg-gray-200 rounded-md p-1 flex items-center space-x-3">
                <img
                  src={result}
                  alt="Preview"
                  className="w-16 h-auto max-h-16 object-cover rounded-md block"
                />
                <span className="pr-2">{values.fileName}</span>
              </div>
            </div>
          )}
        </div>
        {result && (
          <div className="grid grid-cols-1 gap-5 mt-6">
            <div className="col-span-2 border border-gray-200 rounded-md overflow-hidden">
              <input
                type="text"
                value={result}
                className="w-full p-4 border-b border-gray-100 outline-none"
                onFocus={(e) => e.target.select()}
                readOnly
              />
              <div>
                <button className="text-primary/80 bg-gray-50 hover:bg-gray-100 flex space-x-1 items-center  py-2 px-2 uppercase text-sm font-medium tracking-wide w-full   justify-center">
                  <RiFileCopyLine /> <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100  pb-3">
          About QR Code Generator
        </h2>
        <div className="text-sm text-gray-500 font-light tracking-wide leading-5">
          <p>
            QR Code Generator is one of smartest free online tool from Sharp SEO
            Tools for generating QR Codes.
          </p>
          <p className="mt-1">
            QR code is the abbreviation for 'Quick Response' code. It is a
            registered trademark of Denso Wave Incorporated. The QR code is a
            two dimensional barcode that is readable by smart phones, tablets,
            computers with webcams.
          </p>
          <p className="mt-2">
            Over 4000 characters can be encoded in a single QR code. Once a QR
            code is generated it cannot be changed. If an attempt is made to
            change the code it will result in a different code being produced,
            and not the original one.
          </p>
          <p className="mt-2">
            In the future it's expected that QR codes will replace the
            traditional bar codes on commercial items. There is no restriction
            on using QR codes for personal or commercial use. You will need to
            download the appropriate application to read QR codes on a smart
            phone. The QR code reader application is available across all types
            of smart phones.
          </p>
        </div>
      </section>
    </>
  );
}
