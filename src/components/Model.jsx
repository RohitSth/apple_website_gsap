"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "@/utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "@/constants";
import dynamic from "next/dynamic";

const ModelView = dynamic(() => import("./ModelView"), { ssr: false });

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  // Refs for both model groups (small and large)
  const smallModelRef = useRef(new THREE.Group());
  const largeModelRef = useRef(new THREE.Group());

  // Ref for the camera
  const cameraRef = useRef();

  // State for tracking rotation
  const [rotation, setRotation] = useState(0);

  // GSAP timeline
  const tl = useRef(gsap.timeline());

  // Animation on size change
  useEffect(() => {
    // Set initial positions for the models
    const smallModel = smallModelRef.current;
    const largeModel = largeModelRef.current;
    smallModel.position.x = -2;
    largeModel.position.x = 2;

    tl.current.clear();
    tl.current
      // Slide small model out
      .to(smallModel.position, {
        x: -5,
        duration: 0.5,
        ease: "power2.inOut",
      })
      // Slide large model in
      .to(largeModel.position, {
        x: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      // Slide small model back in
      .to(smallModel.position, {
        x: -2,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .set(smallModel.position, { x: -2 });
  }, [size]);

  // GSAP animation for heading
  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <Canvas
              className="w-full h-full"
              eventSource={
                typeof window !== "undefined"
                  ? document.getElementById("root")
                  : undefined
              }
              eventPrefix="client"
            >
              <View.Port />
              {/* Pass both model refs and rotation state to ModelView */}
              <ModelView
                smallGroupRef={smallModelRef}
                largeGroupRef={largeModelRef}
                controlRef={cameraRef}
                setRotationState={setRotation}
                item={model}
                size={size}
              />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
