"use client";
import Loading from "@/app/loading";
import { fetchMessages } from "@/utils/firebaseFunctions";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import MessageInfo from "./MessageInfo";
import { BiArrowToBottom } from "react-icons/bi";

const Messages = () => {
  const [activeMessageId, setActiveMessageId] = useState<
    string | number | null
  >(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["messages"],
    queryFn: () => fetchMessages(),
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    console.error("Error fetching messages:", error);
    return <div>Error fetching messages</div>;
  }

  const toggleMessage = (id: string | number) => {
    setActiveMessageId((prevId) => (prevId === id ? null : id));
  };

  // sort messages by date
  const sortedMessages = [...data].sort((a, b) => {
    const dateA = a.date.toDate().getTime();
    const dateB = b.date.toDate().getTime();
    return dateB - dateA;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 mb-12">
        {sortedMessages.map((message) => (
          <div className="border-b border-gray-300 p-4" key={message.id}>
            <button
              className="flex justify-between items-center cursor-pointer w-full"
              onClick={() => toggleMessage(message.id)}
            >
              <h3
                className={`font-workSans text-black text-xl font-semibold ${message.read ? "line-through" : ""}`}
              >
                {message.subject}
              </h3>
              <p className="font-workSans text-gray-600 text-sm">
                {message.date.toDate().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <BiArrowToBottom size={24} />
            </button>
            {activeMessageId === message.id && (
              <div className="mt-2">
                <MessageInfo {...message} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
