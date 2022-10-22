const Todo = require("../model/Todo");

const getAllTodo = async (req, res) => {
  const todos = await Todo.find().sort({createdAt: -1});
  res.status(200).send(todos);
};

const createTodo = async (req, res) => {
  const todo = req.body;

  if (!todo.desc || !todo.priority)
    return res.status(400).json({msg: "Please provide information"});

  const duplicate = await Todo.findOne({
    $and: [{description: todo.desc}, {priority: todo.priority}],
  });

  // return console.log(duplicate);
  if (duplicate !== null)
    return res.status(409).json({msg: "You have already same todo"});

  try {
    const newTodo = await Todo.create({
      description: todo.desc,
      priority: todo.priority,
    });

    res.status(201).json({msg: "Todo is successfully created", newTodo});
  } catch (error) {
    res.status(400).json({msg: "Problem occured", error});
    console.log(error);
  }
};

const updateTodo = async (req, res) => {
  const {id} = req.params;
  const updates = req.body;

  if (!updates.desc && !updates.priority)
    return res.status(400).json({msg: "Please provide information you want to update"});

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        description: updates.desc && updates.desc,
        priority: updates.priority && updates.priority,
      },
      {new: true}
    );

    res.status(200).json({msg: "Todo is updated", updatedTodo});
    // if (!foundTodo) return res.status(400).json({msg: `There is no todo with ${id}`});
  } catch (error) {
    res.status(400).json({msg: "Something went wrong", error});
  }
};

const deleteTodo = async (req, res) => {
  const {id} = req.params;

  try {
    const result = await Todo.findByIdAndDelete(id);

    res.status(200).json({msg: "Todo is deleted", result});
  } catch (error) {
    res.json(error);
  }
};

const getSingleTodo = async (req, res) => {
  const {id} = req.params;

  try {
    const foundTodo = await Todo.find({_id: id}, {description: 1, priority: 1});
    res.json(foundTodo);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {getAllTodo, createTodo, updateTodo, deleteTodo, getSingleTodo};
