[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/HpplOQZx)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14993368&assignment_repo_type=AssignmentRepo)
## 2024 MDDN342 Assignment 3: Data Mappings



For this assignemnt we were tasked with adapting our assignment 2 face generating code to work with a dataset of faces.

My kodama faces are very bland and not many attributes to them since the main variety of the face is the fact that each face shape is randomised. 

Since I am not able to use the face wobbliness as a feasable attribute I added a couple features to add some variety.

Attributes:

Face shape: The Face wobbliness is out of my control but the base shape is either round, horizontal oval or vertical oval. So I made it so that if the person was a female they would get a round face while if the were male they would get a vertical oval shape, and if the person was elderly they would get a horizontal oval. Reasoning is on average, male have square face and longer faces due to their jaws. Female tend to have rounder faces, and when you get old your face and body compresses itself therefore the horizontal circle shape.

Eye Position: The position of each eye can be in any of 10 different spots around the face. The way I assigned the position was based off of where the person was facing. If the person was facing to your right, the eye on the right side would be further up and the eye on the left side would be lower down. Vice versa if the person is facing the left. If the person is facing forward the eyes were level.

Eye Size: For the size it is also based off of the direction the person is facing. if the person is facing right, the right eye will be further back and therefore smaller. Therefore based on which eye would be further back the eye is smaller  relatively to the other eye. However is one person has smaller eyes both eyes will be smaller and then one of the eyes evne smaller if its further away.

Mouth: The mouth can vary from smiling a lot to being very sad and in between having a straight line mouth. That attribute was as expected, depending on how happy or sad the mouth expression was of the person i would copy the level onto the mouth of the kodama.

Leaf: The leaf is one of the attributes I added from assignent 2. Kodama are spirits of the forest so even though they dont have leaves on their heads in the movie I beleive it is fitting for them to sometimes have a leaf grow out of their head. Now I made it so that if the person had long hair (on average, a female) the leaf would appear on the head of the kodama.

Leaf Position: This one is also based on the way the person is facing. If the person has long hair then they have a leaf, and the leaf position can be between 4 points. Depending on which way the person is facing and how much the leaf will be placed accordingly.

Color: A very weak attribute in my opinion. I basically have the default color being white, however the color can change in "warmth" as in going from a warm white to a blue white (which is basically just blue). That one I ascociated to the color of the person. The darker the skin color the more towards the blue/colder color.

With those Im hoping that it is enough so that there is recognisable difference between different people and expressions and that they remain consistent (ie, if two female then hopefully both get round faces, etc...). My issue is the randomness of the face shape (the wobbliness) may be too overpowering and take away the focus from the variety in the attributes. 