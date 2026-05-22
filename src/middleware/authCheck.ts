// import type { NextFunction, Request, Response } from "express";
// import AppError from "../errorHelper/AppError";
// import { tokenVerify } from "../utility/jwt";
// import { config } from "../config";

// export const checkAuth =
//   (...authRoles: string[]) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const accessToken = req.headers.authorization;

//       if (!accessToken) {
//         throw new AppError(403, "No Token Recieved");
//       }

//       const verifiedToken = tokenVerify(
//         accessToken,
//         config.secret as string,
//       ) ;

//       const isUserExist = await User.findOne({ email: verifiedToken.email });

//       if (!isUserExist) {
//         throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
//       }
//       if (!isUserExist.isVerified) {
//         throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
//       }
//       if (
//         isUserExist.isActive === IsActive.BLOCKED ||
//         isUserExist.isActive === IsActive.INACTIVE
//       ) {
//         throw new AppError(
//           httpStatus.BAD_REQUEST,
//           `User is ${isUserExist.isActive}`,
//         );
//       }
//       if (isUserExist.isDeleted) {
//         // throw new AppError(hs.BAD_REQUEST, "User is deleted");
//       }

//       if (!authRoles.includes(verifiedToken.role)) {
//         throw new AppError(403, "You are not permitted to view this route!!!");
//       }
//       req.user = verifiedToken;
//       next();
//     } catch (error) {
//       console.log("jwt error", error);
//       next(error);
//     }
//   };
