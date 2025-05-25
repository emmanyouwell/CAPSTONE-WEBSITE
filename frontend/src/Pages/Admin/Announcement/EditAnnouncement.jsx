import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, Textarea } from "@material-tailwind/react"; // Import Textarea component
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { resetUpdate } from "../../../redux/slices/announcementSlice";
import { getAnnouncementDetails, updateHTMLAnnouncement } from "../../../redux/actions/announcementActions";
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

const EditAnnouncement = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isUpdated, announcementDetails } = useSelector((state) => state.announcements);

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
            id: id,
        };
        dispatch(updateHTMLAnnouncement(req));
    };

    useEffect(() => {
        if (isUpdated) {
            dispatch(resetUpdate());
            navigate('/dashboard/announcement');
        }
    }, [isUpdated, navigate, dispatch])

    useEffect(() => {
        dispatch(getAnnouncementDetails(id));
    }, [dispatch])

    useEffect(() => {
        if (announcementDetails) {
            console.log("Article Details: ", announcementDetails);
            setTitle(announcementDetails.title);
            setDescription(announcementDetails.description);
            setContent(announcementDetails.content);
        }
    }, [announcementDetails])
    return (
        <div className="p-4 space-y-4">

            <h1 className="text-2xl font-bold">Edit Announcement</h1>

            {/* Title Input */}
            <Input
                label="Announcement Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />

            {/* Description Input */}
            <Textarea
                label="Announcement Description"
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
                Save Announcement
            </Button>}




        </div>
    );
};

export default EditAnnouncement;
