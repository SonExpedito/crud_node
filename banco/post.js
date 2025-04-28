import { sequelize, Sequelize } from './banco.js';

const Agendamentos = sequelize.define("Agendamentos", {

    nome:{
        type: Sequelize.STRING
    },
    telefone:{
        type: Sequelize.STRING
    },
    origem:{
        type: Sequelize.STRING
    },
    data_contato:{
        type: Sequelize.DATEONLY
    },
    observacao:{
        type: Sequelize.TEXT
    }
})

//Agendamentos.sync ({force : true})

export {Agendamentos}