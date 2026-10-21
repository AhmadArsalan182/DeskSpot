import "dotenv/config";
import { createApp } from "./app.js";

const port = Number(process.env.PORT) || 4000;
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

createApp({ frontendOrigin }).listen(port, () => {
  console.log(`DeskSpot API listening on port ${port}`);
});
