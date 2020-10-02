const { response } = require("express");
const express = require("express")
const router = express.Router();
const Project = require("../data/helpers/projectModel")

 
router.get('/', (req, res)=> {
    const query = req.query.id
    Project.get(query)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ err: "The project info could not be found"})
    })
})

router.get("/:id", (req, res) => {
    Project.get(req.params.id)
    .then(response=> {
        if(response) {
            res.status(200).json(response)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: "The post information could not be retreived"})
    })
})



router.post("/:id", (req, res) => {
    const project = req.body
    Project.insert(project, req.params.id).then(project=> {
        if (project){
            res.status(200).json({ message: "A Project Has been posted"})
        } else{
            res.status(404).json({ message: "The post could not be found"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Error updating the post"
        })
    })
})

router.put("/:id", (req,res) => {
    const post = req.body;
    Project.update(req.params.id, post)
    .then(post=> {
        if (post){
            res.status(200).json({ message: "Your Project has been updated"})
        } else{
            res.status(404).json({ message: "The project could not be updated"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Error updating the post"
        })
    })
})

router.delete("/:id", (req, res) => {
    Project.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "The posts has been deleted" });
            } else {
                res.status(404).json({ message: "The posts could not be found" });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: "Error removing the posts",
            });
        });
});


module.exports = router