/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 10;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {

  // OLD VARIABLES

  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [204, 136, 17];
  this.mainColour = [51, 119, 153];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51];
  this.lipColour = [136, 68, 68];
  this.eyebrowColour = [119, 85, 17];

  //NEW VARIABLES

   // New properties to control kodamaHead parameters
   this.shape = 0;  // shape type (0: circle, 1: horizontal oval, 2: vertical oval)
   this.eyeR = 1;   // right eye position
   this.eyeL = 4;   // left eye position
   this.eyeSize1 = 2; // right eye size
   this.eyeSize2 = 2; // left eye size
   this.mouthWidth1 = 1; // mouth width factor 1
   this.mouthWidth2 = 1; // mouth width factor 2
   this.leafVisible = 1;  // New property for leaf visibility
   this.leafPos = 7;
   this.colorWarmth = 50; // New property for color warmth


   this.blobObj = []; // array of objects that holds blob attributes
   this.scaleFactor = 0.25; // scale factor for the entire face


  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    
    //NEW STUFF
     // Apply the scale factor
     push();
     scale(this.scaleFactor);

   

    let rad = 7; // radius of the circular path
    let res = 10; // the number of points
    let angle = 360 / res; // angular distance between each point
    let randomGap = 1;
    angleMode(DEGREES); // enable the Degree mode not to make calculations easier.
    
    
    // Generate random RGB values within the specified range
    // let r = random(235, 255); // Random red value between 220 and 255
    // let g = random(250, 255); // Random green value between 240 and 255
    // let b = random(245, 255); // Random blue value between 230 and 255
    // let a = 255;
    let prob1 = floor(random(100)); //random probability for a pink Kodama

    // Calculate warmth factor
  let warmthFactor = this.colorWarmth / 100;

  // Define pale white and warm white colors
  let paleWhite = color(255, 250, 240); // Pale white color
  let warmWhite = color(255, 220, 200); // Warm white color

  // Interpolate between pale white and warm white
  let kodamaColor = lerpColor(paleWhite, warmWhite, warmthFactor);

  // Create a color variable
  let r = red(kodamaColor);
  let g = green(kodamaColor);
  let b = blue(kodamaColor);
  let a = 255;
    // Create a color variable
   
    // If this rolls, the Kodama will have a special and rare custom color (pink, approx ~ 1% chance)
    if(prob1 === 1){
      kodamaColor = [255, 204, 255, a];
    }else{
      kodamaColor = [b, g, r, a];
    }

    // Fill the shape with the random color
    fill(kodamaColor);


     // Draw kodama body
     this.drawKodamaBody();

     
    // Clear the array to store new blob attributes  
    this.blobObj = [];

    // Modify the initial shape based on the value of the 'shape' parameter
    if (this.shape === 0) {
      // Circle
      for (let i = 0; i < res; i++) {
        rad += random(-randomGap, randomGap);
        this.blobObj.push({
          "rad": rad,
          "x": rad * cos(angle * i),
          "y": rad * sin(angle * i)
        });
      }
    } else if (this.shape === 1) {
      // Horizontal oval
      for (let i = 0; i < res; i++) {
        rad += random(-randomGap, randomGap);
        this.blobObj.push({
          "rad": rad,
          "x": rad * cos(angle * i) * 1.2,
          "y": rad * sin(angle * i) * 0.9
        });
      }
    } else if (this.shape === 2) {
      // Vertical oval
      for (let i = 0; i < res; i++) {
        rad += random(-randomGap, randomGap);
        this.blobObj.push({
          "rad": rad,
          "x": rad * cos(angle * i) * 0.9,
          "y": rad * sin(angle * i) * 1.2
        });
      }
    }

    // Draw the shape
    push();
    strokeWeight(0.3);
    beginShape();
    for (let i = 0; i < res; i++) {
      curveVertex(this.blobObj[i].x, this.blobObj[i].y);
    }
    curveVertex(this.blobObj[0].x, this.blobObj[0].y);
    curveVertex(this.blobObj[1].x, this.blobObj[1].y);
    curveVertex(this.blobObj[2].x, this.blobObj[2].y);
    endShape(); // we finish adding points

    // Adjust the coordinates of the eyes to center them around (0, 0)
    let xCord1 = (this.blobObj[this.eyeR].x) - (this.blobObj[this.eyeR].x) / 2;
    let yCord1 = (this.blobObj[this.eyeR].y) - (this.blobObj[this.eyeR].y) / 2;
    let xCord2 = (this.blobObj[this.eyeL].x) - (this.blobObj[this.eyeL].x) / 2;
    let yCord2 = (this.blobObj[this.eyeL].y) - (this.blobObj[this.eyeL].y) / 2;

    // Draw the eyes
    fill(0);
    noStroke();
    ellipse(xCord1, yCord1, this.eyeSize1); // Left eye
    ellipse(xCord2, yCord2, this.eyeSize2); // Right eye

    // Draw smile
    // Figure out which eye is lower (L or R)
    let lowerEyeCord;
    let lowerEyeSize;
    if (yCord1 < yCord2) {
      lowerEyeCord = yCord2;
      lowerEyeSize = this.eyeSize2;
    } else {
      lowerEyeCord = yCord1;
      lowerEyeSize = this.eyeSize1;
    }

    // Define the (usually) lowest point on head
    let chinPoint = this.blobObj[3].y;

    let mouthWidth = lowerEyeSize * 2;
    let mouthHeight = lowerEyeSize * 0.5;
    let mouthX = (xCord1 + xCord2) / 2;
    let mouthY = lowerEyeCord + lowerEyeSize * 0.7;

    let widthFactor1 = this.mouthWidth1;
    let widthFactor2 = this.mouthWidth2;

    // Check if the mouth would be drawn below the chin point
    if (mouthY + mouthHeight * widthFactor1 > chinPoint) {
      // Adjust the mouth y-coordinate to be above the chin point
      mouthY = chinPoint - mouthHeight * widthFactor1 * 2;
    }
    // Draw bezier curves for smile
    beginShape();
    // First curve
    let x1 = mouthX - mouthWidth * 0.5;
    let y1 = mouthY + mouthHeight * widthFactor1;
    let x2 = mouthX - mouthWidth * 0.25;
    let y2 = mouthY + mouthHeight * widthFactor2;
    let x3 = mouthX + mouthWidth * 0.25;
    let y3 = mouthY + mouthHeight * widthFactor2;
    let x4 = mouthX + mouthWidth * 0.5;
    let y4 = mouthY + mouthHeight * widthFactor1;
    bezier(x1, y1, x2, y2, x3, y3, x4, y4);

    // Second curve
    let x5 = mouthX + mouthWidth * 0.5;
    let y5 = mouthY + mouthHeight * widthFactor1;
    let x6 = mouthX + mouthWidth * 0.25;
    let y6 = mouthY + mouthHeight * widthFactor2;
    let x7 = mouthX - mouthWidth * 0.25;
    let y7 = mouthY + mouthHeight * widthFactor2;
    let x8 = mouthX - mouthWidth * 0.5;
    let y8 = mouthY + mouthHeight * widthFactor1;
    bezier(x5, y5, x6, y6, x7, y7, x8, y8);
    endShape();

    pop();


    //DEBUG FOR LEAF POSITION
    // for(let i = 6 ; i<9; i++){
    //   let test = this.blobObj[i];
    //   strokeWeight(0.1);
    //   fill(255,0,0);
    //   ellipse(test.x, test.y, 1);
    // }
  
      // Conditionally draw the leaf
    if (this.leafVisible === 1) {
      let leafPosition = this.blobObj[this.leafPos]; // Get the 7th point from blobObj
      this.drawLeaf(leafPosition.x, leafPosition.y); // Adjust the position slightly
    }
 

    pop();

    trainFace = false;
    if(trainFace){
   
     //OLD STUFF
      // console.log()
        // head
        ellipseMode(CENTER);
        stroke(stroke_color);
        fill(this.mainColour);
        //ellipse(segment_average(positions.chin)[0], 0, 3, 4);
        noStroke();


        // // mouth
        // fill(this.detailColour);
        // ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

        // // eyebrows
        // fill( this.eyebrowColour);
        // stroke( this.eyebrowColour);
        // strokeWeight(0.08);
        // this.draw_segment(positions.left_eyebrow);
        // this.draw_segment(positions.right_eyebrow);

        // draw the chin segment using points
        fill(this.chinColour);
        stroke(this.chinColour);
        this.draw_segment(positions.chin);

        // fill(100, 0, 100);
        // stroke(100, 0, 100);
        // this.draw_segment(positions.nose_bridge);
        // this.draw_segment(positions.nose_tip);

        strokeWeight(0.03);

        fill(this.lipColour);
        stroke(this.lipColour);
        this.draw_segment(positions.top_lip);
        this.draw_segment(positions.bottom_lip);

        let left_eye_pos = segment_average(positions.left_eye);
        let right_eye_pos = segment_average(positions.right_eye);

        // eyes
        noStroke();
        let curEyeShift = 0.04 * this.eye_shift;
        if(this.num_eyes == 2) {
          fill(this.detailColour);
          ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, 0.33);
          ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.33);

          // fill(this.mainColour);
          // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
          // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
        }
        else {
          let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
          let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

          fill(this.detailColour);
          ellipse(eyePosX, eyePosY, 0.45, 0.27);

          fill(this.mainColour);
          ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
        }
       // fill(0)
       //ellipse(0,0, 0.5,0.5) center point
       //rect(-2,-2,4.5,4) sizing debug 

      }

 
    }

    
  // Draw kodama body
  this.drawKodamaBody = function() {
    angleMode(DEGREES); // enable the Degree mode not to make calculations easier.
    stroke(0);
    strokeWeight(0.7);
    push();
    translate(0, 10);
    scale(0.5);
    // Legs
    ellipse(-3, 12, 5, 12);
    ellipse(3, 12, 5, 12);

    // Arms
    push();
    rotate(20);
    translate(-8, -1);
    ellipse(0, 0, 5, 15);
    pop();

    push();
    rotate(-20);
    translate(8,-1);
    ellipse(0,0,5,15);
    pop();

    // Draw pear shape
    beginShape();
    curveVertex(0, -10);    // Top point of the pear
    curveVertex(-3, -9);    // Right upper curve
    curveVertex(-8, 0);     // Right middle curve
    curveVertex(-8, 7);     // Right lower curve
    curveVertex(0, 12);     // Bottom point of the pear
    curveVertex(8, 7);      // Left lower curve
    curveVertex(8, 0);      // Left middle curve
    curveVertex(3, -9);     // Left upper curve
    endShape(CLOSE);
  
   pop();
  
  }

   // Draw a leaf
  this.drawLeaf = function(leafX, leafY) {
    push();
  
    scale(0.1);
  
    // Calculate the angle from the center (0, 0) to the leaf position
    let angle = atan2(leafY, leafX);    
    translate(leafX*10, leafY*10);
    rotate(angle+90);
    translate(0, -40);

    fill(120, 200, 100); // 50% transparent green
    stroke(0, 70, 50); // 50% transparent dark green
    strokeWeight(1);

    arc(0, 0, 30, 60, -90, 90);
    arc(0, 0, 30, 60, 90, -90);

    line(0, -10, -12, -17);
    line(0, -10, 13, -17);
    line(-14, -10, 0, 0);
    line(14, -10, 0, 0);
    line(-14, 0, 0, 10);
    line(0, 10, 15, -2);
    line(0, 22, -15, 9);
    line(0, 22, 15, 9);

    strokeWeight(2);
    line(0, -30, 0, 40);

    pop();
  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    // this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    // this.eye_shift = map(settings[1], 0, 100, -2, 2);
    // this.mouth_size = map(settings[2], 0, 100, 0.5, 8);

     // Set properties for kodamoHead
     this.mouthWidth1 = map(settings[0], 0, 100, 0.5, 1.5);
     this.mouthWidth2 = map(settings[1], 0, 100, 0.5, 1.5);
     this.shape = int(map(settings[2], 0, 100, 0, 2));
     this.eyeSize2 = map(settings[3], 0, 100, 1, 3);
     this.eyeSize1 = map(settings[4], 0, 100, 1, 3);
     this.eyeR = int(map(settings[5], 0, 100, 0, 9));
     this.eyeL = int(map(settings[6], 0, 100, 0, 9));
     this.leafVisible = int(map(settings[7], 0, 100, 0, 1));  // Update for leaf visibility
     this.leafPos = int(map(settings[8], 0, 100, 6, 9)); 
     this.colorWarmth = int(map(settings[9], 0, 100, 0, 100)); 


  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(7);
    // settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    // settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    // settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);

    // Get properties for kodamoHead
    settings[0] = map(this.mouthWidth1, 0.5, 1.5, 0, 100);
    settings[1] = map(this.mouthWidth2, 0.5, 1.5, 0, 100);
    settings[2] = map(this.shape, 0, 2, 0, 100);
    settings[3] = map(this.eyeSize2, 1, 3, 0, 100);
    settings[4] = map(this.eyeSize1, 1, 3, 0, 100);
    settings[5] = map(this.eyeR, 0, 9, 0, 100);
    settings[6] = map(this.eyeL, 0, 9, 0, 100);
    settings[7] = map(this.leafVisible, 0, 1, 0, 100);  // Update for leaf visibility
    settings[8] = map(this.leafPos, 6, 9, 0, 100);  
    settings[9] = map(this.colorWarmth, 0, 100, 0, 100);  


    return settings;
  }






}
