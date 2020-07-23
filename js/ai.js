function setup() {
  let video = document.getElementById("video");
  let canvas = document.getElementById("canvas");
  let pre = document.getElementById("predictions");
  let items = document.getElementById("items")
  let model = null;

  async function startCamera() {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });
    video.srcObject = stream;
    await video.play();

    setInterval(() => takeSnapshot(), 1000);
  }

  function takeSnapshot() {
    let context = canvas.getContext("2d"),
      width = video.videoWidth,
      height = video.videoHeight;

    if (width && height) {
      // Face sa apara imaginea de la camera cu aceleasi deimensiuni pe webiste
      canvas.width = width;
      canvas.height = height;


      context.drawImage(video, 0, 0, width, height);

      classifyImage();
    }
  }

  function changeImage() {
    let a = "";
  }
  async function classifyImage() {
    predictions = await model.classify(canvas);
    displayPredictions(predictions);
  }

  function displayPredictions(predictions) {
    let val = "";

    for (prediction of predictions) {
      let perc = (prediction.probability * 100).toFixed(2);
      val += `${perc}% | ${prediction.className}\n`;
      console.log(perc);
      console.log(prediction.className);
    }
    pre.innerHTML = val;
  }



  async function main() {
    model = await mobilenet.load();
    await startCamera();
  }
  main();
}