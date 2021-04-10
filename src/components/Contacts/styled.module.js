import styled from 'styled-components';

import contacts from '../../images/contacts.jpg';
const textColor = '#034a91';

export const SectionContainer = styled.section`
    width: 95%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 700px;
    border-radius: 10px;
    padding-top: 50px;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.7), 
        rgba(255, 255, 255, 0.7)
    ),
    url(${contacts});
    background-repeat: no-repeat;
    background-size: 100% 100%;
`;


export const TextH3 = styled.h3`
    color: ${textColor};
    letter-spacing: 1px;
    text-align: center;
    margin: 20px 0px 0px 0px;
`;

export const TextParagraph = styled.p`
    color: ${textColor};
    letter-spacing: 1px;
    text-align: center;
    font-size: 18px;
    margin: 5px 0px;
`;

export const MapContainer = styled.div`
    width: 70%;
    height: 500px;
    margin-top: 50px;
`;

