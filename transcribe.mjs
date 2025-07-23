// transcribe.js
import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";

const userId = process.argv[2]; // Get user ID from CLI args

if (!userId) {
  console.error("❌ Please pass a user ID. Example: node transcribe.js user_123");
  process.exit(1);
}

const audioFile = path.join("audio", "meeting1.mp3");
const whisperModel = "base";
const outputPath = "transcript.json";

exec(`whisper ${audioFile} --model ${whisperModel} --output_format json`, async (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Whisper transcription failed:", stderr);
    return;
  }

  console.log("✅ Whisper transcription complete");

  try {
    const whisperFileName = path.basename(audioFile).replace(/\.(mp3|wav)/, ".json");
    const rawData = await fs.readFile(whisperFileName, "utf-8");
    const whisperJson = JSON.parse(rawData);

    const transcript = whisperJson.segments.map((seg) => ({
      user_id: userId,
      text: seg.text.trim(),
      timestamp: secondsToTimestamp(seg.start),
    }));

    await fs.writeFile(outputPath, JSON.stringify(transcript, null, 2));
    console.log(`📄 Cleaned transcript saved to ${outputPath}`);
  } catch (readErr) {
    console.error("❌ Failed to process Whisper output:", readErr.message);
  }
});

function secondsToTimestamp(seconds) {
  const date = new Date(null);
  date.setSeconds(Math.floor(seconds));
  return date.toISOString().substr(11, 8);
}

