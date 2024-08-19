import styled from "styled-components";

const ButtonBox = styled.div`
    position: fixed;
    bottom: 34.5px;
    background: #F5F6F8;
    border: 1px solid #DEDEDE;
    width: 88%;
    margin-left: 6%;
    margin-right: 6%;
    height: 48px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

const ButtonText = styled.div`

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #8F8F8F;
`



interface buttonProps {
    text: string;
}

export const InActiveButton = (props: buttonProps) => {
    return (
        <>
            <ButtonBox>
                <ButtonText>
                    {props.text}
                </ButtonText>
            </ButtonBox>
        </>
    )
}