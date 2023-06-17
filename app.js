$(function(){
    var inputVal;
    let API_Key = "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";
    function renderMesGPT(incoming){
        let API_URL = "https://api.openai.com/v1/chat/completions";
        let chatbox  = document.querySelector(".chatbox")
        let contentBot = incoming.querySelector(".loading");
        const option = {
            method: "POST",
            headers: {
                Accept: "application.json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_Key}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user","content": inputVal}]
            })
        }
        fetch(API_URL, option).then(res=>res.json()).then(data=>{
            contentBot.innerHTML = data.choices[0].message.content;
        }).catch((error)=>{
            contentBot.innerHTML = "Error"
        }).finally(()=> chatbox.scrollTo(0, chatbox.scrollHeight));
    }
    function createMessage(message, className){
        let chatbox  = document.querySelector(".chatbox");
        const chatLi = document.createElement("div");
        chatLi.classList.add("chat", className)
        let contentUser = className === "outcoming" ? `<p class="text"></p>` : `<div class="icon-robot"><i class="fa-solid fa-robot"></i></div><div class='loading'><div class="box-loader"><div class="circle circle1"></div><div class="circle circle2"></div><div class="circle circle3"></div></div></div><p></p>`;
        chatLi.innerHTML = contentUser;
        console.log(chatLi.querySelector(".text"));
        chatLi.querySelector("p").innerText = message
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return chatLi;
    }
    $(".send").on("click", function(){
        inputVal = $(".message input").val().trim();
        if(!inputVal) return;
        $(".message input").val("");
        let chatbox  = document.querySelector(".chatbox");
        $(".chatbox").append(createMessage(inputVal, "outcoming"));
        setTimeout(()=>{
            let incomingText = createMessage("", "incoming");
            $('.chatbox').append(incomingText);
            renderMesGPT(incomingText);
        },500);
        chatbox.scrollTo(0, chatbox.scrollHeight)
    })
    $("button[type='button']").on("click", function(){
        $('.boxchatbot').fadeIn("slow");
        $('.home').fadeOut("slow")
    })
    $(".fa-xmark").on("click", function(){
        $('.boxchatbot').fadeOut("slow");
        $('.home').fadeIn("slow")
    })

    gsap.from(".home",{
        duration: 4,
        opacity: 0,
        ease: "power4.easeOut",
    })
})