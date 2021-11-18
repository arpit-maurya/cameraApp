let goback = document.querySelector('.goback');
goback.addEventListener('click', () => {
  location.assign('./index.html');
});

setTimeout(() => {
  if (Bd) {
    let videoDbTransasction = Bd.transaction('video', 'readonly');
    let videoStore = videoDbTransasction.objectStore('video');
    let videoRequest = videoStore.getAll();
    videoRequest.onsuccess = () => {
      let dataArr = videoRequest.result;
      let mediaBox = document.querySelector('.galleryImageBody');
      dataArr.forEach((videoObj) => {
        let newUrl = URL.createObjectURL(videoObj.video);
        let div = document.createElement('div');
        div.setAttribute('class', 'mediaBox');
        div.setAttribute('id', `${videoObj.id}`);
        div.innerHTML = `
     <div class="galleryImage-media">
    <video autoplay loop src=${newUrl}></video>
   </div>
   <div class="galleryImage-delete">Delete</div>
   <div class="galleryImage-download">Download</div>
     `;
        mediaBox.append(div);
      });
    };

    let imageDbTransasction = Bd.transaction('image', 'readonly');
    let iamgeStore = imageDbTransasction.objectStore('image');
    let imagerequest = iamgeStore.getAll();
    imagerequest.onsuccess = () => {
      let dataArr = imagerequest.result;
      let mediaBox = document.querySelector('.galleryImageBody');
      dataArr.forEach((imageObj) => {
        let newUrl = imageObj.image;
        let div = document.createElement('div');
        div.setAttribute('class', 'mediaBox');
        div.setAttribute('id', `${imageObj.id}`);
        console.log(newUrl);
        div.innerHTML = `
       <div class="galleryImage-media">
        <img src="${newUrl}" />
     </div>
     <div class="galleryImage-delete">Delete</div>
     <div class="galleryImage-download">Download</div>
     `;
       mediaBox.append(div);
       let deleteBox = document.querySelector('.galleryImage-delete');
       deleteBox.addEventListener('click', deleteMyDb_and_UI);
      });
    };
  }
}, 100);

function deleteMyDb_and_UI(e){
 let id = e.target.parentElement.getAttribute('id')
 console.log(id);
 // if(SVGPointList)/
}
function downlaodMyDb_and_UI(){
 
}