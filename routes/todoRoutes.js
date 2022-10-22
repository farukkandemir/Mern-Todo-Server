const express = require("express");
const router = express.Router();
const {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  getSingleTodo,
} = require("../controllers/todoController.js");

router.get("/", getAllTodo);

router.get("/:id", getSingleTodo);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

router.put("/:id", updateTodo);

module.exports = router;
