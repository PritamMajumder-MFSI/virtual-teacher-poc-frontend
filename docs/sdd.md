# SDD (Software Design Document)

## 1. Introduction

- **Purpose**: The purpose of this document is to describe the design of the virtual teacher app that uses a 3D avatar from ReadyPlayerMe, enhanced with Mixamo animations, for speech interaction, lip-syncing, and movement controls. This document outlines the software architecture, components, and interactions required to implement the system as described in the Software Requirements Specification (SRS).
- **Scope**: This design applies to the React-based frontend app, which integrates a 3D avatar, speech synthesis, and avatar movement controls. The app will have no backend and will use client-side technologies like Web Speech API and Three.js.

## 2. System Architecture

- **Overview**: The system will consist of a single-page React application that integrates various components and libraries:

  - A 3D avatar created with ReadyPlayerMe and animated using Mixamo.
  - Web Speech API for text-to-speech synthesis and lip-syncing using Oculus visemes.
  - Keyboard and mouse event listeners to control the avatar’s movements and gestures.

- **Main Components**:

  1. **Avatar**:

     - A 3D avatar from ReadyPlayerMe, imported into the React app.
     - Mixamo animations applied to the avatar for movement and gestures.
     - Oculus viseme data used for lip-syncing with the browser's Speech API.

  2. **Text Input and Speech Component**:

     - A text input field for users to type their speech.
     - A button that triggers the text-to-speech synthesis.
     - A function that handles the speech synthesis and coordinates the lip-syncing of the avatar.

  3. **Movement and Control System**:
     - Keyboard input listeners to control the avatar’s movement and actions (W, A, S, D, SHIFT, etc.).
     - Mouse event listeners to allow camera rotation.

## 3. Design Considerations

- **Modular Design**: Each functional component (avatar, input field, speech synthesis, movement system) will be separated into individual React components to ensure code reusability and maintainability.
- **Client-Side Execution**: Since the app does not have a backend, all logic will be executed on the client side. The system should be fully functional offline, using browser APIs for speech and animation.
- **Performance Optimization**: The avatar’s animation and speech synchronization should be smooth, with minimal delay between speech input and avatar lip-syncing. Performance optimizations will include reducing the complexity of 3D models and animations to keep the app responsive.

## 4. Component Design

### 4.1 Avatar Component

- **Responsibilities**:

  - Load and display the ReadyPlayerMe avatar.
  - Apply Mixamo animations to the avatar based on user input (movement, gestures, etc.).
  - Synchronize lip movements using Oculus viseme data with speech output from the browser’s Speech API.

- **Subcomponents**:
  - `AvatarModel`: Responsible for loading and rendering the 3D model in the scene.
  - `AvatarAnimation`: Handles avatar animations like walking, running, jumping, etc.
  - `LipSync`: Coordinates lip-syncing based on spoken text using Oculus visemes.

### 4.2 Text Input and Speech Component

- **Responsibilities**:

  - Capture user input through a text field.
  - Convert the text input into speech using the Speech API.
  - Trigger the avatar’s lip-syncing function to match the spoken words with visual expressions.

- **Subcomponents**:
  - `TextInput`: A simple text input field that captures user speech.
  - `SpeakButton`: A button that triggers the text-to-speech conversion and the lip-syncing process.
  - `SpeechSynthesis`: Handles the conversion of text to speech and ensures synchronization with the avatar’s lip-sync.

### 4.3 Movement and Control System

- **Responsibilities**:

  - Capture keyboard input for avatar movement (W, A, S, D, etc.).
  - Capture mouse input for camera rotation.
  - Implement character movement and camera controls based on user input.

- **Subcomponents**:
  - `KeyboardControls`: Detects and processes keyboard input for avatar movement and actions (e.g., move forward, jump, crouch).
  - `CameraControls`: Allows users to rotate the camera using mouse input.
  - `MovementController`: A function that integrates both the keyboard and camera control systems to update the avatar’s position in the scene.

## 5. Data Flow

- The user enters text into the `TextInput` component.
- When the user clicks the `SpeakButton`, the text is passed to the `SpeechSynthesis` function, which triggers the Speech API.
- The Speech API generates speech, and at each speech boundary, the `LipSync` function uses Oculus visemes to sync the avatar's mouth movements with the audio.
- At the same time, user input from the keyboard and mouse controls the avatar’s movement and camera view.

## 6. User Interface Design

- **Text Input Field**: A simple text box located at the bottom of the screen where users can type text.
- **Speak Button**: A button next to the text input that triggers the speech synthesis and lip-sync.
- **Movement Instructions**: Clear on-screen instructions for avatar controls (e.g., W, A, S, D for movement).
- **Avatar Display**: The avatar should always be visible and updated based on the user’s actions.

## 7. Non-Functional Design Considerations

- **Performance**: Ensure that 3D animations and speech synthesis are smooth with minimal lag. Use techniques like lazy loading for assets and optimize 3D models for better performance.
- **Compatibility**: The app must work on modern browsers that support Web Speech API and Three.js. It should also be tested across different devices to ensure usability and responsiveness.
- **Security**: Since the app does not have a backend, security concerns will mainly focus on preventing any issues in the frontend, such as cross-site scripting (XSS) attacks. Input sanitization will be ensured for all user input fields.

## 8. Constraints

- The app does not interact with any backend server and operates fully on the client side.
- The app uses the browser’s Speech API for text-to-speech functionality and is dependent on modern browser support for speech synthesis and 3D rendering.
- Limited by the capabilities of the browser and the resources available on the client-side device.
