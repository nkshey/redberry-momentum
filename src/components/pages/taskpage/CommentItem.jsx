import ArrowIcon from "../../../ui/icons/ArrowIcon";

function CommentItem({ comment }) {
  return (
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
  );
}

export default CommentItem;
