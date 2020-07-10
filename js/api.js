const base_url = "https://api.football-data.org/v2";
const TOKEN_KEY = `4aad05479a5e42fe83a8b8e6c685a323`;
const get_teams = `${base_url}/competitions/2014/teams`;
const get_standings = `${base_url}/competitions/2014/standings?standingType=TOTAL`;
const get_topscorers = `${base_url}/competitions/2014/scorers`;


function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    return Promise.reject(new Error(response.statusText));
  } else {

    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

const fetchApi = url => {    
  return fetch(url, {
    headers: {
      'X-Auth-Token': TOKEN_KEY
    }
  });
};

function getTeams() {
  return fetchApi(get_teams)
    .then(status)
    .then(json);
}

function getTeambyId() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    return fetchApi(`${base_url}/teams/${idParam}`)
    .then(status)
    .then(json);
}

function getMatchesbyTeamScheduled() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    return fetchApi(`${base_url}/teams/${idParam}/matches?status=SCHEDULED`)
    .then(status)
    .then(json);
}

function getMatchesbyTeamFinished() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    return fetchApi(`${base_url}/teams/${idParam}/matches?status=FINISHED`)
    .then(status)
    .then(json);
}

function getStandings() {
  return fetchApi(get_standings)
    .then(status)
    .then(json);
}

function getTopScorers() {
  return fetchApi(get_topscorers)
    .then(status)
    .then(json);
}

export {getTeams, getTeambyId, getMatchesbyTeamScheduled, getMatchesbyTeamFinished, getStandings, getTopScorers};
