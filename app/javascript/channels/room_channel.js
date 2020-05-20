import consumer from "./consumer"

// turbolinks の読み込みが終わった後にidを取得しないと，エラーが出ます。
document.addEventListener('turbolinks:load', () => {

  // js.erb 内で使用できるように変数を定義しておく
  window.messageContainer = document.getElementById('message-container')

  // 以下のプログラムが他のページで動作しないようにしておく
  if (messageContainer === null) {
    return
  }

  consumer.subscriptions.create("RoomChannel", {
    connected() {},

    disconnected() {},

    received(data) {
      // サーバー側から受け取ったHTMLを一番最後に加える
      messageContainer.insertAdjacentHTML('beforeend', data['message'])
    }
  })
})
