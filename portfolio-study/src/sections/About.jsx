import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/Globe";
import CopyEmailButton from "../components/CopyEmailButton";
import Frameworks from "../components/Frameworks";

function About() {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <div
            className="absolute w-full h-full top-0 left-0 bg-size-[170%] bg-position-[10px_-120px] md:bg-size-[250%] md:bg-position-[-180px_-160px] lg:bg-size-[270%] lg:bg-position-[-200px_-200px]"
            style={{
              backgroundImage: "url(/assets/coding-pov.png)",
            }}
          ></div>
          <div className="z-10">
            <p className="headtext">Hi, I'm Zual</p>
            <p className="subtext">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              maiores exercitationem animi tenetur fugiat accusamus.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2" ref={grid2Container}>
          <div className="flex items-center justify-center w-full h-full">
            <p className="flex items-end text-5xl text-gray-500 uppercase">
              code is craft
            </p>
            <Card
              text="GRASP"
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              containerRef={grid2Container}
            />
            <Card
              text="SOLID"
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              containerRef={grid2Container}
            />
            <Card
              text="Design Patterns"
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              containerRef={grid2Container}
            />
            <Card
              text="Design Principles"
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              containerRef={grid2Container}
            />
            <Card
              text="SRP"
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              containerRef={grid2Container}
            />
            <Card
              image="assets/logos/csharp-pink.png"
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              containerRef={grid2Container}
            />
            <Card
              image="assets/logos/dotnet-pink.png"
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              containerRef={grid2Container}
            />
            <Card
              image="assets/logos/blazor-pink.png"
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext break-keep">
              경기도 부천에 거주중이며, 원격 근무도 가능합니다.
            </p>
          </div>
          <figure>
            <Globe />
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              저와 함께 프로젝트를 해보시겠어요?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-1/2">
            <p className="headtext">Tech Skills</p>
            <p className="subtext">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              assumenda nam et molestias corrupti nostrum.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 size-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
