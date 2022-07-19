import express from "express";
const router = express.Router();
import axios from "axios";

router.get("/search/:id", async (req, res) => {
  await axios
    .get(`https://api.deezer.com/playlist/${req.params.id}`)
    .then((response) => {
      console.log(response.data.tracks);
      res.send(response.data.tracks);
    });
});

export default router;
