// здесь описываются модели данных
const sequelize = require('../db');

// из самого покета sequelize необходимо импортировать класс DataTypes
// с помощью которого описываются типы полей
const {DataTypes} = require('sequelize');

// описание моделей ...
// у sequelize необходимо вызвать ф-цию define, передать туда объект
// первый параметр название модели
// второй объект -  описываются поля

// 0. Таблица пользователей ПО
const tblUser = sequelize.define('tblUser', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {msg: 'поле "логин" должно быть уникальным"'},
        validate: {
            notNull: {args: true, msg: 'поле "логин" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "логин" содержит пустое значение'} // не дупускает пустых псоледовательностей
        }
    },
    password: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'поле "пароль" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "пароль" содержит пустое значение'} // не дупускает пустых псоледовательностей
        }
    },
    // role: {
    //     type: DataTypes.STRING, allowNull: false, validate: {
    //         notNull: {args: true, msg: 'поле "роль" не может быть пустым'},  // не допусает значение NULL
    //         notEmpty: {args: true, msg: 'поле "роль" содержит пустое значение'} // не дупускает пустых псоледовательностей
    //     }
    // },
    isAdmin: {
        type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, validate: {
            notNull: {args: true, msg: 'не может быть пустым'},  // не допусает значение NULL
        }

    },
    canInsert: {
        type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, validate: {
            notNull: {args: true, msg: 'не может быть пустым'},  // не допусает значение NULL
        }

    },
    canUpdate: {
        type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, validate: {
            notNull: {args: true, msg: 'не может быть пустым'},  // не допусает значение NULL
        }
    },
    canDelete: {
        type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, validate: {
            notNull: {args: true, msg: 'не может быть пустым'},  // не допусает значение NULL
        }
    },
})

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
        {unique: false, fields: ['tblFaceId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 3. граждансво лиц
const tblFaceCitizenship = sequelize.define('tblFaceCitizenship', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId ВАЖНО для понимания. Это поле описывать НЕ НУЖНО
    // внешние связи sequelize подставит сам
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictCountryId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 4. перечень документов лица
const tblFaceDocument = sequelize.define('tblFaceDocument', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId ВАЖНО для понимания. Это поле описывать НЕ НУЖНО
    // внешние связи sequelize подставит сам
    dateOn: {type: DataTypes.DATEONLY},
    dateOff: {type: DataTypes.DATEONLY},
    numDocument: {type: DataTypes.STRING},
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictCountryId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
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
    pathFile: {
        type: DataTypes.STRING, allowNull: false, unique: true//, validate: {unique: true}
    },
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
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
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictEducationLevelId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
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
        {unique: false, fields: ['tblFaceId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
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
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictCountryId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictCityId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictStreetId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
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
        {unique: false, fields: ['tblFaceId']},// индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictContactTypeId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
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
    parentId: {type: DataTypes.INTEGER},
    name: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'структура не может быть содержать пустые узлы'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'структура не может содержать пустые строковые последовательности'} // не дупускает пустых псоледовательностей
        },
    },
    note: {type: DataTypes.STRING(500)},
    whatIsIt: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'another',
        validate: {
            notNull: {args: true, msg: 'необходимо указать какого типа узел'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'необходимо указать какого типа узел'}, // не дупускает пустых псоледовательностей
            isIn: [['another', 'faculty', 'department']]
        },

    } // faculty, department
}, {
    freezeTableName: true, // по умолч. библ. делает название таблицы = название модели во множественном числе. Эта опция отключает это поведение
    indexes: [
        {unique: false, fields: ['parentId']} // индекс по полю
    ]
})

// 16. таблица, содержащая приказы
const tblOrder = sequelize.define('tblOrder', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    numOrder: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'приказ нельзя указывать без номера'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'номер приказа не может содержать пустую последовательность'} // не дупускает пустых псоледовательностей
        }
    },
    dateOrder: {
        type: DataTypes.DATEONLY, allowNull: false, validate: {
            notNull: {args: true, msg: 'приказ нельзя указывать без даты'},  // не допусает значение NULL
        }
    },
    text: {type: DataTypes.TEXT},
    pathFile: {type: DataTypes.STRING}

})

