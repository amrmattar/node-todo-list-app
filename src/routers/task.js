const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      searchable: `${req.body.title} ${req.body.description}`,
    });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", async (req, res) => {
  const search = req.query.search;
  try {
    if (!search) {
      const tasks = await Task.find({});
      if (!tasks) {
        return res.status(404).send({
          message: "There is no Tasks yet",
        });
      }
      return res.send(tasks);
    }
    const task = await Task.find(
      { $text: { $search: search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
    if (!task) {
      return res.status(404).send({
          message:"There is no relvant tasks for the search"
      });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        searchable: `${req.body.title} ${req.body.description}`,
      },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).send({
          message: "There is no Task to edit",
        });
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({
          message: "there is no task to remove",
        });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
