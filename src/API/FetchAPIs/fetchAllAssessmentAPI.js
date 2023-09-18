import axios from "axios";

const FetchAllAssessment = async () => {
    const x = JSON.parse(localStorage.getItem("user-details"));
    const AssessmentData = await axios.get(
      `https://gray-famous-butterfly.cyclic.app/api/users/fetchallassessment/${x.senderid}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    return AssessmentData.data.data
  };

  export {FetchAllAssessment}