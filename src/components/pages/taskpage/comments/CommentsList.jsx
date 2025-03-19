import { useState, useMemo } from "react";
import { useComments } from "../../../../api/useApis";
import CommentItem from "./CommentItem";

function CommentsList({ taskId }) {
  const { data: comments, isLoading } = useComments(taskId);
  const [activeReplyId, setActiveReplyId] = useState(null);

  const totalComments = !comments
    ? null
    : comments.length +
      comments.reduce(
        (total, comment) => total + (comment.sub_comments?.length || 0),
        0,
      );

  const sortedComments = useMemo(
    () => (comments ? [...comments].reverse() : []),
    [comments],
  );

  return (
    <div>
      <h3 className="mb-10 flex items-center gap-1.5 text-xl leading-[1em] font-medium text-black">
        კომენტარები
        <span className="bg-purple grid h-5.5 w-7.5 place-content-center rounded-full text-sm text-white">
          {totalComments ?? "..."}
        </span>
      </h3>

      {isLoading && <p className="text-center">იტვირთება...</p>}
      {!isLoading && comments.length === 0 && (
        <p className="text-center">კომენტარები არ არის.</p>
      )}

      {!isLoading && comments.length > 0 && (
        <ul className="flex flex-col gap-9.5">
          {sortedComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              isReplyOpen={activeReplyId === comment.id}
              onReplyToggle={(isOpen) =>
                setActiveReplyId(isOpen ? comment.id : null)
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommentsList;
