const http = require('http');
const mediaData = require('./mediaData');
const PORT = 3000;
const server = http.createServer((req, res) => {
  const sendJSON = (data, statusCode = 200) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method === "GET") {
    let responseBody = '';

    switch (req.url) {
      case "/movies":
      case "/series":
      case "/songs":
        responseBody = mediaData[req.url.slice(1)];
        sendJSON(responseBody);
        break;
      default:
        sendJSON({ message: "Route not found" }, 404);
        break;
    }
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  
  req.on('end', () => {
    const  data = JSON.parse(body);
    let invalidFields = "";
    if(req.method==="POST"){
      switch(req.url){
        case "/movies":
            
          invalidFields= checkFields(mediaData.moviesRequiredFields,data);
          invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";
          
          if (
            typeof data.title !== 'string' ||
            typeof data.genre !== 'string' ||
            typeof data.year !== 'string' ||
            !Array.isArray(data.cast) ||
            !Array.isArray(data.ratings)
          ) {
            return sendJSON({ message: 'Invalid data types in request body' }, 400);
          }
          mediaData.movies.push({id:mediaData.movies.length+1, ...data});
          sendJSON({ message: "Movie added successfully", AllMovies: mediaData.movies }, 201);
          break;
        case "/series":
          invalidFields= checkFields(mediaData.seriesRequiredFields,data);
          invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";      
          if (
            typeof data.title !== 'string' ||
            typeof data.genre !== 'string' ||
            !Array.isArray(data.seasons) 
          ) {
            return sendJSON({ message: 'Invalid data types in request body' }, 400);
          }
          mediaData.series.push({id:mediaData.series.length+1, ...data});
          sendJSON({ message: "Series added successfully", AllSeries: mediaData.series }, 201);
          break;
        case "/songs":
        
          invalidFields= checkFields(mediaData.songsRequiredFields,data);
          invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";
          if (
            typeof data.title !== 'string' ||
            typeof data.artist !== 'string' ||
            typeof data.album !== 'string' ||
            !Array.isArray(data.genres)   
          ) {
            return sendJSON({ message: 'Invalid data types in request body' }, 400);
          }

          mediaData.songs.push({id:mediaData.songs.length+1, ...data});
          sendJSON({ message: "Song added successfully", AllSongs: mediaData.songs }, 201);
          break;
        }
      }

    });
 
  const checkFields = (requiredFields,data)=>{
    for (let field of requiredFields) {
      if (!(field in data)) {
        return field
      }
    }
    return ""
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}, running on http://localhost:${PORT}`);
});


