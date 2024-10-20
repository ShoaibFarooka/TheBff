"use client";
import React, { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import toast, { Toaster } from "react-hot-toast";
import TimeSlotSelector from "../../../src/components/trainerRegisterationForm/timeSlotScheduler";
import { CheckCircle, AlertTriangle } from "lucide-react";

type RegisterFormProps = {
    onSuccess?: Function;
    onFailure?: Function;
};

const RegisterForm = ({ onSuccess, onFailure }: RegisterFormProps) => {
    const router = useRouter();
    const [isTimeSlotOpen, setIsTimeSlotOpen] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // States for each file upload
    const [aadharFile, setAadharFile] = useState<File | null>(null);
    const [agreementFile, setAgreementFile] = useState<File | null>(null);
    const [certificationFile, setCertificationFile] = useState<File | null>(null);
    const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
    const [optionalFile, setOptionalFile] = useState<File | null>(null);

    // States for input validation
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
            setter(file);
        } else {
            setter(null);
        }
    };

    const handleTimeSlotClose = () => {
        setSelectedTimeSlot("");
        setIsTimeSlotOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const nameInput = form.elements.namedItem('name') as HTMLInputElement;
        // Validate fields
        if (!validateName(nameInput.value)) {
            console.log('e.currentTarget.name', nameInput.value);
            setNameError("Please enter a valid name.");
            return;
        } else setNameError(null);

        if (!validateEmail(e.currentTarget.email.value)) {
            console.log('e.currentTarget.email', e.currentTarget.email);
            setEmailError("Please enter a valid email.");
            return;
        } else setEmailError(null);

        if (!validatePassword(e.currentTarget.password.value)) {
            console.log('e.currentTarget.password', e.currentTarget.password);
            setPasswordError("Password must be at least 8 characters.");
            return;
        } else setEmailError(null);

        // Ensure required files and time slot are selected
        if (!aadharFile || !agreementFile || !certificationFile || !profilePhotoFile) {
            alert("Please upload all required files.");
            return;
        }

        if (!selectedTimeSlot) {
            alert("Please select an available time slot.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        formData.append("aadharFile", aadharFile);
        formData.append("agreementFile", agreementFile);
        formData.append("certificationFile", certificationFile);
        formData.append("profilePhotoFile", profilePhotoFile);

        if (optionalFile) {
            formData.append("optionalFile", optionalFile);
        }

        formData.append("availableTimeSlot", selectedTimeSlot);
        formData.append("isRegisterTrainer", "true");

        try {
            const res = await fetch("/api/auth/register-trainer", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.status === 200) {
                toast.success(data.message ?? "You have been signed up successfully. Redirecting...");
                onSuccess?.();
            } else {
                toast.error(data.message ?? "Something went wrong.");
                onFailure?.();
            }
        } catch (error) {
            console.error("Error uploading files:", error);
            onFailure?.();
        }
    };

    // Validation functions
    const validateName = (name: string) => /^[A-Za-z\s]+$/.test(name); // Letters and spaces only
    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const validatePassword = (password: string) => password.length >= 8;

    return (
        <div className="max-h-[80vh] overflow-auto custom-scroll-bar pb-5">
            <div className="h-full center flex-col text-white">
                <form className="mt-2 w-full px-4 md:px-20 space-y-3" onSubmit={handleSubmit}>
                    <h3 className="text-4xl text-white text-center">Trainer Registration</h3>

                    {/* Name */}
                    <div className="flex flex-col w-full">
                        <label className="text-white text-lg mb-2">Name</label>
                        <input type="text" name="name" className="p-2 rounded-md bg-gray-700 text-white" required />
                        {nameError && <p className="text-red-500">{nameError}</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col w-full">
                        <label className="text-white text-lg mb-2">Email</label>
                        <input type="email" name="email" className="p-2 rounded-md bg-gray-700 text-white" required />
                        {emailError && <p className="text-red-500">{emailError}</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col w-full">
                        <label className="text-white text-lg mb-2">Password</label>
                        <input type="password" name="password" className="p-2 rounded-md bg-gray-700 text-white" required />
                        {passwordError && <p className="text-red-500">{passwordError}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div className="flex flex-col w-full">
                        <label className="text-white text-lg mb-2">Mobile Number</label>
                        <input type="tel" name="mobileNumber" className="p-2 rounded-md bg-gray-700 text-white" required />
                    </div>

                    {/* Permanent Address */}
                    <div className="flex flex-col w-full">
                        <label className="text-white text-lg mb-2">Permanent Address</label>
                        <input type="text" name="permanentAddress" className="p-2 rounded-md bg-gray-700 text-white" required />
                    </div>

                    {/* Current Address */}
                    <div className="flex flex-col w-full">
                        <label className="text-white text-lg mb-2">Current Address</label>
                        <input type="text" name="currentAddress" className="p-2 rounded-md bg-gray-700 text-white" required />
                    </div>

                    {/* Current Location */}
                    <div className="flex flex-col w-full">
                        <label className="text-white text-lg mb-2">Current Location</label>
                        <input type="text" name="currentLocation" className="p-2 rounded-md bg-gray-700 text-white" required />
                    </div>

                    {/* Available Time Slots (Expandable) */}
                    <div className="flex flex-col w-full">
                        <label className="text-white text-lg mb-2">Available Time Slots</label>

                        {/* Display selected time slot or allow to reselect */}
                        <button
                            type="button"
                            onClick={() => setIsTimeSlotOpen(!isTimeSlotOpen)}
                            className="p-2 rounded-md bg-gray-700 text-white"
                        >
                            {selectedTimeSlot
                                ? `Selected Time Slot: ${selectedTimeSlot} (Click to Change)`
                                : "Select Available Time Slot"}
                        </button>

                        {/* Expandable TimeSlotSelector component */}
                        {isTimeSlotOpen && (
                            <div className="mt-2">
                                <TimeSlotSelector
                                    onClose={handleTimeSlotClose}
                                    onSelectTimeSlot={(timeSlot: string) => {
                                        setSelectedTimeSlot(timeSlot);
                                        setIsTimeSlotOpen(false);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* File input fields */}
                    <FileInput label="Upload Aadhar Card (PDF/JPG)" file={aadharFile} onFileChange={(e) => handleFileChange(e, setAadharFile)} />
                    <FileInput label="Upload Signed Agreement (PDF/JPG)" file={agreementFile} onFileChange={(e) => handleFileChange(e, setAgreementFile)} />
                    <FileInput label="Upload Certifications (PDF/JPG)" file={certificationFile} onFileChange={(e) => handleFileChange(e, setCertificationFile)} />
                    <FileInput label="Upload Profile Photo (PDF/JPG)" file={profilePhotoFile} onFileChange={(e) => handleFileChange(e, setProfilePhotoFile)} />

                    {/* Optional file input */}
                    <FileInput label="Upload Police verification certificate or passport (Optional)" file={optionalFile} onFileChange={(e) => handleFileChange(e, setOptionalFile)} />

                    {/* Submit button */}
                    <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

const FileInput = ({ label, onFileChange, file }: { label: string, onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void, file: File | null }) => (
    <div className="flex flex-col w-full">
        <label className="text-white text-lg mb-2">{label}</label>
        <div className="relative flex items-center justify-center border border-dashed border-gray-500 rounded-lg h-32 hover:bg-gray-700 transition-colors">
            <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={onFileChange}
            />
            <div className="text-center text-gray-300">
                {file ? (
                    <CheckCircle className="text-green-500 mx-auto" size={32} />
                ) : (
                    <>
                        <p className="mb-1 text-lg">Click to browse</p>
                        <p className="text-sm mt-2 text-gray-400">Accepted formats: PDF, JPG, PNG</p>
                    </>
                )}
            </div>
        </div>
    </div>
);

export default RegisterForm;
