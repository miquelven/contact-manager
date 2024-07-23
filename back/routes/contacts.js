import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.js";

import express from "express";

const router = express.Router();

router.get("/:userId", getContacts);

router.post("/", addContact);

router.put("/:userId/:id", updateContact);
router.delete("/:userId/:id", deleteContact);

export default router;
