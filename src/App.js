import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Card, CardContent } from "@mui/material";

const API_URL = "https://fakenewsagpp-q0lh.onrender.com/predict";

const App = () => {
  const [newsText, setNewsText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckNews = async () => {
    if (!newsText.trim()) {
      alert("Enter news text first!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_URL, { text: newsText });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Error: Unable to fetch prediction.");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        📰 Fake News Detector
      </Typography>
      <TextField
        label="Enter News Article"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={newsText}
        onChange={(e) => setNewsText(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button variant="contained" color="primary" onClick={handleCheckNews} disabled={loading}>
        {loading ? "Checking..." : "Check News"}
      </Button>

      {prediction && (
        <Card style={{ marginTop: "20px", backgroundColor: prediction === "Fake News" ? "#ffcccc" : "#ccffcc" }}>
          <CardContent>
            <Typography variant="h5">{prediction}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default App;
