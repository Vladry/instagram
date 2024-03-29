Тех.задание:  
https://gitlab.com/dan-it/groups/pe29/-/tree/master/react/step-project-instagram

Проект на GitHub:
https://github.com/Vladry/instagram

Проект выполнен:  Рябушкиным Владиславом, 
telegram/Viber: +38063-7400791, 

linkedIn: 
https://www.linkedin.com/in/vladyslav-ryabushkin-42478714b/ 

Slack:   @Vlad_Ry   https://fs-danit.slack.com/team/U01FZ7AFGAF


ПРИМЕНЕННЫЕ ТЕХНОЛОГИИ:
Кроме базовых (html, scss, js) проекте использованы следующие технологии:
React, Redux, Rauter, react hooks, SCSS, Styled Components, CSS-modules, Material-UI, 
Node.js, Express, MongoDB.  Jest (tests).


НЮАНСЫ РАБОТЫ ПРИЛОЖЕНИЯ И ОСОБЕННОСТИ:
Приложение имеет navBar в виде одной кнопки Feed
 в самом верху. Предназначение: 
 - на главной странице - обновление постов пользователей (обычно не требуется);
 - на странице постов пользователя:  для возврата на главную страницу. 

По главной странице:
Функционал работы двух списков юзеров (отслеживаемых и рекомендуемые) реализован более интересно, чем обусловлено в ТЗ. В данной реализации происходит переброс пользователей из списка -в список сразу динамически, а не после перезагрузки. Работает так: кликнул "добавить" на одного из "рекомендуемых" и этот юзер пере-рендерился в верхний список "отслеживаемые", а из нижнего исчез. И так же при клике "удалить" из отслеживаемых - и юзер удаляется из верхнего и появляется в "рекомендуемых". 
При клике на любого из юзеров из отслеживаемые или recommended
- списков справа, данный юзер (с целью демонстрации приложения) автоматически становится activeUser
 (залогининым пользователем). И все списки справа (отслеживаемые и recommended) динамически пере-формируются под нового залогиненого юзера. 

Под каждым постом можно оставить комментарий, для этого комментарий заполняется в textArea
, фиксация нового комментария в базе производится по нажанию на кнопку Escape. 


 ПРОБЛЕМЫ И ВОПРОСЫ:
 
Правильно ли я понимаю, что в тестах (см. файл actions.test.js, строки 72, 81) функционал работы со store
 не работает? Ну, то есть, проверить фетчевание данных можно было бы, а вот задиспатчить экшны и занести замоканые данные в стор и проверить соответствие состояния стора по expect уже не реально?  Т.к. я получаю пустые значения при попытке считать состояние стейта (actions.test.js  строки 77, 87)



ВНЕСЕННЫЕ УЛУЧШЕНИЯ  (более "продвинутая" реализация ТЗ):

1. 
Улучшен функционал работы двух списков юзеров (отслеживаемые и рекомендуемые юзеры): в моем решении происходит переброс пользователей из списка -в список сразу динамически, а не после перезагрузки страницы. Работает так: кликнул "добавить" на одного из "рекомендуемых" и этот юзер пере-рендерился в верхний список фолловеров, а из нижнего исчез. И так же при клике "удалить" из фолловеров - и юзер удаляется из верхнего и появляется в "рекомендуемых". 

2.
ТЕКУЩИЙ АКТИВНЫЙ ПОЛЬЗОВАТЕЛЬ в системе:
- приложение позволяет производить тестовую отладку кода при оперативной смене пользователя при клике на кнопку "log in
" справа от аватарки каждого из доступных в системе пользователей в обоих списках: "отслеживаемые" и "рекомендуемые".  При этом, выдача постов пользователей главной страницы в infinity scroll будет динамически пере-формирована с изьятием из выдачи постов "вновь залогининного" пользователя.

3.
Реализован ползунок настройки количества юзеров показываемых в списках отслеживаемых и рекомендуемых юзеров (от 1 до 8ми юзеров в каждом списке).

4. 
Функционал перехода (открытия) модального окна с отдельным постом так же реализован и при клике на отдельные посты в ленте постов всех юзеров на главной странице.