import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, Textarea } from "@material-tailwind/react"; // Import Textarea component
import { useDispatch, useSelector } from "react-redux";
import { addHTMLArticles, getArticleDetails, updateHTMLArticle } from "../../../redux/actions/articleActions";
import Loader from "../../../Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { resetSuccess, resetUpdate } from "../../../redux/slices/articleSlice";
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

const EditArticle = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isUpdated, articleDetails } = useSelector((state) => state.articles);

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
        dispatch(updateHTMLArticle(req));
    };

    useEffect(() => {
        if (isUpdated) {
            dispatch(resetUpdate());
            navigate('/admin/resources');
        }
    }, [isUpdated, navigate, dispatch])

    useEffect(() => {
        dispatch(getArticleDetails(id));
    }, [dispatch])

    useEffect(() => {
        if (articleDetails) {
            console.log("Article Details: ", articleDetails);
            setTitle(articleDetails.title);
            setDescription(articleDetails.description);
            setContent(articleDetails.content);
        }
    }, [articleDetails])
    return (
        <div className="p-4 space-y-4">

            <h1 className="text-2xl font-bold">Edit Article</h1>

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
                Save Article
            </Button>}




        </div>
    );
};

export default EditArticle;
