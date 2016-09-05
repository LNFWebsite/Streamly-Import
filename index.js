//! License: MIT (as stated in the LICENSE file)

var voila = "Voilà! A tab of your playlist in Streamly should have opened!";

function streamusURLInput() {
  var input = $("#streamusURLInput").val();
  var regex = /^http(|s):\/\/streamus.com\/share\/playlist\/.*\/.*$/i;
  
  input = input.trim();
  input = input.match(regex);
  
  if (input !== null) {
    window.open(input[0] + "/json");
    $("#streamusJSONInput").focus();
  }
  else {
    alert("That doesn't appear to be a valid Streamus playlist\n\nTry copying the URL again");
  }
}

function streamusJSONInput() {
  var streamusJSON = $("#streamusJSONInput").val();
  try {
    var streamusPlaylist = JSON.parse(streamusJSON);
  } catch (e) {
    alert("Whoops, it seems that something's wrong with the data you entered\n\nTry copying again");
    return false;
  }
  var videos = [];
  
  var playlistName = streamusPlaylist["title"];
  playlistName = playlistName.trim();
  playlistName = encodeURIComponent(playlistName).replace(/%20/g, " ");
  
  videos[0] = playlistName;
  
  var streamusVideos = streamusPlaylist["items"];
  for (i = 0; i < streamusVideos.length; i++) {
    var streamusVideo = streamusVideos[i]["video"];
    
    var video = [];
    
    var videoName = streamusVideo["title"];
    videoName = videoName.trim();
    videoName = encodeURIComponent(videoName).replace(/%20/g, " ");
    
    video[0] = videoName;
    video[1] = streamusVideo["duration"];
    video[2] = streamusVideo["id"];
    
    videos.push(video);
  }
  
  var playlist = JSON.stringify(videos);
  playlist = window.btoa(playlist);
  
  window.open("https://lnfwebsite.github.io/Streamly/#" + playlist);
  
  alert(voila);
}

function streamusFileInput() {
  var streamusFile = $("#streamusFileInput").val();
  if (/.+?,.+?,.+?,.+?,\d+?/i.test(streamusFile)) {
    streamusFile = streamusFile.split("\n");
    
    var videos = [];
    
    videos[0] = null;
    
    for (var i = 0; i < streamusFile.length; i++) {
      streamusFile[i] = streamusFile[i].split(",");
      
      var video = [];
      video[0] = streamusFile[i][0];
      video[1] = +streamusFile[i][4];
      video[2] = streamusFile[i][1];
      
      videos.push(video);
    }
    
    var playlist = JSON.stringify(videos);
    playlist = window.btoa(playlist);
    
    window.open("https://lnfwebsite.github.io/Streamly/#" + playlist);
    
    alert(voila);
  }
  else {
    alert("Whoops, it seems that something's wrong with the data you entered\n\nTry copying again");
  }
}
