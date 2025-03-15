import { useState } from "react";
import ArrowIcon from "../../../ui/icons/ArrowIcon";
import TextArea from "../../../ui/inputs/TextArea";

function CommentItem({ comment }) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  return (
    <li className="flex flex-col gap-5" key={comment.id}>
      <div className="flex gap-3">
        <img
          className="size-9.5 rounded-full object-cover"
          src={comment.author_avatar}
          alt={comment.author_nickname}
        />

        <div className="w-full">
          <p className="mb-2 text-lg leading-[1em] font-medium">
            {comment.author_nickname}
          </p>
          <p className="text-gray mb-2.5">{comment.text}</p>
          <button
            className="text-purple flex cursor-pointer items-center gap-1.5 text-xs"
            onClick={() => setIsReplyOpen(true)}
          >
            <ArrowIcon /> უპასუხე
          </button>

          {isReplyOpen && <TextArea className="mt-2 h-24 w-full rounded-lg" />}

          {comment.sub_comments.length > 0 && (
            <ul className="mt-5 flex flex-col gap-5">
              {comment.sub_comments.map((sub_comment) => (
                <li key={sub_comment.id}>
                  <div className="flex gap-3">
                    <img
                      className="size-9.5 rounded-full object-cover"
                      src={sub_comment.author_avatar}
                      alt={sub_comment.author_nickname}
                    />
                    <div className="w-full">
                      <p className="mb-2 text-lg leading-[1em] font-medium">
                        {sub_comment.author_nickname}
                      </p>
                      <p className="text-gray mb-2.5">{sub_comment.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}

export default CommentItem;
