import cors from "cors";
import fileUpload from "express-fileupload";
import { PrismaClient } from "@prisma/client";
export const client = new PrismaClient();
// const io = new Server(httpServer, { cors: { origin: '*' } });
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postroutes.js";
import express from "express";
import cookieParser from "cookie-parser";
import dotendv from "dotenv";
import { verifyToken } from "./middleware/verifyToken.js";
import { refreshToken } from "./controller/refreshToken.js";
dotendv.config();

const app = express();
// const httpServer = createServer(app);
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 2024 },
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.get("/profile", verifyToken, (req, res) => {
  res.json({ msg: "you authorized" });
});
app.use("/post", postRoutes);
app.get("/token", refreshToken);

// io.on("connection", (socket) => {
//   console.log(`User connected with id : ${socket.id}`);
//   socket.on("disconnected", () => {
//     console.log("user dissconected ", socket.id);
//   });
// });

app.listen(3000, () => {
  console.log("listen to port 3000");
  async function testDatabaseConnection() {
    try {
      await client.$connect();
      console.log("Database connection successful");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    } finally {
      await client.$disconnect();
    }
  }

  testDatabaseConnection();
});

export default app;
