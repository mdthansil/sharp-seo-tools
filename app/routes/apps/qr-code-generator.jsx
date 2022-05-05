import {
  Form,
  useActionData,
  useFetcher,
  useTransition,
} from "@remix-run/react";
import React, { useEffect, useState } from "react";
import {
  RiAddCircleFill,
  RiContactsBook2Line,
  RiDownloadLine,
  RiFileCopyLine,
  RiFileTextLine,
  RiIndeterminateCircleFill,
  RiLink,
  RiMailLine,
  RiMessage2Line,
  RiPhoneLine,
  RiText,
  RiWifiLine,
} from "react-icons/ri";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import QRCode from "qrcode";

const qrCodeTypes = {
  url: "url",
  vCard: "vCard",
  text: "text",
  wifi: "wifi",
  email: "email",
  sms: "sms",
  phone: "phone",
};

export const meta = () => {
  return {
    title: "Online QR Code Generator  - Sharp Seo Tools",
    description:
      "QR Code Generator is an online tools that let you generate QR Code instantly for you, It supports URL, VCard, Text, WIFI, Email, SMS, Phone etc...",
    keywords:
      "qrcode, qr code, qr code generator, barcode, barcode generator, online qr, keywords",
  };
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const data = Object.fromEntries(form);

  let qrCodeData = "";

  const { action, errorCorrectionLevel, imageSize } = data;

  if (action === qrCodeTypes.url) {
    const { url } = data;
    qrCodeData = url;
  }

  if (action === qrCodeTypes.vCard) {
    let { fullName, email, phone, address } = data;
    qrCodeData = "";
    qrCodeData += "BEGIN:VCARD\n";
    qrCodeData += "VERSION:3.0\n";
    qrCodeData += "N:" + fullName + "\n";
    qrCodeData += "EMAIL:" + email + "\n";
    qrCodeData += "TEL;CELL:" + phone + "\n";
    qrCodeData += "ADR:" + address + "\n";
    qrCodeData += "END:VCARD";
  }

  if (action === qrCodeTypes.text) {
    const { text } = data;
    qrCodeData = text;
  }

  if (action === qrCodeTypes.wifi) {
    const { ssid, password, encryption, isHidden } = data;
    qrCodeData = `WIFI:T:${encryption};S:${ssid};P:${password};H:${isHidden};;`;
  }

  if (action === qrCodeTypes.email) {
    let { email, subject, message } = data;
    qrCodeData = `mailto:${email}?subject=${subject}&body=${message}`;
  }

  if (action === qrCodeTypes.sms) {
    const { phone, message } = data;
    qrCodeData = `sms:${phone}:${message}`;
  }

  if (action === qrCodeTypes.phone) {
    const { phone } = data;
    qrCodeData = `tel:${phone}`;
  }

  if (qrCodeData) {
    const qrImage = await QRCode.toDataURL(qrCodeData, {
      margin: 5,
      errorCorrectionLevel: parseInt(errorCorrectionLevel),
      type: "image/png",
      version: 7,
      width: parseInt(imageSize),
      rendererOpts: {
        quality: 1,
      },
    });
    return qrImage;
  } else {
    return null;
  }
};

