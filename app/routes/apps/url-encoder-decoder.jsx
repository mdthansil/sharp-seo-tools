import { Form, useActionData } from "@remix-run/react";
export const action = async ({ request }) => {
  let form = await request.formData();
  let { input, action } = Object.fromEntries(form);
  console.log(input, action);
  const res = {
    body: "",
    errors: [],
  };

  if (input != "" || typeof input !== "undefined") {
    if (action == "encode") {
      res.body = encodeURIComponent(input);
    }
    if (action == "decode") {
      res.body = decodeURIComponent(input);
    }
  } else {
    res.errors.push("Please enter a valid Url");
  }
  return res;
};

export const meta = () => {
  return {
    title: "URL Encoder/Decoder - Sharp Seo Tools",
    description:
      "URL Encoder/Decoder is a free online tool to encode or decode url online",
    keywords: "cryptography, hashing, encode, decode, URL, URL Encode,",
  };
};

export default function UrlEncoderDecoder() {
  const data = useActionData();

  return (
    <>
      <div className="text-center px-4 mt-12 mb-8 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl tracking-wide">
          Online URL Encoder/Decoder
        </h2>
        <p className="text-sm text-gray-500 tracking-wide mt-2 max-w-xl">
          Whether you want to encode or decode your URL, You can simply enter
          URL in to text box and click relevant button either "Encode" or
          "Decode"
        </p>
      </div>
      <section className="bg-white rounded-md p-4">
        <Form method="post">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="input"
                className="font-medium mb-3 block text- text-base">
                Enter URL/Text to Encode or Decode
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
                Encoded/Decoded Output
              </label>
              <textarea
                readOnly
                id="output"
                placeholder="Output"
                className="w-full border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                rows={5}
                value={data?.body}></textarea>
            </div>
          </div>
          <div className="flex justify-center space-x-3 mt-5">
            <button
              type="submit"
              value="encode"
              name="action"
              className="bg-primary text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Encode
            </button>
            <button
              type="submit"
              name="action"
              value="decode"
              className="bg-primary text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Decode
            </button>
          </div>
        </Form>
      </section>
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100 pb-3">
          About Online URL Encoder/Decoder
        </h2>
        <div className="text-base text-gray-500 font-light">
          <p>
            Sharp SEO Tools bring you the smartest and fastest online URL
            Encoder/Decoder tool for free!
          </p>
          <p className="mt-1">
            This online URL Encoder/Decoder tool is extremely helpful when
            adding special characters to a URL parameter which is also known
            often referred to as percent encoding. The process of URL encoding
            involves replacement of unallowable characters with a % (percent
            sign) and additional two hexadecimal values.
          </p>
        </div>
      </section>
    </>
  );
}
