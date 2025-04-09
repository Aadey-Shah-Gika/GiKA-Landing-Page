import { Send, Paperclip, X, File, AlertCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

interface UploadedFile {
  id: string;
  file: File;
}

interface ToastMessage {
  id: string;
  message: string;
  type: "error" | "success" | "info";
}

// File size limit in bytes (3MB)
const MAX_FILE_SIZE = 3 * 1024 * 1024;

export default function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Placeholder messages to cycle through
  const placeholderMessages = [
    "Ask GikaGraph...",
    "For Example: It is too hot here",
    "For Example: I am going for a brunch with my fiance today",
  ];

  // Typing animation effect for placeholder
  useEffect(() => {
    const currentMessage = placeholderMessages[placeholderIndex];

    let timer: NodeJS.Timeout;

    if (isTyping) {
      // Typing effect
      if (currentPlaceholder.length < currentMessage.length) {
        timer = setTimeout(() => {
          setCurrentPlaceholder(
            currentMessage.slice(0, currentPlaceholder.length + 1)
          );
        }, 10); // Typing speed
      } else {
        // Pause at the end of typing before starting to erase
        timer = setTimeout(() => {
          setIsTyping(false);
        }, 3500); // Wait time after typing completes
      }
    } else {
      // Erasing effect
      if (currentPlaceholder.length > 0) {
        timer = setTimeout(() => {
          setCurrentPlaceholder(
            currentPlaceholder.slice(0, currentPlaceholder.length - 1)
          );
        }, 10); // Erasing speed (faster than typing)
      } else {
        // Move to next placeholder text after erasing
        timer = setTimeout(() => {
          setPlaceholderIndex(
            (placeholderIndex + 1) % placeholderMessages.length
          );
          setIsTyping(true);
        }, 20); // Wait time before starting the next placeholder
      }
    }

    return () => clearTimeout(timer);
  }, [currentPlaceholder, isTyping, placeholderIndex, placeholderMessages]);

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";

    // Set the height based on scrollHeight (with a max of ~3.5 lines)
    const maxHeight = 24 * 3.5; // Approximately 3.5 lines (assuming 24px line height)
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [value]);

  // Auto-remove toasts after 3 seconds
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);

      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() !== "" && !isLoading) {
        onSend();
      }
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const showToast = (
    message: string,
    type: "error" | "success" | "info" = "error"
  ) => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        showToast("File size exceeds the limit of 3MB", "error");
        e.target.value = "";
        return;
      }

      const newFile: UploadedFile = {
        id: generateId(),
        file: file,
      };
      setUploadedFiles([...uploadedFiles, newFile]);

      // Reset the input value so the same file can be uploaded again
      e.target.value = "";
    }
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  // Helper function to generate a unique ID
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  // Helper function to get file extension
  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toUpperCase() || "";
  };

  // Function to truncate filename if too long
  const truncateFilename = (filename: string, maxLength = 20) => {
    if (filename.length <= maxLength) return filename;

    const extension = filename.split(".").pop();
    const name = filename.substring(0, filename.lastIndexOf("."));

    if (!extension || !name) return filename.substring(0, maxLength) + "...";

    const truncatedName =
      name.substring(0, maxLength - extension.length - 3) + "...";
    return `${truncatedName}.${extension}`;
  };

  // Format file size in readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4 relative">
      {/* Toast Container */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "py-2 px-4 rounded-lg shadow-lg flex items-center text-white font-medium max-w-sm toast-slide-in",
              toast.type === "error"
                ? "bg-red-500"
                : toast.type === "success"
                ? "bg-green-500"
                : "bg-blue-500"
            )}
          >
            {/* Toast content */}
            <div className="flex items-center">
              {toast.type === "error" && (
                <AlertCircle className="w-4 h-4 mr-2" />
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* File cards area */}
      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {uploadedFiles.map((uploadedFile) => (
            <div
              key={uploadedFile.id}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 flex items-center relative"
            >
              <File className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
              <div>
                <div className="max-w-[160px] truncate text-sm">
                  {truncateFilename(uploadedFile.file.name)}
                </div>
                <div className="text-xs text-gray-500">
                  {formatFileSize(uploadedFile.file.size)}
                </div>
              </div>
              <div className="text-xs text-gray-500 ml-2">
                {getFileExtension(uploadedFile.file.name)}
              </div>
              {/* Cancel button positioned at the top-right, partially outside */}
              <button
                onClick={() => handleRemoveFile(uploadedFile.id)}
                className="absolute -top-2 -right-2 bg-gray-200 dark:bg-gray-700 rounded-full p-1 hover:bg-gray-300 dark:hover:bg-gray-600"
                aria-label="Remove file"
              >
                <X className="w-3 h-3 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="flex items-start bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          title="Upload a file"
          className="hidden"
        />

        {/* File upload button */}
        <button
          onClick={handleFileClick}
          disabled={isLoading}
          className="w-8 h-8 rounded-full flex items-center justify-center mr-2 mt-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Upload file"
        >
          <Paperclip className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none resize-none overflow-y-auto py-1 max-h-[84px]" // 84px is approximately 3.5 lines
          placeholder={currentPlaceholder}
          disabled={isLoading}
          rows={1}
          style={{
            minHeight: "24px",
            lineHeight: "24px",
          }}
        />
        <button
          onClick={onSend}
          disabled={isLoading || value.trim() === ""}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center ml-2 mt-1",
            isLoading || value.trim() === ""
              ? "bg-gray-100 dark:bg-gray-700"
              : "bg-emerald-100 dark:bg-emerald-900"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-gray-400 dark:text-gray-500 animate-spin" />
          ) : (
            <Send
              className={cn(
                "w-4 h-4",
                value.trim() === ""
                  ? "text-gray-400 dark:text-gray-500"
                  : "text-emerald-600 dark:text-emerald-400"
              )}
            />
          )}
        </button>
      </div>

      {/* Add CSS for the animations */}
      <style jsx global>{`
        /* Toast slide in from top animation */
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes toastSlideOut {
          from {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
        }

        .toast-slide-in {
          animation: toastSlideIn 0.3s ease-out forwards,
            toastSlideOut 0.3s ease-in forwards 2.7s;
        }
      `}</style>
    </div>
  );
}
