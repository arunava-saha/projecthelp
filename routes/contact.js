const express = require('express');
const router = express.Router();

const { getAllContacts, createAContact, patchContact, putContact, getAContact, deleteAContact } = require('../controller/contact');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route("/").get(getAllContacts).post(createAContact)

router.route("/:id").get(getAContact).put(putContact).patch(patchContact).delete(deleteAContact)

module.exports = router;