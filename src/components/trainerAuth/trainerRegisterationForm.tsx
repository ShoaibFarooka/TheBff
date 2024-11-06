"use client";
import { CheckCircle, ChevronDown, ChevronUp, Loader2, X } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from "nextjs-toploader/app";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import TimeSlotSelector from "./timeSlotScheduler";

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
    const pathname = usePathname();
    const [isTimeSlotOpen, setIsTimeSlotOpen] = useState(false);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
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
    const [phoneError, setPhoneError] = useState<string | null>(null);

    // Current address state
    const [currentAddress, setCurrentAddress] = useState<AddressType>({
        house: "", area: "", pincode: "", city: "", state: ""
    });
    const [permanentAddress, setPermanentAddress] = useState<AddressType>({
        house: "", area: "", pincode: "", city: "", state: ""
    });

    const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);
    const [showCurrentAddress, setShowCurrentAddress] = useState(false);
    const [showPermanentAddress, setShowPermanentAddress] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

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
        setIsTimeSlotOpen(false);
    };

    const handleSelectTimeSlots = (timeSlots: string[]) => {
        setSelectedTimeSlots(timeSlots);
    };

    const getDisplayTimeSlot = (slot: string) => {
        const [start, end] = slot.split('-');
        const startHour = parseInt(start.split(':')[0]);
        const endHour = parseInt(end.split(':')[0]);
        const startPeriod = startHour < 12 ? 'AM' : 'PM';
        const endPeriod = endHour < 12 ? 'AM' : 'PM';
        const displayStart = `${startHour % 12 || 12}:00 ${startPeriod}`;
        const displayEnd = `${endHour % 12 || 12}:00 ${endPeriod}`;
        return `${displayStart} - ${displayEnd}`;
    };

    const handleAddressChange = useCallback((type: 'current' | 'permanent', field: keyof AddressType, value: string) => {
        const setter = type === 'current' ? setCurrentAddress : setPermanentAddress;
        setter(prev => ({ ...prev, [field]: value }));

        if (sameAsCurrentAddress && type === 'current') {
            setPermanentAddress(prev => ({ ...prev, [field]: value }));
        }
    }, [sameAsCurrentAddress]);

    const handleSameAddressToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSameAsCurrentAddress(e.target.checked);
        if (e.target.checked) {
            setPermanentAddress(currentAddress);
        }
    }, [currentAddress]);

    const validateName = (name: string) => {
        if (/\d/.test(name)) {
            return "Name should not contain numbers";
        }
        return null;
    };

    const validateEmail = (email: string) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Please enter a valid email address (e.g., name@example.com).";
        }
        return null;
    };

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        if (password.length > 12) {
            return "Password cannot be more than 12 characters long.";
        }
        return null;
    };

    const validatePhone = (phone: string) => {
        if (phone.length !== 10) {
            return "Phone number must be exactly 10 digits.";
        }
        if (!/^\d+$/.test(phone)) {
            return "Phone number should only contain digits.";
        }
        return null;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setNameError(validateName(value));
                break;
            case 'email':
                setEmailError(validateEmail(value));
                break;
            case 'password':
                setPasswordError(validatePassword(value));
                break;
            case 'mobileNumber':
                setPhoneError(validatePhone(value));
                break;
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        const error = validateName(newName);
        setNameError(error);
        if (!error) {
            e.target.value = newName;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const phoneInput = form.elements.namedItem('mobileNumber') as HTMLInputElement;
        const passwordInput = form.elements.namedItem('password') as HTMLInputElement;
        const emailInput = form.elements.namedItem('email') as HTMLInputElement;
        const nameInput = form.elements.namedItem('name') as HTMLInputElement;

        // Validate fields
        const phoneErrorMsg = validatePhone(phoneInput.value);
        const passwordErrorMsg = validatePassword(passwordInput.value);
        const emailErrorMsg = validateEmail(emailInput.value);

        setPhoneError(phoneErrorMsg);
        setPasswordError(passwordErrorMsg);
        setEmailError(emailErrorMsg);

        if (phoneErrorMsg || passwordErrorMsg || emailErrorMsg) {
            return; // Don't submit if there are errors
        }

        if (validateName(nameInput.value) !== null) {
            console.log('e.currentTarget.name', nameInput.value);
            setNameError("Please enter a valid name.");
            return;
        } else setNameError(null);

        // Ensure required files and time slot are selected
        if (!aadharFile || !agreementFile || !certificationFiles || !profilePhotoFile) {
            alert("Please upload all required files.");
            return;
        }

        if (selectedTimeSlots.length === 0) {
            alert("Please select at least one available time slot.");
            return;
        }

        setIsLoading(true); // Start loading

        const formData = new FormData(e.currentTarget);
        formData.append("currentAddress", JSON.stringify({
            house: currentAddress.house,
            area: currentAddress.area,
            pincode: currentAddress.pincode,
            city: currentAddress.city,
            state: currentAddress.state,
        }));
        formData.append("permanentAddress", JSON.stringify({
            house: permanentAddress.house,
            area: permanentAddress.area,
            pincode: permanentAddress.pincode,
            city: permanentAddress.city,
            state: permanentAddress.state,
        }));

        formData.append("aadharFile", aadharFile);
        formData.append("agreementFile", agreementFile);
        certificationFiles.forEach((file, index) => {
            console.log(`File${index}: `, file);
            formData.append(`certificationFiles`, file);
        });

        formData.append("profilePhotoFile", profilePhotoFile);

        if (optionalFile) {
            formData.append("verificationFile", optionalFile);
        }

        // Add the selected time slots as a JSON string
        formData.append("availableTimeSlots", JSON.stringify(selectedTimeSlots));
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
                // Add redirection here
                router.push('/trainer/dashboard'); // Redirect to trainer dashboard or appropriate page
            } else {
                toast.error(data.message ?? "Something went wrong.");
                onFailure?.();
            }
        } catch (error) {
            console.error("Error uploading files:", error);
            onFailure?.();
        } finally {
            setIsLoading(false); // Stop loading regardless of outcome
        }
    };

    // Validation functions
    const AddressFields = useCallback(({ type, address, onChange, disabled }: {
        type: 'current' | 'permanent';
        address: AddressType;
        onChange: (field: keyof AddressType, value: string) => void;
        disabled?: boolean;
    }) => (
        <div className="space-y-3 p-4 bg-gray-800 rounded-md">
            {(Object.keys(address) as Array<keyof AddressType>).map((field) => (
                <div key={field} className="flex flex-col">
                    <label className="text-white text-sm mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                        type="text"
                        value={address[field]}
                        onChange={(e) => onChange(field, e.target.value)}
                        className="p-2 rounded-md bg-gray-700 text-white"
                        disabled={disabled}
                    />
                </div>
            ))}
        </div>
    ), []);

    return (
        <div className="h-full center flex-col text-white max-h-full overflow-auto">
            <div className="w-full px-4 md:px-20">
                <form className="w-full px-4 md:px-20 space-y-3" onSubmit={handleSubmit}>
                    <h3 className="text-4xl text-white text-center mb-6 pt-10">Trainer Registration</h3>

                    <div className="max-w-max my-3 mx-auto bg-white rounded-full flex p-1">
                        <Link href="/trainer/login">
                            <button
                                className={`px-8 py-2 rounded-full ${
                                    pathname === '/trainer/login' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-transparent text-black'
                                }`}
                            >
                                Login
                            </button>
                        </Link>
                        <Link href="/trainer/signup">
                            <button
                                className={`px-8 py-2 rounded-full ${
                                    pathname === '/trainer/signup' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-transparent text-black'
                                }`}
                            >
                                Sign Up
                            </button>
                        </Link>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col w-full">
                        <label className="text-white text-lg mb-2">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="p-2 rounded-md bg-gray-700 text-white" 
                            onBlur={handleBlur}
                            required 
                        />
                        {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className="text-white text-lg mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="p-2 rounded-md bg-gray-700 text-white"
                            placeholder="Enter a valid email address"
                            onBlur={handleBlur}
                            required
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col w-full">
                        <label htmlFor="password" className="text-white text-lg mb-2">Password (8-12 characters)</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="p-2 rounded-md bg-gray-700 text-white"
                            placeholder="Enter a password (8-12 characters)"
                            onBlur={handleBlur}
                            required
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div className="flex flex-col w-full">
                        <label htmlFor="mobileNumber" className="text-white text-lg mb-2">Mobile Number (10 digits)</label>
                        <input
                            type="tel"
                            id="mobileNumber"
                            name="mobileNumber"
                            className="p-2 rounded-md bg-gray-700 text-white"
                            placeholder="Enter your 10-digit mobile number"
                            onBlur={handleBlur}
                            required
                        />
                        {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
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
                                    onChange={(field, value) => handleAddressChange('current', field, value)}
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
                                        onChange={(field, value) => handleAddressChange('permanent', field, value)}
                                        disabled={sameAsCurrentAddress}
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

                    {/* Available Time Slots */}
                    <div className="flex flex-col w-full">
                        <label className="text-white text-lg mb-2">Available Time Slots</label>
                        <button
                            type="button"
                            onClick={() => setIsTimeSlotOpen(true)}
                            className="p-2 rounded-md bg-gray-700 text-white"
                        >
                            {selectedTimeSlots.length > 0
                                ? `${selectedTimeSlots.length} time slot(s) selected`
                                : "Select Available Time Slots"}
                        </button>
                        {selectedTimeSlots.length > 0 && (
                            <div className="mt-2 text-sm text-gray-300">
                                Selected slots: {selectedTimeSlots.map(getDisplayTimeSlot).join(", ")}
                            </div>
                        )}
                    </div>

                    {isTimeSlotOpen && (
                        <TimeSlotSelector
                            onClose={handleTimeSlotClose}
                            onSelectTimeSlots={handleSelectTimeSlots}
                            initialSelectedSlots={selectedTimeSlots}
                        />
                    )}

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
                    <button 
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center" 
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Registering...
                            </>
                        ) : (
                            'Register'
                        )}
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
    onFileRemove: (index: number) => void
}) => (
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
