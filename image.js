const imageData = JSON.parse(localStorage.getItem("imageData"));
console.log(imageData);
document.getElementById("img").setAttribute("src", imageData.urls.full);