import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
const Sidebar = () => {
  const [isopen, setIsOpen] = useState(false);
  function onClick() {
    setIsOpen((e) => !e);
  }
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img className="menu" src={assets.menu_icon} alt="" onClick={onClick} />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {isopen && <p>New Chat</p>}
        </div>
        {isopen && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((e) => {
              return (
                <>
                  <div onClick={() => loadPrompt(e)} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{e.slice(0, 18)}...</p>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img className="" src={assets.question_icon} alt="" />
          {isopen && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img className="" src={assets.history_icon} alt="" />
          {isopen && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img className="" src={assets.setting_icon} alt="" />
          {isopen && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
