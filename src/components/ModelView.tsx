import { PerspectiveCamera, View } from "@react-three/drei";
import { MutableRefObject, Suspense } from "react";
import * as THREE from "three";
import Lights from "./Lights";
import IPhone from "./IPhone";

// Define the type for the item prop
interface ModelItem {
  title: string;
  color: string[]; // Array of colors for different meshes
  img: string; // Assuming this is a URL or path to an image
}

// Define the props type for the ModelView component
interface ModelViewProps {
  index: number;
  groupRef: MutableRefObject<THREE.Group>;
  gsapType: string;
  controlRef: MutableRefObject<any>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: ModelItem;
  size: string;
}

const ModelView: React.FC<ModelViewProps> = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`border-2 border-yellow-500 size-full ${
        index === 2 ? "right-[-100%]" : ""
      }`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      {/* Lights */}
      <Lights />

      <Suspense fallback={<div>Loading...</div>}>
        <IPhone />
      </Suspense>
    </View>
  );
};

export default ModelView;
