# 2024 MDDN342 Assignment 3: Data Mappings

## Project Overview

In this assignment, I extended the face generating code from Assignment 2 to incorporate a dataset of faces. The goal was to introduce more variability and attributes to the Kodama-like faces generated previously.

## Attributes and Features

### Face Shape

The base shape of each face is determined by gender and age characteristics:
- **Female:** Round face shape
- **Male:** Vertical oval face shape
- **Elderly:** Horizontal oval face shape

### Eye Position and Size

Eye position and size variation are based on the direction the individual is facing:
- Eyes adjust vertically based on the direction (left, right, forward)
- Size differences reflect depth perception, with further eyes appearing smaller

### Mouth Expression

Mouth expressions range from smiling to frowning, influenced by the individual's facial expression in the dataset.

### Leaf Addition

A leaf can grow out of the Kodama's head, influenced by the presence of long hair in the dataset:
- Long hair correlates with the appearance of a leaf

### Leaf Position

Leaf position varies across four points, based on the individual's facing direction and hair characteristics.

### Color Variation

Facial color warmth ranges from warm white to cold blue, correlating with skin tone in the dataset.

## Reflection

While implementing these attributes aimed to enhance facial diversity, the inherent randomness of face shape (wobbliness) may overshadow attribute variations. Balancing these factors remains crucial to maintaining recognizable differences across generated faces.

## Running the Project

To view and interact with the project, follow these steps:

1. **Setup:**
   - Clone the repository to your local machine.
   - Open the project folder in Visual Studio Code.

2. **Run the Project:**
   - Navigate to the index.html file.
   - Right-click on the index.html file and select "Open with Live Server" (if you have the Live Server extension installed) or open it directly in your browser.
   - The project should open in a new browser tab, displaying examples of different people and groups. Use the arrow keys to navigate between groups.

3. **Interact:**
   - Hover your mouse over the left-hand side of the image to reveal a popup with multiple buttons.
   - In the dropdown menu of the draw function, click "Train" to access the face modification tool. Here, you can adjust parameters of the generated Kodama face to match the characteristics of a displayed image of a person. Save these values by clicking the appropriate buttons.
   - Use the arrows in the draw function dropdown to cycle through different images and repeat the modification process as desired.
   - Once sufficient values are saved, click "Get All Values" to copy them into the file "training_values.JSON".

4. **Testing and Validation:**
   - Within the draw function dropdown, options like "Training Quiz", "Interpolation Quiz", and "Nearest Neighbor" allow you to validate and test the algorithm's performance.
   - These options enable you to select the most suitable generated Kodama face for a given image and compare it against the algorithm's selection. Use numerical keys (1 to 4) to select images.

5. **Developer Note:**
   - To use the face design tool effectively, ensure that specific lines in `face_code.js` (Line 122 and 128) are commented out or added as needed to avoid performance issues.


## Additional Notes

- **Development Environment:** Visual Studio Code with Live Server recommended for real-time updates.

---

This README provides an overview of the "Data Mappings" project, detailing its extended functionalities from Assignment 2 to incorporate a dataset of faces. It explores various attributes introduced to enhance diversity among generated Kodama-like faces, reflecting the project's creative evolution and technical implementation.
