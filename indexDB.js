let Bd;

let OpenRequest = indexedDB.open('camerIndexDB');

OpenRequest.onsuccess = (e) => {
  Bd = OpenRequest.result; 
};
OpenRequest.onupgradeneeded = (e) => {

  Bd = OpenRequest.result;
  Bd.createObjectStore('video', { keyPath: 'id' });
  Bd.createObjectStore('image', { keyPath: 'id' });
};

OpenRequest.error = (e) => {
  console.log('error');
};
