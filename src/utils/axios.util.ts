import axios from "axios";
import LINK from "./link";

export default axios.create({
  baseURL: LINK,
  headers: { "ngrok-skip-browser-warning": "69420" },
});
