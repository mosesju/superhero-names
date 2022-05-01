import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [HeroInput, setHeroInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ superhero: HeroInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setHeroInput("");
  }

  return (
    <div>
      <Head>
        <title>Superhero name Generator</title>
        <link rel="icon" href="/superhero.png" />
      </Head>

      <main className={styles.main}>
        <img src="/superhero.png" className={styles.icon} />
        <h1>Get your Superhero Name</h1>
        <h3>You probably are super average... What would your superhero name be?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter an Name: "
            value={HeroInput}
            onChange={(e) => setHeroInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>
          <h3>
            {result}
          </h3>
        </div>
      </main>
    </div>
  );
}
