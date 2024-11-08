# SRS (Software Requirements Specification)

## 1. Introduction

- **Purpose**: The document provides a detailed specification of the requirements for the virtual teacher app using a 3D avatar with speech interaction, animation, and user controls.
- **Scope**: The app will feature a 3D model avatar created using ReadyPlayerMe, enhanced with Mixamo animations. It will allow interaction through speech synthesis and avatar lip-syncing using Oculus visemes. Users can control the avatar's movement and actions through keyboard inputs.

## 2. System Overview

- **System Description**: A React-based frontend app that integrates a 3D ReadyPlayerMe avatar with Mixamo animations. The app uses the browser’s Speech API for text-to-speech conversion and Oculus viseme data for lip-syncing. It supports keyboard and mouse input for avatar control, including movement and gestures.

## 3. Functional Requirements

- **Avatar Movement**:  
   The avatar should respond to the following keyboard inputs:

  - `W` or Up Arrow: Move forward
  - `S` or Down Arrow: Move backward
  - `A` or Left Arrow: Move left
  - `D` or Right Arrow: Move right
  - `SHIFT`: Run
  - `Space`: Jump
  - `CTRL`: Crouch
  - `X`: Dance
  - `R`: Rotate character

  The mouse controls the camera rotation.

- **Text-to-Speech**:

  - The user can input text, and the avatar should speak using the browser’s Speech API.
  - The avatar should lip-sync based on the spoken text using Oculus viseme data.

- **User Interface**:
  - A text input field where users can type their speech.
  - A button to trigger speech synthesis.

## 4. Non-Functional Requirements

- **Performance**: The app should be responsive, with smooth avatar animations and minimal latency during speech synthesis and lip-syncing.
- **Usability**: The app should be intuitive and easy to use, with clear instructions for controlling the avatar.
- **Compatibility**: The app should be compatible with modern web browsers that support the Web Speech API.

## 5. Constraints

- The app is purely frontend (React) with no backend connection.
- The avatar's movement and speech should be fully client-side, ensuring offline usage.
- External APIs or libraries (e.g., Web Speech API, ReadyPlayerMe, Mixamo) should be used for specific functionalities like speech and animation.
