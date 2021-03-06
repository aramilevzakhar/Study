// model data - модель данных
const {readdirSync, statSync} = require('fs');
const path = require('path');

let model_data = {
    title: "List of files",
    heading: "Список файлов",
    list_files: [], // тут будет список объектов про файлы
};

/* эта функция будет получать список файлов из папки dir с путями к ним и их размерами */
const get_list_files = (dir) => {
    return readdirSync(dir, 'utf8') // всё содержимое папки dir
        // .filter(item => statSync(path.join(dir, item)).isFile()) // только файлы
        .filter(item => statSync(path.join(dir, item)).isFile()) // только файлы

        .map(item => { return { // формируем объекты с данными про файлы
            'file_path': dir, 
            'file_name': item, 
            'file_size': statSync(path.join(dir, item)).size,
            'file_type': path.extname(item)
        }}); // возвращаем массив объектов с данными про файлы
};

/* эта функция будет получать список файлов 
 * из папки dir включая все вложенные папки
 * с путями к ним и размерами файлов
 */

const get_list_files_full = (dir, ext) => {
    let list_files = [];
    let list_directories = [];

    let dirs = [dir]; // список директорий для поиска файлов
    
    let last; // крайняя директория из списка
    let status; // данные о файле
    while (dirs.length > 0) { // пока очередь директорий не пуста
        last = dirs.pop(); // берём крайнюю директорию
        readdirSync(last, 'utf8').forEach(item => { // для каждого элемента директории
            status = statSync(path.join(last, item)); // получим данные
            if (status.isFile()) { // если это файл
                let file_obj = { // формируем объект файла
                    file_path: last, // путь к файлу
                    file_name: item,
                    file_size: status.size,
                    file_type: path.extname(item)
                };
                if (path.extname(item))
                    list_files.push(file_obj); // добавляем в список
            } else { // если это не файл, а директория
                
                // list_files.push(get_list_files_full(item));
                //console.log(list_files);
                let file_obj = { // формируем объект файла
                    file_path: dir, // путь к файлу
                    file_name: item,
                    file_size: dir.length,
                    file_type: 'Папка'
                };
                // console.log(`This here ${path.join(last, item)}`);
                // list_files.push(file_obj);
                dirs.unshift(path.join(last, item)); // добавим новую директорию
            }
        });
    }
    console.table(list_files);
    // list_files.sort((a, b) => a.file_path < b.file_path? -1: +1);
    list_files.sort((a, b) => {
        a.file_path < b.file_path? -1: +1;
    });
    return list_files;
};

module.exports = {
    model_data,
    get_list_files,
    get_list_files_full
}
