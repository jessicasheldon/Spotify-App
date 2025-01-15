

export default async function searchFunction(search, accessToken) {

    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken  
      }
    }
    

    const results = await fetch('https://api.spotify.com/v1/search?q=' + search + '&type=track', searchParameters)
      .then(response => response.json())
      .then(data => data.tracks.items)
      .catch(error => {
        console.error("Error fetching search results:", error);
        return [];
      });
    return results;
  }