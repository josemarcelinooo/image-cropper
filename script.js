$(function () {
    const inputImage = document.getElementById("inputImage");
    const cropButton = document.getElementById("cropButton");
    const image = document.getElementById("image");
  
    let cropper;
  
    inputImage.addEventListener("change", (e) => {
      const file = e.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          image.src = e.target.result;
          image.style.display = "block";
  
          if (cropper) {
            cropper.destroy();
          }
  
          cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            minCropBoxWidth: 300, // Minimum width of the crop box in pixels
            minCropBoxHeight: 300, // Minimum height of the crop box in pixels
          });
        };
        reader.readAsDataURL(file);
      }
    });
  
    cropButton.addEventListener("click", () => {
      if (cropper) {
        const croppedImageDataURL = cropper.getCroppedCanvas({
            width: 300, // Desired width of the output image in pixels
            height: 300, // Desired height of the output image in pixels
        }).toDataURL();
        const link = document.createElement("a");
        link.href = croppedImageDataURL;
        link.download = "cropped-image.png";
        link.click();
      } else {
        alert("Please upload an image and adjust the crop area before cropping.");
      }
    });
  });