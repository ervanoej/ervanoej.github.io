import "./register.js";
import {getTeambyId} from "./api.js";
import {loadMatchesbyTeamFinished, loadMatchesbyTeamScheduled, loadTeamById, getFavoriteTeamById} from "./main.js";
import {makeFavorite, deleteFavoriteById} from "./db.js";

document.addEventListener("DOMContentLoaded", function() {
    loadMatchesbyTeamFinished();
    loadMatchesbyTeamScheduled();

    const urlParams = new URLSearchParams(window.location.search);
    const isFavorite = urlParams.get("favorited");
    const idParam = urlParams.get("id");
    const favBtn = document.getElementById("favorite");
    const delBtn = document.getElementById("delete");
    const id = parseInt(idParam);
    const el = document.querySelectorAll(".tabs");
    
    M.Tabs.init(el);

    if (isFavorite) {
      favBtn.style.display = 'none';
      getFavoriteTeamById();
    } else {
      delBtn.style.display = 'none';
      loadTeamById();
    }

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