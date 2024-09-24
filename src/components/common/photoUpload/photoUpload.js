import React, { useState, useEffect, useRef } from "react";
import api from "../../../services/api";
import "./photoForm.css"
import placeholderImage from "../../../assets/images/img-placeholder.png";

const PhotoUpload = ({ serverData }) => {
    // photo & preview
    const [selectFile, setSelectFile] = useState(null);
    const [preview, setPreview] = useState(null);
    // complete upload
    const [isUploadBtnVisible, setUploadBtnVisible] = useState(false)
    const [isServerDataVisible, setServerDataVisible] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const fileInputRef = useRef(null)

    // load image from localStorage
    useEffect(() => {
        // БРАТЬ КАРТИНКИ ИЗ ХРАНИЛИЩА НА СЕРВЕРЕ, А НЕ В ЛОКАЛЬНОМ ХРАНИЛИЩЕ
        const savedImage = localStorage.getItem("uploadedImage");
        // localStorage.clear() // to clear all images from localStorage
        if (savedImage) {
            setPreview(savedImage);
        } else {
            setPreview(placeholderImage);
        }
    }, []);

    // For update state of image form
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setSelectFile(file);
            setPreview(previewURL);

            localStorage.setItem("uploadedImage", previewURL);
            setServerDataVisible(false)
            setUploadBtnVisible(true);
        }
    };

    // upload confirm
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append('photo', selectFile);

        try {
            const response = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully', response.data);
            // Set loading to false and show success message after a delay
            setTimeout(() => {
                setLoading(false);
                setServerDataVisible(false)
                setSuccessMessage(true);

                // Hide success message after a delay
                setTimeout(() => {
                    setSuccessMessage(false);
                    setServerDataVisible(true)
                }, 2000);
            }, 2000); // Delay to simulate loading time
            setUploadBtnVisible(false);
            setServerDataVisible(true)
        } catch (error) {
            console.error('Error uploading file:', error);
            setLoading(false);
        }
    };

    // draw form
    return (
        <div className="photoFormContainer">
            <form className="photoForm" onSubmit={handleSubmit}>
                <input
                    className="photoFormInput"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Скрыть input
                    ref={fileInputRef}
                />
                <label className="photoInput" htmlFor="fileInput" onClick={() => fileInputRef.current.click()}>
                    <div className="imageContainer">
                        {isLoading ? (
                            <h2 className="loading">Loading...</h2>
                        ) : (
                            <img
                                src={preview || "/images/img-placeholder.png"}
                                alt="Preview"
                                className="photoPreview"
                            />
                        )}
                    </div>
                </label>
                <div className="messages">
                    {isUploadBtnVisible && (
                        <button className="photoFormBtn" type="submit">Upload photo</button>
                    )}
                    {successMessage && (
                        <h2 className="successfulMessage">Successful!</h2>
                    )}
                    {isServerDataVisible && serverData && <h4 className="serverDataH4">{serverData}</h4>}
                </div>
            </form>
        </div>
    );
};

export default PhotoUpload;
