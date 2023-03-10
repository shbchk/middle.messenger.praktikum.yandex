export const chatTemplate = `
<div class="chat-layout">
  <div class="chatlist">

    <div class="chatlist__header">
      <div class="chatlist__header-profile">
        <div class="chatlist__avatar-wrap">
          <img src="https://api.lorem.space/image/fashion?w=185&h=185" class="chatlist__avatar chatlist__avatar--profile" alt="Аватар" />
        </div>
        <div class="chatlist__chat-preview">
          <div class="chatlist__chatheading">Студент Практикума</div>
          <a href="/profile.html" class="chatlist__chattext">Профиль</a>
        </div>

      </div>
      <form class="chatlist__header-search">
        <input type="text" name="search" class="chatlist__search-input" placeholder="🔎 search" />
      </form>
    </div>

    <div class="chatlist__chat">
      <div class="chatlist__avatar-wrap">
        <img src="https://api.lorem.space/image/fashion?w=170&h=170" class="chatlist__avatar" alt="Аватар" />
      </div>
      <div class="chatlist__chat-preview">
        <div class="chatlist__chatheading">Ревьюер Практикума</div>
        <div class="chatlist__chattext">Поздравляю, очень крутая работа! 💪🏾</div>
      </div>
      <div class="chatlist__time">11:14</div>
      <div class="chatlist__newcount">9</div>
    </div>

    <div class="chatlist__hr"></div>
    <div class="chatlist__chat">
      <div class="chatlist__avatar-wrap">
        <img src="https://xsgames.co/randomusers/avatar.php?g=female" class="chatlist__avatar" alt="Аватар" />
      </div>
      <div class="chatlist__chat-preview">
        <div class="chatlist__chatheading">Очень важный чувак с очень большим и длинным именем</div>
        <div class="chatlist__chattext">Тут какой-то текст, который будет обрезаться, когда воткнется в правую стенку
        </div>
      </div>
      <div class="chatlist__time">3 часа назад</div>
      <div class="chatlist__newcount">9</div>
    </div>

    <div class="chatlist__hr"></div>
    <div class="chatlist__chat">
      <div class="chatlist__avatar-wrap">
        <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" class="chatlist__avatar" alt="Аватар" />
      </div>
      <div class="chatlist__chat-preview">
        <div class="chatlist__chatheading">Андрей</div>
        <div class="chatlist__chattext"><strong>Вы:</strong>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati quos a sint accusamus, repellat fugiat molestiae ducimus soluta error suscipit deserunt delectus illo.
          Quod nobis ipsam vitae saepe enim exercitationem!</div>
      </div>
      <div class="chatlist__time">пт</div>
      <div class="chatlist__newcount">9</div>
    </div>

    <div class="chatlist__hr"></div>
    <div class="chatlist__chat">
      <div class="chatlist__avatar-wrap">
        <img src="https://api.lorem.space/image/fashion?w=150&h=150" class="chatlist__avatar" alt="Аватар" />
      </div>
      <div class="chatlist__chat-preview">
        <div class="chatlist__chatheading">Андрей</div>
        <div class="chatlist__chattext"><strong>Вы:</strong>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati quos a sint accusamus, repellat fugiat molestiae ducimus soluta error suscipit deserunt delectus illo.
          Quod nobis ipsam vitae saepe enim exercitationem!</div>
      </div>
      <div class="chatlist__time">31 авг. 2019</div>
      <div class="chatlist__newcount">9</div>
    </div>

    <div class="chatlist__hr"></div>
    <div class="chatlist__chat">
      <div class="chatlist__avatar-wrap">
        <img src="https://api.lorem.space/image/fashion?w=250&h=250" class="chatlist__avatar" alt="Аватар" />
      </div>
      <div class="chatlist__chat-preview">
        <div class="chatlist__chatheading">Андрей</div>
        <div class="chatlist__chattext"><strong>Вы:</strong>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati quos a sint accusamus, repellat fugiat molestiae ducimus soluta error suscipit deserunt delectus illo.
          Quod nobis ipsam vitae saepe enim exercitationem!</div>
      </div>
      <div class="chatlist__time">31 авг. 2019</div>
      <div class="chatlist__newcount">9</div>
    </div>

    <div class="chatlist__hr"></div>
    <div class="chatlist__chat">
      <div class="chatlist__avatar-wrap">
        <img src="https://api.lorem.space/image/fashion?w=200&h=200" class="chatlist__avatar" alt="Аватар" />
      </div>
      <div class="chatlist__chat-preview">
        <div class="chatlist__chatheading">Андрей</div>
        <div class="chatlist__chattext"><strong>Вы:</strong>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati quos a sint accusamus, repellat fugiat molestiae ducimus soluta error suscipit deserunt delectus illo.
          Quod nobis ipsam vitae saepe enim exercitationem!</div>
      </div>
      <div class="chatlist__time">31 авг. 2019</div>
      <div class="chatlist__newcount">9</div>
    </div>

  </div>
  <div class="messages">

    <div class="messages__messages-wrap">

      <div class="messages__message messages__message--out">Лей упованье человека яви воспеваю
        <div class="messages__message-time">👁️ 11:14</div>
      </div>

      <div class="messages__message messages__message--in messages__message--image">
        <img src="https://source.unsplash.com/random/1600x900/?img=1" style="max-width: 100%; max-height: 100%;" alt="Picture from Unsplash" />
        <div class="messages__message-time">11:14</div>
      </div>

      <div class="messages__message messages__message--in">Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад
        адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на
        поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br /><br />
        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно
        продали на аукционе за 45000 евро.
        <div class="messages__message-time">11:14</div>
      </div>

      <div class="messages__message messages__message--in">Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад
        адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на
        поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br /><br />
        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно
        продали на аукционе за 45000 евро.
        <div class="messages__message-time">11:14</div>
      </div>

      <div class="messages__message messages__message--in">Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад
        адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на
        поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br /><br />
        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно
        продали на аукционе за 45000 евро.
        <div class="messages__message-time">11:14</div>
      </div>

    </div>

    <div class="messages__input-wrap">
      <div class="messages__attachments-button-wrap">
        <button type="button" class="messages__button">📎</button>
      </div>

      <form class="messages__input-form">
        <label class="messages__input-box">
          <textarea rows="1" name="message" class="messages__message-textarea" placeholder="Сообщение" oninput="this.parentNode.dataset.value = this.value"></textarea>
        </label>
        <button type="submit" class="messages__button">➡️</button>
      </form>
    </div>

  </div>
</div>
`;
