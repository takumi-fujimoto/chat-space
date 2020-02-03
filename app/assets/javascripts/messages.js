$(function() {
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="group_member">` +
              message.user_name +
            `</div>` +
            `<div class="group_member__send_time">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="member_message">` +
            `<p class="member_message__content">` +
              message.content +
            `</p>` +
            `<img src="` + message.image + `"class=member_message__image">` +
          `</div>` +
        `</div>` 
      } else if (message.content) {
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="group_member">` +
              message.user_name +
            `</div>` +
            `<div class="group_member__send_time">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="member_message">` +
            `<p class="member_message__content">` +
              message.content +
            `</p>` +
          `</div>` +
        `</div>`
      } else if (message.image) {
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="group_member">` +
              message.user_name +
            `</div>` +
            `<div class="group_member__send_time">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="member_message">` +
            `<img src="` + message.image + `" class="member-message__image" >` +
          `</div>` +
        `</div>`
      };
      return html;
    };
  
  

  // ここから実際のイベント
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__message').append(html);
      $('form')[0].reset();
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      })
    .fail(function(data) {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(data) {
      $('.submit-button').prop('disabled',false);
    })
  })


// ここから自動更新
    var reloadMessages = function() {
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: "get",
        data: {id: last_message_id},
        dataType: 'json'
      })

      .done(function(messages) {
        if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        $('.chat-main__message').append(insertHTML);
        $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
        })
      }
    })

      .fail(function() {
        alert("メッセージ送信に失敗しました");
      })
    };

     if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});
