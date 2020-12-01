class Visualize{
  constructor(network_){
    this.network = network_;
    this.size = 60;
  }
  drawNetwork(mouseCommand = [0, 0], type_ = 'NONE'){
    let counter;
    if (this.network.nodes.length < 1)
      return;
    for (counter = 0; counter < this.network.edges.length; counter++){
      fill(255);
      strokeWeight(5);
      stroke(220, 50);
      let nodeA = this.network.getNode(this.network.edges[counter].nodes[0]);
      let nodeB = this.network.getNode(this.network.edges[counter].nodes[1]);
      if (nodeA.x < 1) this.network.setNodeX(nodeA.id, random(50, width-50));
      if (nodeA.y < 1) this.network.setNodeY(nodeA.id, random(50, height-50));
      if (nodeB.x < 1) this.network.setNodeX(nodeB.id, random(50, width-50));
      if (nodeB.y < 1) this.network.setNodeY(nodeB.id, random(50, height-50));
      line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
      strokeWeight(2);
      stroke(0);
    }
    for (counter = 0; counter < this.network.nodes.length; counter++){
      fill(this.network.nodes[counter].color[0], this.network.nodes[counter].color[1], this.network.nodes[counter].color[2]);
      this.network.nodes[counter].color = [0, 198, 207];
      let counter2;
      if (this.network.nodes[counter].name.indexOf('move') > -1){
          this.network.nodes[counter].x = mouseX;
          this.network.nodes[counter].y = mouseY;
      }
      let temp_size = 30;
      fill(255);
      strokeWeight(1);
      stroke(1);
      if (this.network.nodes[counter].weight < 0) temp_size = this.size + this.network.nodes[counter].weight/2;
      if ((mouseX - this.network.nodes[counter].x)**2 + (mouseY - this.network.nodes[counter].y)**2 < ((temp_size)/2)**2){
        for (counter2 = 0; counter2 < this.network.nodes.length; counter2++)
          if(counter != counter2 && ((this.network.nodes[counter2].x - this.network.nodes[counter].x)**2 + (this.network.nodes[counter2].y - this.network.nodes[counter].y)**2 < (temp_size/2)**2)){
            this.network.nodes[counter2].x = random(this.size, width - this.size);
            this.network.nodes[counter2].y = random(this.size, height - this.size);
          }
        if (mouseCommand[0] == 1)
          this.network.nodes[counter].name = 'move';
        else
          this.network.nodes[counter].name = '';
        circle(this.network.nodes[counter].x, this.network.nodes[counter].y, (temp_size));
      }
      else{
        fill(255);
        circle(this.network.nodes[counter].x, this.network.nodes[counter].y, (temp_size));
      }
      fill(0);
      stroke(4);
      textSize(15);
      push();
      translate(this.network.nodes[counter].x, this.network.nodes[counter].y);
      textAlign(CENTER, CENTER);
      let print_text;
      if (type_ == 'weight') print_text = this.network.nodes[counter].weight;
      else if (type_ == 'id') print_text = this.network.nodes[counter].id;
      else print_text = '';
      text(print_text, 0, 0);
      pop();
    }
    fill(255);
  }
}

class Control{
    constructor(){
      this.mouse = [0, 0];
      this.keyboard = [0, 0];
      this.state = 0;
      this.node = -1;
    }
    mouseController(){
      if (mouseIsPressed){
        this.mouse[0] = 1;
        this.mouse[1]++;
      }
      else{
        this.mouse[0] = 0;
        this.mouse[1] = 0;
      }
    }
}
