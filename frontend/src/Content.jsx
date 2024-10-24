/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import Public_chat from "./Publicchat";
import Content_Chat from "./Contact_chat";
import WebsocketComponent from "./core/websocket";
import api from "./core/api";
import Footer from "./Footer";

function ContentTable() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api({
          method: "GET",
          url: "/api/groups/",
        });
        const data = response.data;
        console.log("fetched groups:", data);
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups", error);
      }
    };
    fetchGroups();
  }, []);
  return (
    <div className="contenttable">
      {groups.map((group) => (
        <div key={group.id} className="group">
          <WebsocketComponent key={group.id} roomName={group.group_name} />
          <Public_chat name={group.group_name} />
        </div>
      ))}
      <Content_Chat />
      <Content_Chat />
      <Content_Chat />
      <Footer />
    </div>
  );
}

export default ContentTable;
