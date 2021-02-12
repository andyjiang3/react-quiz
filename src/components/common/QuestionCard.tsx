import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

//Question Card
const QuestionContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 30px 0;
    padding: 0 10px;
    flex-direction: column;
    width: 50vw;
`;

const QuestionNumber = styled.span`
  height: 25px;
  width: 25px;
  line-height: 25px;
  background-color: #446cb3;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  margin-right: 10px;
`

const QuestionTitle = styled.div`
    font-size: 20px;
    font-weight: 500;
    text-align: left;
    margin-bottom: 20px;
    width: 100%;
`;

type OptionButtonProps = {
    selected: boolean;
}

const OptionButton = styled.button<OptionButtonProps>`
  background-color: ${({selected}) => selected ? '#446cb3' : '#ffffff'};
  color: ${({selected}) => selected ? '#ffffff' : '#000000'};
  font-size: 14px;
  font-weight: 500;
  border: ${({selected}) => selected ? 'none' : 'solid 1px rgb(214, 214, 214)'};
  border-radius: 5px;
  width: 100%;
  min-height: 50px;
  margin-bottom: 10px;
  text-align: left;
  padding: 10px 10px;
  transition-duration: 0.3s;

  &:hover {
      background-color: ${({selected}) => selected ? '#446cb3' : '#ccdfff'};
  }
`

type QuestionCardProps = {
    question: {
        prompt: string;
        options: {
            [key: string]: string;
        };
    };
    number: number;
    editOption: (option: number, remove: boolean) => void;
    reset: boolean;
    disableChoices: boolean
}

const QuestionCard = ({
    question,
    number,
    editOption,
    reset,
    disableChoices}: QuestionCardProps) => {
    
    //-1 means no choice is selected. The index for the options will never be -1.
    const [choice, setChoice] = useState<number>(-1)
    // alreadyReset if the choice for question is cleared after quiz is resetted
    const [alreadyReset, setAlreadyReset] = useState<boolean>(false)

    const selectOption = (option: number) => {
        // If already selected, unselect choice
        if (choice === option) {
            setChoice(-1)
            editOption(option, true)
        } else {
            //a choice selected, remove from response array
            if (choice !== -1) {
                //remove previous response
                editOption(choice, true)
            }
            //switch to new response.
            setChoice(option)
            editOption(option, false)
        }
    }

    useEffect( () => {
        //If user click on retake quiz, reset choices
        if (reset && !alreadyReset) {
            setChoice(-1)
            setAlreadyReset(true)
        } else if (!reset) {
            setAlreadyReset(false)
        }
    }, [choice, reset, disableChoices])

    return (
        <QuestionContainer>
            <QuestionTitle><QuestionNumber>{number}</QuestionNumber>{question.prompt}</QuestionTitle>
            {Object.keys(question.options).map( (key:string, index) => (
                // Disabled is based on if the user clicked show me results. 
                <OptionButton disabled={disableChoices} onClick={() => selectOption(index)} selected={index === choice}>
                    {key + ": "}{question.options[key]}</OptionButton>
                
            ))}

        </QuestionContainer>
    );

}
export default QuestionCard