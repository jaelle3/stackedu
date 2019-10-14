const assert = require('chai').assert;
const User = require('../models/User');

//Describe test
describe('Create New User', () => {
  it('saves user to database', () =>{
    const user = new User({
      username: 'outbox',
      email: 'support@outbox.com',
      password: '1234abcd'
    });
    user.save().then(() => {
      assert(user.isNew === false);
      done();
    })
  });
});
