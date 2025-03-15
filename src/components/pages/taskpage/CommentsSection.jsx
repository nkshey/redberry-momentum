import { useState } from "react";
import PrimaryButton from "../../../ui/buttons/PrimaryButton";
import TextArea from "../../../ui/inputs/TextArea";
import CommentsList from "./CommentsList";
import { addCommentToTask } from "../../../api/fetchers";
import { useComments } from "../../../api/useApis";

function CommentsSection({ taskId }) {
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { refetch } = useComments(taskId);

  async function handleAddComment() {
    if (!text.trim()) return;

    setIsUpdating(true);

    await addCommentToTask(taskId, text);
    setText("");
    await refetch();

    setIsUpdating(false);
  }

  return (
    <section className="mt-11.5 h-fit rounded-[0.625rem] border-[#DDD2FF] bg-[#f8f3fe]/65 px-[2.8125rem] pt-10 pb-13">
      <div className="relative mb-16.5">
        <TextArea
          className="rounded-[0.625rem] p-5 text-sm placeholder:text-[#898989]"
          placeholder="დაწერე კომენტარი"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <PrimaryButton
          className="absolute right-5 bottom-[0.9375rem] h-9 rounded-full px-[1.15625rem]"
          disabled={isUpdating}
          onClick={handleAddComment}
        >
          დააკომენტარე
        </PrimaryButton>
      </div>

      <CommentsList taskId={taskId} />
    </section>
  );
}

export default CommentsSection;
