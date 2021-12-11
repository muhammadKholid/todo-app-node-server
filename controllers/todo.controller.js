const db = require('../models');
const Todo = db.todo;
const Activity = db.activity;
const { createIdRandomNumber } = require('../utils/general.util');

exports.create = async(req, res) => {
  try{
    let todo = await Todo.create({...req.body, id : createIdRandomNumber()});
    res.status(200).send({
        title : todo.title,
        is_active : todo.is_active,
        priority : todo.priority,
        id : todo.id,
        activity_group_id : todo.activity_group_id,
        created_at : todo.createdAt,
    });
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
    res.status(200).send({total : listTodo ? listTodo.length : 0, limit: 1000, skip: 0, data: listTodo});
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

    if(!act){
      res.status(404).send({name: "NotFound",message: "datas not found", code : 404, className: "not-found", errors: {}})
    };

    res.status(200).send({
        title : todo.title,
        is_active : todo.is_active,
        priority : todo.priority,
        id : todo.id,
        activity_group_id : todo.activity_group_id,
        created_at : todo.createdAt,
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
      res.status(405).send({
    name: "MethodNotAllowed",
    message: "Can not patch multiple entries",
    code: 405,
    className: "method-not-allowed",
    errors: {}
      })
    };

    if(!req.body.priority || !req.body.is_active || !req.body.title){
      res.status(405).send({
    name: "MethodNotAllowed",
    message: "Can not patch multiple entries",
    code: 405,
    className: "method-not-allowed",
    errors: {}
      })
    }

    let newData = {
      priority : req.body.priority ? req.body.priority : findData.priority,
      is_active : req.body.is_active ? req.body.is_active : findData.is_active,
      title : req.body.title ? req.body.title : findData.title,
      activity_group_id : req.body.activity_group_id ? req.body.activity_group_id : findData.activity_group_id,
      updatedAt : new Date(),
    };
    await Todo.update(newData, {where : {id : req.params.id}});
    res.status(200).send(
      {
        title : newData.title,
        is_active : newData.is_active,
        priority : newData.priority,
        id : findData.id,
        activity_group_id : findData.activity_group_id,
        created_at : findData.createdAt,
      }
    );
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
 
