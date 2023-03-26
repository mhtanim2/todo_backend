const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const ToDoListController = require("../controllers/ToDoListController");
const authVerify = require("../middleware/authVerify");

router.get("/status", profileController.status);

router.post("/createProfile", profileController.createProfile);
router.post("/UserLogIn", profileController.UserLogIn);

router.get("/SelectProfile", authVerify, profileController.SelectProfile);
router.put("/UpdateProfile", authVerify, profileController.UpdateProfile);

router.post("/createTodo", authVerify, ToDoListController.createTodo);
router.get("/selectToDo", authVerify, ToDoListController.selectToDo);
router.put("/updateToDoList", authVerify, ToDoListController.updateToDoList);
router.put("/updateStatus", authVerify, ToDoListController.updateStatus);
router.delete("/removeToDo", authVerify, ToDoListController.removeToDo);
router.post("/SelectToDoByStatus",authVerify,ToDoListController.SelectToDoByStatus);
router.post("/SelectToDoByDate",authVerify,ToDoListController.SelectToDoByDate);

module.exports = router;