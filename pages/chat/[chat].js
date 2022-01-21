import React from "react";
import User from "../../Components/Users/User";
const chat = () => {
  return (
    <section className="chat_section">
      <aside className="chat_user_data">
        <User />
      </aside>

      <main className="user_chat_section">
        <nav>
          <img src="" alt="" />
          <h1></h1>
        </nav>

        <section></section>

        <div>
          <input type="text" placeholder="Write Message.." />
          <button>Send</button>
        </div>
      </main>
    </section>
  );
};

export default chat;
