import { MutableRefObject } from "react";
import * as THREE from "three";

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
  controlRef: MutableRefObject<any>; // The type of control depends on what you're passing here
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
  return <div>ModelView</div>;
};

export default ModelView;
