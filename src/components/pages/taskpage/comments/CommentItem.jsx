import { useState } from "react";
import ArrowIcon from "../../../../ui/icons/ArrowIcon";
import CommentTextArea from "../../../../ui/inputs/CommentTextArea";

function CommentContent({ authorAvatar, author, text }) {
  return (
    <div className="flex gap-3">
      <img
        className="size-9.5 rounded-full object-cover"
        src={authorAvatar}
        alt={author}
      />

      <div className="w-full">
        <p className="mb-2 text-lg leading-[1em] font-medium">{author}</p>
        <p className="text-gray mb-2.5" style={{ overflowWrap: "anywhere" }}>
          {text}
        </p>
      </div>
    </div>
  );
}

function SubComments({ comments }) {
  if (comments.length === 0) return null;

  return (
    <ul className="mt-5 flex flex-col gap-5">
      {comments.map((subComment) => (
        <li key={subComment.id}>
          <CommentContent
            author={subComment.author_nickname}
            authorAvatar={subComment.author_avatar}
            text={subComment.text}
          />
        </li>
      ))}
    </ul>
  );
}

function CommentItem({ comment }) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  return (
    <li className="flex flex-col gap-5">
      <div className="w-full">
        <CommentContent
          author={comment.author_nickname}
          authorAvatar={comment.author_avatar}
          text={comment.text}
        />

        <div className="ml-12.5">
          <button
            className="text-purple flex cursor-pointer items-center gap-1.5 text-xs"
            onClick={() => setIsReplyOpen(true)}
          >
            <ArrowIcon /> უპასუხე
          </button>

          {isReplyOpen && (
            <CommentTextArea
              className="mt-5"
              taskId={comment.task_id}
              parentId={comment.id}
              onCommentSubmitted={() => setIsReplyOpen(false)}
            />
          )}

          <SubComments comments={comment.sub_comments} />
        </div>
      </div>
    </li>
  );
}

export default CommentItem;
