const API_KEY = "???"
let user_signed_in = false;

function dataURItoBlob(dataURI) {

    var byteString = atob(dataURI.split(',')[1]);
  
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    var ab = new ArrayBuffer(byteString.length);
  
    var ia = new Uint8Array(ab);
  
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    var blob = new Blob([ab], {type: 'image/png'});
    return blob;
  
  }

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_access_token'){
        chrome.identity.getAuthToken({ interactive: true}, function (auth_token){
            console.log(auth_token)
            

            chrome.tabs.captureVisibleTab(
            null,
            {},
            function(dataUrl)
            {
              
             
                var file = dataURItoBlob(dataUrl);
                var metadata = {
                    'name': (new Date().toLocaleString()),
                    'mimeType': 'image/png',
                    'parents': ['???']
                };

                var form = new FormData();
                form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
                form.append('file', file);


                var xhr = new XMLHttpRequest();
                xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
                xhr.setRequestHeader('Authorization', 'Bearer ' + auth_token);
                xhr.responseType = 'json';
                xhr.onload = () => {
                };
                xhr.send(form);
            }
            );
        });
        sendResponse(true);
    } else if (request.message === 'get_profile'){
        chrome.identity.getProfileUserInfo({accountStatus: 'ANY'}, function (user_info){
            console.log(user_info)
        });
        sendResponse(true);

    } 
});