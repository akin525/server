module.exports = (sequelize, Sequelize) => {
    return sequelize.define("mcd", {
        plan_id: {
            type: Sequelize.STRING
        },
        network: {
            type: Sequelize.STRING
        },
        plan: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        code: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        tamount: {
            type: Sequelize.STRING
        },
        ramount: {
            type: Sequelize.STRING
        },
    });
};
