import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Space, Button } from "antd";
import Countdown from "react-countdown";
import "./TestPage.css";
import TextField from "@mui/material/TextField";

export default function TestPage() {
  const { Header, Footer, Sider, Content } = Layout;
  const [fetch, setFetch] = React.useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const FetchAllQuestion = async () => {
    const AssessmentData = await axios.get(
      `https://gray-famous-butterfly.cyclic.app/api/users/fetchallquestion?assessid=${localStorage.getItem(
        "Assessment ID"
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    setFetch(AssessmentData.data.Data);
  };

  useEffect(() => {
    FetchAllQuestion();
  }, []);

  const handlePreviousQuestion = () => {
    if (selectedQuestionIndex > 0) {
      setSelectedQuestionIndex(selectedQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedQuestionIndex < fetch.length - 1) {
      setSelectedQuestionIndex(selectedQuestionIndex + 1);
    }
  };

  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#7dbcea",
  };
  const contentStyle = {
    textAlign: "left",
    minHeight: 420,

    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#108ee9",
  };
  const siderStyle = {
    textAlign: "left",
    lineHeight: "40px",
    color: "#fff",
    backgroundColor: "#3ba0e9",
  };
  const footerStyle = {
    textAlign: "right",
    color: "#fff",
    backgroundColor: "#7dbcea",
  };
  const handleQuestionClick = (index) => {
    // Update the state or perform any necessary actions
    setSelectedQuestionIndex(index);
  };

  return (
    <>
      {
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
          size={[0, 48]}
        >
          <Layout>
            <Header style={headerStyle}>
              {" "}
              <Countdown classNam="countdown" date={Date.now() + 60000 * 5} />
            </Header>
            <Layout hasSider>
              <Sider style={siderStyle}>
                {fetch.map((item, index) => (
                  <div key={item.id}>
                    <div
                      className="QuestionIndex"
                      onClick={() => handleQuestionClick(index)}
                    >
                      <h6>Question No. : {index + 1}</h6>
                    </div>
                  </div>
                ))}
              </Sider>
       
              <Content style={contentStyle}>
                {selectedQuestionIndex !== null && (
                  <>
                    <div className="QuestionDetails">
                      <h5>Question: {fetch[selectedQuestionIndex].question}</h5>
                    </div>
                    <div className="AnswerDetails">
                      {Object.entries(fetch[selectedQuestionIndex]).map(
                        ([key, value]) => {
                          if (key.startsWith("option") && value !== null) {
                            const optionNumber = key.slice(6);
                            const optionLabel = `Option ${optionNumber}`;
                            return (
                              <h6 key={key}>
                                <input
                                  className="form-check-input gap"
                                  type={
                                    fetch[selectedQuestionIndex].questiontype
                                  }
                                  name="flexRadioDefault"
                                  id={fetch[selectedQuestionIndex].questiontype}
                                />
                                {optionLabel}: {value}
                              </h6>
                            );
                          }
                          return null;
                        }
                      )}
                    </div>
                  </>
                )}
              
                  <Button classNames="BottomButtonsContainer"
                  className="PrevButton"
                    disabled={selectedQuestionIndex === 0}
                    onClick={handlePreviousQuestion}
                  >
                    Previous
                  </Button>
                  <Button
                  className="NextButton"
                    disabled={selectedQuestionIndex === fetch.length - 1}
                    onClick={handleNextQuestion}
                  >
                    Next
                  </Button>
               
              </Content>
              
             
            </Layout>
            <Footer style={footerStyle}>
              <button className="btn btn-outline-success">Submit Test</button>
            </Footer>
          </Layout>
        </Space>
      }
    </>
  );
}
