const express = require("express");
const { spawn } = require("child_process");

const app = express();

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.get("/download", (req, res) => {
  const url = req.query.url;
  if (!url) return res.send("URL required");

  res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');

  const ytdlp = spawn("yt-dlp", ["-f", "mp4", "-o", "-", url]);
  ytdlp.stdout.pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
