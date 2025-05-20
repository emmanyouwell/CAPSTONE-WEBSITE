import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, Textarea } from "@material-tailwind/react"; // Import Textarea component
import { useDispatch, useSelector } from "react-redux";
import { addHTMLArticles } from "../../../redux/actions/articleActions";
import Loader from "../../../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { resetSuccess } from "../../../redux/slices/articleSlice";
import { addHTMLAnnouncements } from "../../../redux/actions/announcementActions";
const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, false] }],
            [{ align: [] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
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

const CreateAnnouncement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.articles);

    const [title, setTitle] = useState(""); // 🔥 Title state
    const [description, setDescription] = useState(""); // 🔥 Description state
    const [content, setContent] = useState(""); // 🔥 Content state
    const [show, setShow] = useState(false);

    const onSave = () => {
        console.log({ title, description, content });
        const req = {
            title: title,
            description: description,
            content: content,
        };
        dispatch(addHTMLAnnouncements(req));
    };

    useEffect(()=>{
        if (success){
            console.log("Success");
            navigate('/dashboard/announcement');
            dispatch(resetSuccess());
        }
    },[success, navigate, dispatch])

    return (
        <div className="p-4 space-y-4">

            <h1 className="text-2xl font-bold">Create New Announcement</h1>

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

            {/* ReactQuill Editor */}
            <ReactQuill value={content} onChange={setContent} modules={modules} formats={formats} />

            {/* Save Button */}
            {loading ? (
                <Loader />
            ) : <Button className="bg-secondary mt-4" size="sm" onClick={onSave}>
                Publish Announcement
            </Button>}




        </div>
    );
};

export default CreateAnnouncement;
