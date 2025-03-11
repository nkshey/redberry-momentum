import MediumPriorityIcon from "../../ui/icons/priorities/MediumPriorityIcon";
import CommentsIcon from "../../ui/icons/CommentsIcon";

function AssignmentCard() {
  return (
    <article className="border-yellow flex cursor-pointer flex-col gap-7 rounded-[0.9375rem] border p-5">
      <Header />
      <Info />
      <Author />
    </article>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between gap-2.5 text-xs">
      <div className="flex items-center gap-2.5">
        <div className="border-yellow text-yellow flex h-6.5 w-21.5 items-center justify-center gap-1 rounded-sm border">
          <MediumPriorityIcon />
          საშუალო
        </div>

        <div className="bg-light-pink grid h-6 w-22 place-content-center rounded-full text-white">
          დიზაინი
        </div>
      </div>

      <p>22 იანვ, 2022</p>
    </div>
  );
}

function Info() {
  return (
    <div className="px-[0.65625rem]">
      <p className="mb-3 text-[0.9375rem] font-medium">
        Redberry-ს საიტის ლენდინგის დიზაინი
      </p>
      <p className="text-gray text-sm">
        შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
        ნავიგაციას.
      </p>
    </div>
  );
}

function Author() {
  return (
    <div className="flex items-center justify-between">
      <img
        className="size-8 rounded-full object-cover object-top"
        src="/images/profile-picture.jpg"
        alt="someone"
      />

      <div className="flex items-center gap-1 text-sm">
        <CommentsIcon />8
      </div>
    </div>
  );
}

export default AssignmentCard;
