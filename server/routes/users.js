import express from "express"
import { getUser, getUserFriends, addRemoveFriend} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const Router = express.Router();

/* Read */
Router.get("/:id", verifyToken, getUser);
Router.get("/:id/friends", verifyToken, getUserFriends);

/* update */
Router.patch("/:id/:friends", verifyToken, addRemoveFriend);

export default Router;
