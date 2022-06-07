import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import {useTheme} from "@material-ui/core/styles";

const PanelButtons = ({idxPhoto, countPhoto, changeIdxPhoto,  }) => {
    const theme = useTheme();
    return (
        <div>
            {countPhoto > 0 && `${idxPhoto + 1} из ${countPhoto}`}
            <IconButton
                onClick={() => changeIdxPhoto('first')}
                disabled={!countPhoto || 0 === idxPhoto}
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={() => changeIdxPhoto('previous')}
                disabled={!countPhoto ||0 === idxPhoto}
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={() => changeIdxPhoto('next')}
                disabled={!countPhoto || countPhoto === idxPhoto+1}
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={() => changeIdxPhoto('last')}
                disabled={!countPhoto ||countPhoto === idxPhoto + 1}
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
};

export default PanelButtons;