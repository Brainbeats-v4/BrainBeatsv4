import Resizer from "react-image-file-resizer";
const max_width = 1024;
const max_height = 1024;

// public method for encoding an Uint8Array to base64
// from: https://stackoverflow.com/questions/11089732/display-image-from-blob-using-javascript-and-websockets

export function encode (input:Uint8Array) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

// Uses a canvas object to resize an image so that it is within the max width x height
// Borrowed from: Borrowed from: https://github.com/josefrichter/resize/blob/master/public/
export function resizeMe(img:any) {
  
  var canvas = document.createElement('canvas');

  var width = img.width;
  var height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > max_width) {
      //height *= max_width / width;
      height = Math.round(height *= max_width / width);
      width = max_width;
    }
  } else {
    if (height > max_height) {
      //width *= max_height / height;
      width = Math.round(width *= max_height / height);
      height = max_height;
    }
  }
  
  // resize the canvas and draw the image data into it
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas?.getContext("2d");
  
  if (!ctx) {
    console.error("Unable to resize image");
    return;
  }

  ctx.drawImage(img, 0, 0, width, height);
  
  // preview.appendChild(canvas); // do the actual resized preview
  
  return canvas.toDataURL("image/png",0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)

}

export function resize (file:File) {
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      512,
      512,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
})}