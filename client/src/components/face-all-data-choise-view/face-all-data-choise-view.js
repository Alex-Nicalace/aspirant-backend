import React, {useState} from 'react';
import FaceAllData from "../face-all-data";
import FaceAllDataTabs from "../face-all-data-tabs";
import RadioGroupWithLabel from "../controls/radio-group-with-label";

const FaceAllDataChoiseView = ({faceId}) => {
    const [modeView, setModeView] = useState('tabs');

    const handleChangeModeView = (e) => {
        setModeView(e.target.value);
    }

    return (
        <div>
            <RadioGroupWithLabel
                row
                label='Вид данных'
                value={modeView}
                onChange={handleChangeModeView}
                options={[
                    {label: 'все данные сразу', value: 'all'},
                    {label: 'по вкладкам', value: 'tabs'},
                ]}
            />
            {modeView === 'all' && <FaceAllData faceId={faceId}/>}
            {modeView === 'tabs' && <FaceAllDataTabs faceId={faceId}/>}

        </div>
    );
};

export default FaceAllDataChoiseView;