export default function QrCodeGenerator() {
  const qrForm = useFetcher();

  const [activeTab, setActiveTab] = useState(qrCodeTypes.url);

  const handleTab = (e) => {
    const _activeTab = e.currentTarget.getAttribute("data-key");
    setActiveTab(_activeTab);
  };

  const handleResult = async (action) => {
    if (action === "download" && qrForm.data) {
      const image = await fetch(qrForm.data);
      toast.success("Downloading Started.");
      saveAs(await image.blob(), `QR-Code-${Date.now()}.png`);
    }
  };

  return (
    <>
      <div className="text-center px-4 mt-8 mb-5 flex flex-col items-center justify-center bg-white rounded-md  py-6">
        <h2 className="font-bold text-2xl">Online QR Code Generator</h2>
        <p className="text-sm text-gray-500  mt-1 max-w-xl">
          Whether you want to generate QR Code for URL, VCard, Text, WIFI, Email
          etc. you can simply use this tool to generate it.
        </p>
      </div>
      <section className="bg-white rounded-md p-8">
        <div>
          <ul className="horizontal-tab ">
            <li
              className={`horizontal-tab-item ${
                activeTab === qrCodeTypes.url ? `active` : ``
              }`}
              data-key={qrCodeTypes.url}
              onClick={handleTab}>
              <RiLink />
              <span>URL</span>
            </li>
            <li
              className={`horizontal-tab-item ${
                activeTab === qrCodeTypes.vCard ? `active` : ``
              }`}
              data-key={qrCodeTypes.vCard}
              onClick={handleTab}>
              <RiContactsBook2Line />
              <span>VCard</span>
            </li>
            <li
              className={`horizontal-tab-item ${
                activeTab === qrCodeTypes.text ? `active` : ``
              }`}
              data-key={qrCodeTypes.text}
              onClick={handleTab}>
              <RiFileTextLine />
              <span>Text</span>
            </li>
            <li
              className={`horizontal-tab-item ${
                activeTab === qrCodeTypes.wifi ? `active` : ``
              }`}
              data-key={qrCodeTypes.wifi}
              onClick={handleTab}>
              <RiWifiLine />
              <span>WIFI</span>
            </li>
            <li
              className={`horizontal-tab-item ${
                activeTab === qrCodeTypes.email ? `active` : ``
              }`}
              data-key={qrCodeTypes.email}
              onClick={handleTab}>
              <RiMailLine />
              <span>Email</span>
            </li>
            <li
              className={`horizontal-tab-item ${
                activeTab === qrCodeTypes.sms ? `active` : ``
              }`}
              data-key={qrCodeTypes.sms}
              onClick={handleTab}>
              <RiMessage2Line />
              <span>SMS</span>
            </li>
            <li
              className={`horizontal-tab-item ${
                activeTab === qrCodeTypes.phone ? `active` : ``
              }`}
              data-key={qrCodeTypes.phone}
              onClick={handleTab}>
              <RiPhoneLine />
              <span>Phone</span>
            </li>
          </ul>
        </div>
        <qrForm.Form method="post" autoComplete="off" className="mt-5">
          {activeTab === qrCodeTypes.url && (
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label
                  htmlFor="url"
                  className="font-medium mb-3 block text-base">
                  Enter URL <span className="text-red-500 text-base">*</span>
                </label>
                <input
                  id="url"
                  name="url"
                  type={"url"}
                  required
                  placeholder="eg: https://example.com"
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
                />
                <span className="text-gray-400 text-xs italic tracking-wide">
                  Must include either http:// or https:// protocol
                </span>
              </div>
            </div>
          )}

          {activeTab === qrCodeTypes.vCard && (
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="font-medium mb-3 block text-base">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  placeholder="eg: John Doe"
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="font-medium mb-3 block text-base">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type={"email"}
                  placeholder="eg: mail@example.com"
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="font-medium mb-3 block text-base">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="eg: +12223334444"
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
                />
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="address"
                  className="font-medium mb-3 block text-base">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Full Address"
                  className="w-full flex-grow self-stretch border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                  maxLength={200}
                  rows={3}></textarea>
              </div>
            </div>
          )}

          {activeTab === qrCodeTypes.text && (
            <div className="grid grid-cols-1 gap-5">
              <div className="col-span-3">
                <label
                  htmlFor="text"
                  className="font-medium mb-3 block text-base">
                  Enter Text <span className="text-red-500 text-base">*</span>
                </label>
                <textarea
                  id="text"
                  name="text"
                  required
                  placeholder="Write your text (Up to 500 Characters)"
                  className="w-full flex-grow self-stretch border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                  maxLength={500}
                  rows={3}></textarea>
              </div>
            </div>
          )}

          {activeTab === qrCodeTypes.wifi && (
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="ssid"
                  className="font-medium mb-3 block text-base">
                  Network Name (SSID){" "}
                  <span className="text-red-500 text-base">*</span>
                </label>
                <input
                  id="ssid"
                  name="ssid"
                  required
                  placeholder="Network Name"
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="font-medium mb-3 block text-base">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  placeholder="WIFI Password"
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="encryption"
                  className="font-medium mb-3 block text-sm text-gray-600">
                  Encryption
                </label>
                <select
                  id="encryption"
                  name="encryption"
                  className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                  <option value="nopass">None</option>
                  <option value="WPA" selected>
                    WPA/WPA2
                  </option>
                  <option value="WEP">WEP</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="isHidden"
                  className="font-medium mb-3 block text-sm text-gray-600">
                  Is Hidden WIFI
                </label>
                <select
                  id="isHidden"
                  name="isHidden"
                  className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                  <option value="true">Yes</option>
                  <option value="false" selected>
                    No
                  </option>
                </select>
              </div>
            </div>
          )}

          {activeTab === qrCodeTypes.email && (
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="font-medium mb-3 block text-base">
                  Email Address{" "}
                  <span className="text-red-500 text-base">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  type={"email"}
                  placeholder="eg: John Doe"
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="font-medium mb-3 block text-base">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  placeholder="Email Subject"
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-medium mb-3 block text-base">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message (Up to 500 Characters)"
                  className="w-full flex-grow self-stretch border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                  maxLength={500}
                  rows={3}></textarea>
              </div>
            </div>
          )}

          {activeTab === qrCodeTypes.sms && (
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label
                  htmlFor="phone"
                  className="font-medium mb-3 block text-base">
                  Phone Number <span className="text-red-500 text-base">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="eg: +91xxxxxxxxxx"
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-medium mb-3 block text-base">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message (Up to 200 Characters)"
                  className="w-full flex-grow self-stretch border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                  maxLength={200}
                  rows={3}></textarea>
              </div>
            </div>
          )}

          {activeTab === qrCodeTypes.phone && (
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label
                  htmlFor="phone"
                  className="font-medium mb-3 block text-base">
                  Phone Number <span className="text-red-500 text-base">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  placeholder="eg: +91xxxxxxxxxx"
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-5 mt-4">
            <div>
              <label
                htmlFor="imageSize"
                className="font-medium mb-3 block text-base">
                Image Size
              </label>
              <select
                id="imageSize"
                name="imageSize"
                defaultValue="200"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="50">50x50</option>
                <option value="100">100x100</option>
                <option value="150">150x150</option>
                <option value="200">200x200</option>
                <option value="250">250x250</option>
                <option value="300">300x300</option>
                <option value="350">350x350</option>
                <option value="400">400x400</option>
                <option value="450">450x450</option>
                <option value="500">500x500</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="errorCorrectionLevel"
                className="font-medium mb-3 block text-base">
                Error Correction Level
              </label>
              <select
                id="errorCorrectionLevel"
                name="errorCorrectionLevel"
                defaultValue="L"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="L">Low (L)</option>
                <option value="M">Medium (M)</option>
                <option value="Q">Quartile (Q)</option>
                <option value="H">High (H)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center space-x-3 mt-7">
            <button
              type="submit"
              name="action"
              value={activeTab}
              className="bg-primary text-sm text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Generate QR Code
            </button>
          </div>
        </qrForm.Form>
      </section>

      {qrForm.state == "submitting" ? (
        <div className="text-center p-2">Preparing...</div>
      ) : (
        ""
      )}

      {qrForm.data && qrForm.state === "idle" && (
        <section className="bg-white rounded-md p-4 mt-5">
          <div className="mb-3 border-b border-gray-100 flex justify-between items-center pb-3">
            <h2 className="font-semibold text-xl">Results</h2>
            <div className="flex items-center space-x-2">
              <button
                className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide"
                onClick={() => handleResult("download")}>
                <RiDownloadLine /> <span>Download QR</span>
              </button>
              {/* <button
                className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide"
                onClick={() => handleResult("copy")}>
                <RiFileCopyLine /> <span>Copy</span>
              </button> */}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={qrForm.data}
              alt="QR Code"
              className="border border-gray-100 rounded-md"
            />
          </div>
        </section>
      )}
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100  pb-3">
          About QR Code Generator
        </h2>
        <div className="text-sm text-gray-500 font-light tracking-wide leading-6">
          <p>
            QR Code Generator is one of smartest free online tool from Sharp SEO
            Tools for generating QR Codes.
          </p>
          <p className="mt-1">
            QR code is the abbreviation for ‘Quick Response’ code. It is a
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
            In the future it’s expected that QR codes will replace the
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
