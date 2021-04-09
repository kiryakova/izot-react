import {
    SectionContainer,
    TextH3,
    TextParagraph
} from './styled.module.js';

const Contacts = () => {
    return(
        <SectionContainer>
            <article>
                <TextH3>IZOTSERVIZ-Nova Zagora OOD</TextH3>
                <TextParagraph><i class="fas fa-map-marker-alt"></i> K.Chamov 18B str., Nova Zagora</TextParagraph>
                <TextParagraph><i class="fas fa-mobile-alt"></i> 0898977588</TextParagraph>
            </article>

        </SectionContainer>
    );
}

export default Contacts;