// 17. промежуточная таблица для формирорвания многий-ко-многим лица в приказах
// const tblFaceAspirant_tblOrder = sequelize.define('tblFaceAspirants_tblOrder', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     tblFaceAspirantId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: tblFaceAspirant,
//             key: 'id'
//         }
//     },
//     tblOrderId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: tblOrder,
//             key: 'id'
//         }
//     },
//     typeRel: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: 'in',
//         validate: {
//             notNull: {args: true, msg: 'необходимо указать какого типа узел'},  // не допусает значение NULL
//             notEmpty: {args: true, msg: 'необходимо указать какого типа узел'}, // не дупускает пустых псоледовательностей
//             isIn: [['in', 'out', 'reIn']] // зачислен, отчислен, перевод
//         },
//     },
//     note: {type: DataTypes.STRING}
// }, {
//     freezeTableName: true, // по умолч. библ. делает название таблицы = название модели во множественном числе. Эта опция отключает это поведение
//     indexes: [
//         {unique: false, fields: ['tblFaceAspirantId']}, // индекс по полю
//         {unique: false, fields: ['tblOrderId']} // индекс по полю
//     ]
// })

// 18. справосник предметов обучения
const tblDictSubject = sequelize.define('tblDictSubject', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    subject: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'не допускается пустое значение'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'не допускается пустая последовательность'} // не дупускает пустых псоледовательностей
        },
        unique: {msg: 'нарушение уникальности'},
    },
})

// 19 таблица, кот. содежит кандидатский минимум, либо вступительные экзамены
const tblFaceEntranceExamin = sequelize.define('tblFaceEntranceExamin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tblFaceId: {type: DataTypes.INTEGER},
    tblDictSubjectId: {type: DataTypes.INTEGER},
    date: {
        type: DataTypes.DATEONLY, allowNull: false, validate: {
            notNull: {args: true, msg: 'поле ДАТА не допускается пустое значение'},  // не допусает значение NULL
        }
    },
    estimate: {
        type: DataTypes.INTEGER, allowNull: false, validate: {
            notNull: {args: true, msg: 'поле ДАТА не допускается пустое значение'},  // не допусает значение NULL
        }
    },
    isCandidateMin: {
        type: DataTypes.BOOLEAN, allowNull: false, validate: {
            notNull: {args: true, msg: 'поле ДАТА не допускается пустое значение'},  // не допусает значение NULL
        }
    }
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictSubjectId']} // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 20 таблица, содержащая аспирантов
const tblFaceAspirant = sequelize.define('tblFaceAspirant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tblFaceId: {type: DataTypes.INTEGER},
    isRecommendation: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isProtocol: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isAgree: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isHeadDepartment: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    tblDictSubjectId: {type: DataTypes.INTEGER},
    tblDictEducationFormId: {type: DataTypes.INTEGER},
    tblDictDirectionalityAndSpecialtyId: {type: DataTypes.INTEGER},
    dissertationTheme: {
        type: DataTypes.STRING(500), allowNull: false, validate: {
            notNull: {args: true, msg: 'не допускается пустое значение'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'не допускается пустая последовательность'} // не дупускает пустых псоледовательностей
        },
    },
    tblAcademicAdvisorId: {type: DataTypes.INTEGER},
    dateOn: {type: DataTypes.DATEONLY,},
    dateOff: {type: DataTypes.DATEONLY,},
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictSubjectId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictEducationFormId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictDirectionalityAndSpecialtyId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblAcademicAdvisorId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
});

// таблица, содержащая аспирантов в академе
const tblFaceAspirantAcadem = sequelize.define('tblFaceAspirantAcadem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tblFaceId: {type: DataTypes.INTEGER},
    dateOn: {
        type: DataTypes.DATEONLY, allowNull: false, validate: {
            notNull: {args: true, msg: 'поле не может быть пустым'},  // не допусает значение NULL
        }
    },
    dateOff: {type: DataTypes.DATEONLY,},
    note: {type: DataTypes.STRING}
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
});

// 17. промежуточная таблица для формирорвания многий-ко-многим лица в приказах
const tblFace_tblOrder = sequelize.define('tblFace_tblOrder', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tblFaceId: {
        type: DataTypes.INTEGER,
        references: {
            model: tblFace,
            key: 'id'
        }
    },
    tblOrderId: {
        type: DataTypes.INTEGER,
        references: {
            model: tblOrder,
            key: 'id'
        }
    },
    tblFaceAspirantAcademId: {
        type: DataTypes.INTEGER,
        references: {
            model: tblFaceAspirantAcadem,
            key: 'id'
        }
    },
    // tblFaceAspirantId: {
    //     type: DataTypes.INTEGER,
    //     //allowNull: false,
    //     // references: {
    //     //     model: tblFaceAspirant,
    //     //     key: 'id'
    //     // }
    // },
    typeRel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'in',
        validate: {
            notNull: {args: true, msg: 'необходимо тип отношения'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'необходимо тип отношения'}, // не дупускает пустых псоледовательностей
            isIn: [['in', 'out', 'reIn' , 'academ-on', 'academ-off']] // зачислен, отчислен, перевод
        },
    },
    note: {type: DataTypes.STRING}
}, {
    freezeTableName: true, // по умолч. библ. делает название таблицы = название модели во множественном числе. Эта опция отключает это поведение
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по полю
        {unique: false, fields: ['tblOrderId']}, // индекс по полю
        {unique: false, fields: ['tblFaceAspirantAcademId']}, // индекс по полю
        // {unique: false, fields: ['tblFaceAspirantId']} // индекс по полю
    ]
})


