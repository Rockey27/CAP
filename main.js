img="";
status="";
objects = [];

function preload(){
    img=loadImage('dog_cat.jpg');

}

function setup() {
canvas=createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();

}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoded);
    document.getElementById("status").innerHTML = "status : Deteting Objects";
}
function modelLoded(){
    console.log("modelLoaded!")
    status = true;
    objectDetector.detect(video, gotResult);
    
}
function gotResult(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
image(video,0,0,380,380);

if (status !="")
{
    r= random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video,gotResult);
    for(i =0;i<objects.lenght;i++)
    {
        document.getElementById("status").innerHTML = "status : Object Dectected";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected are : "+ objects.lenght;
        fill(r,g,b);
        percent = floor(objects[i].confidence*100);
        text(objects[i].lable+" "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}

}


