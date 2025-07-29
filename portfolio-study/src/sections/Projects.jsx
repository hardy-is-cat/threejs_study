import { motion, useMotionValue, useSpring } from "motion/react";

import Project from "../components/Project";
import { myProjects } from "../constants";
import { useState } from "react";

function Projects() {
  const [preview, setPreview] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });

  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  return (
    <section
      className="relative c-space section-spacing"
      onMouseMove={handleMouseMove}
      id="work"
    >
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="h-[1px] mt-12 w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      {myProjects.map((project) => (
        <Project key={project.id} {...project} setPreview={setPreview} />
      ))}
      {preview && (
        <motion.img
          src={preview}
          alt="프로젝트 미리보기"
          className="fixed top-0 left-0 z-50 object-cover w-80 h-56 rounded-lg shadow-lg pointer-events-none"
          style={{ x: springX, y: springY }}
        />
      )}
    </section>
  );
}

export default Projects;
