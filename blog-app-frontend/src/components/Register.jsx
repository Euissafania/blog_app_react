// import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const Register = () => {

    const navigate = useNavigate();
    // React hook
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const formSubmit = async (data) => {
        try {
            const newData = { ...data}; 
            const response = await fetch("http://localhost:8000/api/register", {
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
            
            toast("Register Successfully."); 
            navigate('/login');

        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error submitting form. Please try again."); 
        }
    };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 mx-3">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 container card border-0 shadow-lg p-5">
            <Form onSubmit={handleSubmit(formSubmit)}>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" 
                       {...register('name', { required: true })}
                       className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    />
                     {errors.name && <p className="invalid-feedback">Name field is required</p>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                       {...register('email', { required: true })}
                       className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                     {errors.email && <p className="invalid-feedback">Email field is required</p>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                       {...register('password', { required: true })}
                       className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                     {errors.password && <p className="invalid-feedback">Password field is required</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <div className="row">
                    <div className="col-2">
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                             {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                    <div className="col-10">
                        <a href="/login">
                           Already have an account?
                        </a>
                    </div>
                </div>
              

              
            </Form>
        </div>
</div>

  )
}

export default Register