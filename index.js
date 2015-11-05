//! License: MIT Adapted (as stated in the LICENSE file)

function streamusJSONInput() {
  var streamusJSON = $("#streamusJSONInput").val();
  try {
    var streamusPlaylist = JSON.parse(streamusJSON);
  } catch (e) {
    alert("Whoops, it seems that something's wrong with the data you entered\n\nTry copying again");
    return false;
  }
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
