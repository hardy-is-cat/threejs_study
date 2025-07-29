import { useState } from "react";
import ProjectDetails from "./ProjectDetails";

function Project({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) {
  const [detailShowing, setDetailShowing] = useState(false);

  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <p className="text-2xl">{title}</p>
          <div className="flex gap-5 mt-2 text-sand">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>
        <button
          className="flex justify-center items-center gap-1 cursor-pointer hover-animation"
          onClick={() => setDetailShowing(!detailShowing)}
        >
          <img src="assets/arrow-right.svg" alt="더보기" className="w-5" />
          Read More
        </button>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      {detailShowing && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          href={href}
          tags={tags}
          handelDetail={() => setDetailShowing(!detailShowing)}
        />
      )}
    </>
  );
}

export default Project;
