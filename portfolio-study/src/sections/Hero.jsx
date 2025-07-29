import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";

import Astronaut from "../components/Astronaut";
import HeroText from "../components/HeroText";
import ParallexBackground from "../components/ParallexBackground";
import Loader from "../components/Loader";

function Hero() {
  const ismobile = useMediaQuery({ maxWidth: 853 });

  return (
    <>
      <section
        id="home"
        className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space"
      >
        <HeroText />
        <ParallexBackground />
        <figure
          className="absolute inset-0"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Canvas camera={{ position: [0, 1, 3] }}>
            <Suspense fallback={<Loader />}>
              <Float>
                <Astronaut
                  scale={ismobile && 0.23}
                  position={ismobile && [0, -1.5, 0]}
                />
              </Float>
              <Rig />
            </Suspense>
          </Canvas>
        </figure>
      </section>
    </>
  );
}

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 5, 1 + state.mouse.y / 5, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
