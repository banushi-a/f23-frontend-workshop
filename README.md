# Fall ‘23 React Tutorial

[slides](https://docs.google.com/presentation/d/1-MEKlZrh_eoGq9g-TsfcXhUTHOzS_hTS1klIgAu5QiM/edit?usp=sharing)

## Goal

We will be creating an application that lets you view images and information of peoples’ plants … Planter!

![7.png](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/7.png)

## Setting Up The Project

We will be using React, Next, TypeScript, and Tailwind for this project. Since we haven’t covered TypeScript or CSS Libraries yet, we will be focusing on React + Next.

Run the following command in your terminal:

```bash
npx create-next-app frontend-workshop-f23
```

Here are the answers to the prompts:

```bash
TypeScript : Yes
ESLint : Yes
Tailwind : Yes
src/ directory : No
App Router : No
import alias : No
```

Finally run these two final commands to start the project:

```bash
cd frontend-workshop-f23
npm run dev
```

## Making The First Changes

Open *pages/index.tsx* and delete *everything* in between the `<main>` tags and **********everything********** above `export default`

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
	    homepage
		</main>
  );
}
```

Add `homepage` (or your favorite word) between the `<main>` tags and save.

Next modify *styles/global.css* to be

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
--foreground-rgb: 0, 0, 0;
--background-start-rgb: 214, 219, 220;
--background-end-rgb: 255, 255, 255;
}

body {
color: rgb(var(--foreground-rgb));
background: #eee;

display: flex;
justify-content: center;
}
```

