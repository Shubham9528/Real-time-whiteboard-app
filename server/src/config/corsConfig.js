const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  optionsSuccessStatus: 200
};

const socketCorsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST"],
  credentials: true
};

export { corsOptions, socketCorsOptions };
