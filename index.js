//! License: MIT Adapted (as stated in the LICENSE file)

function streamusJSONInput() {
  var streamusJSON = $("#streamusJSONInput").val();
  var streamusPlaylist = JSON.parse(streamusJSON);
  console.log(streamusPlaylist);
}
