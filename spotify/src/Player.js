import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken, songUri }) {
    return <SpotifyPlayer 
        token = {accessToken}
        uri = {songUri ? [songUri] : []}
    />
}