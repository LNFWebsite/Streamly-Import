//! License: MIT Adapted (as stated in the LICENSE file)
var streamusPlaylist;
function streamusJSONInput() {
  var streamusJSON = $("#streamusJSONInput").val();
  streamusPlaylist = JSON.parse(streamusJSON);
  
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
  
  $("#voila").css("display", "block");
  
  var playlist = JSON.stringify(videos);
  playlist = window.btoa(playlist);
  
  window.open("https://lnfwebsite.github.io/Streamly/#" + playlist);
}
