"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "@/utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "@/constants";
import ModelView from "./ModelView";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  const smallModelRef = useRef(new THREE.Group());
  const largeModelRef = useRef(new THREE.Group());
  const cameraRef = useRef();
  const [rotation, setRotation] = useState(0);

  const tl = useRef();

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(smallModelRef.current.position, {
        x: -5,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(
        largeModelRef.current.position,
        {
          x: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(smallModelRef.current.position, {
        x: -2,
        duration: 0.5,
        ease: "power2.inOut",
      });

    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  useEffect(() => {
    if (tl.current) {
      if (size === "large") {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [size]);

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
