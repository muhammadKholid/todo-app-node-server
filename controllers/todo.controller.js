const db = require('../models');
const Todo = db.todo;
const Activity = db.activity;
const { createIdRandomNumber } = require('../utils/general.util');

exports.create = async(req, res) => {
  try{
    let todo = await Todo.create({...req.body, id : createIdRandomNumber()});
    res.status(200).send({message : "succesfully create new todo", data: todo});
  } catch(err){
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}

exports.list = async (_, res) => {
  try {
    let listTodo = await Todo.findAll(
      {
        include : [
          {model : Activity, as: "activity"}
        ]
      }
    );
    res.status(200).send({status : 200, data: listTodo});
  } catch (err) {
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}

exports.detail = async (req, res) => {
  try {
    let todo= await Todo.findOne({where : {id : req.params.id},
        include : [
          {model : Activity, as: "activity"}
        ]
    });
    res.status(200).send({status : 200, data: todo});
  } catch (err) {
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}

exports.update = async (req, res) => {
  try {
    let findData = await Todo.findOne({where : {id : req.params.id}});
    let newData = {
      priority : req.body.priority ? req.body.priority : findData.priority,
      is_active : req.body.is_active ? req.body.is_active : findData.is_active,
      title : req.body.title ? req.body.title : findData.title,
      activity_group_id : req.body.activity_group_id ? req.body.activity_group_id : findData.activity_group_id,
      updatedAt : new Date(),
    };
    await Todo.update(newData, {where : {id : req.params.id}});
    res.status(200).send({message : "succesfully update todo."});
  } catch (err) {
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}

exports.delete = async (req, res) => {
  try {
    await Todo.destroy({where : {id : req.params.id}});
    res.status(200).send({status : "succesfully delete todo"});
  } catch (err) {
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}
 
