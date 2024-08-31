import React, { Suspense, useRef, useEffect } from "react";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import Lights from "./Lights";
import IPhone from "./IPhone";

const ModelView = ({ controlRef, setRotationState, size, item }) => {
  const localGroupRef = useRef();
  const iPhoneRef = useRef();

  useEffect(() => {
    if (iPhoneRef.current) {
      const targetScale = size === "small" ? 15 : 17;
      const targetRotation = size === "small" ? Math.PI : 0;

      // Create a timeline for coordinated animations
      const tl = gsap.timeline();

      // Scale and rotate the iPhone
      tl.to(
        iPhoneRef.current.scale,
        {
          x: targetScale,
          y: targetScale,
          z: targetScale,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
        },
        0
      );

      tl.to(
        iPhoneRef.current.rotation,
        {
          y: targetRotation,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      // Add a little bounce effect
      tl.to(
        iPhoneRef.current.position,
        {
          y: size === "small" ? -0.2 : 0.2,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
        0
      );
    }
  }, [size]);

  useFrame((state) => {
    if (iPhoneRef.current) {
      // Add a subtle floating animation
      iPhoneRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

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

      <group position={[0, 0, 0]}>
        <Lights />
        <Suspense fallback={null}>
          <IPhone
            ref={iPhoneRef}
            scale={[
              size === "small" ? 15 : 17,
              size === "small" ? 15 : 17,
              size === "small" ? 15 : 17,
            ]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </group>
  );
};

export default ModelView;
