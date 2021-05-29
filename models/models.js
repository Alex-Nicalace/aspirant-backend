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
    birthdate: {type: DataTypes.DATE},
});

// 2. перечень фамилий
const tblFaceName = sequelize.define('tblFaceName', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId ВАЖНО для понимания. Это поле описывать НЕ НУЖНО
    // внешние связи sequelize подставит сам
    dateOn: {type: DataTypes.DATE},
    lastname: {type: DataTypes.STRING, allowNull: false},
    firstname: {type: DataTypes.STRING, allowNull: false},
    middleName: {type: DataTypes.STRING},
})

// 3. граждансво лиц
const tblFaceCitizenship = sequelize.define('tblFaceCitizenship', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId ВАЖНО для понимания. Это поле описывать НЕ НУЖНО
    // внешние связи sequelize подставит сам
})

// 4. перечень документов лица
const tblFaceDocument = sequelize.define('tblFaceDocument', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //tblFaceId ВАЖНО для понимания. Это поле описывать НЕ НУЖНО
    // внешние связи sequelize подставит сам
    dateOn: {type: DataTypes.DATE},
    dateOff: {type: DataTypes.DATE},
})

// 5. справочник видов документов
const tblDictDoc = sequelize.define('tblDictDoc', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    document: {type: DataTypes.STRING, allowNull: false, unique: true},
})

// 6. справочник стран
const tblDictCountry = sequelize.define('tblDictCountry', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    country: {type: DataTypes.STRING, allowNull: false, unique: true},
})

// теперь необходимо описать как модели свзяны друг с дугом
// Device.hasMany(DeviceInfo); // одна запись в Device содержит много записей в DeviceInfo
// DeviceInfo.belongsTo(Device)

tblFace.hasMany(tblFaceName);
tblFaceName.belongsTo(tblFace);

tblFace.hasMany(tblFaceCitizenship);
tblFaceCitizenship.belongsTo(tblFace);

tblFace.hasMany(tblFaceDocument);
tblFaceDocument.belongsTo(tblFace);

tblDictCountry.hasMany(tblFaceCitizenship);
tblFaceCitizenship.belongsTo(tblDictCountry);

tblDictCountry.hasMany(tblFaceDocument);
tblFaceDocument.belongsTo(tblDictCountry);

tblDictDoc.hasMany(tblFaceDocument);
tblFaceDocument.belongsTo(tblDictDoc);

// экспорт моделей, для возможности использования в других файлах
module.exports = {
    tblFace,
    tblFaceName,
    tblFaceDocument,
    tblFaceCitizenship,
    tblDictCountry,
    tblDictDoc
}


