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

exports.list = async (req, res) => {
  try {
    let listTodo = await Todo.findAll(
      {
        where : {activity_group_id : req.query.activity_group_id},
        include : [
          {model : Activity, as: "activity"}
        ]
      }
    );
    res.status(200).send({total : listTodo ? listTodo.length : 0, data: listTodo});
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

    if(!todo){
      res.status(404).send({message: "datas not found", status : 404})
    };

    res.status(200).send({
      id : todo.id,
      title : todo.title,
      priority : todo.priority,
      is_active : todo.is_active,
      activity_group_id : todo.activity_group_id,
      created_at : todo.createdAt,
      from_activity : todo.activity
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}

exports.update = async (req, res) => {
  try {
    let findData = await Todo.findOne({where : {id : req.params.id}});
    if(!findData){
      res.status(404).send({message: "datas not found", status : 404})
    };

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
 
