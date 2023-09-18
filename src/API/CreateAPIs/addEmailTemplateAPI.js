import axios from "axios";

const AddEmailTemplate = async (emailtemplatename) => {
    const get = JSON.parse(localStorage.getItem("user-details"));
    const EmailTemplate = await axios
      .post(
        "https://gray-famous-butterfly.cyclic.app/api/users/email-template",
        {
          name: emailtemplatename,
          userid: get.userID,
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

  export {AddEmailTemplate}