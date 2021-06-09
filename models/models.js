// здесь описываются модели данных
const sequelize = require('../db');

// из самого покета sequelize необходимо импортировать класс DataTypes
// с помощью которого описываются типы полей
const {DataTypes} = require('sequelize');

// описание моделей ...
// у sequelize необходимо вызвать ф-цию define, передать туда объект
// первый параметр название модели
// второй объект -  описываются поля

// 1. модель лицо
const tblFace = sequelize.define('tblFace', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    birthdate: {
        type: DataTypes.DATEONLY, allowNull: false, validate: {
            notNull: {args: true, msg: 'поле "дата рождения" не может быть пустым'},  // не допусает значение NULL
        }
    },
    sex: {
        type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, validate: {
            notNull: {args: true, msg: 'поле "пол" не может быть пустым'},  // не допусает значение NULL
        }
    }
});

// 2. перечень фамилий
const tblFaceName = sequelize.define('tblFaceName', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId ВАЖНО для понимания. Это поле описывать НЕ НУЖНО
    // внешние связи sequelize подставит сам
    dateOn: {type: DataTypes.DATEONLY},
    lastname: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'поле "фамилия" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "фамилия" содержит пустое значение'} // не дупускает пустых псоледовательностей
        }
    },
    firstname: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'поле "имя" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "имя" содержит пустое значение'} // не дупускает пустых псоледовательностей
        }
    },
    middleName: {type: DataTypes.STRING},
}, {
    indexes: [
        {unique: false, fields:['tblFaceId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 3. граждансво лиц
const tblFaceCitizenship = sequelize.define('tblFaceCitizenship', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId ВАЖНО для понимания. Это поле описывать НЕ НУЖНО
    // внешние связи sequelize подставит сам
}, {
    indexes: [
        {unique: false, fields:['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields:['tblDictCountryId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 4. перечень документов лица
const tblFaceDocument = sequelize.define('tblFaceDocument', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId ВАЖНО для понимания. Это поле описывать НЕ НУЖНО
    // внешние связи sequelize подставит сам
    dateOn: {type: DataTypes.DATEONLY},
    dateOff: {type: DataTypes.DATEONLY},
}, {
    indexes: [
        {unique: false, fields:['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields:['tblDictCountryId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 5. справочник видов документов
const tblDictDoc = sequelize.define('tblDictDoc', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    document: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {msg: 'поле "тип документа" должно быть уникальным"'},
        validate: {
            notNull: {args: true, msg: 'поле "тип документа" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "тип документа" содержит пустое значение'} // не дупускает пустых псоледовательностей
        }
    },
})

// 6. справочник стран
const tblDictCountry = sequelize.define('tblDictCountry', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {msg: 'поле "страна" должно быть уникальным'},
        validate: {
            notNull: {args: true, msg: 'поле "страна" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "страна" содержит пустое значение'} // не дупускает пустых псоледовательностей
        }
    },
})

// 7. фото лиц
const tblFacePhoto = sequelize.define('tblFacePhoto', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dateOn: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {notNull: {args: true, msg: 'поле "дата" не может быть пустым'}}
    },
    pathFile: {type: DataTypes.STRING, allowNull: false, unique: true, validate: {unique: true}},
}, {
    indexes: [
        {unique: false, fields:['tblFaceId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 8. образование лиц
const tblFaceEducation = sequelize.define('tblFaceEducation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId
    //tblDictEducationLevelId
    dateFinished: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {notNull: {args: true, msg: 'поле "дата" не может быть пустым'}}
    },
    specialty: {type: DataTypes.STRING,},
    isExcellent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {notNull: {args: true, msg: 'поле "отличник" не может быть пустым'}}
    },
    quantitySatisfactory: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
}, {
    indexes: [
        {unique: false, fields:['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields:['tblDictEducationLevelId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 9. справочник уровней образования
const tblDictEducationLevel = sequelize.define('tblDictEducationLevel', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        educationLevel: {
            type: DataTypes.STRING,
            validate: {
                notNull: {args: true, msg: 'поле "уровень образования" не может быть пустым'}, // не допусает значение NULL
                notEmpty: {args: true, msg: 'поле "уровень образования" содержит пустое значение'} // не дупускает пустых псоледовательностей
            },
            unique: {msg: 'поле "уровень образования" должно быть уникальным'},
            allowNull: false
        },
        weightEducationLevel: {
            type: DataTypes.INTEGER,
            validate: {
                notNull: {args: true, msg: 'поле "вес образования" не может быть пустым'},  // не допусает значение NULL
                notEmpty: {args: true, msg: 'поле "вес образования" содержит пустое значение'} // не дупускает пустых псоледовательностей
            },
            unique: {msg: 'поле "вес образования" должно быть уникальным"'},
            allowNull: false
        }
    },
    // {
    //     indexes: [
    //         {unique: true, fields: ['weightEducationLevel'], name: 'weightEducationLevel'},
    //         {unique: true, fields: ['educationLevel'], name: 'educationLevel'},
    //     ]
    // }
)

// 10. данные из трудовой книжки
const tblFaceWork = sequelize.define('tblFaceWork', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId
    dateOn: {type: DataTypes.DATEONLY},
    dateOff: {type: DataTypes.DATEONLY},
    enterprise: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'поле "место работы" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "место работы" содержит пустое значение'} // не дупускает пустых псоледовательностей
        },
    },
    jobTitle: {
        type: DataTypes.STRING,
        validate: {notEmpty: {args: true, msg: 'поле "должность" содержит пустое значение'}}
    }, // не дупускает пустых псоледовательностей}},
    lenOfService: {type: DataTypes.STRING, defaultValue: '000000'},
}, {
    indexes: [
        {unique: false, fields:['tblFaceId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 11. проживание лица
const tblFaceResidence = sequelize.define('tblFaceResidence', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId
    dateOn: {type: DataTypes.DATEONLY,},
    //tblDictCountryId
    //tblDictCityId
    //tblDictStreetId
    house: {type: DataTypes.STRING,},
    apartment: {type: DataTypes.STRING,},
}, {
    indexes: [
        {unique: false, fields:['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields:['tblDictCountryId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields:['tblDictCityId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields:['tblDictStreetId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 12. справочник городов
const tblDictCity = sequelize.define('tblDictCity', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {msg: 'поле "нас. пункт" должно быть уникальным"'},
        validate: {
            notNull: {args: true, msg: 'поле "нас. пункт" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "нас. пункт" содержит пустое значение'} // не дупускает пустых псоледовательностей
        },
    },
})

// 13. справочник улиц
const tblDictStreet = sequelize.define('tblDictStreet', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    street: {
        type: DataTypes.STRING, allowNull: false, unique: {msg: 'поле "улица" должно быть уникальным"'}, validate: {
            notNull: {args: true, msg: 'поле "улица" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "улица" содержит пустое значение'} // не дупускает пустых псоледовательностей
        },
    },
})

// 14. контакты лица
const tblFaceContacts = sequelize.define('tblFaceContacts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId
    //tblDictContactTypeId
    contact: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'поле "контакт" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "контакт" содержит пустое значение'} // не дупускает пустых псоледовательностей
        },
    },
}, {
    indexes: [
        {unique: false, fields:['tblFaceId']},// индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields:['tblDictContactTypeId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 14. справочник типов контактов
const tblDictContactType = sequelize.define('tblDictContactType', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    contactType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {msg: 'поле "тип контакта" должно быть уникальным"'},
        validate: {
            notNull: {args: true, msg: 'поле "тип контакта" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "тип контакта" содержит пустое значение'} // не дупускает пустых псоледовательностей
        },
    },
})

// 15. структура факультетов и кафедр униыерситет. древовидная структура
const tblDictEnterprise = sequelize.define('tblDictEnterprise', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //parentId: {type: DataTypes.INTEGER},
    name: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'структура не может быть содержать пустые узлы'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'структура не может содержать пустые строковые последовательности'} // не дупускает пустых псоледовательностей
        },
    },
    note: {type: DataTypes.STRING(500)},
}, {
    freezeTableName: true, // по умолч. библ. делает название таблицы = название модели во множественном числе. Эта опция отключает это поведение
    indexes: [
        {unique: false, fields:['parentId']} // индекс по полю
    ]
})

// теперь необходимо описать как модели свзяны друг с дугом

// описание древовидной модели
tblDictEnterprise.hasMany(tblDictEnterprise, {
    foreignKey:{field:'parentId', name:'parentId'},
    onDelete:'CASCADE', // если удалять то вместе с зависимыми ветками
    as: 'children'
});
tblDictEnterprise.belongsTo(tblDictEnterprise, {
    foreignKey:{field:'parentId', name:'parentId'},
    //as: 'children'
});

tblFace.hasMany(tblFaceName);
tblFaceName.belongsTo(tblFace, {foreignKey: {allowNull: false}/*чтобы не допускать пустого ключа*/});

tblFace.hasMany(tblFaceCitizenship);
tblFaceCitizenship.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceDocument);
tblFaceDocument.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFacePhoto);
tblFacePhoto.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictCountry.hasMany(tblFaceCitizenship);
tblFaceCitizenship.belongsTo(tblDictCountry, {foreignKey: {allowNull: false}});

tblDictCountry.hasMany(tblFaceDocument);
tblFaceDocument.belongsTo(tblDictCountry, {foreignKey: {allowNull: false}});

tblDictDoc.hasMany(tblFaceDocument);
tblFaceDocument.belongsTo(tblDictDoc, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceEducation);
tblFaceEducation.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictEducationLevel.hasMany(tblFaceEducation);
tblFaceEducation.belongsTo(tblDictEducationLevel, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceWork);
tblFaceWork.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceResidence);
tblFaceResidence.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictCountry.hasMany(tblFaceResidence);
tblFaceResidence.belongsTo(tblDictCountry, {foreignKey: {allowNull: false}});

tblDictCity.hasMany(tblFaceResidence);
tblFaceResidence.belongsTo(tblDictCity, {foreignKey: {allowNull: false}});

tblDictStreet.hasMany(tblFaceResidence);
tblFaceResidence.belongsTo(tblDictStreet, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceContacts);
tblFaceContacts.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictContactType.hasMany(tblFaceContacts);
tblFaceContacts.belongsTo(tblDictContactType, {foreignKey: {allowNull: false}});

// экспорт моделей, для возможности использования в других файлах
module.exports = {
    tblFace,
    tblFaceName,
    tblFaceDocument,
    tblFaceCitizenship,
    tblDictCountry,
    tblDictDoc,
    tblFacePhoto,
    tblFaceEducation,
    tblDictEducationLevel,
    tblFaceWork,
    tblFaceResidence,
    tblDictCity,
    tblDictStreet,
    tblFaceContacts,
    tblDictContactType,
    tblDictEnterprise

}


