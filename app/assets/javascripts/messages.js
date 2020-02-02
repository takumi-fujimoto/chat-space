$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="upper-message">
            <div class="group_member">
              ${message.user_name}
            </div>
            <div class="group_member__send_time">
              ${message.created_at}
            </div>
          </div>
          <div class="member_message">
            <p class="member_message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
              <div class="group_member">
                ${message.user_name}
              </div>
              <div class="group_member__send_time">
                ${message.created_at}
              </div>
            </div>
            <div class="member_message">
              <p class="member_message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
  $('#new_message').on('submit', function(e){
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
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message').append(html);
      $('form')[0].reset();
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
    })
    .fail(function(data) {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(data){
      $('.submit-button').prop('disabled',false);
    })
  });
});
