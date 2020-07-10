import {getAllFavorite, getFavoritebyId} from "./db.js";
import {getTeams, getTeambyId, getMatchesbyTeamScheduled, getMatchesbyTeamFinished, getStandings, getTopScorers} from "./api.js";

function error(error) {
  console.log("Error : " + error);
}

function showLoader() {
  let loaderhtml = 
                  `<div class="preloader-wrapper active">
                    <div class="spinner-layer spinner-red-only">
                      <div class="circle-clipper left">
                        <div class="circle"></div>
                      </div><div class="gap-patch">
                        <div class="circle"></div>
                      </div><div class="circle-clipper right">
                        <div class="circle"></div>
                      </div>
                    </div>
                  </div>`

    document.getElementById("loader").innerHTML = loaderhtml;
}

function hideLoader() {
  document.getElementById("loader").innerHTML = "";
}

const loadAllTeams = () => {
	const teams = getTeams();
	teams.then(data => {
	  let teamsHTML = `<h5 align="center" class="white-text"> Meet the Teams </h5><div class="row">`;
      data.teams.forEach((team) => {
        teamsHTML += `
            <div class="col s12 m6 l4">
              <div class="card-panel small gradient-45deg-deep-purple-purple z-depth-3" id="team-list">
                <a href="./teamdetails.html?id=${team.id}">
                  <div class="card-image waves-effect waves-block waves-light center-align">
                    <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" class="home-badge" alt="Team Crest"/>
                  </div>
                </a>
                  <h5 class="white-text center-align">${team.shortName}</h5>
                  <hr>
                  <div class="card-action center-align"> 
                  <a href="./teamdetails.html?id=${team.id}" class="waves-effect waves-light green darken-3 btn">
                    <i class="material-icons left">search</i>Lihat Tim</a>
                  </div>
              </div>
            </div>
            `;
      });
      teamsHTML += `</div>`;
      document.getElementById("body-content").innerHTML = teamsHTML;
      hideLoader()
    })
    .catch(error);
}

const loadTeamById = () => {
	const teams = getTeambyId();
	teams.then(data => {
		let teamHTML = `        
           <div class="card">
              <div class="card-image gradient-45deg-green-teal ">
                <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}"  class="cover-badge" alt="Team Crest"/>
              </div>
              <div class="card-content">
              <span class="card-title black-text">${data.name}</span>
               <p><i class="material-icons">view_list</i> ${data.founded} <br>
                   <i class="material-icons">flag</i> ${data.clubColors}<br>
                   <i class="material-icons">home</i> ${data.venue}<br>
                   <i class="material-icons">web</i> <a href="${data.website}">${data.website}</a></p>
              </div>
            </div>
          </div>`

        let squadHTML = `<h5 class="white-text center-align indigo darken-3"> The Squad </h5>
        <table class="striped responsive-table white-text">
                            <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Position</th>
                                  <th>Role</th>
                              </tr>
                            </thead>
                            <tbody>`;
          data.squad.forEach((people) => {
            squadHTML += `
                  <tr>
                    <td>${people.name}</td>
                    <td>${people.position}</td>
                    <td>${people.role}</td>
                  </tr>
                `;
          });
        squadHTML +=
             ` </tbody>
            </table>` 
    document.getElementById("body-content").innerHTML = teamHTML;
    document.getElementById("squad-table").innerHTML = squadHTML;
	})
}

const loadMatchesbyTeamScheduled = () => {
	const scheduledMatches = getMatchesbyTeamScheduled();
	scheduledMatches.then(data => {
		let teamHTML = ""
          data.matches.forEach((result) => {
            teamHTML += `
                 <div class="col s12 m6 l4">
                      <div class="card small grey darken-3">
                        <div class="card-content white-text">
                          <h6>Matchday ${result.matchday} ${result.competition.name}</h6>
                          <div class="row">
                            <div class="col s6 m6">
                              <h5> ${result.homeTeam.name} </h6>
                            </div>
                            <div class="col s6 m6 right-align">
                              <h5> ${result.awayTeam.name} </h6>
                            </div>
                          </div>
                        </div>
                        <div class="card-action center-align">
                          <p class="white-text orange darken-4"><i class="material-icons">access_time</i>${result.utcDate}</p>
                        </div>
                      </div>
                    </div>
                `;
          });  
    document.getElementById("scheduled").innerHTML = teamHTML;
	})
}

const loadMatchesbyTeamFinished = () => {
	const finishedMatches = getMatchesbyTeamFinished();
	finishedMatches.then(data => {
		let teamHTML = ""
          data.matches.forEach((result) => {
            teamHTML += `
                    <div class="col s12 m6 l4">
                      <div class="card small grey darken-3">
                        <div class="card-content white-text">
                          <h6>Matchday ${result.matchday} ${result.competition.name}</h6>
                          <div class="row">
                            <div class="col s7 m7">
                              <h5> ${result.score.fullTime.homeTeam} </h5>
                              <p> ${result.homeTeam.name} </p>
                            </div>
                            <div class="col s5 m5 right-align">
                              <h5> ${result.score.fullTime.awayTeam} </h5>
                              <p> ${result.awayTeam.name} </p>
                            </div>
                          </div>
                        </div>
                        <div class="card-action center-align">
                          <p class="black-text green accent-3">${result.status}</p>
                        </div>
                      </div>
                    </div>
                `;
          });  
    document.getElementById("finished").innerHTML = teamHTML;
	})
}

