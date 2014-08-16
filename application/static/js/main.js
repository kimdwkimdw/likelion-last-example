// Enable pusher logging - don't include this in production
/*
Pusher.log = function(message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};
*/

$(function() {
    var pusher = new Pusher(PUSHER_KEY)
        testChannel =pusher.subscribe('test_channel'),
        $messages = $('.messages'),
        $inputMessage = $('.inputMessage'),
        chatPage = $('.chat.page');

    /*
    //$.post는 아래의 형태와 같습니다.
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: success,
      dataType: dataType
    });
    */

    var initial_delay = 1500;
    setTimeout(function () {
        addChatMessage({'username':'이두희', 'message':'안녕?'});
    },initial_delay + 500)
    setTimeout(function () {
        addChatMessage({'username':'홍진호', 'message':'안녕?'});
    },initial_delay + 1000)
    setTimeout(function () {
        addChatMessage({'username':'홍진호', 'message':'두희야 요즘 눈물 셀카 연습하고 있다매.'});
    },initial_delay + 1500)
    setTimeout(function () {
        addChatMessage({'username':'이두희', 'message':'?????????ㅜㅜㅜㅜㅜㅜ'});
    },initial_delay + 2000)
    
    testChannel.bind('echo', function(data) {
        data['username'] = "김동우";
        addChatMessage(data);
    });

    setTimeout(function () {
        $.post('/api/echo', {"message":"Hello World!"});
    },initial_delay +  4000)
    setTimeout(function () {
        $.post('/api/echo', {"message":"나는 치킨을 먹고싶어"});
    },initial_delay +  5000)
    setTimeout(function () {
        $.post('/api/echo', {"message":"치킨은 언제 오는거야"});    
    },initial_delay +  6000)
    setTimeout(function () {
        $.post('/api/echo', {"message":"두희형 치킨 사주세요ㅠㅠ"});
    },initial_delay +  7000)

    function addChatMessage(data) {
        var $usernameDiv = $('<span class="username"></span>');
        $usernameDiv.css("color", getUsernameColor(data.username));
        $usernameDiv.text(data.username);

        var $messageBodyDiv = $('<span class="messageBody"></span>');
        $messageBodyDiv.text(data.message);

        var typingClass = data.typing ? 'typing' : '';
        var $messageDiv = $('<li class="message ' + typingClass + '"></li>');
        $messageDiv.append($usernameDiv)
            .append($messageBodyDiv)
            .data('username', data.username);

        addMessageElement($messageDiv);
    }

    function addMessageElement(el) {
        var $el = $(el);
        $messages.append($el);

        $messages[0].scrollTop = $messages[0].scrollHeight;
    }

    function getUsernameColor(username) {
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % 360);
        return "hsl(" + index + ", 77%, 60%)";
    }
});