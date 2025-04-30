const mediaData = require('./mediaData');
const fs = require('fs'); 
const validMovies= (data)=>{
if (
    typeof data.title !== 'string' ||
    typeof data.genre !== 'string' ||
    typeof data.year !== 'string' ||
    !Array.isArray(data.cast) ||
    !Array.isArray(data.ratings)
) {
    return false
}else{
    return true
}
}

const validSeries= (data)=>{
if (
    typeof data.title !== 'string' ||
    typeof data.genre !== 'string' ||
    !Array.isArray(data.seasons) 
) {
    return false
}
return true
}

const validSongs = (data) =>{
if (
    typeof data.title !== 'string' ||
    typeof data.artist !== 'string' ||
    typeof data.album !== 'string' ||
    !Array.isArray(data.genres)   
) {
    return false
}
    return true
}

const checkFields = (requiredFields,data)=>{
for (let field of requiredFields) {
    if (!(field in data)) {
    return field
    }
}
return ""
}
const updateItem =async (data,id,type)=>{
let database = await readDatabase("database.json");
  
for(let i =0;i<database[type].length;i++){
    if (database[type][i].id === id){
      database[type][i] = {id:id,...data}
      break;
    } 
}
await writeDatabase(database);
return database[type];

}
const deleteItem = async(id,type)=>{
let database = await readDatabase("database.json")
database[type] =database[type].filter((item)=> item.id != id);
await writeDatabase(database);
return database[type];
}


const readDatabase = (FILE_NAME,type)=> {
  try {
    const data =  fs.readFileSync(FILE_NAME, 'utf-8');
    const parsedData =JSON.parse(data);
    return type?  parsedData[type]: parsedData; 
  } catch (error) {
    console.error('Error reading database:', error.message);
    return null;
  }
}
const writeDatabase= async(data,type)=> {
    try {
      if(type){
        let database = await readDatabase("database.json");
        database[type].push({id:database[type].length+1,...data});
        fs.writeFileSync('database.json', JSON.stringify(database, null, 2)); 
        return database[type]
      }else{
        fs.writeFileSync('database.json', JSON.stringify(data, null, 2)); 
        return
      }
     
      
    } catch (error) {
      console.error('Error writing to database:', error.message);
    }
  }

  const checkDatabase =async ()=>{
    let database = await readDatabase("database.json");
    if(!database){
      data={
        movies:[],
        series:[],
        songs:[]
      }
      await writeDatabase(data);
    }
  }
  



module.exports =  {checkDatabase,writeDatabase,readDatabase,validMovies,validSeries,validSongs,checkFields,updateItem,deleteItem} 