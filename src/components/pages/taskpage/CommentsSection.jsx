import CommentsList from "./CommentsList";
import CommentTextArea from "../../../ui/inputs/CommentTextArea";

function CommentsSection({ taskId }) {
  return (
    <section className="mt-11.5 h-fit rounded-[0.625rem] border-[#DDD2FF] bg-[#f8f3fe]/65 px-[2.8125rem] pt-10 pb-13">
      <CommentTextArea className="mb-16.5" taskId={taskId} />
      <CommentsList taskId={taskId} />
    </section>
  );
}

export default CommentsSection;
