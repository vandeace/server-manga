const { collection, user } = require("../models");
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(user, "user");
    const data = await collection.findAll({
      where: { userId: userId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (data) {
      res.status(200).send({ data: data });
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to Show data!" });
    console.log(error);
  }
};

exports.create = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    const newCollection = await collection.create(req.body);
    const findCollection = await collection.findOne({
      where: { id: newCollection.id },
      attributes: { exclude: ["createdAt", "updatedAt", "UserId", "userId"] },
    });
    res.status(200).send({ data: findCollection });
  } catch (error) {
    res.status(500).send({ message: "Failed to create data!" });
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await collection.findOne({
      where: { [Op.and]: [{ id: req.params.id }, { userId: userId }] },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
    });
    if (data) {
      await collection.update(req.body, {
        where: { [Op.and]: [{ id: req.params.id }, { userId: userId }] },
      });
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
    const update = await collection.findOne({
      where: { [Op.and]: [{ id: req.params.id }, { userId: userId }] },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
    });
    res.send({ data: update });
  } catch (error) {
    res.status(500).send({ message: "you failed to update data" });
    console.log(error);
  }
};

exports.destroy = async (req, res) => {
  try {
    const userId = req.user.id;
    const findData = await collection.findOne({
      where: { [Op.and]: [{ id: req.params.id }, { userId: userId }] },
    });
    if (findData) {
      await collection.destroy({
        where: { [Op.and]: [{ id: req.params.id }, { userId: userId }] },
      });
      res.status(200).send({ message: "success delete data" });
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to delete data!" });
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    const data = await collection.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt", "UserId", "userId"] },
    });
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ message: "Failed to Show Data!" });
    console.log(error);
  }
};
