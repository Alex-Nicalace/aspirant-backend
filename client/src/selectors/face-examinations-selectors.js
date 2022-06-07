import {createSelector} from 'reselect';

export const getFaceExaminationsSelector = (state) => {
    return state.faceExaminations;
}

export const getDatasetFaceExaminationsSelector = createSelector([getFaceExaminationsSelector], (state) => {
    return state.dataset;
});

export const getDatasetFaceExaminationsPivotSelector = createSelector([getDatasetFaceExaminationsSelector], data => {
    let result = [{}];
    let subjectSet = new Set();
    let semesterNumSet = new Set();
    data.forEach(({subject, semesterNum}) => {
        subjectSet.add(subject)
        semesterNumSet.add(semesterNum)
    });

    result[0].field0 = 'семестр';
    let i = 0;
    for (let value of subjectSet) {
        result[0][`field${++i}`] = value
    }

    for (let semesterNum of semesterNumSet) {
        i = 0;
        result.push({});
        let row = result.length - 1;
        for (let subject of subjectSet) {
            if (i === 0) {
                result[row].field0 = semesterNum
            }
            const record = data.find(({
                                                  subject: subject_,
                                                  semesterNum: semesterNum_
                                              }) => subject_ === subject && semesterNum_ === semesterNum)
            result[row][`field${++i}`] = {estimate: record?.estimate, id: record?.id};
        }
        ++row;
    }
    result.sort((a,b) => a.field0 - b.field0)
    return result;
})

export const getIsLoadingFaceExaminationsSelector = createSelector([getFaceExaminationsSelector], (state) => {
    return state.isLoading;
});

export const getErrorFaceExaminationsSelector = createSelector([getFaceExaminationsSelector], (state) => {
    return state.error;
});

export const getDatasetDependsOnIdFaceExaminationsSelector = createSelector([getFaceExaminationsSelector], (state) => {
    return state.datasetDependsOnId;
});

