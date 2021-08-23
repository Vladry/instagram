Тех.задание:  
https://gitlab.com/dan-it/groups/pe29/-/tree/master/react/step-project-instagram
Ментор:  @Saribeg (Slack)

Проект на GitHub:
https://github.com/Vladry/instagram

Состав участников  5 человек:

Team-lead: Рябушкин Владислав telegram/Viber: +38063-7400791, linkedIn: https://www.linkedin.com/in/vladyslav-ryabushkin
-42478714b/ 
@Vlad_Ry             https://fs-danit.slack.com/team/U01FZ7AFGAF


Slack: @Andrey Kotsyk       https://fs-danit.slack.com/team/UK6A0TZ36
Email: andrey.kotsyk19578@gmail.com
tel:    0662540888


Slack:  @Апенько Тарас       https://fs-danit.slack.com/team/U01EUM5C866
Email:  apenko.taras@gmail.com
tel.:   0669246435

Slack:  @Ilya Stepenko       https://fs-danit.slack.com/team/U01ECJHGJBE


Кроме базовых (html, scss, js) проекте использованы следующие технологии:
React, Redux, Rauter, react hooks, SCSS, Styled Components, CSS-modules, Material-UI, 
Node.js, Express, MongoDB


Описание работы приложения и его особенности:

Функционал работы двух списков подписчиков (фолловеры и рекомендуемые) реализован более интересно, чем было обусловлено в ТЗ. В частности, в данной реализации происходит переброс пользователей из списка -в список сразу динамически, а не после перезагрузки. Работает так: кликнул "добавить" на одного из "рекомендуемых" и этот юзер пере-рендерился в верхний список фолловеров, а из нижнего исчез. И так же при клике "удалить" из фолловеров - и юзер удаляется из верхнего и появляется в "рекомендуемых". 

Добавлен ползунок настройки количества юзеров показываемых в списках (от 1 до 8ми юзеров в каждом списке). - доп.фича сверх ТЗ.

Закрытие модалки по клику на оверлей реализовать не получилось (подробно описывал в Слэке): при активации пропса onClose={}, при клике на картинку и при диспатче экшна открытия модалки, вслед за этим трижды откуда-то идёт диспатч на закрытие этой модалки. Если пропс onClose закомментировать, тройное самопроизвольное закрытие прекращается.  

