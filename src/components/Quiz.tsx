import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import QuestionCard from "./common/QuestionCard"
import empty from "./../images/empty.svg"
import { ProgressBar } from "react-bootstrap";

// Quiz Content 
const QuizTitle = styled.div`
    font-size: 26px;
    font-weight: 600;
    margin-top: 30px;
    margin-bottom: 50px;
    width: 40vw;
    text-align: center;
`;

const QuizContainer = styled.div`
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuizImage = styled.img`
    width: 50vh;
    height: 50vh;
`;

//Submit Button
type SubmitButtonProps = {
    disabled: boolean;
}

const SubmitButton = styled.button<SubmitButtonProps>`
  background-color: ${({disabled}) => disabled ? '#c2c2c2' : '#55b344'};
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  width: 50vw;
  min-height: 50px;
  margin-bottom: 10px;
  text-align: center;
  padding: 10px 10px;
`
//Empty message if there is no questions in the array
const EmptyMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

//Progress bar  
type QuizProgressProps = {
    width: number;
}

const QuizProgress = styled.div<QuizProgressProps>`
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 20px !important;
    width: ${({width}) => width ? width + "%": '0%'};
    background: #575A89;
    transition-duration: 0.5s;
`

//Result message
type ResultMessageProps = {
    visible: boolean;
}

const ResultMessage = styled.div<ResultMessageProps>`
    display: ${({ visible }) => visible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    width: 47vw;
    padding: 20px 20px;
    text-align: center;
    background: #d15858;
    margin: 0px 10px;
    margin-bottom: 40px;
    color: #ffffff;
    border-radius: 5px;
    visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
`

//Type for data set

//number of options can change
type questionOptions = {
    [key: string]: string;
};

type questionPrompt = {
    prompt: string;
    options: questionOptions;
};

type questionsInfo = {
    questions: Array<questionPrompt>;
    results: string[];
};


type QuizProps = {
    title: string;
    questionsData: questionsInfo;
    imageSrc: string;
}

const Quiz = ({
    title,
    questionsData,
    imageSrc}: QuizProps) => {
    
    //Set initial array to value 0's
    const [responses, setResponses] = useState<Array<number>>(() => {
        //If no questions, set choices to 0. If yes, get number of keys in options
        let initial = new Array<number>(questionsData.questions.length === 0 ? 0 : 
                Object.keys(questionsData.questions[0].options).length);
        
        initial.fill(0, 0, questionsData.questions.length === 0 ? 0 : 
            Object.keys(questionsData.questions[0].options).length);
        return initial
    });

    const [showResult, setShowResult] = useState<boolean>(false)
    const [reset, setReset] = useState<boolean>(false)
    
    //Save user's option or remove it if user unselect.
    //Invariant: if remove, the option was already selected. So subtracting will be fine
    const editOption = (option: number, remove: boolean) => {
        //Remove response
        if (remove) {
            responses[option]--;
            let newResponses = [...responses];
            setResponses(newResponses);
        //Add response
        } else {
            responses[option]++;
            let newResponses = [...responses];
            setResponses(newResponses);
        }
    }


    const buttonClicked = () => {
        //This means that the user has taken the quiz.
        if (showResult) {
            //Create new array with 0s
            let newResponses = new Array<number>(questionsData.questions.length === 0 ? 0 : 
                Object.keys(questionsData.questions[0].options).length);
            
            newResponses.fill(0, 0, questionsData.questions.length === 0 ? 0 : 
                    Object.keys(questionsData.questions[0].options).length);
            
            //Clear responses and hide result
            setReset(true)
            setResponses(newResponses)
            setShowResult(false)
        } else {
            //Quiz result is shown
            setReset(false)
            setShowResult(true)
        }
    }
    

    useEffect( () => {
        //console.log(responses) for testing
    }, [responses])

    return (
        <QuizContainer>
        <QuizTitle>{title}</QuizTitle>

        {/* Check if there is questions. If not, display no questions message. 
            Prevents no questions from generating empty page. Assuming there will always be
            a questions array.*/}
        {questionsData.questions.length > 0 ? 
            <>
             <QuizImage src={imageSrc}/>
             {/* Iterate through questions and create question card */}
             {questionsData.questions.map( (question, index) => (
                <QuestionCard question={question} number={index + 1} 
                    editOption={editOption} reset={reset} disableChoices={showResult}></QuestionCard>
              ))}
            
            {/* Only enable button if user has answered every question. */}
            <SubmitButton disabled={responses.reduce((a, b) => a + b, 0) !== questionsData.questions.length}
                            onClick={() => buttonClicked()}>{showResult ? "Retake quiz" : "Show me my results!"}</SubmitButton>
            
            {/* Only show result if the quiz is submitted */}
            <ResultMessage visible={showResult}>
                {"Result: " + questionsData.results[responses.indexOf(Math.max(...responses))]}</ResultMessage>
            
            {/* Get total number of responses and divide by total questions to get percentage */}
            <div>
                <QuizProgress width={(responses.reduce((a, b) => a + b, 0) / questionsData.questions.length) * 100}/>
            </div>
            </> : 

            // Show empty message if there is no questions
            <>
                <QuizImage src={empty}/>
                <EmptyMessage>Sorry! There is no questions for this quiz.</EmptyMessage>
            </>
        }
 
        </QuizContainer>

    );
}

export default Quiz