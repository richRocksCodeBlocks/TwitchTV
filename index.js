window.onload = function () {
    callEachUser()
};

/* User Stories
* 1. I can see whether Free Code Camp is currently streaming on Twitch.tv
* 2.  I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.
* 3. If a Twitch user is currently streaming, I can see additional details about what they are streaming.
* */


// Global Variables
let i;
const app = document.getElementById('app');
const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const url = 'https://wind-bow.glitch.me/twitch-api';

// call each user
function callEachUser() {
    for (i = 0; i < users.length; i++) {
        let user = users[i];
        requestStream(user);
    }
}


function requestStream(user) {

    $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/' + user.toLowerCase() + '?callback=?', function (data) {

        console.log(data);
        if (data.stream !== null) {
            let status = data.stream.channel.status;
            let game = data.stream.game;
            let channelURL = data.stream.channel.url;
            let imageMedium = data.stream.preview.medium;
            app.innerHTML += `
                    <div class="drop-shadow p-1  m-1 bg-white" style="width: 100%; max-width: 25em; min-height: 9em;">
                        <div class="text-left" style="float: left; height: 150px; width: 150px; background-size: cover; background-image: url(${imageMedium});">
                        </div>
                        <div style="">
                            <p class="h4 text-success text-center text-nowrap pt-4 pr-4 tex-center"><img class="mr-2" src="img/Glitch_Purple_RGB.png" style="height: 25px; width: 25px;">${user}</p>          
                            <p class="text-primary text-center">Currently Streaming
                            <br>
                            <a href="${channelURL}"class="text-center">${game}</a></p>
                        </div>
                    </div>
                   
           `;
        } else {
            requestChannel(user)
        }
    })
}

function requestChannel(user) {

    $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/' + user.toLowerCase() + '?callback=?', function (data) {
        console.log(data);
        let logo = data.logo;
        let videos = data._links.videos;
        app.innerHTML += `
                     <div class="drop-shadow p-1 m-1 bg-white" style="width: 100%; max-width: 25em; min-height: 9em;">
                        <div class="text-left" style="float: left; height: 150px; width: 150px; background-size: cover; background-image: url(${logo});">
            
                        </div>
                        <div style="">
                            <p class="h4 text-success text-center text-nowrap pt-4 pr-4 tex-center"><img class="mr-2" src="img/Glitch_Purple_RGB.png" style="height: 25px; width: 25px;">${user}</p>
                            <p class="text-muted text-center">${user} is Offline
                            <br>
                            <p class="text-center text-muted">${status}</p>
                            </p>
            
                            <p class="text-center">View ${user}'s
                            <br>
                            <a href="${videos}"">Popular Videos</a></p>
                        </div>
                    </div>

                   
            `;
    })

}





