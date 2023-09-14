import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export interface PotPreviewProps {
  title: string;
  boughtFrom: string;
  imageSrc: StaticImageData;
}

const PotPreview = ({
  title,
  boughtFrom,
  imageSrc,
}: PotPreviewProps): JSX.Element => {
  const [currentGif, setCurrentGif] = useState<string | undefined>();

  const hanldeClick = async () => {
    const res = await fetch(
      "http://api.giphy.com/v1/gifs/random?q=cat+funny+reaction&api_key=INlc07WVBffe6tn7L3e49tMMkOtwjQFK&limit=1"
    );
    const giffys = await res.json();
    setCurrentGif(giffys.data.images.original.url);
  };

  // The nested callbacks are less than ideal here. If we had to do more async operations,
  // we would enter what is referred to as "callback hell"; the benefit of async/await is
  // to avoid this.
  //   const hanldeClick = async () => {
  //     fetch(
  //       "http://api.giphy.com/v1/gifs/random?q=cat+funny+reaction&api_key=INlc07WVBffe6tn7L3e49tMMkOtwjQFK&limit=5"
  //     ).then((res) => {
  //       res
  //         .json()
  //         .then((jsonRes) => setCurrentGif(jsonRes.data.images.original.url));
  //     });
  //   };

  return (
    <div className="flex bg-white p-8 m-2 rounded text-black">
      <Image
        className="rounded border-8 border-green-200"
        src={imageSrc}
        width={144}
        height={144}
        alt="plant image"
      />
      <div className="ml-4 w-11/12 flex justify-between">
        <div className="flex-col justify-start items-start">
          <h2 className="text-xl font-bold">{title}</h2>
          <p>Bought At: {boughtFrom}</p>
        </div>
        {currentGif && (
          <img height={144} width={144} src={currentGif} alt="random gif" />
        )}
        <div className="flex items-center justify-center">
          <button
            onClick={hanldeClick}
            className="bg-green-100 p-4 rounded-2xl"
          >
            Add GIF Reation!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PotPreview;
