import { Router } from "express";
import { AccountController } from "./controllers/account.controller";
import { authenticateJWT } from "./middleware/auth";

const accountController = new AccountController();
const router = Router();

router.post("/accounts", accountController.createAccount);
router.get("/accounts/:id", authenticateJWT, accountController.getAccount);
router.put("/accounts/:id", authenticateJWT, accountController.updateAccount);
router.delete("/accounts/:id", authenticateJWT, accountController.deleteAccount);
router.get("/accounts", authenticateJWT, accountController.listAccounts);
router.post("/login", accountController.login);

export default router;
