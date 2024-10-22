"use client";
import React, { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import toast, { Toaster } from "react-hot-toast";
import TimeSlotSelector from "../../../src/components/trainerRegisterationForm/timeSlotScheduler";
import {ChevronDown, ChevronUp, CheckCircle, AlertTriangle, X} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import InputGroup from "@/components/auth/InputGroup";

type AddressType = {
    house: string;
    area: string;
    pincode: string;
    city: string;
    state: string;
};

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
    const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
    const [optionalFile, setOptionalFile] = useState<File | null>(null);
    const [certificationFiles, setCertificationFiles] = useState<File[]>([]);


    // States for input validation
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);
    const [showCurrentAddress, setShowCurrentAddress] = useState(false);
    const [showPermanentAddress, setShowPermanentAddress] = useState(false);

    // Address states
    const [currentAddress, setCurrentAddress] = useState<AddressType>({
        house: "",
        area: "",
        pincode: "",
        city: "",
        state: "",
    });

    const [permanentAddress, setPermanentAddress] = useState<AddressType>({
        house: "",
        area: "",
        pincode: "",
        city: "",
        state: "",
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
            setter(file);
        } else {
            setter(null);
        }
    };

    const handleCertificationFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files); // Converts FileList to an array
            const validFiles = newFiles.filter(
                file => file.type === "application/pdf" || file.type.startsWith("image/")
            );

            if (certificationFiles.length + validFiles.length > 10) {
                toast.error("Maximum 10 certification files allowed");
                return;
            }

            setCertificationFiles(prev => [...prev, ...validFiles]);
        }
    };

    const handleRemoveCertification = (index: number) => {
        setCertificationFiles(prev => prev.filter((_, i) => i !== index));
    };
    const handleTimeSlotClose = () => {
        setSelectedTimeSlot("");
        setIsTimeSlotOpen(false);
    };

    const handleCurrentAddressChange = (field: keyof AddressType, value: string) => {
        setCurrentAddress(prev => ({
            ...prev,
            [field]: value
        }));

        if (sameAsCurrentAddress) {
            setPermanentAddress(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handlePermanentAddressChange = (field: keyof AddressType, value: string) => {
        setPermanentAddress(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSameAddressToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSameAsCurrentAddress(e.target.checked);
        if (e.target.checked) {
            setPermanentAddress(currentAddress);
        }
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
        if (!aadharFile || !agreementFile || !certificationFiles || !profilePhotoFile) {
            alert("Please upload all required files.");
            return;
        }

        if (!selectedTimeSlot) {
            alert("Please select an available time slot.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        formData.append("currentAddress", JSON.stringify(currentAddress));
        formData.append("permanentAddress", JSON.stringify(permanentAddress));
        formData.append("aadharFile", aadharFile);
        formData.append("agreementFile", agreementFile);
        certificationFiles.forEach((file, index) => {
            formData.append(`certificationFile${index}`, file);
        });

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

    const AddressFields = ({
                               type,
                               address,
                               onChange
                           }: {
        type: "current" | "permanent",
        address: AddressType,
        onChange: (field: keyof AddressType, value: string) => void
    }) => (
        <div className="space-y-3 p-4 bg-gray-800 rounded-md">
            <div className="flex flex-col">
                <label className="text-white text-sm mb-1">House/Building</label>
                <input
                    type="text"
                    value={address.house}
                    onChange={(e) => onChange("house", e.target.value)}
                    className="p-2 rounded-md bg-gray-700 text-white"
                    disabled={type === "permanent" && sameAsCurrentAddress}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-white text-sm mb-1">Area/Street</label>
                <input
                    type="text"
                    value={address.area}
                    onChange={(e) => onChange("area", e.target.value)}
                    className="p-2 rounded-md bg-gray-700 text-white"
                    disabled={type === "permanent" && sameAsCurrentAddress}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-white text-sm mb-1">Pincode</label>
                <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => onChange("pincode", e.target.value)}
                    className="p-2 rounded-md bg-gray-700 text-white"
                    disabled={type === "permanent" && sameAsCurrentAddress}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-white text-sm mb-1">City</label>
                <input
                    type="text"
                    value={address.city}
                    onChange={(e) => onChange("city", e.target.value)}
                    className="p-2 rounded-md bg-gray-700 text-white"
                    disabled={type === "permanent" && sameAsCurrentAddress}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-white text-sm mb-1">State</label>
                <input
                    type="text"
                    value={address.state}
                    onChange={(e) => onChange("state", e.target.value)}
                    className="p-2 rounded-md bg-gray-700 text-white"
                    disabled={type === "permanent" && sameAsCurrentAddress}
                />
            </div>
        </div>
    );

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

                    {/* Address Sections */}
                    <div className="space-y-4">
                        {/* Current Address */}
                        <div className="border border-gray-700 rounded-lg overflow-hidden">
                            <button
                                type="button"
                                className="w-full p-4 flex justify-between items-center bg-gray-800 hover:bg-gray-700"
                                onClick={() => setShowCurrentAddress(!showCurrentAddress)}
                            >
                                <span className="text-lg">Current Address</span>
                                {showCurrentAddress ? (
                                    <ChevronUp className="h-5 w-5" />
                                ) : (
                                    <ChevronDown className="h-5 w-5" />
                                )}
                            </button>
                            {showCurrentAddress && (
                                <AddressFields
                                    type="current"
                                    address={currentAddress}
                                    onChange={handleCurrentAddressChange}
                                />
                            )}
                        </div>

                        {/* Permanent Address */}
                        <div className="border border-gray-700 rounded-lg overflow-hidden">
                            <button
                                type="button"
                                className="w-full p-4 flex justify-between items-center bg-gray-800 hover:bg-gray-700"
                                onClick={() => setShowPermanentAddress(!showPermanentAddress)}
                            >
                                <span className="text-lg">Permanent Address</span>
                                {showPermanentAddress ? (
                                    <ChevronUp className="h-5 w-5" />
                                ) : (
                                    <ChevronDown className="h-5 w-5" />
                                )}
                            </button>
                            {showPermanentAddress && (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2 p-4">
                                        <input
                                            type="checkbox"
                                            id="same-address"
                                            checked={sameAsCurrentAddress}
                                            onChange={handleSameAddressToggle}
                                            className="h-4 w-4"
                                        />
                                        <label
                                            htmlFor="same-address"
                                            className="text-sm font-medium"
                                        >
                                            Same as Current Address
                                        </label>
                                    </div>
                                    <AddressFields
                                        type="permanent"
                                        address={permanentAddress}
                                        onChange={handlePermanentAddressChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/*/!* Current Location *!/*/}
                    {/*<div className="flex flex-col w-full">*/}
                    {/*    <label className="text-white text-lg mb-2">Current Location</label>*/}
                    {/*    <input type="text" name="currentLocation" className="p-2 rounded-md bg-gray-700 text-white" required />*/}
                    {/*</div>*/}

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
                    <MultipleFileInput
                        label="Upload Certifications (PDF/JPG) - Up to 10 files"
                        files={certificationFiles}
                        onFileChange={handleCertificationFileChange}
                        onFileRemove={handleRemoveCertification}
                    />
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
                    <>
                        <CheckCircle className="text-green-500 mx-auto" size={32} />
                        <p className="mt-2 text-sm text-white">{file.name}</p>
                    </>
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
const MultipleFileInput = ({ label, files, onFileChange, onFileRemove }: {
    label: string,
    files: File[],
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onFileRemove: (index: number) => void }) => (
    <div className="flex flex-col w-full">
        <label className="text-white text-lg mb-2">{label}</label>
        <div className="space-y-2">
            {/* File list */}
            {files.length > 0 && (
                <div className="space-y-2 mb-2">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-gray-700 p-2 rounded"
                        >
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="text-green-500" size={20} />
                                <span className="text-sm text-white">{file.name}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => onFileRemove(index)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload area */}
            {files.length < 10 && (
                <div className="relative flex items-center justify-center border border-dashed border-gray-500 rounded-lg h-32 hover:bg-gray-700 transition-colors">
                    <input
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        onChange={onFileChange}
                    />
                    <div className="text-center text-gray-300">
                        <p className="mb-1 text-lg">
                            {files.length === 0 ? 'Click to browse' : 'Add more certifications'}
                        </p>
                        <p className="text-sm mt-2 text-gray-400">
                            {`Accepted formats: PDF, JPG, PNG (${files.length}/10 files)`}
                        </p>
                    </div>
                </div>
            )}
        </div>
    </div>
);
export default RegisterForm;
