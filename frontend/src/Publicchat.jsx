import publicphoto from "./assets/publicchat.jpg";

function Public_chat({ name }) {
  return (
    <div className="publicchat">
      <img
        className="publicchat-image"
        src={publicphoto}
        alt={name}
        width="35"
        height="35"
      />
      <h2 className="publicchat-name">{name}</h2>
      <p className="publicchat-lastmessage"></p>
    </div>
  );
}

export default Public_chat;
