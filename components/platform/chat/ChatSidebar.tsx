// ChatSidebar.tsx (Updated)
import { Network, PlusCircle, Trash2, X } from "lucide-react";
import { useChat } from "@/lib/chat-store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/app/(platform)/layout"; // Import from layout

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const router = useRouter();
  const { chats, activeChat, setActiveChat, deleteChat, getEmptyState } =
    useChat();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Hide toast after a few seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleNewChat = () => {
    // Go to empty state at /chat
    getEmptyState();
    router.push("/chat");

    // Show toast with instructions
    setToastMessage("Type a message to start a new conversation");
    setShowToast(true);
  };

  const handleChatClick = (chatId: string) => {
    setActiveChat(chatId);
    router.push(`/chat/${chatId}`);
  };

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation(); // Prevent triggering the chat selection

    const newActiveChat = deleteChat(chatId);

    if (!newActiveChat) {
      // No chats left or we deleted the active chat
      router.push("/chat");
    } else if (newActiveChat !== activeChat) {
      // Active chat changed
      router.push(`/chat/${newActiveChat}`);
    }
  };

  // Only show chats with at least one message
  const nonEmptyChats = chats.filter((chat) => chat.messages.length > 0);
  return (
    <div
      className={`h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-start py-4 w-full transition-all duration-300 ease-in-out ${
        !isOpen ? "opacity-0" : "opacity-100"
      } overflow-hidden`}
    >
      {/* Header with logo and close button */}
      <div className="flex justify-between items-center w-full mb-6 px-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
            <Network className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="ml-2 font-semibold text-gray-800 dark:text-gray-200">
            GiKA
          </span>
        </div>

        <button
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="w-full px-4">
        <button
          className="w-full rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-start px-4 py-2 mb-6 cursor-pointer transition-colors"
          onClick={handleNewChat}
          title="Create a new chat"
        >
          <PlusCircle className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">New Chat</span>
        </button>
      </div>

      {/* Chat History Section */}
      <div className="w-full px-4 overflow-y-auto">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
          Chat History
        </h3>

        {nonEmptyChats.length > 0 ? (
          <div className="space-y-1">
            {nonEmptyChats.map((chat) => (
              <div
                key={chat.id}
                className={`relative rounded-lg flex items-center py-2 px-3 cursor-pointer transition-colors ${
                  activeChat === chat.id
                    ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200"
                    : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                } group w-full`}
                onClick={() => handleChatClick(chat.id)}
                title={chat.title}
              >
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {chat.title.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="flex-1 truncate text-sm">{chat.title}</span>

                {/* Delete Button - Shows on hover */}
                <div
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  onClick={(e) => handleDeleteChat(e, chat.id)}
                  title="Delete chat"
                >
                  <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-3 px-2 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Write your first message to begin your journey
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              Shape your own insights today
            </p>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="absolute right-0 translate-x-full mt-4 bg-white dark:bg-gray-800 shadow-lg rounded-md p-3 z-50 border border-gray-200 dark:border-gray-700 min-w-[240px] text-sm">
          <div className="text-gray-800 dark:text-gray-200">{toastMessage}</div>
        </div>
      )}
    </div>
  );
}
