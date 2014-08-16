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
        broadcast = pusher.subscribe('br'),
        $window = $(window),
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
    
    broadcast.bind('new_message', function(data) {
        data['username'] = "김동우";
        addChatMessage(data);
    });


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

    function sendMessage () {
        var message = $inputMessage.val().trim();

        // if there is a non-empty message
        if (message) {
            $inputMessage.val('');
            $.post('/api/call/new_message', {"message":message});
        }
    }

    $window.keydown(function(event) {
        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            sendMessage();
        }
    });
});