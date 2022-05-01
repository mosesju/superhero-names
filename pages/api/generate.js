import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.superhero),
    temperature: 0.8,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(superhero) {
  const capitalizedPerson =
    superhero[0].toUpperCase() + superhero.slice(1).toLowerCase();
  return `Make up three funny superhero names that aren't real

  Person: Mitch Perinar
  Names: Supercharge, Static Shock
  Person: Katharina Schneider
  Names: Ms. Mystic, Karma
  Person: ${capitalizedPerson}
  Names:`;
}
