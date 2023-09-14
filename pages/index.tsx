import Link from "next/link";
import PlanterPreview from "../components/PlanterPreview";
import Plant1Image from "../public/images/plant1.jpg";
import Plant2Image from "../public/images/plant2.jpg";
import Plant3Image from "../public/images/plant3.jpg";

export default function Home() {
  return (
    <>
      <header className="bg-green-100 w-screen py-2 px-4">
        <ul className="text-xl flex justify-between items-center">
          <li className="text-3xl">Planter 🍀</li>
          <li>
            <Link href="/Pots">Pots 🪴</Link>
          </li>
        </ul>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <PlanterPreview
          title="A Plant"
          desription="This is a picture of a plant I found off of the internet. That is all really. I'm adding more text to fill out the space :)"
          imageSrc={Plant1Image}
        />
        <PlanterPreview
          title="Another Plant"
          desription="This is a picture of a plant I found off of the internet. That is all really. I'm adding more text to fill out the space :)"
          imageSrc={Plant2Image}
        />
        <PlanterPreview
          title="Once again, a plant"
          desription="This is a picture of a plant I found off of the internet. That is all really. I'm adding more text to fill out the space :)"
          imageSrc={Plant3Image}
        />
        <PlanterPreview
          title="An (alleged) plant"
          desription=":)"
          imageSrc={Plant1Image}
        />
      </main>
    </>
  );
}
