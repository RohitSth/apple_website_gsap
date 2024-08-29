import dynamic from "next/dynamic";

const NoSSRHomePage = dynamic(() => import("@/components/HomePage"), {
  ssr: false,
});

export default function App() {
  return <NoSSRHomePage />;
}
