import {
    ImageContainer,
    ImageField
} from './styled.module.js';

const Image = ({ ...props }) => {
    return (
        <ImageContainer>
            <ImageField {...props} />
        </ImageContainer>
    );
}
export default Image;
