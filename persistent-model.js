PersistentModel = class PersistentModel {
  constructor(doc, collection) {
    this._collection = collection;

    if (doc && doc._id) {
      _.extend(this, doc);
    }
  }

  save() {
    console.log(this._changed);
    if (this._changed && this._changed !== {}) {
      if (!this._id) {
        this._id = this._collection.insert(this._changed);
      } else {
        this._collection(this._id, {$set: this._changed});
      }
    }
  }

  static createSettersFromSchema(Subclass, schema) {
    if (Subclass.prototype instanceof PersistentModel) {
      _.each(unwrapSS(schema), (restrictions, fieldName) => {
        fieldName = fieldName.split('.')[0];

        let setterName = 'set'+ fieldName.charAt(0).toUpperCase() + fieldName.substring(1);

        Subclass.prototype[setterName] = function(value) {
          this.setField.call(this, fieldName, value);
        }
      });
    }
  }

  setField(fieldName, value) {
    console.log('called');
    if (!this._changed)
      this._changed = {};

    this._changed[fieldName] = value;
  }
}

function unwrapSS(schema) {
  return (schema && schema._schema) ? schema._schema : schema;
}