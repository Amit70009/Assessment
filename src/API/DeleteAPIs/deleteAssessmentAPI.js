import axios from "axios";

const DeleteAssessment = async (uniqueid) => {
    const UpdateData = await axios
      .delete(
        `https://gray-famous-butterfly.cyclic.app/api/users/deleteassessment/${uniqueid}`,
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

  export {DeleteAssessment}