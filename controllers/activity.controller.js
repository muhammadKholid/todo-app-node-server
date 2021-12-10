const db = require('../models');
const Activity = db.activity;
const { createIdRandomNumber } = require('../utils/general.util');

exports.create = async(req, res) => {
  try{
    let act = await Activity.create({...req.body, id : createIdRandomNumber()});
    res.status(200).send({message : "succesfully create new activity", data: act});
  } catch(err){
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}

exports.list = async (_, res) => {
  try {
    let listAct = await Activity.findAll({
      include: [
            { model: db.todo, as: 'todo_items' },
        ],
    });
    res.status(200).send({status : 200, data: listAct});
  } catch (err) {
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}

exports.detail = async (req, res) => {
  try {
    let act = await Activity.findOne({where : {id : req.params.id}, 
      include: [
            { model: db.todo, as: 'todo_items' },
        ],
    });
    res.status(200).send({status : 200, data: act});
  } catch (err) {
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}

exports.update = async (req, res) => {
  try {
    let findData = await Activity.findOne({where : {id : req.params.id}});
    let newData = {
      title : req.body.title ? req.body.title : findData.title,
      email : req.body.email ? req.body.email : findData.email,
      updatedAt : new Date(),
    };
    await Activity.update(newData, {where : {id : req.params.id}});
    res.status(200).send({message : "succesfully update activity."});
  } catch (err) {
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}

exports.delete = async (req, res) => {
  try {
    await Activity.destroy({where : {id : req.params.id}});
    res.status(200).send({status : "succesfully delete activity"});
  } catch (err) {
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}
