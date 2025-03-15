import { useEffect, useRef, useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { addCommentToTask } from "../../api/fetchers";
import { useQueryClient } from "@tanstack/react-query";

function CommentTextArea({
  className,
  onCommentSubmitted,
  taskId,
  parentId = null,
}) {
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const textareaRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  function handleContainerClick(e) {
    if (e.target.closest("button") === null) {
      textareaRef.current.focus();
    }
  }

  async function handleAddComment() {
    if (!text.trim()) return;

    setIsUpdating(true);

    await addCommentToTask(taskId, text, parentId);
    setText("");

    queryClient.invalidateQueries(["comments", taskId]);

    setIsUpdating(false);

    if (onCommentSubmitted && parentId) {
      onCommentSubmitted();
    }
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <textarea
        className="border-very-light-gray h-16 w-full resize-none rounded-[0.625rem] rounded-b-none border border-b-0 bg-white p-5 text-sm placeholder:text-[#898989] focus:outline-0"
        ref={textareaRef}
        placeholder="დაწერე კომენტარი"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div
        className="border-very-light-gray flex cursor-text justify-end rounded-[0.625rem] rounded-t-none border border-t-0 bg-white px-[0.9375rem] py-5"
        onClick={handleContainerClick}
      >
        <PrimaryButton
          className="h-9 rounded-full px-[1.15625rem]"
          disabled={isUpdating}
          onClick={handleAddComment}
        >
          დააკომენტარე
        </PrimaryButton>
      </div>
    </div>
  );
}

export default CommentTextArea;