// 21 справочник форм образования
const tblDictEducationForm = sequelize.define('tblDictEducationForm', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    educationForm: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {msg: 'нарушение уникальности'},
        validate: {
            notNull: {args: true, msg: 'не допускается пустое значение'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'не допускается пустая последовательность'} // не дупускает пустых псоледовательностей
        }
    }
})

const tblDictNameDirection = sequelize.define('tblDictNameDirection', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameDirection: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {msg: 'нарушение уникальности'},
        validate: {
            notNull: {args: true, msg: 'не допускается пустое значение'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'не допускается пустая последовательность'} // не дупускает пустых псоледовательностей
        }
    }
})

const tblDictDirectionalityAndSpecialty = sequelize.define('tblDictDirectionalityAndSpecialty', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tblDictNameDirectionId: {type: DataTypes.INTEGER},
    DirectionalityOrSpecialty: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: {msg: 'нарушение уникальности'},
        validate: {
            notNull: {args: true, msg: 'не допускается пустое значение'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'не допускается пустая последовательность'} // не дупускает пустых псоледовательностей
        }
    },
    tblDictEnterpriseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {args: true, msg: 'не допускается пустое значение'},  // не допусает значение NULL
        }
    }
}, {
    indexes: [
        {unique: false, fields: ['tblDictNameDirectionId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictEnterpriseId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 22 таблица специальностей иерархия
// const tblDictSpecialty = sequelize.define('tblDictSpecialty', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     parentId: {type: DataTypes.INTEGER},
//     name: {
//         type: DataTypes.STRING, allowNull: false, validate: {
//             notNull: {args: true, msg: 'не допускается пустое значение'},  // не допусает значение NULL
//             notEmpty: {args: true, msg: 'не допускается пустая последовательность'} // не дупускает пустых псоледовательностей
//         },
//     },
//     note: {type: DataTypes.STRING},
//     whatIsIt: {type: DataTypes.STRING, allowNull: false} // direction, orientation, specialty
// }, {
//     indexes: [
//         {unique: false, fields: ['parentId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
//     ]
// })

// 23 таблица научных руководителей
const tblAcademicAdvisor = sequelize.define('tblAcademicAdvisor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tblFaceId: {type: DataTypes.INTEGER},
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 24 научные публикации
const tblFaceScientificPublications = sequelize.define('tblFaceScientificPublications', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tblFaceId: {type: DataTypes.INTEGER},
    date: {type: DataTypes.DATEONLY},
    info: {type: DataTypes.TEXT},
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 25 справочник результатов аттестации
const tblDictCertificationResult = sequelize.define('tblDictCertificationResult', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    result: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'не допускается пустое значение'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'не допускается пустая последовательность'} // не дупускает пустых псоледовательностей
        },
        unique: {msg: 'нарушение уникальности'},
    }
})

// 26 аттестация за каждый проученный год
const tblFaceCertificationResult = sequelize.define('tblFaceCertificationResult', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tblFaceId: {type: DataTypes.INTEGER},
    year: {
        type: DataTypes.INTEGER, allowNull: false, validate: {
            notNull: {args: true, msg: 'не допускается пустое значение'},  // не допусает значение NULL
        },
    },
    //tblDictCertificationResultId
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictCertificationResultId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 27. сведения о командировках
const tblFaceBusinessTrip = sequelize.define('tblFaceBusinessTrip', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tblFaceId: {type: DataTypes.INTEGER},
    dateOn: {type: DataTypes.DATEONLY},
    dateOff: {type: DataTypes.DATEONLY},
    info: {type: DataTypes.TEXT},
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// 28. оценки по предметам по семестрам
const tblFaceExaminations = sequelize.define('tblFaceExaminations', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tblFaceId: {type: DataTypes.INTEGER},
    tblDictSubjectId: {type: DataTypes.INTEGER},
    estimate: {type: DataTypes.STRING},
    semesterNum: {type: DataTypes.INTEGER},
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictSubjectId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

// теперь необходимо описать как модели свзяны друг с дугом


// описание связи многий-ко-многим (лица в приказах)
tblFace.belongsToMany(tblOrder, {through: tblFace_tblOrder /*табл. связующая*/});
tblOrder.belongsToMany(tblFace, {through: tblFace_tblOrder});

tblFace.hasMany(tblFace_tblOrder, {foreignKey: {allowNull: false}});
tblFace_tblOrder.belongsTo(tblFace, {foreignKey: {allowNull: false}}/*чтобы не допускать пустого ключа*/);

tblOrder.hasMany(tblFace_tblOrder, {foreignKey: {allowNull: false}});
tblFace_tblOrder.belongsTo(tblOrder, {foreignKey: {allowNull: false}}/*чтобы не допускать пустого ключа*/);

tblFaceAspirant.hasMany(tblFace_tblOrder, {onDelete: 'NO ACTION'});
tblFace_tblOrder.belongsTo(tblFaceAspirant, {onDelete: 'NO ACTION'});

tblFaceAspirantAcadem.belongsToMany(tblOrder, {through: tblFace_tblOrder /*табл. связующая*/});
tblOrder.belongsToMany(tblFaceAspirantAcadem, {through: tblFace_tblOrder});

tblFaceAspirantAcadem.hasMany(tblFace_tblOrder);
tblFace_tblOrder.belongsTo(tblFaceAspirantAcadem);

// tblFaceAspirant.belongsToMany(tblOrder, {through: tblFaceAspirant_tblOrder /*табл. связующая*/});
// tblOrder.belongsToMany(tblFaceAspirant, {through: tblFaceAspirant_tblOrder});
//
// tblFaceAspirant.hasMany(tblFaceAspirant_tblOrder, {foreignKey: {allowNull: false}});
// tblFaceAspirant_tblOrder.belongsTo(tblFaceAspirant, {foreignKey: {allowNull: false}}/*чтобы не допускать пустого ключа*/);
//
// tblOrder.hasMany(tblFaceAspirant_tblOrder, {foreignKey: {allowNull: false}});
// tblFaceAspirant_tblOrder.belongsTo(tblOrder, {foreignKey: {allowNull: false}}/*чтобы не допускать пустого ключа*/);

// описание древовидной модели
tblDictEnterprise.hasMany(tblDictEnterprise, {
    foreignKey: {field: 'parentId', name: 'parentId'},
    onDelete: 'CASCADE', // если удалять то вместе с зависимыми ветками
    as: 'children'
});
tblDictEnterprise.belongsTo(tblDictEnterprise, {
    foreignKey: {field: 'parentId', name: 'parentId'},
    //as: 'children'
});

tblFace.hasMany(tblFaceName, {foreignKey: {allowNull: false}});
tblFaceName.belongsTo(tblFace, {
    foreignKey: {allowNull: false}
}/*чтобы не допускать пустого ключа*/);

tblAcademicAdvisor.hasMany(tblFaceAspirant, {foreignKey: {allowNull: false}, onDelete: 'NO ACTION'});
tblFaceAspirant.belongsTo(tblAcademicAdvisor, {foreignKey: {allowNull: false}, onDelete: 'NO ACTION'});

tblDictNameDirection.hasMany(tblDictDirectionalityAndSpecialty);
tblDictDirectionalityAndSpecialty.belongsTo(tblDictNameDirection);

tblDictEnterprise.hasMany(tblDictDirectionalityAndSpecialty, {foreignKey: {allowNull: false}});
tblDictDirectionalityAndSpecialty.belongsTo(tblDictEnterprise, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceCitizenship, {foreignKey: {allowNull: false}});
tblFaceCitizenship.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceDocument, {foreignKey: {allowNull: false}});
tblFaceDocument.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFacePhoto, {foreignKey: {allowNull: false}});
tblFacePhoto.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictCountry.hasMany(tblFaceCitizenship, {foreignKey: {allowNull: false}});
tblFaceCitizenship.belongsTo(tblDictCountry, {foreignKey: {allowNull: false}});

tblDictCountry.hasMany(tblFaceDocument, {foreignKey: {allowNull: false}});
tblFaceDocument.belongsTo(tblDictCountry, {foreignKey: {allowNull: false}});

tblDictDoc.hasMany(tblFaceDocument, {foreignKey: {allowNull: false}});
tblFaceDocument.belongsTo(tblDictDoc, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceEducation, {foreignKey: {allowNull: false}});
tblFaceEducation.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictEducationLevel.hasMany(tblFaceEducation, {foreignKey: {allowNull: false}});
tblFaceEducation.belongsTo(tblDictEducationLevel, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceWork, {foreignKey: {allowNull: false}});
tblFaceWork.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceResidence, {foreignKey: {allowNull: false}});
tblFaceResidence.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictCountry.hasMany(tblFaceResidence, {foreignKey: {allowNull: false}});
tblFaceResidence.belongsTo(tblDictCountry, {foreignKey: {allowNull: false}});

tblDictCity.hasMany(tblFaceResidence, {foreignKey: {allowNull: false}});
tblFaceResidence.belongsTo(tblDictCity, {foreignKey: {allowNull: false}});

tblDictStreet.hasMany(tblFaceResidence);
tblFaceResidence.belongsTo(tblDictStreet);

tblFace.hasMany(tblFaceContacts, {foreignKey: {allowNull: false}});
tblFaceContacts.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictContactType.hasMany(tblFaceContacts, {foreignKey: {allowNull: false}});
tblFaceContacts.belongsTo(tblDictContactType, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceEntranceExamin, {foreignKey: {allowNull: false}});
tblFaceEntranceExamin.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictSubject.hasMany(tblFaceEntranceExamin, {foreignKey: {allowNull: false}});
tblFaceEntranceExamin.belongsTo(tblDictSubject, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceAspirant, {foreignKey: {allowNull: false}});
tblFaceAspirant.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictSubject.hasMany(tblFaceAspirant, {foreignKey: {allowNull: false}, onDelete: 'NO ACTION'});
tblFaceAspirant.belongsTo(tblDictSubject, {foreignKey: {allowNull: false}, onDelete: 'NO ACTION'});

tblDictEducationForm.hasMany(tblFaceAspirant, {foreignKey: {allowNull: false}, onDelete: 'NO ACTION'});
tblFaceAspirant.belongsTo(tblDictEducationForm, {foreignKey: {allowNull: false}, onDelete: 'NO ACTION'});

tblDictDirectionalityAndSpecialty.hasMany(tblFaceAspirant, {foreignKey: {allowNull: false}, onDelete: 'NO ACTION'});
tblFaceAspirant.belongsTo(tblDictDirectionalityAndSpecialty, {foreignKey: {allowNull: false}, onDelete: 'NO ACTION'});

// tblDictSpecialty.hasMany(tblFaceAspirant, {foreignKey: {allowNull: false}});
// tblFaceAspirant.belongsTo(tblDictSpecialty, {foreignKey: {allowNull: false}});

// описание древовидной модели специальностей
// tblDictSpecialty.hasMany(tblDictSpecialty, {
//     foreignKey: {field: 'parentId', name: 'parentId'},
//     onDelete: 'CASCADE', // если удалять то вместе с зависимыми ветками
//     as: 'children'
// });
// tblDictSpecialty.belongsTo(tblDictSpecialty, {
//     foreignKey: {field: 'parentId', name: 'parentId'},
// });

// tblDictSpecialty.belongsToMany(tblDictEnterprise, {through: 'tblDictSpecialty_tblDictEnterprise'});
// tblDictEnterprise.belongsToMany(tblDictSpecialty, {through: 'tblDictSpecialty_tblDictEnterprise'});

tblFace.hasMany(tblAcademicAdvisor, {foreignKey: {allowNull: false}});
tblAcademicAdvisor.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceScientificPublications, {foreignKey: {allowNull: false}});
tblFaceScientificPublications.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceCertificationResult, {foreignKey: {allowNull: false}});
tblFaceCertificationResult.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictCertificationResult.hasMany(tblFaceCertificationResult, {foreignKey: {allowNull: false}});
tblFaceCertificationResult.belongsTo(tblDictCertificationResult, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceBusinessTrip, {foreignKey: {allowNull: false}});
tblFaceBusinessTrip.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceExaminations, {foreignKey: {allowNull: false}});
tblFaceExaminations.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictSubject.hasMany(tblFaceExaminations, {foreignKey: {allowNull: false}});
tblFaceExaminations.belongsTo(tblDictSubject, {foreignKey: {allowNull: false}});


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
    tblDictEnterprise,
    tblOrder,
    tblFace_tblOrder,
    //tblFaceAspirant_tblOrder,
    tblFaceEntranceExamin,
    tblDictSubject,
    tblFaceAspirant,
    tblDictEducationForm,
    //tblDictSpecialty,
    tblDictDirectionalityAndSpecialty,
    tblDictNameDirection,
    tblAcademicAdvisor,
    tblFaceScientificPublications,
    tblFaceCertificationResult,
    tblDictCertificationResult,
    tblFaceBusinessTrip,
    tblFaceExaminations,
    tblUser,
    tblFaceAspirantAcadem
}


