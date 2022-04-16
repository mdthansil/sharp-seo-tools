import { Form, useActionData } from "@remix-run/react";
import forge from "node-forge";

export const action = async ({ request }) => {
  let form = await request.formData();
  let { input } = Object.fromEntries(form);
  const res = {
    body: "",
    errors: [],
  };

  if (typeof input !== "undefined") {
    const hash = forge.md.sha1.create();
    hash.update(input);
    res.body = hash.digest().toHex();
  } else {
    res.errors.push("Please enter a valid text");
  }
  return res;
};

export const meta = () => {
  return {
    title: "SHA1 Hash Generator - Sharp Seo Tools",
    description: "Free SHA1 hash generator tool which generate SHA1 hashes",
    keywords: "cryptography, hashing, encoding, cryptography, SHA1",
  };
};

export default function SHA1HashGenerator() {
  const data = useActionData();

  return (
    <>
      <div className="text-center px-4 mt-12 mb-8 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl tracking-wide">
          Online SHA1 Hash Generator
        </h2>
        <p className="text-sm text-gray-500 tracking-wide mt-2 max-w-xl">
          Whether you want to generate SHA1 hash from text, You can simply enter
          text in to text box and click the generate button.
        </p>
      </div>
      <section className="bg-white rounded-md p-4">
        <Form method="post">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="input"
                className="font-medium mb-3 block text- text-base">
                Enter Text to generate SHA1 Hash
              </label>
              <textarea
                id="input"
                name="input"
                placeholder="Write here..."
                className="w-full border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                rows={5}></textarea>
            </div>
            <div>
              <label
                htmlFor="output"
                className="font-medium mb-3 block text-base">
                Hash Output
              </label>
              <textarea
                id="output"
                readOnly
                placeholder="Output"
                className="w-full border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                rows={5}
                value={data?.body}></textarea>
            </div>
          </div>
          <div className="flex justify-center space-x-3 mt-5">
            <button
              type="submit"
              className="bg-primary text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Generate SHA1 hash
            </button>
          </div>
        </Form>
      </section>
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100 pb-3">
          About Online SHA1 Hash Generator
        </h2>
        <div className="text-base text-gray-500 font-light">
          <p>
            Sharp SEO Tools bring you the smartest and fastest online SHA1
            Generator tool for free!
          </p>
          <p className="mt-1">
            This online SHA1 Hash Generator tool is extremely helpful to
            Generate SHA1 Hashes. SHA1 hashing mechanism commonly used for
            passwords, digital signature etc. <br /> The SHA1 hash non-revisable
            means once you created a SHA1 hash which cannot transform in to
            actual form.
          </p>
        </div>
      </section>
    </>
  );
}
