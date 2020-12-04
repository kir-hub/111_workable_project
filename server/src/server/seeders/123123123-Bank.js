module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banks', [
      {
        cardNumber: '4564654564564564',
        name: 'SquadHelp',
        expiry: '11/21',
        cvc: '453',
        balance: 1,
      },
      {
        cardNumber: '4111111111111111',
        name: 'yriy',
        expiry: '09/21',
        cvc: '043',
        balance: 5000,
      },
    ], {});
  },

};