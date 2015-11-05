//! License: MIT Adapted (as stated in the LICENSE file)

function streamusJSONInput() {
  var streamusJSON = $("#streamusJSONInput").val();
  var streamusPlaylist = JSON.parse(streamusJSON);
  
  var videos = [];
  videos[0] = streamusPlaylist["title"];
  
  var streamusVideos = streamusPlaylist["items"];
  for (i = 0; i < streamusVideos.length; i++) {
    var streamusVideo = streamusVideos[i]["video"];
    
    var video = [];
    video[0] = streamusVideo["title"];
    video[1] = streamusVideo["duration"];
    video[2] = streamusVideo["id"];
    
    videos.push(video);
  }
  
  $("#shareButton").css("display", "initial");
  $("#voila").css("display", "initial");
  
  var playlist = JSON.stringify(videos);
  playlist = window.btoa(playlist);
  
  window.open("https://lnfwebsite.github.io/Streamly/#" + playlist);
}
