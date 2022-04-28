import { Form } from "@remix-run/react";
import { useRef, useState } from "react";

export default function Test() {
  const [fileDetails, setFileDetails] = useState("");
  const downloadButton = useRef();
  const handleChange = (e) => {
    setFileDetails(e.target.files[0].name);
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // downloadButton.current.href = reader.result;
    };
    reader.onerror = (error) => {
      console.log(error);
    };

    // console.log(e.target.files[0]);
  };
  return (
    <>
      <Form method="post" encType="multipart/form-data">
        <input type="file" name="myimage" onChange={handleChange} />
        <button type="submit">submit</button>
      </Form>
      <a href="#S" download={fileDetails || "image.png"} ref={downloadButton}>
        Download
      </a>
    </>
  );
}
