var controller;
var NETUSE;
var TYPE;
var NETWORK;
var paragraph;
var timedrag;

function setup(){
  frameRate(30);
  timedrag = 0;
  paragraph = createInput("Press any key to get the command here");
  paragraph.size(windowWidth);
  controller = new Control();
  NETUSE = 0;
  TYPE = 'NONE';
  NETWORK = new Network();
  var canvas = createCanvas(windowWidth/2, windowHeight/2);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
  background(50);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth/2, windowHeight/2);
}

function mousePressed(){
  if (mouseButton == RIGHT){
    controller.state = 0;
    return;
  }
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  let counter;
  let overlay = false;
  if (controller.state == 1 && (mouseX - NETWORK.nodes[controller.node].x)**2 + (mouseY - NETWORK.nodes[controller.node].y)**2 < ((20)/2)**2){
    controller.state = 0;
    return;
  }
  if (controller.state != 1)
    for (counter = 0; counter < NETWORK.nodes.length; counter++)
      if ((mouseX - NETWORK.nodes[counter].x)**2 + (mouseY - NETWORK.nodes[counter].y)**2 < ((20)/2)**2){
        controller.state = 1;
        controller.node = counter;
      }
  // console.log(controller.state,NETWORK.nodes.length);
  if (controller.state == 1 && (mouseX - NETWORK.nodes[controller.node].x)**2 + (mouseY - NETWORK.nodes[controller.node].y)**2 > ((20)/2)**2){
    for (counter = 0; counter < NETWORK.nodes.length; counter++){
      // console.log(NETWORK.nodes[counter].x,controller.node,counter);
      if ((mouseX - NETWORK.nodes[counter].x)**2 + (mouseY - NETWORK.nodes[counter].y)**2 < ((20)/2)**2){
        NETWORK.addEdge(controller.node,counter);
        // console.log(NETWORK.edges.length,controller.node,counter);
        controller.node = -1;
        controller.state = 0;
        return;
      }
    }
    NETWORK.addEdge(NETWORK.nodes.length,controller.node);
    controller.node = -1;
    controller.state = 0;
    return;
  }
  for (counter = 0; counter < NETWORK.nodes.length; counter++){
    if ((mouseX - NETWORK.nodes[counter].x)**2 + (mouseY - NETWORK.nodes[counter].y)**2 < ((20)/2)**2){
      overlay = true;
      break;
    }
  }
  if (!overlay) NETWORK.addNode(NETWORK.nodes.length,'',1,mouseX,mouseY);
}

function mouseReleased(){
  timedrag = 0;
}

function mouseDragged(){
  timedrag += 1;
  if (timedrag > 8)
    controller.state = 0;
}

function keyPressed(){
  if (key == ' '){
    controller.state = 0;
    return;
  }
  let ans = "GraphName.add_edges_from([";
  let counter;
  for (counter = 0; counter < NETWORK.edges.length; counter++){
    ans += "(" + NETWORK.edges[counter].nodes[0].toString(10) + "," + NETWORK.edges[counter].nodes[1].toString(10) + ")";
    if (counter < NETWORK.edges.length - 1) ans += ",";
  }
  ans += "])";
  console.log(ans);
  paragraph.value(ans);
}

function draw(network_ = NETWORK, type_ = 'NONE'){
  background(50);
  if (network_ != 0) NETUSE = network_;
  if (type_ != 'NONE') TYPE = type_;
  if (controller.state == 1){
    stroke(200);
    strokeWeight(2);
    // console.log(mouseX,mouseY,NETWORK.nodes[controller.node].x,NETWORK.nodes[controller.node].y);
    line(mouseX,mouseY,NETWORK.nodes[controller.node].x,NETWORK.nodes[controller.node].y);
  }
  controller.mouseController();
  if (NETUSE === 0);
  else {
    let visual = new Visualize(NETUSE);
    visual.drawNetwork(controller.mouse, "id");
  }

}
