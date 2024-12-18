"use client";
import { useState, useEffect } from "react";
// import Card from "../../../../../../components/card";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

export default function AdminBlogsForm() {
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    category: "",
    content: "",
  });

  // Clear form data after submission or cancellation
  const clearForm = () => {
    setFormData({
      title: "",
      subTitle: "",
      kategori: "",
      content: "",
    });
  };

  const optCategory = [
    { label: "ReactJS", value: "ReactJS" },
    { label: "PHP Programming", value: "PHP Programming" },
    { label: "VueJS", value: "VueJS" },
    { label: "React Native", value: "React Native" },
  ];

  // Handle input changes
  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handle form submission (create or update)
  async function onSubmitData() {
    try {
      // if (editorRef.current) {
      // Ensure that content from the editor is added to the formData before submission
      const updatedFormData = {
        ...formData,
        // content: editorRef.current.getContent(), // Get the content from the editor
      };

      const res = await fetch(`/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData), // Use updatedFormData
      });

      const resData = await res.json();

      // if (!resData.data) {
      //   throw new Error(resData.message);
      // }
      toast.success("Data Successfully Saved");
      // setModal(true);
      // setModalTitle("Success");
      // setModalMessage("Data successfully saved");

      // Optionally clear the form after successful submission
      clearForm();
      router.push("/admin/blogs");
      // }
    } catch (err) {
      console.error("Error:", err.message);
      toast.error("Error deleting entry");
    }
  }

  // Handle form cancellation
  const onCancel = () => {
    setModal(false);
    setModalTitle("");
    setModalMessage("");
    clearForm(); // Clear form data on cancel
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      <div className="flex mt-20 justify-center">
        <Toaster />
        <div className="md:w-3/4">
          <div className="bg-white-800 dark:bg-black dark:text-white p-5 rounded-xl">
            <h3 className="text-xl py-2">
              <b>{formData._id ? "Edit Blog" : "Add Blog"}</b>
            </h3>
            <p className="text-red-400">*indicates required</p>
            {/* <Card title="Blog Form" className="mb-5"> */}
              {/* Title */}
              <div className="row mb-5">
                <label className="font-bold">Title *</label>
                <input
                  type="text"
                  name="title"
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  value={formData.title}
                  onChange={inputHandler}
                  placeholder="Enter blog title"
                />
              </div>

              {/* Sub Title */}
              <div className="row mb-5">
                <label className="font-bold">Sub Title *</label>
                <input
                  type="text"
                  name="subTitle"
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  value={formData.subTitle}
                  onChange={inputHandler}
                  placeholder="Enter blog sub title"
                />
              </div>

              {/* Category */}
              <div className="row mb-5">
                <label className="font-bold">Category *</label>
                <select
                  name="kategori"
                  onChange={inputHandler}
                  className="bg-white border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  value={formData.kategori}
                >
                  <option value="">Please Select</option>
                  {optCategory.map((item, key) => (
                    <option key={key} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content */}
              <div className="row mb-5">
                <label className="font-bold">Content *</label>
                <textarea
                  name="content"
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  value={formData.content}
                  onChange={inputHandler}
                  placeholder="Enter blog content"
                />
                {/* <Editor
                  id="content"
                  apiKey="hz9os6h0p1826jcqknks4q1fm8yl9khctaa7nmexkf0rnx2e"
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue={formData.content}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                /> */}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onSubmitData}
                  className="mx-1 h-9 items-center justify-center px-4 rounded-md bg-amber-500"
                >
                  {formData.id ? "Update Blog" : "Submit Blog"}
                </button>
              </div>
            {/* </Card> */}
          </div>
        </div>
      </div>

      {/* Modal Dialog for showing info or error */}
      <ConfirmDialog
        onOkOnly={onCancel}
        showDialog={modal}
        title={modalTitle}
        message={modalMessage}
        onCancel={onCancel}
        onOk={onCancel}
        isOkOnly={true}
      />
    </>
  );
}
