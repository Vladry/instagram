

По п.№7 первого ревью работы, а именно:
7). Вот это я вообще не понял. Если это для дабл клика, то возможно....
ссылка на ревью:  https://docs.google.com/document/d/1wByTO0SZqiJIK9kqCXltsqrtdeHEVCQhUbvhpzbEWS0/edit?usp=sharing

Комментирую:
См. стр. 163 - 172 файла client/src/pages/App.jsx
Конструкция с применением setTimeout
() абслютно необходима и примерена в связи с тем, что задача выполнена в реализации с повышенной сложностью:  в Т.З. требование к функционалу предусматривало лишь один onDoubleClick обработчик для простановки лайка текущему посту.  В моей же реализации добавлено открытие данного поста в модальном окне по дополнительному (не требуемому в ТЗ) onClick -обработчику.  Соответственно, onClick и onDoubleClick на одном и том элементе конфликтуют между собой и мой вариант реализации является единственно возможным. 
Учитывая то, что данное ТЗ и работа вцелом носят учебный смысл, я настаиваю на том, что данное отхождение от ТЗ является обоснованым, позволившим мне глубже погрузиться проблемматику и получить лУчший учебный результат. Поэтому нет в коде onDoubleClick, вместо него есть только onClick и более ёмкая реализация ТЗ.
Об этом отклонении от ТЗ было сообщено в первой редакции файла readme.md, в самом нижнем пункте №4 
 
 По пункту 6). ревью, а  именно: Приложение достаточно простое, но размеры файла instagram-master\client\src\pages\App.jsx поражают. 
 --------- поясняю:  частично, кода больше стало из-за введения настройки задания ползунком количества списков followed и recommended 
 пользователей, а так же механизма их автоматического пере-рендеривания сразу же.  В ТЗ такого требования НЕ было, я выполнил расширенный функционал.  Возможно работу можно было выполнить с мЕньшим кол-вом кода, но данное расширение функционала все же привело к увеличению строк кода.