const loadStandings = () => {
	const standings = getStandings();
	standings.then(data => {
		let standingsHTML = `<h5 align="center" class="white-text"> Standings </h5>
                          <table class="striped white-text">
                            <thead>
                              <tr>
                                  <th>Pos.</th>
                                  <th>Team</th>
                                  <th>Pts</th>
                                  <th>W</th>
                                  <th>D</th>
                                  <th>L</th>
                                  <th>GF</th>
                                  <th>GA</th>
                                  <th>GD</th>
                              </tr>
                            </thead>
                            <tbody>`;
      data.standings.forEach((teams) => {
        teams.table.map((team) => {
          standingsHTML += `
                  <tr>
                    <td>${team.position}</td>
                    <td><span><img src="${team.team.crestUrl.replace(/^http:\/\//i, 'https://')}" class="standing-crest" alt="Team Crest"/>${team.team.name}</span></td>
                    <td><b>${team.points}</b></td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.goalsFor}</td>
                    <td>${team.goalsAgainst}</td>
                    <td>${team.goalDifference}</td>
                  </tr>
                `;
        })          
      });
      standingsHTML +=
             ` </tbody>
            </table>`
      document.getElementById("standings-table").innerHTML = standingsHTML;
      hideLoader();
    })
    .catch(error);
}

const loadTopScorers = () => {
	const topScorers = getTopScorers();
	topScorers.then(data => {
		showLoader();
      let standingsHTML = `<h5 align="center" class="white-text"> Top Scorers </h5>
                          <table class="striped white-text">
                            <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Team</th>
                                  <th>Goals</th>
                              </tr>
                            </thead>
                            <tbody>`;
      data.scorers.forEach((scorer) => {
          standingsHTML += `
                      <tr>
                        <td>${scorer.player.name}</td>
                        <td>${scorer.team.name}</td>
                        <td>${scorer.numberOfGoals}</td>
                      </tr>
                    `;           
      });
      standingsHTML +=
             ` </tbody>
            </table>`
      document.getElementById("scorers-table").innerHTML = standingsHTML;
      hideLoader()
    })
    .catch(error);
}

function getFavoriteTeams(){
 getAllFavorite().then((teams) => {
  if (teams.length > "0") {
    let teamsHTML = "";
    teams.forEach((team) => {
      teamsHTML += `
              <div class="col s12 m6 l4" id="${team.id}">
                <div class="card-panel small amber darken-1 z-depth-3">
                  <a href="./teamdetails.html?id=${team.id}&favorited=true">
                    <div class="card-image waves-effect waves-block waves-light center-align">
                      <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" class="home-badge" alt="Team Crest"/>
                    </div>
                  </a>
                    <h5 class="text-darken-4 center-align">${team.shortName}</h6>
                    <hr>
                    <div class="card-action center-align">
                    <a class="waves-effect waves-light green darken-3 btn" href="./teamdetails.html?id=${team.id}&favorited=true">
                      <i class="material-icons left">remove_red_eye</i>Lihat</a>
                    </div>
                </div>
              </div>
              `;
    });
    document.getElementById("favorite-team").innerHTML = teamsHTML;
    hideLoader(); 
  } else {
    let teamsHTML = `<h6 class="center-align grey-text"> Belum ada tim favorit </h6>`
    document.getElementById("favorite-team").innerHTML = teamsHTML;
    hideLoader();
  }
 })
}

function getFavoriteTeamById(){
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  const id = parseInt(idParam);
  getFavoritebyId(id).then((data) => {
    let teamHTML = `
            <div class="card">
              <div class="card-image gradient-45deg-green-teal ">
                <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" class="cover-badge" alt="Team Crest"/>
              </div>
              <div class="card-content">
              <span class="card-title black-text">${data.name}</span>
               <p><i class="material-icons">view_list</i> ${data.founded} <br>
                   <i class="material-icons">flag</i> ${data.clubColors}<br>
                   <i class="material-icons">home</i> ${data.venue}<br>
                   <i class="material-icons">web</i> <a href="${data.website}">${data.website}</a></p>
              </div>
            </div>
          </div>`
        let squadHTML = `<h5 class="white-text center-align indigo darken-3"> The Squad </h5>
                          <table class="responsive-table striped white-text">
                            <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Position</th>
                                  <th>Role</th>
                              </tr>
                            </thead>
                            <tbody>`;
          data.squad.forEach((people) => {
            squadHTML += `
                  <tr>
                   <td>${people.name}</td>
                    <td>${people.position}</td>
                    <td>${people.role}</td>
                  </tr>
                `;
          });
        squadHTML +=
             ` </tbody>
            </table>`   
    document.getElementById("body-content").innerHTML = teamHTML;
    document.getElementById("squad-table").innerHTML = squadHTML;
  });
}
export {loadAllTeams, loadTeamById, loadMatchesbyTeamScheduled, loadMatchesbyTeamFinished, loadStandings, loadTopScorers, getFavoriteTeams, getFavoriteTeamById, showLoader};