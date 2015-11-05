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
  
  if (videos.length > 1) {
    var playlist = JSON.stringify(videos);
    playlist = window.btoa(playlist);
    playlist = "https://lnfwebsite.github.io/Streamly/#" + playlist;
    $("#shareButton").attr("data-clipboard-text", "https://lnfwebsite.github.io/Streamly/#" + playlist);
  }
  else {
    $("#shareButton").attr("data-clipboard-text", "https://lnfwebsite.github.io/Streamly/");
  }
}
