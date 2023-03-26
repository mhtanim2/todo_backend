const todoModel = require("../models/todoModel");

exports.createTodo = (req, res) => {
  let reqBody = req.body;

  let postBody = {
    UserName: req.headers.username,
    TodoSubject: reqBody.TodoSubject,
    TodoDescription: reqBody.TodoDescription,
    TodoStatus: "new",
    TodoCreateDate: Date.now(),
    TodoUpdateDate: Date.now(),
  };
  todoModel.create(postBody, (e, data) => {
    if (e) {
      res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Profile created",
        info: data,
      });
    }
  });
};

exports.selectToDo = (req, res) => {
  let UserName = req.headers.username;
  todoModel.find({ UserName: UserName }, (e, data) => {
    if (e) {
      res.status(400).json({ status: "fail", data: e });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

exports.updateToDoList = (req, res) => {
  let _id = req.body._id;
  let postBody = {
    TodoSubject: req.body.TodoSubject,
    TodoDescription: req.body.TodoDescription,
    TodoUpdateDate: Date.now(),
  };
  todoModel.updateOne(
    { _id: _id },
    { $set: postBody },
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};

exports.updateStatus = (req, res) => {
  let _id = req.body._id;
  let postBody = {
    TodoStatus: req.body.TodoStatus,
    TodoUpdateDate: Date.now(),
  };
  todoModel.updateOne(
    { _id: _id },
    { $set: postBody },
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};

exports.removeToDo = (req, res) => {
  let _id = req.body._id;

  todoModel.remove({ _id: _id }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};


exports.SelectToDoByStatus=(req,res)=>{
    let UserName=req.headers.username;
    let TodoStatus=  req.body.TodoStatus
    todoModel.find({UserName:UserName,TodoStatus:TodoStatus},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.SelectToDoByDate=(req,res)=>{
    let UserName=req.headers['username']
    let FormDate=  req.body['FormDate']
    let ToDate=  req.body['ToDate']

    todoModel.find({UserName:UserName,TodoCreateDate:{$gte:new Date(FormDate),$lte:new Date(ToDate)}},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}

