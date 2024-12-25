// import React from 'react'
import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const CreateBlog = () => {

    // Text Editor
    const [html, setHtml] = useState('');
    const [imageId, setImageId] = useState('');

    const navigate = useNavigate();
    
    function onChange(e) {
        setHtml(e.target.value);
    }
    
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("http://localhost:8000/api/save-temp-image/", {
                method: 'POST',
                body: formData
            });

            const result = await res.json();

            if (!res.ok || result.status === false) {
                alert(result.errors?.image || "Error uploading image");
                e.target.value = null;
                return;
            }

            setImageId(result.image.id);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file");
        }
    }

    // React hook
    const { register, handleSubmit, formState: { errors } } = useForm();

    const formSubmit = async (data) => {
        try {
            const newData = { ...data, "description": html, "image_id": imageId }; 
            const response = await fetch("http://localhost:8000/api/blogs/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json(); 
            console.log("Response received:", result); // Tampilkan hasil jika diperlukan
            
            toast("Blog Added Successfully."); 

            // Arahkan kembali ke halaman utama setelah sukses
            navigate('/');

        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error submitting form. Please try again."); 
        }
    };

    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-between pt-5 mb-5">
                <h4>Create Blog</h4>
                <a href="/" className='btn btn-dark'>Back</a>
            </div>

            <div className="card border-0 shadow-lg">
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input  {...register('title', { required: true })}
                                type="text"
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                placeholder="Title"
                            />
                            {errors.title && <p className="invalid-feedback">Title field is required</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Short Description</label>
                            <textarea  {...register('shortDesc')} 
                            cols="30" rows="5"  className="form-control"></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <Editor containerProps={{ style: { height: '700px' } }} 
                            value={html} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label><br/>
                            <input type="file" onChange={handleFileChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Author</label>
                            <input {...register('author', { required: true })} 
                            type="text" className={`form-control ${errors.author && 'is-invalid'}`} placeholder="Author"/>
                            {errors.author && <p className='invalid-feedback'>Author field is required</p>}
                        </div>
                        <button type="submit" className="btn btn-dark">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog;
