const express = require("express");
const app = express();

const { OpenAI } = require("openai");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) =>
  res.json("welcome to haiku generated from API home page")
);

app.get("/haiku", async (req, res) => {
  const authHeaders = req.headers;

  if (authHeaders.secretkey !== "superChiaveSegreta") {
    res.json({ Attenzione: "non sei autorizzato a fare questa richiesta" });
    return;
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Write a haiku" }],
      model: "gpt-4o-mini",
    });

    res.json(completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
});
