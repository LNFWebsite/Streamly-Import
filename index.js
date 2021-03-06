/**
  Copyright 2018 LNFWebsite
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
**/

// Audius Import functions

var playlistName = null;

function audiusConvert(data) {
  data = data["entities"];
  
  console.log(playlistName);
  
  if (playlistName === "undefined") {
    playlistName = null;
  }
  if (playlistName !== null) {
    playlistName = encodeURIComponent(playlistName).replace(/%20/g, " ");
  }
  var videos = [playlistName];
  playlistName = null;
  
  $.each(data, function(index, value) {
    var video = [];

    video[0] = encodeURIComponent(value["title"]).replace(/%20/g, " ");
    video[1] = value["durationS"];
    video[2] = index;

    videos.push(video);
  });

  return videos;
}

function audiusInput() {
  function loadPlaylist(input) {
    try {
      var playlist = audiusConvert(input);
      playlist = JSON.stringify(playlist);
      playlist = window.btoa(playlist);
      playlist = "https://lnfwebsite.github.io/Streamly/#" + playlist;
      window.location.href = playlist;
    } catch (e) {
      alert("Whoops, it seems that your playlist didn't load correctly\n\nTry copying again");
      $("#audiusInput").val("");
      return false;
    }
  }
  
  var input = $("#audiusInput").val();
  //https://audius.rockdapus.org/?import=https://api.myjson.com/bins/m7pxt&type=playList&title=PLAYLSIT
  if (input.indexOf("myjson.com") !== -1) {
    if (input.indexOf("audius.rockdapus.org") !== -1) {
      var url = new URL(input);
      input = url.searchParams.get("import");
      playlistName = url.searchParams.get("title");
    }
    
    $.get(input, function (data, textStatus, jqXHR) {
      loadPlaylist(data);
    }).fail(function() {
      alert("Whoops, it seems that your playlist didn't load correctly\n\nTry copying again");
      $("#audiusInput").val("");
    });
  }
  else {
    try {
      input = JSON.parse(input);
    } catch(e) {};
    loadPlaylist(input);
  }
}

// Streamus Import functions

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
  }
  else {
    alert("Whoops, it seems that something's wrong with the data you entered\n\nTry copying again");
  }
}
