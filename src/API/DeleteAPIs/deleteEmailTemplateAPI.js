import axios from "axios";

const DeleteEmailTemplate = async () => {
    const FetchEmail = await axios
      .delete(
        `https://gray-famous-butterfly.cyclic.app/api/users/email-template/delete/${localStorage.getItem(
          "TemplateID"
        )}`,
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

  export {DeleteEmailTemplate}