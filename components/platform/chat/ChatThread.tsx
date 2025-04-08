import { User, Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";

interface ChatThreadProps {
  messages: Message[];
}

export default function ChatThread({ messages }: ChatThreadProps) {
  const [mdxMessages, setMdxMessages] = useState<Record<string, any>>({});
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [likedMessages, setLikedMessages] = useState<Record<string, boolean>>(
    {}
  );
  const [dislikedMessages, setDislikedMessages] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    // Process bot messages to MDX format
    const processMdxContent = async () => {
      const mdxResults: Record<string, any> = {};

      for (const message of messages) {
        if (message.role === "assistant") {
          try {
            const mdxSource = await serialize(message.content);
            mdxResults[message.id] = mdxSource;
          } catch (error) {
            console.error("Failed to serialize MDX content:", error);
          }
        }
      }

      setMdxMessages(mdxResults);
    };

    processMdxContent();
  }, [messages]);

  // Function to format text with preserved newlines
  const formatText = (text: string) => {
    const len = text.split("\n").length;
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < len && <br />}
      </span>
    ));
  };

  // Function to handle copying message content
  const handleCopy = (message: Message) => {
    navigator.clipboard
      .writeText(message.content)
      .then(() => {
        setCopiedMessageId(message.id);

        // Reset copied state after 1.5 seconds
        setTimeout(() => {
          setCopiedMessageId(null);
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy message:", err);
      });
  };

  // Function to handle like button click
  const handleLike = (messageId: string) => {
    setLikedMessages((prev) => {
      const newState = { ...prev };

      // Toggle the liked state
      if (newState[messageId]) {
        delete newState[messageId]; // Remove if already liked
      } else {
        newState[messageId] = true; // Add if not liked

        // Remove from disliked if it's there
        setDislikedMessages((prevDislikes) => {
          const newDislikes = { ...prevDislikes };
          delete newDislikes[messageId];
          return newDislikes;
        });
      }

      return newState;
    });
  };

  // Function to handle dislike button click
  const handleDislike = (messageId: string) => {
    setDislikedMessages((prev) => {
      const newState = { ...prev };

      // Toggle the disliked state
      if (newState[messageId]) {
        delete newState[messageId]; // Remove if already disliked
      } else {
        newState[messageId] = true; // Add if not disliked

        // Remove from liked if it's there
        setLikedMessages((prevLikes) => {
          const newLikes = { ...prevLikes };
          delete newLikes[messageId];
          return newLikes;
        });
      }

      return newState;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "mb-6 flex w-full",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "flex max-w-3xl w-full items-start", // Changed from items-center to items-start
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div className="relative">
              <div
                className={cn(
                  "p-4 rounded-2xl break-words",
                  message.role === "user"
                    ? "bg-gray-100 bg-opacity-40 dark:bg-gray-50 dark:bg-opacity-20 max-w-xl text-gray-800 dark:text-gray-200 whitespace-pre-wrap" // Added whitespace-pre-wrap
                    : "bg-transparent"
                )}
              >
                {message.role === "user" ? (
                  formatText(message.content)
                ) : mdxMessages[message.id] ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <MDXRemote {...mdxMessages[message.id]} />
                  </div>
                ) : (
                  // Fallback while MDX is loading or if serialization fails
                  message.content
                )}
              </div>

              {/* Feedback buttons for assistant messages */}
              {message.role === "assistant" && (
                <div className="absolute bottom-0 left-0 -mb-6 flex items-center gap-2">
                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(message)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                    aria-label="Copy message"
                  >
                    {copiedMessageId === message.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Like button */}
                  <button
                    onClick={() => handleLike(message.id)}
                    className={cn(
                      "p-2 transition-colors",
                      likedMessages[message.id]
                        ? "text-blue-500 hover:text-blue-600"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    )}
                    aria-label="Like message"
                  >
                    <ThumbsUp
                      className={cn(
                        "w-4 h-4",
                        likedMessages[message.id] ? "fill-current" : ""
                      )}
                    />
                  </button>

                  {/* Dislike button */}
                  <button
                    onClick={() => handleDislike(message.id)}
                    className={cn(
                      "p-2 transition-colors",
                      dislikedMessages[message.id]
                        ? "text-red-500 hover:text-red-600"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    )}
                    aria-label="Dislike message"
                  >
                    <ThumbsDown
                      className={cn(
                        "w-4 h-4",
                        dislikedMessages[message.id] ? "fill-current" : ""
                      )}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
