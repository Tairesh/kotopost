/*global chrome, alert, XMLHttpRequest, FormData, document, window, setTimeout */

function thereIsAnError(textToShow, errorToShow, imageUrl) {
    "use strict";

    document.getElementById('wrap').innerHTML = '<p></p><br/><br/><center><h1>Wow! Some error arrived!</h1></center><br/><br/><p>' + textToShow + '</p><br/><br/><p>' + errorToShow + '</p><p>' + imageUrl + '</p>';
}

/**
 * Main function to upload an image
 *
 * @param  {string} imageUrl URL of the uploaded image
 * @param  {string} fileName Name of the new uploaded file on VK documents
 * @param  {string} accToken Access token with vk authentication permissions
 */
 function upload(imageUrl, fileName, accToken) {
    "use strict";

    var uploadHttpRequest = new XMLHttpRequest();

    uploadHttpRequest.onload = function () {

        var documentUploadServer = new XMLHttpRequest(),
            requestFormData,
            documentUploadRequest;

        documentUploadServer.open('GET', 'https://api.vk.com/method/photos.getWallUploadServer?gid='+41647208+'&access_token=' + accToken);

        documentUploadServer.onload = function () {

            var answer = JSON.parse(documentUploadServer.response);

            if (answer.error !== undefined) {
                chrome.storage.local.remove('vkaccess_token');

                document.getElementById('wrap').innerHTML = '<p></p><br/><br/><center><h1>Ops. Something went wrong. Please try again.</h1></center><br/>';
                setTimeout(function () { window.close(); }, 3000);

                return;
            }

            if (answer.response.upload_url === undefined) {
                thereIsAnError('documentUploadServer response problem', answer, imageUrl);

                return;
            }

            requestFormData       = new FormData();
            documentUploadRequest = new XMLHttpRequest();

            requestFormData.append("photo", uploadHttpRequest.response, fileName);

            documentUploadRequest.open('POST', answer.response.upload_url, true);

            documentUploadRequest.onload = function () {

                var answer = JSON.parse(documentUploadRequest.response),
                    documentSaveRequest;
                    console.log(answer);

                if (answer.photo === "[]") {
                    thereIsAnError('Upload blob problem response problem', answer, imageUrl);

                    return;
                }
                

                documentSaveRequest = new XMLHttpRequest();
var url = 'https://api.vk.com/method/photos.saveWallPhoto?gid='+41647208+'&hash='+answer.hash+'&photo=' + answer.photo + '&server='+answer.server+'&access_token=' + accToken;
console.log(url);
                documentSaveRequest.open('GET', url);

                documentSaveRequest.onload = function () {

                    var answer = JSON.parse(documentSaveRequest.response);
    			console.log(answer);
                    if (answer.response[0] === undefined) {
                        thereIsAnError('documentSaveRequest - no file in response', answer, imageUrl);

                        return;
                    }
                    
                    documentSaveRequest = new XMLHttpRequest();

                documentSaveRequest.open('GET', 'https://api.vk.com/method/wall.post?owner_id=-'+41647208+'&from_group=1&attachments=' + answer.response[0].id + '&access_token=' + accToken);

                documentSaveRequest.onload = function () {

                    var answer = JSON.parse(documentSaveRequest.response);

                    if (answer.response.post_id === undefined) {
                        thereIsAnError('documentSaveRequest - no file in response', answer, imageUrl);

                        return;
                    }

                    document.getElementById('wrap').innerHTML = '<p></p><br/><br/><center><h1>Successfully uploaded!</h1></center><br/>';
                    setTimeout(function () { window.close(); }, 3000);
                };

                documentSaveRequest.send();

                };

                documentSaveRequest.send();
            };

            documentUploadRequest.send(requestFormData);
        };

        documentUploadServer.send();
    };

    uploadHttpRequest.responseType = 'blob';
    uploadHttpRequest.open('GET', imageUrl);
    uploadHttpRequest.send();
}
 /*
function upload(imageUrl, fileName, accToken) {
    "use strict";
	console.log("file: "+fileName);
	$.post("https://api.vk.com/method/photos.getWallUploadServer?gid="+41647208+"&access_token="+accToken,{},function(data) {
		var upload_url = data.response.upload_url;
		if (upload_url != undefined) {
			console.log ('start upload to '+upload_url);
			
			var requestFormData = new FormData();
            var documentUploadRequest = new XMLHttpRequest();

            requestFormData.append("photo", fileName, "blob");

            documentUploadRequest.open('POST', upload_url, true);
            documentUploadRequest.onload = function () {

                var answer = JSON.parse(documentUploadRequest.response);
                console.log(answer);
               if (answer != undefined) {
                var hash = answer.hash;
                var photo = answer.photo;
                var server = answer.server;
                
                var url ="https://api.vkontakte.ru/method/photos.saveWallPhoto?gid="+41647208+"&access_token="+accToken+"&server="+server+"&photo="+photo+"&hash="+hash;
                console.log(url);
                $.post(url,{},function(data) {
					console.log(data);
				});
                
                
               } else alert('error! do can not upload file!');
            }
            documentUploadRequest.send(requestFormData);
		} else alert('error! do can not get wall upload server url');
	});
}*/

/**
 * Add a listener for DOMContentLoaded event
 *
 * @param {string}   Event name
 * @param {function} Event handler
 */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var params   = window.location.hash.substring(1).split('&'),
        imageUrl = null,
        filename,
        imageName;

    if (params === undefined || params.length ===  undefined || params.length !== 2) {
        thereIsAnError('Parsing image url', 'params || params.length != 2', imageUrl);
        return;
    }

    filename = params[0].split('/');

    if (filename.length === undefined || filename.length === 0) {
        thereIsAnError('Getting image filename', 'filename.length <= 0', imageUrl);
        return;
    }

    imageUrl = params[0];

    imageName = filename[filename.length - 1];

    if (imageName.indexOf('?') > -1) {
        imageName = imageName.slice(0, imageName.indexOf('?'));
    }

    if (imageName.indexOf('#') > -1) {
        imageName = imageName.slice(0, imageName.indexOf('#'));
    }

    if (imageName.indexOf('&') > -1) {
        imageName = imageName.slice(0, imageName.indexOf('&'));
    }

    upload(imageUrl, imageName, params[1]);
});

