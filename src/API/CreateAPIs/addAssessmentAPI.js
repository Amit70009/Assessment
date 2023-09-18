import axios from "axios";

const AddAssessment = async (assessmentname) => {
    const local = (JSON.parse(localStorage.getItem("user-details")))
    axios
      .post(
        "https://gray-famous-butterfly.cyclic.app/api/users/addassessment",
        {
          AssessmentName: assessmentname,
          UserID: local.senderid
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        // window.location.reload();
        return res.data.data.addassess
      })
      .catch((err) => console.log(err));
  };

  export {AddAssessment}