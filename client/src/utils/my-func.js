export function searchByName (term, arr) {
    if (term.length === 0) {
        return arr;
    }
    return arr.filter(({lastname, firstname, middleName}) => {
        return lastname.toLowerCase().indexOf(term.toLowerCase()) > -1
            || firstname.toLowerCase().indexOf(term.toLowerCase()) > -1
            || middleName.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
}

export function getFaceById (id, dataset) {
    const face = dataset.find(i => +i.id === +id);
    return face && `${face.lastname} ${face.firstname} ${face.middleName}, ${new Date(face.birthdate).toLocaleDateString()} г.р.`
}

export function getActionInOrder (rec) {
    switch (rec.typeRel) {
        case 'in':
            return {action: 'зачислен', date: rec.tblFaceAspirant?.dateOn}
        case 'out':
            return {action: 'отчислен', date: rec.tblFaceAspirant?.dateOff}
        case 'reIn':
            return {action: 'переведен', date: rec.tblFaceAspirant?.dateOff}
        case 'academ-on':
            return {action: 'убыл в академ.', date: rec.tblFaceAspirantAcadem?.dateOn}
        case 'academ-off':
            return {action: 'прибыл из академ.', date: rec.tblFaceAspirantAcadem?.dateOff}
        default:
            return {action: 'ERROR', date: null}
    }
}