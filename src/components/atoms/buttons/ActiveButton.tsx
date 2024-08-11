import styled from "styled-components";

const ButtonBox = styled.div`
    position: fixed;
    bottom: 34.5px;
    background-color: #05697F;
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
    color: #FFFFFF;
`



interface buttonProps {
    text: string;
}

export const ActiveButton = (props: buttonProps) => {
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