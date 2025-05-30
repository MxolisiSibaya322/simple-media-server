const mediaData = {
    movies: [
      {
        id:1,
        title: "Inception",
        genre: "Sci-Fi",
        year: 2010,
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
        ratings: [8.8, 9.0, 9.2]
      },
      {
        id:2,
        title: "Black Panther",
        genre: "Action",
        year: 2018,
        cast: ["Chadwick Boseman", "Lupita Nyong'o", "Michael B. Jordan"],
        ratings: [8.5, 8.7, 9.1]
      }
    ],
    moviesRequiredFields:["title","genre","year","cast","ratings"],
    series: [
      {
        id:1,
        title: "Stranger Things",
        seasons: [
          {
            season: 1,
            episodes: ["Chapter One: The Vanishing", "Chapter Two: The Weirdo", "Chapter Three: Holly, Jolly"]
          },
          {
            season: 2,
            episodes: ["MADMAX", "Trick or Treat, Freak", "The Pollywog"]
          }
        ],
        genre: "Thriller"
      },
      {
        id:2,
        title: "Breaking Bad",
        seasons: [
          {
            season: 1,
            episodes: ["Pilot", "Cat's in the Bag...", "...And the Bag's in the River"]
          },
          {
            season: 2,
            episodes: ["Seven Thirty-Seven", "Grilled", "Bit by a Dead Bee"]
          }
        ],
        genre: "Crime Drama"
      }
    ],
    seriesRequiredFields:["title","seasons","genre"],
    songs: [
      {
        id:1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        genres: ["Pop", "Synthwave"]
      },
      {
        id:2,
        title: "Jerusalema",
        artist: "Master KG",
        album: "Jerusalema",
        genres: ["House", "Afrobeat"]
      }
    ],
    songsRequiredFields:["title","artist","album","genres"]
  };
  
module.exports = mediaData;
  