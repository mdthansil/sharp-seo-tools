import { Form, useActionData } from "@remix-run/react";

export const action = async ({ request }) => {
  let form = await request.formData();
  let { input, operation } = Object.fromEntries(form);
  const res = {
    body: "",
    errors: [],
  };

  if (!!input) {
    if (operation == "encode") {
      res.body = Buffer.from(input).toString("base64");
    }
    if (operation == "decode") {
      res.body = Buffer.from(input, "base64").toString("utf-8");
    }
  } else {
    res.errors.push("Please enter a valid Url");
  }
  return res;
};

export const meta = () => {
  return {
    title: "Base64 Encoder/Decoder - Sharp Seo Tools",
  };
};

export default function Base64EncoderDecoder() {
  const data = useActionData();

  return (
    <>
      <div className='text-center px-4 mt-12 mb-8 flex flex-col items-center justify-center'>
        <h2 className='font-bold text-2xl tracking-wide'>
          Online Base64 Encoder/Decoder
        </h2>
        <p className='text-sm text-gray-500 tracking-wide mt-2 max-w-xl'>
          Whether you want to encode or decode your string to Base64, You can
          simply enter text in to text box and click relevant button either
          "Encode" or "Decode"
        </p>
      </div>
      <section className='bg-white rounded-md p-4'>
        <Form method='post'>
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label
                htmlFor='input'
                className='font-medium mb-3 block text- text-base'>
                Enter Text to Encode or Decode
              </label>
              <textarea
                id='input'
                name='input'
                placeholder='Write here...'
                className='w-full border border-gray-200 p-2 rounded-md resize-none text-base outline-none'
                rows={5}></textarea>
            </div>
            <div>
              <label
                htmlFor='output'
                className='font-medium mb-3 block text-base'>
                Encoded/Decoded Output
              </label>
              <textarea
                id='output'
                readOnly
                placeholder='Output'
                className='w-full border border-gray-200 p-2 rounded-md resize-none text-base outline-none'
                rows={5}
                value={data?.body}></textarea>
            </div>
          </div>
          <div className='flex justify-center space-x-3 mt-5'>
            <button
              type='submit'
              value='encode'
              name='operation'
              className='bg-primary text-white px-5 py-2 block rounded-md hover:bg-opacity-90'>
              Encode
            </button>
            <button
              type='submit'
              name='operation'
              value='decode'
              className='bg-primary text-white px-5 py-2 block rounded-md hover:bg-opacity-90'>
              Decode
            </button>
          </div>
        </Form>
      </section>
      <section className='bg-white rounded-md p-4 mt-5'>
        <h2 className='font-semibold mb-3 text-xl border-b border-gray-100 pb-3'>
          About Online Base64 Encoder/Decoder
        </h2>
        <div className='text-base text-gray-500 font-light'>
          <p>
            Sharp SEO Tools bring you the smartest and fastest online Base64
            Encoder/Decoder tool for free!
          </p>
          <p className='mt-1'>
            This online Base64 Encoder/Decoder tool is extremely helpful to
            encode a string to base64 or decode a string to human readable
            format. Base64 encoding schemes are commonly used when there is a
            need to encode binary data, especially when that data needs to be
            stored and transferred over media that are designed to deal with
            text. This encoding helps to ensure that the data remains intact
            without modification during transport. Base64 is used commonly in a
            number of applications including email via MIME, as well as storing
            complex data in XML or JSON.
          </p>
        </div>
      </section>
    </>
  );
}
