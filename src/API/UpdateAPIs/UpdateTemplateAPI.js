import axios from "axios";

const UpdateTemplate = async (updateEmailName, updateEmailBody) => {
    const x = JSON.parse(localStorage.getItem("user-details"));
    const UpdateCall = await axios
      .patch(
        `https://gray-famous-butterfly.cyclic.app/api/users/send-from/update/${localStorage.getItem(
          "TemplateID"
        )}`,
        {
          name: updateEmailName,
          body: updateEmailBody,
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
    
      });
  };

  export {UpdateTemplate}