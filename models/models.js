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
    role: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'поле "роль" не может быть пустым'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'поле "роль" содержит пустое значение'} // не дупускает пустых псоледовательностей
        }
    }
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
    pathFile: {type: DataTypes.STRING, allowNull: false, unique: true, validate: {unique: true}},
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
    whatIsIt: {type: DataTypes.STRING} // faculty, department
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

})

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
    note: {type: DataTypes.STRING}
}, {
    freezeTableName: true, // по умолч. библ. делает название таблицы = название модели во множественном числе. Эта опция отключает это поведение
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по полю
        {unique: false, fields: ['tblOrderId']} // индекс по полю
    ]
})

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
    isСandidateMin: {
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
    tblDictSpecialtyId: {type: DataTypes.INTEGER},
    dissertationTheme: {type: DataTypes.STRING(500)},
    tblAcademicAdvisorId: {type: DataTypes.INTEGER},
}, {
    indexes: [
        {unique: false, fields: ['tblFaceId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictSubjectId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictEducationFormId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblDictSpecialtyId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
        {unique: false, fields: ['tblAcademicAdvisorId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
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

// 22 таблица специальностей иерархия
const tblDictSpecialty = sequelize.define('tblDictSpecialty', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    parentId: {type: DataTypes.INTEGER},
    name: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notNull: {args: true, msg: 'не допускается пустое значение'},  // не допусает значение NULL
            notEmpty: {args: true, msg: 'не допускается пустая последовательность'} // не дупускает пустых псоледовательностей
        },
    },
    note: {type: DataTypes.STRING},
    whatIsIt: {type: DataTypes.STRING, allowNull: false} // direction, orientation, specialty
}, {
    indexes: [
        {unique: false, fields: ['parentId']}, // индекс по внешнему ключу для оптимизатора запросов СУБД
    ]
})

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
    date: {type: DataTypes.DATEONLY},
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

tblFace.hasMany(tblFaceEntranceExamin);
tblFaceEntranceExamin.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictSubject.hasMany(tblFaceEntranceExamin);
tblFaceEntranceExamin.belongsTo(tblDictSubject, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceAspirant);
tblFaceAspirant.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictSubject.hasMany(tblFaceAspirant);
tblFaceAspirant.belongsTo(tblDictSubject, {foreignKey: {allowNull: false}});

tblDictEducationForm.hasMany(tblFaceAspirant);
tblFaceAspirant.belongsTo(tblDictEducationForm, {foreignKey: {allowNull: false}});

tblDictSpecialty.hasMany(tblFaceAspirant);
tblFaceAspirant.belongsTo(tblDictSpecialty);

// описание древовидной модели специальностей
tblDictSpecialty.hasMany(tblDictSpecialty, {
    foreignKey: {field: 'parentId', name: 'parentId'},
    onDelete: 'CASCADE', // если удалять то вместе с зависимыми ветками
    as: 'children'
});
tblDictSpecialty.belongsTo(tblDictSpecialty, {
    foreignKey: {field: 'parentId', name: 'parentId'},
});

tblDictSpecialty.belongsToMany(tblDictEnterprise, {through: 'tblDictSpecialty_tblDictEnterprise'});
tblDictEnterprise.belongsToMany(tblDictSpecialty, {through: 'tblDictSpecialty_tblDictEnterprise'});

tblFace.hasMany(tblAcademicAdvisor);
tblAcademicAdvisor.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceScientificPublications);
tblFaceScientificPublications.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceCertificationResult);
tblFaceCertificationResult.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictCertificationResult.hasMany(tblFaceCertificationResult);
tblFaceCertificationResult.belongsTo(tblDictCertificationResult);

tblFace.hasMany(tblFaceBusinessTrip);
tblFaceBusinessTrip.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblFace.hasMany(tblFaceExaminations);
tblFaceExaminations.belongsTo(tblFace, {foreignKey: {allowNull: false}});

tblDictSubject.hasMany(tblFaceExaminations);
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
    tblFaceEntranceExamin,
    tblDictSubject,
    tblFaceAspirant,
    tblDictEducationForm,
    tblDictSpecialty,
    tblAcademicAdvisor,
    tblFaceScientificPublications,
    tblFaceCertificationResult,
    tblDictCertificationResult,
    tblFaceBusinessTrip,
    tblFaceExaminations,
    tblUser
}


