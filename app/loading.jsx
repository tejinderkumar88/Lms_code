import Image from "next/image";

const Loading = () => {
  return (
    <div className=" loading">
      <Image
        src="/logo.svg"
        alt="Loading Logo"
        className="w-25 h-25 animate-flicker"
        width={100}
        height={100}
        priority
      />
    </div>
  );
};

export default Loading;
