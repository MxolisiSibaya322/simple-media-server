const mediaData = require('./mediaData');
  
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
const updateItem = (data,id,type)=>{
for(let i =0;i<mediaData[type].length;i++){
    if (mediaData[type][i].id === id){
    mediaData[type][i] = {id:id,...data}
    } 
}

}
const deleteItem = (id,type)=>{
mediaData[type] =mediaData[type].filter((item)=> item.id != id)
}


module.exports =  {validMovies,validSeries,validSongs,checkFields,updateItem,deleteItem} 