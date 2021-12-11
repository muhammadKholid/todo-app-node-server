const db = require('../models');
const Activity = db.activity;
const { createIdRandomNumber } = require('../utils/general.util');

exports.create = async(req, res) => {
  try{
    let act = await Activity.create({...req.body, id : createIdRandomNumber()});
    const encoded = Buffer.from(req.body.email, 'utf8').toString('base64')
    console.log(encoded);
    res.status(200).send({
      id: act.id,
      title : act.title,
      email : encoded,
      created_at : act.createdAt,
      updated_at : act.updatedAt
    });
  } catch(err){
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}

exports.list = async (req, res) => {
  try {
    const decode = Buffer.from(req.query.email, 'base64').toString('utf8');
    let listAct = await Activity.findAll({
      where : {email : decode},
    });
    res.status(200).send({total : listAct ? listAct.length : 0, data: listAct});
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
    if(!act){
      res.status(404).send({message: "datas not found", status : 404})
    };

    res.status(200).send({
      id : act.id,
      title : act.title,
      created_at : act.createdAt,
      todo_items : act.todo_items
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({message : "Internal server error"});
  }
}

exports.update = async (req, res) => {
  try {
    let findData = await Activity.findOne({where : {id : req.params.id}});
    if(!findData){
      res.status(404).send({message: "datas not found", status : 404})
    };

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
