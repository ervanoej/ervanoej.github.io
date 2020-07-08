import "./register.js";
import {getTeambyId} from "./api.js";
import {loadMatchesbyTeamFinished, loadMatchesbyTeamScheduled, loadTeamById, getFavoriteTeamById} from "./main.js";
import {makeFavorite, deleteFavoriteById} from "./db.js";

document.addEventListener("DOMContentLoaded", function() {
    loadMatchesbyTeamFinished();
    loadMatchesbyTeamScheduled();

    let urlParams = new URLSearchParams(window.location.search);
    let isFavorite = urlParams.get("favorited");
    let idParam = urlParams.get("id");
    let favBtn = document.getElementById("favorite");
    let delBtn = document.getElementById("delete");
    const id = parseInt(idParam);

    if (isFavorite) {
      favBtn.style.display = 'none';
      getFavoriteTeamById();
    } else {
      delBtn.style.display = 'none';
      loadTeamById();
    }

    var el = document.querySelectorAll(".tabs");
    M.Tabs.init(el);

    favBtn.onclick = function () {
      getTeambyId().then((team) => {
        makeFavorite(team);
        favBtn.className += " disabled";
      });
    }

    delBtn.onclick = function () {
      deleteFavoriteById(id);
    }
});