Finally enter the address [localhost:3000](http://localhost:3000) or 127.0.0.1:3000 in your browser.

You should see the following:

![1.png](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/1.png)

## Adding Directories and Files

Next we are going to add a components directory and an images directory to our project. 

[plant1.jpg](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/plant1.jpg)

[plant2.jpg](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/plant2.jpg)

[plant3.jpg](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/plant3.jpg)

[pot1.jpg](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/pot1.jpg)

[pot2.jpg](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/pot2.jpg)

[pot3.jpg](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/pot3.jpg)

Add:

```css
components/PlanterPreview.tsx
public/images/[6 image files]
```

![2.png](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/2.png)

## Making Our First Component

Inside PlanterPreview.tsx, we are going to apply some of the things we have learned to create a “Preview Card” that is meant to mimic an instagram post, a single tweet, etc.

Paste the following code into PlanterPreview.tsx:

```tsx
import Image, { StaticImageData } from "next/image";

type PlanterPreviewProps = {
	title: string;
	description: string;
	imageSrc: StaticImageData;
}

const PlanterPreview = ({
	title,
	description,
	imageSrc,
}: PlanterPreviewProps): JSX.Element => {
	return (
		<div className="flex bg-white p-8 m-2 rounded text-black">
			<Image
				className="rounded border-8 border-green-200"
				src={imageSrc}
				width={144}
				height={144}
				alt="plant image"
			/>
			<div className="ml-4 w-72">
				<h2 className="text-xl font-bold">{title}</h2>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default PlanterPreview;
```

<aside>
💡 If you get an error with `next/image`, go to tsconfig.json and replace `"moduleResolution": "bundler"` with `"moduleResolution": "node"`

</aside>

Lets go over a few things here

1. type
    1. A type is a feature of TypeScript. Although we haven’t formally learned about TypeScript yet, imagine this specific type to be any JavaScript object that has a **title** property that is a string, a **description** property that is a string, and an **imageSrc** property that holds some image data. We use TypeScript to avoid bugs, write code faster, and make less mistakes.
2. Image
    1. Instead of optimizing images at build time, Next.js optimizes images on-demand, as users request them. Unlike static site generators and static-only solutions, your build times aren't increased, whether shipping 10 images or 10 million images.
    2. Images are lazy loaded by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.
3. Functional Component
    1. There are two types of React components: class and functional. Class components are more outdated, yet appear in older codebases. Functional components provide similar features with a more modern syntax.
4. Tailwind
    1. Tailwind is the reason we have a whole bunch of random words inside of the className attribute. Tailwind provides premade classes that help us style our websites. For now we can ignore these since I will be providing them for simplicity.

Now let’s use our `<PlanterPreview …/>` in our page index.tsx. First, let’s import everything we are going to need for our PlanterPreview.

```tsx
import PlanterPreview from "../components/PlanterPreview";
import Plant1Image from "../public/images/plant1.jpg";
import Plant2Image from "../public/images/plant2.jpg";
import Plant3Image from "../public/images/plant3.jpg";
```

Next, try to make three `<PlanterPreview …/>` components using the images and any other values for the remaining props. Replace the `homepage` (or whatever word you used) with these components.

This is what you should see for the planter previews, albeit with your own chosen titles and descriptions:

![4planterPreviews.png](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/4planterPreviews.png)

## Implementing A New Feature

Next we are going to implement a feature that allows you to add upvotes to each post. 

Since we want to store the amount of times a button has been clicked and display that, we will use state. We will add the useState import to our PlanterPreview.tsx file.

Here are the new imports for PlanterPreview.tsx

```tsx
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
```

And here is our new component (with a few missing pieces). Try and figure out how to make the button increment our thumbs up count! (Assume any individual can send as many likes as they desire).

```tsx
type PlanterPreviewProps = {
  title: string;
  description: string;
  imageSrc: StaticImageData;
}

const PlanterPreview = ({
	title,
	description,
	imageSrc,
	}: PlanterPreviewProps): JSX.Element => {
	// Note: In a real application we would base the starting
	// value based on a database call and updating the value
	// would also call the database (backend)
	const [numUpvotes, setNumUpvotes] = useState<number>(/*TODO*/);
	
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
			<p>{description}</p>
			<div className="text-right">
				<button onClick={/* TODO */}>
				{/* TODO */} 👍
				</button>
			</div>
		</div>
	</div>
	);
};

export default PlanterPreview;
```

```tsx
// This is how arrow functions work inside functions
onClick={() => /*code here*/}
```

Once it is working, the result should look like this:

![5previewsWithLikes.png](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/5previewsWithLikes.png)

The only issue with this is that all data is lost on refresh! We will cover more about how to save data, store data, request data, and more during the backend oriented workshop next week.

## Adding A New Page

Usually websites have more than a single page. Using the next.js `<Link … />` component, we can create new pages that are linked to each other.

For Planter, we are planning on launching a new feature, a Pots page. Let us make a new page that will show all of the posts of pots from Planters (people who use Planter).

![6.png](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/6.png)

After making the Pots.tsx page, let’s go back to index.tsx to add a link to it!

Here is our goal for the home page:

![7.png](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/7%201.png)

Clicking on the “Pots 🪴” link should bring you to the pots page:

![8.png](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/8.png)

Here is the markup for the nav bar. Add this into your file.

```tsx
export default function Home() {
return (
<>
	<header className="bg-green-100 w-screen py-2 px-4">
		<ul className="text-xl flex justify-between items-center">
			<li className="text-3xl">Planter 🍀</li>
		</ul>
	</header>
	<main className="flex min-h-screen flex-col items-center justify-between p-24">
		...
	</main>
</>
);
}
```

Using these [docs](https://nextjs.org/docs/pages/api-reference/components/link), try and figure out how to incorporate a link to the Pots page.

Below is the solution:

```tsx
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
		...
	</main>
</>
);
}
```

Next, let’s add a similar nav bar that will have a “Home 🏡” link instead of “Pots 🪴”. It should look like this:

![9.png](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/9.png)

Try this on your own and compare your solution to the provided one below.

In Pots.tsx:

```tsx
import Link from "next/link";

const Pots = (): JSX.Element => {
	return (
	<header className="bg-green-100 w-screen py-2 px-4">
		<ul className="text-xl flex justify-between items-center">
			<li className="text-3xl">Planter 🍀</li>
			<li>
				<Link href="/">Home 🏡</Link>
			</li>
		</ul>
	</header>
	);
};

export default Pots;
```

Now we have two pages in our application!! However the Pots page is kinda lacking…

Create the file “components/PotPreview.tsx” and paste the following into it

```tsx
import Image, { StaticImageData } from "next/image";

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
			<div className="flex items-center justify-center">
				<button className="bg-green-100 p-4 rounded-2xl">
					Add GIF Reation!
				</button>
			</div>
		</div>
	</div>
	);
};

export default PotPreview;
```

When opening the Pots page, it should look very familiar to our home page:

![10.png](Fall%20%E2%80%9823%20React%20Tutorial%200301a3e466c24482b49959bd3a05a8e6/10.png)

## Async Code

You will notice that we have an “Add GIF Reaction!” button. This button will allow a user to add a randomly generated GIF as a reaction to the original post (I know IRL this is probably a nightmare to use, but let’s just call our new feature BogoReaction).

In order to get a random gif, we are going to have to utilize an API. We will cover API’s more in depth during the backend workshop, but they are being introduced here to provide exposure to *asynchronous* code. Async code is code that only returns after an unspecified amount of time– we don’t know if it’ll have a response in 3 milliseconds or 3 minutes. Luckily, we have “Promises” to deal with this.

The [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It allows you to associate handlers with an asynchronous action's eventual success/failure value. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a *promise* to supply the value at some point in the future.

### **Handling Promises: Then vs Await**

There are two different ways to handle an asynchronous response: we can asynchronously force our program to wait until the promise resolves before continuing, or we can assign a callback function to the promise to indicate the action to execute once resolved.

**Await** - Inside an asynchronous function, await is an operator that is used to wait on a promise. The function will pause at that line until the promise is resolved (completed).

**Then/Catch** - Alternatively, we can use the .then(...).catch(...) syntax. .then accepts a function where the parameter is the result and .catch accepts a function where the parameter is the error. Notice both of these methods in action in the code below.

<aside>
💡 If you are going to use await, you must define your method as async. Awaiting provides “synchronous” behavior within a function, though that function itself is still asynchronous - so you must define the method as async.

</aside>

Here is the updated code for PotPreview with the async handling:

```tsx
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
```
