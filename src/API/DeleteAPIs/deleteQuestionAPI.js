import axios from "axios";

const DeleteQuestion = async (quesuniqueid) => {
    const AssessmentData = await axios
      .delete(
        `https://gray-famous-butterfly.cyclic.app/api/users/deletequestion/${quesuniqueid}`,
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

  export {DeleteQuestion}