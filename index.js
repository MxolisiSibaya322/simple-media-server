const http = require('http');
const mediaData = require('./mediaData');
const {checkDatabase,writeDatabase,readDatabase,validMovies,validSeries,validSongs
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
  
  req.on('end', async () => {
    const  data =  (body)?JSON.parse(body):{};
    let invalidFields = "";
    await checkDatabase();
    if (req.method === "GET") {

      switch (req.url) {
        case "/movies":
        case "/series":
        case "/songs":
          const resData =await readDatabase("database.json",req.url.slice(1))
          sendJSON(resData);
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
          const movies =await writeDatabase(data,"movies");
          sendJSON({ message: "Movie added successfully", AllMovies: movies}, 201);
          break;
        case "/series":
          invalidFields= checkFields(mediaData.seriesRequiredFields,data);
          invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";      
          if(!validSeries(data)) return sendJSON({ message: 'Invalid data types in request body' }, 400);
          const series = await writeDatabase(data,"series");
          sendJSON({ message: "Series added successfully", AllSeries: series }, 201);
          break;
        case "/songs":
        
          invalidFields= checkFields(mediaData.songsRequiredFields,data);
          invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";
          if(!validSongs(data)) return sendJSON({ message: 'Invalid data types in request body' }, 400);

          const songs = await writeDatabase(data,"songs");
          sendJSON({ message: "Song added successfully", AllSongs: songs }, 201);
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
          const items = await deleteItem(id,type);
          sendJSON({ message: `${type} deleted successfully`, AllItems: items }, 200);
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
              const movies =await updateItem(data,id,type);
              sendJSON({ message: "Movie updated successfully", AllMovies: movies }, 200);
              break;
            case "series":
              invalidFields= checkFields(mediaData.seriesRequiredFields,data);
              invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";      
              if(!validSeries(data)) return sendJSON({ message: 'Invalid data types in request body' }, 400);
              const series =await updateItem(data,id,type);
              sendJSON({ message: "series updated successfully", AllSeries: series }, 200);
              break;
            case "songs":
              invalidFields= checkFields(mediaData.songsRequiredFields,data);
              invalidFields!==""? sendJSON({ message: `Missing field: ${invalidFields}` }, 400):"Passed Validation";
              if(!validSongs(data)) return sendJSON({ message: 'Invalid data types in request body' }, 400);
              const songs =await updateItem(data,id,type);
              sendJSON({ message: "song updated successfully", AllSongs: songs }, 200);
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


