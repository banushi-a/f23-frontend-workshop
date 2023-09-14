import { useState } from "react";
import Image, { StaticImageData } from "next/image";

type PlanterPreviewProps = {
  title: string;
  desription: string;
  imageSrc: StaticImageData;
};

const PlanterPreview = ({
  title,
  desription,
  imageSrc,
}: PlanterPreviewProps): JSX.Element => {
  // Note: In a real application we would base the starting
  // value based on a database call and updating the value
  // would also call the database (backend)
  const [numUpvotes, setNumUpvotes] = useState<number>(0);

  return (
    <div className="flex bg-white p-8 m-2 rounded text-black">
      <Image
        className="rounded border-8 border-green-200"
        src={imageSrc}
        width={144}
        height={144}
        alt="plant image"
      />
      <div className="ml-4 w-72 flex flex-col justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{desription}</p>
        <div className="text-right">
          <button onClick={() => setNumUpvotes(numUpvotes + 1)}>
            {numUpvotes} 👍
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanterPreview;
