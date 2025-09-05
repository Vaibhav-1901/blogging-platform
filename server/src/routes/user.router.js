import { Router } from "express";
import { registerUser,loginUser,logoutUser ,getCurrentUser, RefreshAccessToken} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const userRouter=Router();

//register
userRouter.route("/signup").post(registerUser)
userRouter.route("/signin").post(loginUser)
userRouter.route("/logout").post(verifyJWT,logoutUser)
userRouter.route("/get-user").post(verifyJWT,getCurrentUser)
userRouter.route("/me").get(verifyJWT,getCurrentUser)
userRouter.route("/refresh").post(RefreshAccessToken)



export default userRouter

