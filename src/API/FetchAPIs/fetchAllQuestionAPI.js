import axios from "axios";

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
    )
    return (AssessmentData.data.Data);

    
  };

  export {FetchAllQuestion}