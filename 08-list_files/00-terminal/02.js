const fs = require('fs');

const print_list = function (dir) {
    fs.readdir(dir, function (err, items) {
        if (err) throw err;

        console.log('=>', dir);
        //console.log(items);

        items.forEach(item => {
            let path = dir + '/' + item;
            
            fs.stat(path, (err, stats) => {
                //console.log(stats); 
                if (stats.isFile()) {
                    console.log('->', item, stats.size);
                }
                else {
                    print_list(path);
                }
            })
        });

    });
};


let dir_app = __dirname;
// console.log(__d);
print_list("C:/Users/Zakhar/Desktop/Code");
