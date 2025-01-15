const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const app = express();

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'fcd2edb8d5904149a722c0b587220dce',
        clientSecret: '60e2768a838e429d87748c67b42d0206'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})