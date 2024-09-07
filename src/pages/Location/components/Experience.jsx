import {
  Environment,
  Html,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  Sphere,
  useEnvironment,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Suspense } from "react";
import { Gearing008 } from "../../../components/Model3D/Gearing008";

export const Experience = ({ isAnimate, isPartsAnimate, rpm }) => {
  // const map = useEnvironment({ files: "textures/enviroment.hdr" });

  return (
    <>
      <Canvas camera={{ position: [-30, 0, 10], fov: 25 }}>
        {/* <color attach="background" args={["#ececec"]} /> */}
        <OrbitControls />
        <Environment preset="sunset" />
        {/* <Environment map={map} /> */}
        {/* <RoundedBox args={[8, 4, 0.1]}> */}
        {/* <MeshPortalMaterial side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" /> */}
        <Suspense
          fallback={
            <Html>
              <p>Loading</p>
            </Html>
          }
        >
          <Gearing008
            scale={2}
            isAnimate={isAnimate}
            isPartsAnimate={isPartsAnimate}
            rpm={rpm}
          />
        </Suspense>

        {/* <Sphere args={[1, 256, 256]}>
        <meshStandardMaterial side={THREE.BackSide} />
      </Sphere> */}
        {/* </MeshPortalMaterial> */}
        {/* </RoundedBox> */}
      </Canvas>
    </>
  );
};
