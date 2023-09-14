import Link from "next/link";
import PotImage1 from "../public/images/pot1.jpg";
import PotImage2 from "../public/images/pot2.jpg";
import PotImage3 from "../public/images/pot3.jpg";
import PotPreview, { PotPreviewProps } from "../components/PotPreview";

const PotPreviewObjects: PotPreviewProps[] = [
  {
    title: "Used Pot",
    boughtFrom: "garage sale",
    imageSrc: PotImage1,
  },
  {
    title: "Brand New Pot I Found",
    boughtFrom: "home depot",
    imageSrc: PotImage2,
  },
  {
    title: "Historic Pot 👻",
    boughtFrom: "estate sale",
    imageSrc: PotImage3,
  },
];

const Pots = (): JSX.Element => {
  return (
    <>
      <header className="bg-green-100 w-screen py-2 px-4">
        <ul className="text-xl flex justify-between items-center">
          <li className="text-3xl">Planter 🍀</li>
          <li>
            <Link href="/">Home 🏡</Link>
          </li>
        </ul>
      </header>
      <main className="flex-col items-center mx-24 my-12">
        {PotPreviewObjects.map((PotPreviewObject, i) => {
          return <PotPreview key={i} {...PotPreviewObject} />;
        })}
      </main>
    </>
  );
};

export default Pots;
