import { experiences } from "../constants";
import Timeline from "../components/Timeline";

function Experience() {
  return (
    <section className="w-full section-spacing">
      <Timeline data={experiences} />
    </section>
  );
}

export default Experience;
