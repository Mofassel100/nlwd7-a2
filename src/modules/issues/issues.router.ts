import { Router } from "express";
import { issueController } from "./issues.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../type/role";

const router = Router();
router.post(
  "/",
  auth(USER_ROLE.contributor, USER_ROLE.maintainer),
  issueController.issueCreate,
);
router.get("/", issueController.getAllIssuesFromDB);
router.get("/:id", issueController.getSingleIssuesFromDB);
router.patch(
  "/:id",
  auth(USER_ROLE.contributor, USER_ROLE.maintainer),
  issueController.IssuesUpdatedFromDB,
);
router.delete(
  "/:id",
  auth(USER_ROLE.maintainer),
  issueController.IssueDeletedFromDB,
);
export const issueRouter = router;
