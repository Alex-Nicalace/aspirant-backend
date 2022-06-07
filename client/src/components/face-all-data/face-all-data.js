import React, {useEffect} from 'react';
import FaceNames from "../face-names";
import FaceDocuments from "../face-documents";
import FaceCitizenships from "../face-citizenships";
import FaceEducations from "../face-educations";
import FaceWorks from "../face-works";
import FaceResidences from "../face-residences";
import FaceContacts from "../face-contacts";
import FaceEntranceExamin from "../face-entrance-examin";
import FaceScientificPubl from "../face-scientific-publ";
import FaceBusinessTrip from "../face-business-trip";
import FaceExaminations from "../face-examinations";
import FaceCertificationResult from "../face-certification-result";
import FrameWithTitle from "../frame-with-title";
import {useAspirantApiContext} from "../context/aspirant-api-context/aspirant-api-context";
import Typography from "@material-ui/core/Typography";
import FaceOrders from "../face-orders";
import FaceAspirant from "../face-aspirant";
import Grid from "@material-ui/core/Grid";
import FacePhoto from "../face-photo";
import Paper from "@material-ui/core/Paper";

const FaceAllData = ({faceId}) => {
    const {faces: {dataset, fetchOne}} = useAspirantApiContext();

    const face = dataset.find(i => +i.id === +faceId);

    useEffect(() => {
        if (!face)
            fetchOne(faceId);
    }, [face, faceId])

    const gridProps = {
        //xl:'',
        style: {flex: '1 1 25%'},
    }
    return (
        <>
            <Paper>
                <Typography align='center' variant='h5' color='textPrimary' gutterBottom>
                    {face && `${face.lastname} ${face.firstname} ${face.middleName}, ${new Date(face.birthdate).toLocaleDateString()} г.р.`}
                </Typography>
                <Grid container>
                    <Grid item>
                        <FrameWithTitle head='Фото'>
                            <FacePhoto faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='хронология ФИО'>
                            <FaceNames faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='документы'>
                            <FaceDocuments faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='гражданство'>
                            <FaceCitizenships faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item  {...gridProps} style={{overflow:'hidden'}}>
                        <FrameWithTitle head='аспирант'>
                            <FaceAspirant faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='образование'>
                            <FaceEducations faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='трудовая деятельность'>
                            <FaceWorks faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='проживание'>
                            <FaceResidences faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='контакты'>
                            <FaceContacts faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='кандидатский минимум'>
                            <FaceEntranceExamin faceId={faceId} isCandidateMin={true}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='вступительные экзамены'>
                            <FaceEntranceExamin faceId={faceId} isCandidateMin={false}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='научные публикации'>
                            <FaceScientificPubl faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='коммандировки'>
                            <FaceBusinessTrip faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='экзамены'>
                            <FaceExaminations faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='аттестация'>
                            <FaceCertificationResult faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                    <Grid item {...gridProps}>
                        <FrameWithTitle head='фигурирует в приказах'>
                            <FaceOrders faceId={faceId}/>
                        </FrameWithTitle>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default FaceAllData;