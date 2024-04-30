export class IndexedDB {
    initialize() {
        return new Promise((resolve, reject) => {
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
                resolve(DB);
                // debugger
                // ПОлучение БД
                // Отображение списка задач
                // showTasks();
            }
            request.onerror = (event) => {
                console.log('Error! There is problem with opening your DB');
            }
        })
    }

    addWeek(week, DB) {

        return new Promise((resolve, reject) => {
            // создание новой транзакции обращение к объекту хранилища
            let transaction = DB.transaction(['Weeks'], 'readwrite'); //readonly - для чтения
            // Обращение к таблице
            let store = transaction.objectStore('Weeks');
            // Обращение на добавление
            let req = store.add(week);
            req.onsuccess = (event) => {
                resolve()
            };
            req.onerror = (event) => {
                console.log('There is a problem with adding a new week');
                return false;
            };
        })
    }

    getAllWeeks(DB, mondayDate) {
        // Создание транзакции
        return new Promise((resolve, reject) => {
            let foundWeek = undefined
            let weekIndex;

            let transaction = DB.transaction(['Weeks'], 'readonly');
            let store = transaction.objectStore('Weeks');
            // Обращение к существующему объекту в БД
            let cursor = store.openCursor()

            cursor.onsuccess = (event) => {
                let cursor = event.target.result;

                if (cursor) {
                    const currentIndex = cursor.primaryKey;

                    let week = cursor.value
                    let mondayDateDB = new Date(week.mondayDate)
                    let weekDBTime = new Date(mondayDateDB.setHours(2, 0, 0, 0))
                    weekDBTime = weekDBTime.getTime()
                    mondayDate.setHours(2, 0, 0, 0)
                    let calenderTime = new Date(mondayDate).getTime();
                    if (weekDBTime == calenderTime) {
                        foundWeek = week
                        weekIndex = currentIndex
                        resolve({ foundWeek, weekIndex })
                        return
                    }
                    cursor.continue()
                    console.log(week)
                } else {
                    resolve({ foundWeek, weekIndex })
                }
            }
        })
    }

    getWeek(DB, index) {
        return new Promise((resolve, reject) => {

            let transaction = DB.transaction(['Weeks'], 'readonly');
            let store = transaction.objectStore('Weeks');
            // Обращение к существующему объекту в БД
            let request = store.get(index)


            request.onsuccess = (event) => {
                let data = request.result
                resolve(data)

            }
            request.onerror = (e) => {
                console.log('No nection to DB');
            }
        })
    }

    updateWeek(DB, week, index) {
        return new Promise((resolve, reject) => {

            let transaction = DB.transaction(['Weeks'], 'readwrite');
            let store = transaction.objectStore('Weeks');
            // Обращение к существующему объекту в БД
            let putRequest = store.put(week, index)


            putRequest.onsuccess = (event) => {
                let data = putRequest.result
                resolve(data)
            }
            putRequest.onerror = (e) => {
                console.log('No nection to DB');
            }
        })
    }

    deleteWeek(DB, index) {
        return new Promise((resolve, reject) => {

            let transaction = DB.transaction(['Weeks'], 'readwrite');
            let store = transaction.objectStore('Weeks');
            // Обращение к существующему объекту в БД
            let request = store.delete(index)


            request.onsuccess = (event) => {
                let data = request.result
                resolve(data)
            }
            request.onerror = (e) => {
                console.log('No nection to DB');
            }
        })
    }

}