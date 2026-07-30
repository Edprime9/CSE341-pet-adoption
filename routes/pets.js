/*
Idea:
- Get all CRUD operations working
- Add documentation
 */

const petsController = require("../controllers/petsController");
const router = require('express').Router();

// Add pets router here
router.get('/pets', (req, res) => {
    /*
    - Add swagger doc here
     
    */
    petsController.getAllPets(req, res);
});

router.get('/pets/:id', (req, res) => {
    /*
    - Add swagger doc here
    */
    petsController.getSpecificPet(req, res);
});


router.post('/pets', (req, res) => {
    /**
     * Add swagger doc here
     */
    petsController.postNewPet(req, res);
});

router.put('/pets/:id', (req, res) => {
    /**
     * Add swagger doc here
     */
    petsController.editPet(req, res);
});

router.delete('/pets/:id', (req, res) => {
    /**
     * Add swagger doc here
     */
    petsController.deletePet(req, res);
});

module.exports = router;


