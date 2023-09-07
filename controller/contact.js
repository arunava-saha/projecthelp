
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactSchema');
//@desc Get All Contacts
//@route Get /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})
//@desc Get A single Contact with id
//@route Get /api/contacts/:id
//@access private
const getAContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact Not Found');
    }
    res.status(200).json(contact)
})
//@desc Create A Contact
//@route Post /api/contacts
//@access private
const createAContact = asyncHandler(async (req, res) => {
    console.log("the req body is : " + req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All field is Mandatory!!!")
    }
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    })

    res.status(201).json(contact)
})
//@desc Delete A Contact
//@route Delete /api/contacts/:id
//@access private
const deleteAContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact Not Found');
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have the permission to delete other user's contacts");
    }
    const DeletedContact = await Contact.findByIdAndDelete(contact)
    res.status(200).json(contact)
})

//@desc replace A Contact ------yet to complete
//@route Put /api/contacts/:id
//@access private
const putContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact Not Found');
    }
    // FAULT IN THE CODE OF REPLACE
    const UpdatedContact = await Contact.findByIdAndReplace(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(contact)
})

//@desc update A Contact
//@route Patch /api/contacts/:id
//@access private
const patchContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact Not Found');
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have the permission to update other user's contacts");
    }

    const UpdatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(contact)
})


module.exports = {
    getAllContacts, createAContact, deleteAContact, getAContact, patchContact, putContact
};