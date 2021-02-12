import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { Col, Row} from "react-bootstrap";
import questionsData from "./data.json"

import Nav from "./components/Nav"
import Quiz from "./components/Quiz"

import quiz_image from "./images/quiz_image.svg"


const AppContainer = styled.div`
  padding: 20px 20px;
  display: flex;
  justify-content: center;
`;

const QuizContainer = styled(Col)`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;


const App = () => {


  return (
    <AppContainer>
      <Row>
        <Nav/>
        <QuizContainer sm={12}>
          {/* Change title based on the topic of the quiz. 
              The title could be in the data, where we can retreive it. The header
              image for the quiz can also be changed */}
          <Quiz title={"Do Your Parents Miss You or Do They Just Feel Obligated to Talk to You?"}
              questionsData={questionsData} imageSrc={quiz_image}/>
        </QuizContainer>

      </Row>
    </AppContainer>
  );
}

export default App;
