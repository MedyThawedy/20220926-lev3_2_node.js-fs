import fs from 'fs';


//jedes Mal, wenn deine index.js Datei ausgeführt wird, soll überprüft werden, ob ein Ordner namens “MyFunnyFolder” existiert
//Wenn er nicht existiert, soll er erstellt werden

let folderPath = './MyFunnyFolder';
/* // Old 
const fnCheckIfMyFunnyFolderExists = () => {
    if (fs.existsSync(folderPath)) {
        console.log('Folder exists! We will append the content!');
        fs.rmdir(folderPath, { recursive: true }, err => {
            if (err) {
                throw err;
            }
            console.log(`${folderPath} is deleted!`);
        });

    } else {
        console.log('File doesn t exist! We will create it and write the content!')
        fs.mkdir(folderPath, (err) => {
            if (err) {
                console.log("error occurred in creating new directory", err);
                return;
            }
        })
    }
}
fnCheckIfMyFunnyFolderExists();
*/
// New Function with Promise

const fnCheckIfMyFunnyFolderExists = () => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(folderPath)) {
            console.log('1. Folder exists! We will append the content!');
            fs.rmdir(folderPath, { recursive: true }, err => {
                if (err) {
                    reject(err);
                    throw err;
                }
                console.log(`${folderPath} is deleted!`);
            });
            resolve(folderPath);

        } else {
            console.log('3. File doesn t exist! We will create it and write the content!')
            fs.mkdir(folderPath, (err) => {
                if (err) {
                    reject(err);
                    console.log("4. error occurred in creating new directory", err);
                    return;
                }
                resolve(folderPath);
                console.log('5. Folder and File created!')
            })
        }
    })
}

fnCheckIfMyFunnyFolderExists();

/*
Falls er existiert, soll er gelöscht werden
Jedes Mal, wenn die Datei ausgeführt wird soll auch geschaut werden, ob es die Datei isThis.txt in einem Ordner namens “What” existiert
Falls nicht, erstelle den Ordner und die Datei
*/

let filePath = './what/isThis.txt';

/* Old
const fnCheckIfIsThisExistsInWhat = () => {
    if (fs.existsSync(filePath)) {
        console.log('Folder exists! We will append the content!');
        /*  fs.rmdir(filePath, { recursive: true }, err => {
              if (err) {
                  throw err;
              }
              console.log(`${filePath} is deleted!`);
          });
    } else {
        console.log('File doesn t exist! We will create it and write the content!')
        fs.mkdir('./what', (err) => {
            fs.writeFile('./what/inThis.txt', 'File was created', err => {
                if (err) {
                    console.error(err);
                }
                // file written successfully
            });
            if (err) {
                console.log("error occurred in creating new directory", err);
                return;
            }
        })
    }
}
fnCheckIfIsThisExistsInWhat(); */

/** New Function with Promise */
const fnCheckIfIsThisExistsInWhat = () => {

    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            console.log('6. Folder exists! We will append the content!');
            fs.rmdir(filePath, { recursive: true }, err => {
                if (err) {
                    console.log('7. Error it was not possible to delete!');
                    reject(err);
                    throw err;
                }
                console.log('8. ' + `${filePath} is deleted!`);
                resolve(filePath);
            });
        } else {
            console.log('File doesn t exist! We will create it and write the content!')
            fs.mkdir('./what', (err) => {
                fs.writeFile('./what/inThis.txt', 'File was created', err => {
                    if (err) {
                        console.error(err);
                        console.log('9. It was not possible to create the file');
                        reject(err);
                    }
                    // file written successfully
                    resolve(filePath);
                });
                if (err) {
                    console.log("10. error occurred in creating new directory! We will delete the directory", err);
                    fs.rmdir('./what', { recursive: true }, err => {
                        if (err) {
                            reject(err);
                            throw err;
                        }
                        console.log(`./what is deleted!`);
                        resolve(filePath);
                    });
                    reject(err);
                    return;
                }
                resolve(filePath);
                console.log('11. Directory created successfully')
            })
        }
        resolve(filePath);
    })
}

fnCheckIfIsThisExistsInWhat();