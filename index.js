//! License: MIT Adapted (as stated in the LICENSE file)
var streamusPlaylist;
function streamusJSONInput() {
  var streamusJSON = $("#streamusJSONInput").val();
  streamusPlaylist = JSON.parse(streamusJSON);
  console.log(streamusPlaylist);
}
