const http = require('http');
const mediaData = require('./mediaData');
const {validMovies,validSeries,validSongs
  ,checkFields,updateItem,deleteItem} = require('./helpers'); 
const PORT = 3000;
const server = http.createServer((req, res) => {
  const sendJSON = (data, statusCode = 200) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    const  data =  (body)?JSON.parse(body):{};
    let invalidFields = "";
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
    }else if(req.method==="POST"){
      switch(req.url){
        case "/movies":
            
          invalidFields= checkFields(mediaData.moviesRequiredFields,data);
          invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";
          if (!validMovies(data))  return sendJSON({ message: 'Invalid data types in request body' }, 400);
          mediaData.movies.push({id:mediaData.movies.length+1, ...data});
          sendJSON({ message: "Movie added successfully", AllMovies: mediaData.movies }, 201);
          break;
        case "/series":
          invalidFields= checkFields(mediaData.seriesRequiredFields,data);
          invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";      
          if(!validSeries(data)) return sendJSON({ message: 'Invalid data types in request body' }, 400);
          mediaData.series.push({id:mediaData.series.length+1, ...data});
          sendJSON({ message: "Series added successfully", AllSeries: mediaData.series }, 201);
          break;
        case "/songs":
        
          invalidFields= checkFields(mediaData.songsRequiredFields,data);
          invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";
          if(!validSongs(data)) return sendJSON({ message: 'Invalid data types in request body' }, 400);

          mediaData.songs.push({id:mediaData.songs.length+1, ...data});
          sendJSON({ message: "Song added successfully", AllSongs: mediaData.songs }, 201);
          break;
        default:
          sendJSON({ message: "Route not found" }, 404);
          break;
        }
      }else if(req.method==="DELETE"){
        arrParams =req.url.split("/");
        arrParams.shift();
        const type = arrParams[0].trim();
        const id = parseInt(arrParams[1]);

        if (["movies","series","songs"].includes(type)){
          deleteItem(id,type);
          sendJSON({ message: "Movie deleted successfully", AllMovies: mediaData.movies }, 200);
        }else{
          sendJSON({ message: "Route not found" }, 404);
        }
      }else if(req.method==="PUT"){
        arrParams =req.url.split("/");
        arrParams.shift();
        const type = arrParams[0].trim();
        const id = parseInt(arrParams[1]);
        if (["movies","series","songs"].includes(type)){
          switch(type){
            case "movies":
              invalidFields= checkFields(mediaData.moviesRequiredFields,data);
              invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";
              if (!validMovies)  return sendJSON({ message: 'Invalid data types in request body' }, 400);
              updateItem(data,id,type);
              sendJSON({ message: "Movie updated successfully", AllMovies: mediaData.movies }, 200);
              break;
            case "series":
              invalidFields= checkFields(mediaData.seriesRequiredFields,data);
              invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";      
              if(!validSeries(data)) return sendJSON({ message: 'Invalid data types in request body' }, 400);
              updateItem(data,id,type);
              sendJSON({ message: "series updated successfully", AllSeries: mediaData.series }, 200);
              break;
            case "songs":
              invalidFields= checkFields(mediaData.songsRequiredFields,data);
              invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";
              if(!validSongs(data)) return sendJSON({ message: 'Invalid data types in request body' }, 400);
              updateItem(data,id,type);
              sendJSON({ message: "song updated successfully", AllSongs: mediaData.songs }, 200);
              break;
            default:
              sendJSON({ message: "Route not found" }, 404);
              break;
          }
        }else{
          sendJSON({ message: "Route not found" }, 404);
        }
      }

    });
 

});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}, running on http://localhost:${PORT}`);
});


