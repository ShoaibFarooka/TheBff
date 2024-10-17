"use client"
import authImage from "@/assets/Rectangle 77.png";
import { isEmail } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Separator } from "../ui/separator";
import InputGroup from "../auth/InputGroup";
import { getAuthUser } from "@/lib/auth";
import { tr } from "@faker-js/faker";

type RegisterFormProps = {
    onSuccess?: Function;
    onFailure?: Function;
}

type MyFormData = {
    profilePicture: File | null;   // The uploaded file (can be a PDF, JPG, etc.), or null if no file is selected
};

const RegisterForm = ({ onSuccess, onFailure }: RegisterFormProps) => {
    const router = useRouter()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Ensure the file is selected
        if (!selectedFile) {
            alert("Please select a file.");
            return;
        }
    
        // Create a new FormData object
        const formData = new FormData(e.currentTarget);
    
        // Append the selected file to the formData
        formData.append("profilePicture", selectedFile); // Ensure the key matches the backend expectation
        formData.append("isRegisterTrainer", "true"); // Add the isRegisterTrainer field
    
        console.log("formData", formData); // Log the formData for debugging
    
        try {
            // Send the FormData to the API
            const res = await fetch("/api/auth/register-trainer", {
                method: "POST",
                // Do not set Content-Type; the browser will set it automatically
                body: formData, // Send formData directly
            });
    
            const data = await res.json(); // Parse the JSON response
    
            if (res.status === 200) {
                toast.success(
                    data.message ?? "You have been signed up successfully. Redirecting..."
                );
                onSuccess?.(); // Call onSuccess callback if provided
            } else {
                toast.error(data.message ?? "Something went wrong.");
                onFailure?.(); // Call onFailure callback if provided
            }
        } catch (error) {
            console.error("Error uploading file:", error); // Log any error
            onFailure?.(); // Call onFailure callback if provided
        }
    };
    

    return (
        <div className="max-h-[80vh] overflow-auto custom-scroll-bar pb-5">
            <div className="h-full center flex-col text-white">
                <form className="mt-2 w-full px-4 md:px-20 space-y-3" onSubmit={handleSubmit}>
                    <h3 className="text-4xl text-white text-center">Trainer Registration</h3>
                    {/* File input field */}
                    <div className="flex flex-col w-full">
                    <label className="text-white text-lg mb-2">Upload Document (PDF/JPG)</label>
                    <div className="relative flex items-center justify-center border border-dashed border-gray-500 rounded-lg h-32 hover:bg-gray-700 transition-colors">
                        <input
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            type="file"
                            accept=".pdf, .jpg, .jpeg, .png"
                            onChange={handleFileChange}
                            name="profilePicture"
                        />
                        <div className="text-center text-gray-300">
                            <p className="mb-1 text-lg">{selectedFile ? "File Uploaded" : "Click to browse"}</p>
                            <p className="text-sm mt-2 text-gray-400">Accepted formats: PDF, JPG, PNG</p>
                        </div>
                    </div>

                    {/* Show indication of the uploaded file */}
                    {selectedFile && (
                        <div className="mt-2 text-green-500 text-sm">
                            <p>File "{selectedFile.name}" has been uploaded successfully!</p>
                        </div>
                    )}
                </div>
                    {/* Submit button */}
                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};


const TrainerRegisterationForm = () => {

    return (
        <main className="mt-[5.5rem] min-h-[70vh] px-5 md:px-14 lg:px-40">
            <div className="grid w-full h-full backdrop-blur-md rounded-lg">
                <div className="col-span-1">
                    {/* <AuthForm signup={signup} /> */}
                    <RegisterForm />
                </div>
            </div>

            <Toaster />
        </main>
    );
};

export default TrainerRegisterationForm;
