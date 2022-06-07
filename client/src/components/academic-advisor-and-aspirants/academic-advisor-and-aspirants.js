import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FacesAcademicAdvisor from "../faces-academic-advisor";
import FacesAspirantsByAdvisor from "../faces-aspirants-by-advisor";
import {makeStyles} from "@material-ui/core/styles";
import FrameWithTitle from "../frame-with-title";

const useStyles = makeStyles(theme => ({
    root: {
        margin: `0px ${-theme.spacing(1)/2}px` ,
        '& > div': {
            padding: theme.spacing(1)/2,
        }
    },
}));

const AcademicAdvisorAndAspirants = () => {
    const [advisorId, setAdvisorId] = useState(null);
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item lg={4}>
                <FrameWithTitle head='Научный руководитель'>
                    <FacesAcademicAdvisor viewCardMode='link' changeSelected={setAdvisorId}/>
                </FrameWithTitle>
            </Grid>
            <Grid item lg={8}>
                <FrameWithTitle head='Аспиранты, закрепленные'>
                    <FacesAspirantsByAdvisor advisorId={advisorId}/>
                </FrameWithTitle>
            </Grid>
        </Grid>
    );
};

export default AcademicAdvisorAndAspirants;