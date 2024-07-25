import Image from "next/image";
import ripples from "../../../public/ripples.svg";

export default function LoadingPage() {
  return (
    <Image src={ripples} width={500} height={500} alt="Loading page icon" />
  );
}
