# Virtual Teacher POC Frontend

## 1. Introduction

- **Purpose**: This document provides an overview of the Virtual Teacher POC Frontend project, detailing the project's setup, features, and usage instructions.
- **Scope**: The Virtual Teacher POC Frontend app is a React-based application that integrates a 3D ReadyPlayerMe avatar with Mixamo animations. The app allows users to control the avatar’s movement through keyboard inputs and interact with the avatar using text-to-speech functionality. The avatar lip-syncs using Oculus visemes.

## 2. System Overview

- **System Description**: The system consists of a React frontend app that displays a 3D avatar powered by ReadyPlayerMe and Mixamo animations. The app supports keyboard and mouse controls for avatar movement and camera rotation, and it uses the browser's Speech API to convert text input into speech, synchronized with the avatar's lip movements using Oculus visemes.

## 3. Features

- **3D Avatar**: A customizable avatar from ReadyPlayerMe, enhanced with Mixamo animations. The avatar supports movements like walking, running, jumping, crouching, and dancing.
- **Speech Interaction**: Users can type text into an input field, and the avatar will speak the text using the Speech API. The avatar lip-syncs to the speech using Oculus viseme data.
- **Movement Controls**: Users can move the avatar using the keyboard (W, A, S, D, SHIFT, Space, CTRL, X) and rotate the camera with the mouse.
- **Responsive UI**: An intuitive interface that displays instructions on how to control the avatar and interact with the app.

## 4. Installation

### 4.1. Prerequisites

- Node.js (v16 or later)
- npm (comes with Node.js)

### 4.2. Steps to Set Up the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/PritamMajumder-MFSI/virtual-teacher-poc-frontend.git
   cd virtual-teacher-poc-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. To build the project for production:

   ```bash
   npm run build
   ```

5. To preview the built project:
   ```bash
   npm run preview
   ```

## 5. Project Structure

/src /components # React components (Avatar, Speech, Controls, etc.) /assets # 3D models, textures, animations /utils # Utility functions (e.g., Speech API, Animation handling) /styles # TailwindCSS and custom styles /public /index.html # Main HTML file /vite.config.ts # Vite configuration /package.json # Project dependencies and scripts

## 6. Controls

- **W** or **Up Arrow**: Move forward
- **S** or **Down Arrow**: Move backward
- **A** or **Left Arrow**: Move left
- **D** or **Right Arrow**: Move right
- **SHIFT**: Run
- **Space**: Jump
- **CTRL**: Crouch
- **X**: Dance
- **R**: Rotate character
- **Left Mouse Click & Drag**: Rotate camera
- **Text Input**: Type in the input field and click **Speak** to make the avatar speak and lip-sync.

## 7. Libraries and Tools Used

- **React**: Frontend framework for building the app.
- **Three.js**: 3D rendering engine used to display the avatar and animations.
- **@react-three/fiber** and **@react-three/drei**: Libraries for integrating Three.js with React.
- **Speech API**: The browser's built-in API for text-to-speech functionality and lip-syncing.
- **Mixamo**: Online platform to get 3D character animations for the avatar.
- **TailwindCSS**: Utility-first CSS framework for styling the app.
- **Vite**: Next-generation build tool for faster development and production builds.

## 8. Demo

You can view a live demo of the app (once deployed) on:  
[https://virtual-teacher-poc-frontend.vercel.app/](https://virtual-teacher-poc-frontend.vercel.app/)

## 9. License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 10. Acknowledgments

- [ReadyPlayerMe](https://readyplayer.me/): For providing customizable 3D avatars.
- [Mixamo](https://www.mixamo.com/): For offering free character animations.
- [Oculus Visemes](https://developer.oculus.com/): For providing the viseme data used for lip-syncing.

## 11. Future Enhancements

- Add support for voice input to control the avatar.
- Implement more gestures and animations for the avatar.
- Optimize performance for larger avatars or more complex animations.

## 12. SRS and SDD Documents

- **SRS**: Check docs/srs.md
- **SDD**: Check docs/sdd.md
