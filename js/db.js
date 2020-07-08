import './idb.js';

let dbPromised = idb.open('la-liga', 1, function(upgradeDb){
	let teamsObjectStore = upgradeDb.createObjectStore('teams', {
		keyPath: 'id'
  });
	teamsObjectStore.createIndex('name','name', { unique:false });
});

function makeFavorite(team) {
	dbPromised
	 .then(function(db){
	 	const tx = db.transaction('teams', 'readwrite');
	 	const store = tx.objectStore('teams');
	 	store.put(team);
	 	return tx.complete;
	 })
	 .then(function(){
    M.toast({html: 'Ditambahkan ke tim favorit', classes: 'green darken-2'});
	 })
}

function getAllFavorite() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction('teams', 'readonly');
        const store = tx.objectStore('teams');
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getFavoritebyId(id){
  return new Promise(function(resolve, reject){
    dbPromised
      .then(function(db) {
        const tx= db.transaction('teams', 'readonly');
        const store = tx.objectStore('teams');
        return store.get(id);
      })
      .then(function(teams) {
        resolve(teams);
      })
  });
}

function deleteFavoriteById(id){
return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction('teams', 'readwrite');
        const store = tx.objectStore('teams');
        store.delete(id);
        return tx.complete;
      })
      .then(() => {
        M.toast({html: 'Berhasil dihapus dari tim favorit', classes: 'teal darken-2'});
        document.getElementById("delete").remove();
    });
  }); 
}

export {makeFavorite, getAllFavorite, getFavoritebyId, deleteFavoriteById};