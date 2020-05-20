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

  const documentElement = document.documentElement
  // サーバーからのレスポンスのjs内でも使用できるように変数を決定
  window.messageContent = document.getElementById('message_content')

  // ページの一番下までスクロールする関数。サーバーからのレスポンスのjs内でも使用できるように変数を決定
  window.scrollToBottom = () => {
    window.scroll(0, documentElement.scrollHeight)
  }
  scrollToBottom()

  const messageButton = document.getElementById('message-button')
  // 空欄でなければボタンを有効化、空欄なら無効化する関数
  const button_activation = () => {
    if (messageContent.value === '') {
      messageButton.classList.add('disabled')
    } else {
      messageButton.classList.remove('disabled')
    }
  }
  // フォームに入力した際の動作
  messageContent.addEventListener('input', () => {
    button_activation()
  })
  // 送信ボタンが押された後にボタンを無効化
  messageButton.addEventListener('click', () => {
    messageButton.classList.add('disabled')
  })
})
