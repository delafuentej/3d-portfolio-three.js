// import { Suspense } from "reimport { OrbitControls, Environment } from "@react-three/drei";
import { OrbitControls, Environment } from "@react-three/drei";
import { Home } from "./sections";

export default function Experience({ section, ready }) {
  return (
    <>
      <color args={["#2C2F33"]} attach="background" />

      <OrbitControls
        enableDamping
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />

      <Environment preset="studio" />

      <group>
        {/* HOME */}
        <group>
          <Home />
        </group>

        {/* SKILLS */}
        {/* <group visible={section === "skills"}> */}
        {/* <Skills /> */}
        {/* </group> */}

        {/* PROJECTS */}
        {/* <group visible={section === "projects"}> */}
        {/* <Projects /> */}
        {/* </group> */}

        {/* CONTACT */}
        {/* <group visible={section === "contact"}> */}
        {/* <Contact /> */}
        {/* </group> */}
      </group>
    </>
  );
}
