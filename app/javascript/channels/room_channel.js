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
    changeLineCheck()
  })
  // 送信ボタンが押された後にボタンを無効化
  messageButton.addEventListener('click', () => {
    messageButton.classList.add('disabled')
    changeLineCount(1)
  })

  // 以下テキスト入力フォームの縦幅をflexibleに調整されるための変数と関数
  const maxLineCount = 10
  const getLineCount = () => {
    return (messageContent.value + '\n').match(/\r?\n/g).length;
  }
  let lineCount = getLineCount()
  let newLineCount
  // 行数を変更
  const changeLineCheck = () => {
    newLineCount = Math.min(getLineCount(), maxLineCount)
    if (lineCount !== newLineCount) {
      changeLineCount(newLineCount)
    }
  }

  ////// 行数が増えた時に最新のコメントの上に重なってコメントが見えなくなることを防ぐために使う
  ////// (送信ボタンはfooterです)
  const footer = document.getElementById('footer')
  let footerHeight = footer.scrollHeight
  let newFooterHeight, footerHeightDiff

  const changeLineCount = (newLineCount) => {
    // formの行数を変更
    messageContent.rows = lineCount = newLineCount

    ////// 行数が増えた時に最新のコメントの上に重なってコメントが見えなくなることを防ぐ
    // 新しいフッターの高さを取得し、違いを計算
    newFooterHeight = footer.scrollHeight
    // どれだけ上にスクロールさせるか
    footerHeightDiff = newFooterHeight - footerHeight
    // 新しいグッターの高さをチャットランのpadding-bottomに反映し、スクロールさせる
    if (footerHeightDiff > 0) {
      messageContainer.style.paddingBottom = newFooterHeight + 'px'
      window.scrollBy(0, footerHeightDiff)
    } else {
      window.scrollBy(0, footerHeightDiff)
      messageContainer.style.paddingBottom = newFooterHeight + 'px'
    }
    footerHeight = newFooterHeight
  }
})
