const express = require("express");
const router = express.Router();
const { index: searchManga } = require("../controllers/manga");
const { login, register } = require("../controllers/auth");
const {
  index: showCollections,
  create: AddManga,
  update: updateManga,
  destroy: deleteManga,
  show: getMangaById,
} = require("../controllers/collection");
const { json, urlencoded } = require("express");

//========MIDDLEWARE=======================
const { protected } = require("../middleware/auth");

//========get manga from api=======================
router.get("/manga", searchManga);

//========USER MANGA=======================
router.get("/mangas", protected, showCollections);
router.post("/mangas", protected, AddManga);
router.get("/mangas/:id", protected, getMangaById);
router.patch("/mangas/:id", protected, updateManga);
router.delete("/mangas/:id", protected, deleteManga);

//========HOUSE ACTION=======================
router.post("/login", login);
router.post("/register", register);

module.exports = router;
