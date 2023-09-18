import axios from "axios";

const UpdateAssessment = async (uniqueid, assessmentname) => {
    const UpdateData = await axios
      .put(
        `https://gray-famous-butterfly.cyclic.app/api/users/updateassessment/${uniqueid}`,
        {
          AssessmentName: assessmentname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export {UpdateAssessment}