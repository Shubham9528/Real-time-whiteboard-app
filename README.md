# Real-time Collaborative Whiteboard

A web-based collaborative whiteboard application that allows multiple users to draw together in real-time.

## Key Features

### 🎨 Real-time Drawing
- Collaborative drawing canvas with multiple users
- Multiple drawing tools: pen, eraser, rectangle, circle, line
- Customizable colors and line widths
- Smooth drawing experience with real-time synchronization

### 👥 User Management
- User authentication (Email/Password & Google OAuth)
- Real-time user presence tracking in rooms
- Protected routes for authenticated users only

### 🏠 Room Management
- Create and join collaborative rooms
- Unique room IDs for sharing
- Room capacity limits
- Active room listing

### 📡 Real-time Communication
- WebSocket connections for low-latency communication
- Event-driven architecture for drawing operations
- Room-based broadcasting

### 🖼️ Canvas Features
- Canvas clearing functionality
- Download whiteboard as PNG image
- Responsive design for different screen sizes

## User Journey

### 1. Getting Started
- User visits the application landing page
- User chooses to either log in or sign up for a new account
- New users can register using email/password or Google OAuth

### 2. Dashboard Access
- After authentication, user is directed to the dashboard
- User can see options to create a new whiteboard room or join an existing one

### 3. Room Creation
- User clicks "Create New Room" and enters a room name
- System generates a unique room ID and redirects user to the whiteboard
- User can share the room ID with collaborators

### 4. Collaborative Drawing
- User accesses drawing tools (pen, shapes, eraser)
- User customizes drawing properties (color, line width)
- As user draws, actions are instantly broadcast to all room participants
- Users can see each other's cursors and drawing in real-time

### 5. Room Management
- User can see list of active participants in the room
- User can leave the room and return to the dashboard
- Room is automatically cleaned up when all users leave

### 6. Canvas Management
- User can clear the entire canvas if needed
- User can download the whiteboard as a PNG image
- All users in the room see the same canvas state

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Socket.IO Client** for real-time communication
- **Firebase** for authentication
- **Zustand** for state management

### Backend
- **Node.js** with Express
- **Socket.IO** for WebSocket communication
- **MongoDB** with Mongoose for data storage
- **CORS** configuration for security

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Firebase project for authentication

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd real-time-whiteboard-app
   ```

2. **Install client dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies:**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables:**
   - Create `.env` files in both `client` and `server` directories
   - Configure Firebase credentials in client
   - Configure MongoDB connection string in server

5. **Start the development servers:**
   ```bash
   # In server directory
   npm run dev
   
   # In client directory
   npm run dev
   ```

## Usage

1. Register or log in to the application
2. Create a new room or join an existing one
3. Share the room ID with collaborators
4. Start drawing together in real-time!

## Project Structure

```
real-time-whiteboard-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts (Socket)
│   │   ├── store/          # State management (Zustand)
│   │   └── config/         # Configuration files
│   └── ...
└── server/                 # Backend Node.js server
    ├── src/
    │   ├── socket/         # Socket.IO handlers
    │   ├── config/         # Configuration files
    │   └── types/          # Type definitions
    └── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.