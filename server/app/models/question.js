let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/* 
q_type can be 
o : objective
mc : multople choice 
s : subjective

q_level can be
0 = beginner
1 = Intermediate
3 = Experienced
*/
let QuestionSchema = new Schema({
    q_type: { type: String ,default:'o'},
    q_level: { type: String, default:'0' },
    question: { type: String, required: true },
    a: { type: String, required: true },
    b: { type: String },
    c: { type: String },
    d: { type: String },
    e: { type: String },
    answer: { type: String, required: true },
}, {
    versionKey: false
});

module.exports = mongoose.model('question', QuestionSchema);
