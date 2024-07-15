const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.post("/analyze", async (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).send("Text is required");
  }

  const formData = new FormData();
  formData.append("text", text);

  try {
    const response = await axios.post(
      "https://profanity-toxicity-detection-for-user-generated-content.p.rapidapi.com/",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-rapidapi-key":
            "d5e7b0130bmshb4ad54363e10bbfp1da503jsnc9cdcb7025b3",
          "x-rapidapi-host":
            "profanity-toxicity-detection-for-user-generated-content.p.rapidapi.com",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error analyzing text");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
