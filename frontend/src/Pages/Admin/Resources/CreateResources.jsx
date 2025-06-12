import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react"; // Import Textarea component
import { useDispatch, useSelector } from "react-redux";
import { addHTMLArticles } from "../../../redux/actions/articleActions";
import Loader from "../../../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { resetSuccess } from "../../../redux/slices/articleSlice";
const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],

            [{ indent: "-1" }, { indent: "+1" }],
            ["blockquote"]
        ],
    },
};

const formats = [
    "header",
    "align",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "image",
];

const CreateResources = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.articles);

    const [title, setTitle] = useState(""); // 🔥 Title state
    const [description, setDescription] = useState(""); // 🔥 Description state
    const [content, setContent] = useState(""); // 🔥 Content state
    const [show, setShow] = useState(false);
    const [images, setImages] = useState([]);
    const onSave = () => {
        console.log({ title, description, content });
        const req = {
            title: title,
            description: description,
            content: content,
        };
        dispatch(addHTMLArticles(req));
    };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });

        const base64 = await toBase64(file);
        setImages(base64);
    };

    useEffect(() => {
        if (success) {
            console.log("Success");
            navigate('/dashboard/resources');
            dispatch(resetSuccess());
        }
    }, [success, navigate, dispatch])

    return (
        <div className="p-4 space-y-4">

            <h1 className="text-2xl font-bold">Create New Article</h1>

            {/* Title Input */}
            <Input
                label="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />

            {/* Description Input */}
            <Textarea
                label="Article Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3} // Adjust the number of rows as needed
            />


            <Typography variant="h6" color="blue-gray" className="">
                Upload Image
            </Typography>
            <Input
                type="file"
                size="lg"
                placeholder="Upload Images"
                onChange={(e) => handleImageChange(e)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
                accept=".jpg, .jpeg, .png"
                required
                multiple
            />
            {/* ReactQuill Editor */}
            <ReactQuill value={content} onChange={setContent} modules={modules} formats={formats} />
            {/* Save Button */}
            {loading ? (
                <Loader />
            ) : <Button className="bg-secondary mt-4" size="sm" onClick={onSave}>
                Save Article
            </Button>}




        </div>
    );
};

export default CreateResources;
