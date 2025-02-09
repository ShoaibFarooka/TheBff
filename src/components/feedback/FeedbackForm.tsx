"use client";
import React, { useEffect, useState } from "react";
import { Select, Input, Button, Spin } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { User } from "@/types/user";
import { getAuthUser } from "@/lib/auth";
import { CheckCircle } from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

const FileInput = ({
  label,
  onFileChange,
  file,
}: {
  label: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
}) => (
  <div className="flex flex-col w-full">
    <label className="text-white text-lg mb-2">{label}</label>
    <div className="relative flex items-center justify-center border border-dashed border-gray-500 rounded-lg h-32 hover:bg-gray-700 transition-colors">
      <input
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        type="file"
        accept=".jpg, .jpeg, .png"
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
            <p className="text-sm mt-2 text-gray-400">
              Accepted formats: JPG, PNG
            </p>
          </>
        )}
      </div>
    </div>
  </div>
);

export const Form = () => {
  const [isLoading, setLoading] = useState(false);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState<string | undefined>();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | undefined>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [file, setFile] = useState<File | null>(null);

  const setAuthUser = async () => {
    const res = await getAuthUser();
    setCurrentUser(res?.user);
    fetchCompletedSessions(res?.user?._id);
  };

  useEffect(() => {
    setAuthUser();
  }, []);

  const fetchCompletedSessions = async (id: any) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/sessions/completed-sessions?userId=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setCompletedSessions(data?.data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch completed sessions");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSession) {
      toast.error("Please select a session.");
      return;
    }

    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }

    if (!feedback.trim()) {
      toast.error("Please provide your feedback.");
      return;
    }

    if (!file) {
      toast.error("Please upload a file.");
      return;
    }

    try {
      setLoading(true);

      // Construct the FormData object
      const formData = new FormData();
      formData.append("session", selectedSession);
      formData.append("feedback", feedback);
      formData.append("stars", rating.toString());
      formData.append("file", file);
      formData.append("userId", currentUser?._id!)

      // Send the FormData object to the backend
      const response = await fetch("/api/feedbacks/session-feedback", {
        method: "POST",
        body: formData, // Send as FormData
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      toast.success("Feedback submitted successfully!");
      setFeedback(""); // Clear the feedback field
      setSelectedSession(undefined); // Reset the selected session
      setRating(undefined); // Reset the rating
      setFile(null); // Clear the file
    } catch (err: any) {
      toast.error(err.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
      setter(file);
    } else {
      setter(null);
    }
  };

  return (
    <div className="h-full center flex-col text-white max-h-full overflow-auto">
      <h3 className="text-4xl text-white text-center mb-6 pt-10">
        Feedback Form
      </h3>

      <form className="mt-2 w-full px-4 md:px-20 space-y-5" onSubmit={handleSubmit}>
        {isLoading ? (
          <div className="center h-20">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Select
              value={selectedSession}
              onChange={(value) => setSelectedSession(value)}
              placeholder="Select a completed session"
              className="w-full"
              allowClear
            >
              {completedSessions.map((session: any) => (
                <Option key={session._id} value={session._id}>
                  {session?.subscriptionId?.programId}
                </Option>
              ))}
            </Select>

            <Select
              value={rating}
              onChange={(value) => setRating(value)}
              placeholder="Rate your session (1-5)"
              className="w-full"
              allowClear
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Option key={star} value={star}>
                  {star} Star{star > 1 && "s"}
                </Option>
              ))}
            </Select>

            <FileInput
              label=""
              file={file}
              onFileChange={(e) => handleFileChange(e, setFile)}
            />

            <TextArea
              rows={5}
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="mt-5 max-w-max mx-auto">
              <Button
                type="primary"
                htmlType="submit"
                disabled={isLoading}
                loading={isLoading}
                className="px-6 py-2 rounded-full"
              >
                Submit Feedback
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

const FeedbackForm: React.FC = () => {
  return (
    <main className="mt-[5.5rem] min-h-[70vh] px-5 md:px-14 lg:px-40">
      <div className="grid grid-cols-1 w-full h-full backdrop-blur-md rounded-lg">
        <div className="col-span-1">
          <Form />
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default FeedbackForm;
