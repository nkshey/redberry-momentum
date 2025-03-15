import { useState } from "react";
import PrimaryButton from "../../../ui/buttons/PrimaryButton";
import ArrowIcon from "../../../ui/icons/ArrowIcon";
import TextArea from "../../../ui/inputs/TextArea";
import { addCommentToTask } from "../../../api/fetchers";
import { useComments } from "../../../api/useApis";

function CommentsSection({ taskId }) {
  const [text, setText] = useState("");
  const { data: comments, isLoading, refetch } = useComments(taskId);

  async function handleAddComment() {
    if (!text.trim()) return;

    await addCommentToTask(taskId, text);
    setText("");
    await refetch();
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
          onClick={handleAddComment}
        >
          დააკომენტარე
        </PrimaryButton>
      </div>

      <div>
        <h3 className="mb-10 flex items-center gap-1.5 text-xl leading-[1em] font-medium text-black">
          კომენტარები
          <span className="bg-purple grid h-5.5 w-7.5 place-content-center rounded-full text-sm text-white">
            {isLoading ? "..." : comments.length}
          </span>
        </h3>

        {isLoading && <p>იტვირთება...</p>}

        {!isLoading && comments.length > 0 ? (
          <ul className="flex flex-col gap-9.5">
            {comments.map((comment) => (
              <li className="flex gap-3" key={comment.id}>
                <img
                  className="size-9.5 rounded-full object-cover"
                  src={comment.author_avatar}
                  alt={comment.author_nickname}
                />

                <div>
                  <p className="mb-2 text-lg leading-[1em] font-medium">
                    {comment.author_nickname}
                  </p>
                  <p className="text-gray mb-2.5">{comment.text}</p>
                  <button className="text-purple flex cursor-pointer items-center gap-1.5 text-xs">
                    <ArrowIcon /> უპასუხე
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">კომენტარები არ არის.</p>
        )}
      </div>
    </section>
  );
}

export default CommentsSection;
