som1 = "";
som2 = "";

pulsoEX = 0;
pulsoEY = 0;

pulsoDX = 0;
pulsoDY = 0;

scorePE = 0;
scorePD = 0;

status1 = "";
status2 = "";

function preload()
{
    som1 = loadSound("music.mp3");
    som2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotResults);
}

function modelLoaded()
{
    console.log("Modelo foi Carregado");
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill('red');
    stroke('black');

    status1 = som1.isPlaying();
    console.log(status1);

    status2 = som2.isPlaying();
    console.log(status2);

    if(scorePE > 0.2)
    {
        console.log("ScorePE maior que 0.2")
        circle(pulsoEX, pulsoEY, 20);
        som2.stop();

        if(status1 == false)
        {
            console.log("Musica1 Tocando");
            som1.play();
            document.getElementById("musica").innerHTML = "Musica 1 esta tocando";
        }
    }

    if(scorePD > 0.2)
    {
        console.log("ScorePE maior que 0.2")
        circle(pulsoDX, pulsoDY, 20);
        som1.stop();

        if(status2 == false)
        {
            console.log("Musica2 Tocando");
            som2.play();
            document.getElementById("musica").innerHTML = "Musica 2 esta tocando";
        }
    }
}

function gotResults(results)
{
    if(results.length > 0)
    {
        pulsoEX = results[0].pose.leftWrist.x;
        pulsoEY = results[0].pose.leftWrist.y;
        console.log("Pulso esquerdo X " + pulsoEX + ", Pulso esquerdo Y " + pulsoEY);

        scorePE = results[0].pose.keypoints[9].score;
        console.log("Score do pulso Esquerdo: " + scorePE);

        scorePD = results[0].pose.keypoints[10].score;
        console.log("Score do pulso Direito: " + scorePD);

        pulsoDX = results[0].pose.rightWrist.x;
        pulsoDY = results[0].pose.rightWrist.y;
        console.log("Pulso direito X " + pulsoDX + ", Pulso direito Y " + pulsoDY);
    }
}