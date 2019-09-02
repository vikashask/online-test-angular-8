let Question = require('../models/question');
/*
 * GET /User route to retrieve all the Users.
 */
function getQuestions(req, res) {
    try {
        //Query the DB and if no errors, send all the Users
        console.log('req.params',req.query);
        
        let query = Question.find({});
        query.exec((err, Question) => {
            if (err) res.send(err);
            //If no errors, send them back to the client
            res.json(Question);
        });
    } catch (e) {
        res.send({
            error: e,
        });
    }

}

let postQuestion = async (req, res) => {
    try {
        let QuestionData = await Question.findOne({
            name: req.body.question,
        });
        if (QuestionData) {
            res.send({
                message: "Question already exist with this name",
            });
        } else {
            // create new user
            let newQuestion = new Question(req.body);
            // saveing heres
            newQuestion.save(
                (err, Question) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({
                            message: "Question addded",
                            Question
                        });
                    }
                }
            );
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }

}

let editQuestion = async (req, res) => {
    try {
        if (req.body._id) {
            const filter = {
                _id: req.body._id
            };
            const update = {
                question: req.body.question,
                answer: req.body.answer
            };
            let doc = await Question.findOneAndUpdate(filter, update);
            res.send({
                message: "Question updated!",
                Question: req.body
            });
        } else {
            res.send({
                message: "Question id missing",
            });
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }

}

let deleteQuestion = async (req, res) => {
    try {
        let deleteQuestion = await Question.deleteOne({
            _id: req.body._id
        });
        console.log("delete", deleteQuestion);
        if (deleteQuestion) {
            res.send({
                message: "Question deleted!",
            });
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }

}


let Questionbyid = async (req, res) => {
    try {
        console.log("req.params.id", req.params);

        if (req.params.id) {
            let QuestionData = await Question.findOne({
                _id: req.params.id,
            }, {
                password: 0
            });
            if (QuestionData) {
                res.send({
                    data: QuestionData,
                });
            }
        } else {
            let QuestionData = await Question.find();
            if (QuestionData) {
                res.send({
                    data: QuestionData,
                });
            }
        }
    } catch (e) {
        console.log("error", e);
        res.send({
            error: e,
        });
    }
}

module.exports = {
    getQuestions,
    postQuestion,
    editQuestion,
    deleteQuestion,
    Questionbyid
};