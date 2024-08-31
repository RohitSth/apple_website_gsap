"use client";

import { Suspense, useRef } from "react";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import dynamic from "next/dynamic";

const Lights = dynamic(() => import("./Lights"), { ssr: false });
const IPhone = dynamic(() => import("./IPhone"), { ssr: false });

const ModelView = ({ controlRef, setRotationState, size, item }) => {
  const localGroupRef = useRef();

  return (
    <group ref={localGroupRef} dispose={null}>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      {/* Render the correct iPhone based on the selected size */}
      {size === "small" && (
        <group position={[0, 0, 0]}>
          <Lights />
          <Suspense fallback={null}>
            <IPhone scale={[15, 15, 15]} item={item} size={size} />
          </Suspense>
        </group>
      )}
      {size === "large" && (
        <group position={[0, 0, 0]}>
          <Lights />
          <Suspense fallback={null}>
            <IPhone scale={[17, 17, 17]} item={item} size={size} />
          </Suspense>
        </group>
      )}
    </group>
  );
};

export default ModelView;
