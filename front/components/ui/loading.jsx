import tubeSpinner from "../../public/tube-spinner-white.svg";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed  inset-0 bg-black/60 top-0 left-0 flex justify-center items-center">
      <Image src={tubeSpinner} width={60} height={60} alt="Loading icon" />
    </div>
  );
}
