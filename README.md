# Persistent-Model

This is a persistent base class for Meteor apps.
Out of the box by using as base class it will let you instantiate an object with data from your mongo document.
It also exposes a generic setField function that will allow you to set fields on the object and save them to the
collection after calling save().
You can also call createSettersFromSchema function to synthesize setters based on Simple Schema object. 

## Usage

```
let collection = new Mongo.Collection('jobs', {transform: (doc) => new Job(doc)});

class Job extends PersistentModel {
  constructor(doc) {
    super(doc, collection);
  }

  // methods ...
}

let schema = new SimpleSchema({
  description: {
    type: String
  },
  timing: {
    type: String
  }
});

PersistentModel.createSettersFromSchema(Job, schema);

let job = new Job();

// Generic field setter 
job.setField('timing', 'every day');

// Synthesized description field setter
job.setDescription('Nice Job');

job.save();

// use the collection transform feature
let jobs = collection.find().fetch()

_.each(jobs, (job) => {
    job.setTiming('every 1 minute');
    job.save();
});
```