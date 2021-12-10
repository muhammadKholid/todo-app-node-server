const express = require('express');
const activityRouter = express.Router();

const activityController = require('../controllers/activity.controller');

// simple route
activityRouter.get("/", activityController.list);
activityRouter.get("/:id", activityController.detail);
activityRouter.post("/", activityController.create);
activityRouter.patch("/:id", activityController.update);
activityRouter.delete("/:id", activityController.delete);

module.exports = activityRouter;
