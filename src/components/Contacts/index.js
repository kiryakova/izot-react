import {
    SectionContainer,
    TextH3,
    TextParagraph,
    MapContainer
} from './styled.module.js';

import Map from '../Map';

const Contacts = (props) => {
    return(
        <SectionContainer>
            <TextH3>IZOTSERVIZ-Nova Zagora OOD</TextH3>
            <TextParagraph><i class="fas fa-map-marker-alt"></i> K.Chamov 18 str., Nova Zagora</TextParagraph>
            <TextParagraph><i class="fas fa-mobile-alt"></i> 0898977588</TextParagraph>
            
            <MapContainer>
				<Map
					google={props.google}
					center={{lat: 42.493996331607256, lng: 26.007615637097626}}
					height='500px'
                    width='300px'
					zoom={15}
				/>
            </MapContainer>

        </SectionContainer>
    );
}
//center={{lat: 42.49390320022682, lng: 26.00760661525775}}
export default Contacts;
