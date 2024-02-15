require('dotenv').config();

let mongoose = require("mongoose");

// Install and Setup Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("Connected to MongoDB");
});

// Create A PersonModel
let personSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: {type: [String]}
});

let Person = mongoose.model('Person', personSchema);

// Create and Save Record of a model
const createAndSavePerson = function (done) {
    let lia = new Person({name: "Lia", age: 21, favouriteFoods: ["pizza", "pasta"]});
    lia.save(function (err, data) {
        if (err) return console.error(err);
        done(null, data);
    });
};

let arrayOfPeople = [
    {name: "Jordi", age: 59, favouriteFoods: ["Letuce", "Fish"]},
    {name: "Eva", age: 57, favouriteFoods: ["Potatoes", "Meat"]},
    {name: "Maria", age: 30, favouriteFoods: ["Rice"]}
];

// Create Many Records with model.create()
const createManyPeople = function (arrayOfPeople, done) {
    Person.create(arrayOfPeople, function (err, people) {
        if (err) return console.log(err);
        done(null, people);
    });
};

// Use model.find() to Search Your Database
const findPeopleByName = function (personName, done) {
    Person.find({name: personName}, function (err, personFound) {
        if (err) return console.log(err);
        done(null, personFound);
    });
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (err, individualFoodLover) => {
        if (err) return console.log(err);
        done(null, individualFoodLover);
    })

};

// Use model.findById() to Search Your Database By _id
const findPersonById = function (personId, done) {
    Person.findById(personId, function (err, data) {
        if (err) return console.log(err);
        done(null, data);
    });
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, (err, person) => {
        if (err) return console.log(err);
        person.favoriteFoods.push(foodToAdd);
        person.save((err, updatedPerson) => {
            if (err) return console.log(err);
            done(null, updatedPerson);
        })
    })
};

const findAndUpdate = function (personName, done) {
    const ageToSet = 20;
    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updateDoc) => {
        if (err) return console.log(err);
        done(null, updateDoc);
    });
};

const removeById = function (personId, done) {
    Person.findByIdAndRemove(personId, (err, removedDoc) => {
        if (err) return console.log(err);
        done(null, removedDoc);
    });
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({name: nameToRemove}, (err, name) => {
        if (err) return console.log(err);
        done(null, name);
    });
};

const queryChain = (done) => {
    const foodToSearch = "burrito";
    Person.find({favoriteFoods: foodToSearch}).sort({name: 'asc'}).limit(2).select('-age').exec(function (err, searchResult) {
        console.log(searchResult);
        done(null, searchResult);
    });
};

/** **Well Done !!**
 /* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
