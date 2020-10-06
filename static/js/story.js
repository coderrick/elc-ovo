var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}

axios.get('/tweets')
  .then(function (response) {
    var count = 0;
    // handle success
    for (let tweet of response.data.statuses) {
      count++;
      twttr.widgets.createTweet(
        tweet.id_str,
        document.getElementById("tweets"),
        {
          conversation: "none",
          align: "left",
          cards: "hidden",
        }
      );
    }

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

document.getElementById("share").addEventListener("click", () => {
  let text = `<h1>Share your Story via twitter!</h1><h3>The hashtag is automatically added along with your story when you click tweet.</h3>
    <form action="#">
  <div class="mdl-textfield mdl-js-textfield">
    <textarea class="mdl-textfield__input" type="text" rows= "3" id="story" placeholder="Write your story..."></textarea>
  </div>
</form>
    <a class="twitter-share-button" id="tweet" href="#"> <button
    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Tweet #ELCExperiences</button></a><br/><br/>
    <button
    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="close">Close</button>`
  dialog.innerHTML = "";
  dialog.innerHTML = text;
  dialog.showModal();
  document.getElementById("tweet").addEventListener("click", () => {
    let story = document.getElementById("story").value;
    window.open(`https://twitter.com/intent/tweet?&text=${story}%20%23ELCExperiences`, '_blank')
  })
  document.getElementById("close").addEventListener("click", () => {
    dialog.close()
  })
})

document.getElementById("connect").addEventListener("click", () => {
  let text = `<h1>Connect with other Survivors and Patients below!</h1><h3>Enter your First and Last name then click start chat</h3>
  <div class="mdl-textfield mdl-js-textfield">
  <input class="mdl-textfield__input" type="text" placeholder="Enter your name..." id="name">
</div>
    <button
    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="start">Start Chat</button>
    <div id="talkjs-container" style="width: 90%; margin: 30px; height: 500px">
    <i>Loading chat...</i>
</div><br/><br/>
    <button
    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="close">Close</button>`
  dialog.innerHTML = "";
  dialog.innerHTML = text;
  dialog.showModal();
  var id = localStorage.getItem("ChatId");
  if(!id){
    var random = (Math.floor(Math.random() * 200) + 1).toString();
    localStorage.setItem("ChatId", random)
    id = random;
  }
  document.getElementById("start").addEventListener("click", () => {
    document.getElementById("start").style.display = "none";
    Talk.ready.then(function () {
      var me = new Talk.User({
        id: id,
        name: document.getElementById("name").value,
        email: "NA@gmail.com",
        welcomeMessage: `${document.getElementById("name").value} has joined the chat.`
      });
      window.talkSession = new Talk.Session({
        appId: "tFQIy8Y9",
        me: me
      });

      var conversation = window.talkSession.getOrCreateConversation("ELC_12345");
      conversation.setParticipant(me);

      var chatbox = talkSession.createChatbox(conversation);
      chatbox.mount(document.getElementById("talkjs-container"));
    });
  })

  document.getElementById("close").addEventListener("click", () => {
    dialog.close()
  })
})
