import { Message } from "@/types/project";
import { changeReadStatus, deleteMessageById } from "@/utils/firebaseFunctions";
import { convertNewlinesToBreaks } from "@/utils/textUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = Message;

const MessageInfo = (props: Props) => {
  const queryClient = useQueryClient();

  const { mutate: changeRead, isPending } = useMutation({
    mutationFn: () => changeReadStatus(props.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["unreadMessages"] });
    },
  });

  const { mutate: deleteMessage, isPending: isPendingDelete } = useMutation({
    mutationFn: () => deleteMessageById(props.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div key={props.id} className="flex flex-col gap-2">
        <p className="font-workSans text-gray-800 text-lg font-semibold">
          {props.firstName} {props.lastName}
        </p>
        <p className="font-workSans text-gray-600 text-lg">
          <strong>Email:</strong> {props.email}
        </p>
        <p className="font-workSans text-gray-800 text-xl font-medium">
          <strong>Subject:</strong> {props.subject}
        </p>
        <p className="font-workSans text-gray-700 text-2xl">
          <strong>Message:</strong> {convertNewlinesToBreaks(props.message)}
        </p>
        <button
          onClick={() => changeRead()}
          disabled={isPending}
          className={
            `mt-4 px-4 py-2 rounded-md text-white ${
              props.read
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            }` + (isPending ? " opacity-50 cursor-not-allowed" : "")
          }
        >
          {props.read ? "Mark as unread" : "Mark as read"} {isPending && "..."}
        </button>
        <button
          onClick={() => deleteMessage()}
          disabled={isPendingDelete}
          className="mt-4 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
        >
          {isPendingDelete ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default MessageInfo;
