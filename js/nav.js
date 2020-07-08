import {showLoader, loadAllTeams, loadTeamById, loadMatchesbyTeamScheduled, loadMatchesbyTeamFinished, loadStandings, loadTopScorers, getFavoriteTeams} from "./main.js";

const nav = () => {
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();
  let del_btn = document.getElementById("body-content").querySelectorAll(".delete-btn");

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status != 200) return;
 
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

          document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
          elm.addEventListener("click", function(event) {

            let sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
   
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
    loadPage(page);
     
    function loadPage(page) {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
          const content = document.querySelector("#body-content");
          if (page === "home") {
            showLoader();
            loadAllTeams();
          } else if (page === "favorite") {
            showLoader();
            getFavoriteTeams();
          } else if (page ==="standings") {
            showLoader();
            loadStandings();
          } else if (page === "topscorers") {
            showLoader();
            loadTopScorers();
          }
          
          if (this.status === 200) {
            content.innerHTML = xhttp.responseText;
          } else if (this.status === 404) {
            content.innerHTML = "<p>Page Not Found</p>";
          } else {
            content.innerHTML = "<p>Page Cannot Be Accessed</p>";
          }
        }
      };
      xhttp.open("GET", `pages/${page}.html`, true);
      xhttp.send();
    }
}

export default nav;