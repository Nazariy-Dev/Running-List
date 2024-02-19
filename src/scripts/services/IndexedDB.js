export class IndexedDB {
    initialize(callback) {
        // Открытие БД 
        let request = indexedDB.open('WeekManager', 1);
        // onupgradeneeded: событие - происходит когда создается новая DB или происходит обновление существующей.
        request.onupgradeneeded = (event) => {
            let DB = event.target.result;
            // Проверка существующего объекта в БД
            if (!DB.objectStoreNames.contains('Weeks')) {
                // Создание объекта хранилища Tasks и присваивание значения id в качестве первичного ключа.
                // autoIncrement - генератор ключей, позволяющий задать уникальное значение для каждого объекта
                // options - объект с параметрами, в котором можно указать первоначальный ключ для управления свойствами в БД. 
                let ObjectStore = DB.createObjectStore('Weeks', { autoIncrement: true });
                // Индекса -  позволяет искать значения, хранящиеся в хранилище объектов, с использованием значения свойства хранимого объекта, а не ключа объекта.
                // Индексы принимают ограничения: Установив уникальный флаг при создании индекса, индекс гарантирует, что два объекта не будут сохранены с одинаковым значением для пути ключа индекса.             
            }
        }
        // callback функции на обработку ошибок/успеха
        request.onsuccess = (event) => {
            console.log('Success! DB has been opened!');

            let DB = event.target.result;
            // Call the callback function and pass the DB variable
            callback(DB);
            // debugger
            // ПОлучение БД
            // Отображение списка задач
            // showTasks();
        }
        request.onerror = (event) => {
            console.log('Error! There is problem with opening your DB');
        }
    }

    addTask(week, DB) {
        // создание новой транзакции обращение к объекту хранилища
        let transaction = DB.transaction(['Weeks'], 'readwrite'); //readonly - для чтения
        // Обращение к таблице
        let store = transaction.objectStore('Weeks');
        // Обращение на добавление
        let req = store.add(week);
        req.onsuccess = (event) => {
            alert('New task was added');
        };
        req.onerror = (event) => {
            alert('There is a problem with adding a new task');
            return false;
        };

    }
}