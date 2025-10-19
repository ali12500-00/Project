let slide=document.querySelectorAll("#main img");
let counter=0;
slide.forEach(function(image,index){
    image.style.left=`${index*100}%`;
});

function slideImage(){
    counter++;
    if(counter===slide.length){
        counter=0;
    }
    slide.forEach(function(image){
        image.style.transform=`translateX(-${counter*100}%)`;
    });
}
setInterval(slideImage,9000);
function prevImage(){
    counter--;
    if(counter<0){
        counter=slide.length-1;
    }   
    slide.forEach(function(image){
        image.style.transform=`translateX(-${counter*100}%)`;
    });
    nextImage();
}
function nextImage(){
    counter++;
    if(counter===slide.length){
        counter=0;
    }
    slide.forEach(function(image){
        image.style.transform=`translateX(-${counter*100}%)`;
    });
    prevImage();
}   