import { useEffect, useRef, useState } from "react";
import { addCommentToTask } from "../../api/fetchers";
import { useQueryClient } from "@tanstack/react-query";

import PrimaryButton from "../buttons/PrimaryButton";

function CommentTextArea({
  className,
  onCommentSubmitted,
  taskId,
  parentId = null,
}) {
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(false);
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

  function handleTextChange(e) {
    const newText = e.target.value;
    setText(newText);

    if (newText.trim() && newText.length <= 255) {
      setError(false);
    }
  }

  async function handleAddComment() {
    if (!text.trim()) {
      setError(true);
      return;
    }

    setIsUpdating(true);

    try {
      await addCommentToTask(taskId, text, parentId);
      setText("");
      setError(false);

      queryClient.invalidateQueries(["comments", taskId]);

      if (onCommentSubmitted && parentId) {
        onCommentSubmitted();
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      setError(true);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <textarea
        className={`ay h-16 w-full resize-none rounded-[0.625rem] rounded-b-none border border-b-0 bg-white p-5 text-sm placeholder:text-[#898989] focus:outline-0 ${error ? "border-red" : "border-very-light-gray"}`}
        ref={textareaRef}
        placeholder="დაწერე კომენტარი"
        value={text}
        onChange={handleTextChange}
      />

      <div
        className={`flex cursor-text justify-end rounded-[0.625rem] rounded-t-none border border-t-0 bg-white px-[0.9375rem] py-5 ${error ? "border-red" : "border-very-light-gray"}`}
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
