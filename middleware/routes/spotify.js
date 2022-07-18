import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import queryString from "query-string";
import SpotifyWebApi from "spotify-web-api-node";

dotenv.config();

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get("/loginS", (req, res) => {
  var scopes = [
    "user-read-private",
    "user-read-email",
    "streaming",
    "user-library-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-read-recently-played",
  ];

  var spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
  });

  var authorizeURL = spotifyApi.createAuthorizeURL(
    scopes,
    generateRandomString(16)
  );

  res.redirect(authorizeURL);
});

router.get("/callback", (req, res) => {
  const code = req.query.code || null;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const { access_token, refresh_token, expires_in } = data.body;

      const queryParams = queryString.stringify({
        access_token,
        refresh_token,
        expires_in,
      });

      res.redirect(`http://localhost:3000/?${queryParams}`);
    })
    .catch((err) => {
      console.log(err);
      res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
    });
});

router.get("/refresh_tokens", (req, res) => {
  const { refresh_token } = req.query;
  console.log(refresh_token);

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi.setRefreshToken(refresh_token);

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("the access token has been refreshed!");
      spotifyApi.setAccessToken(data.body["access_token"]);
      res.send(data.body);
    })
    .catch((err) => {
      res.send(err);
    });
});

export default router;
