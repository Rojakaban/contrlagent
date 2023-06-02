// Импортируем библиотеку fastify для развертывания веб-сервера
const fastify = require('fastify')({
    logger: true // Эта штука нужна, чтобы в терминале отображались логи запросов
})
// const pdfMakePrinter = require('pdfmake/src/printer')

// const pdfmake = require('pdfmake');
// const folder = require('./cnag/fodler');
const {pool} = require('./pool')




// Блок кода, который нужен для исправления ошибки с CORS
// fastify.register(require('@fastify/cors'), (instance) => {
//     return (req, callback) => {
//         const corsOptions = {
//             // This is NOT recommended for production as it enables reflection exploits
//             origin: true
//         };

//         // do not include CORS headers for requests from localhost
//         if (/^localhost$/m.test(req.headers.origin)) {
//             corsOptions.origin = false
//         }

//         // callback expects two parameters: error and options
//         callback(null, corsOptions)
//     }
// })
//
// 
// ⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
// ⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
// ⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀ 
// ⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆⠀⠀⠀⠀⠀⠀⠀ 
// ⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆ 
// ⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠁⠸⣼⡿ 
// ⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉⠀⠀⠀⠀⠀ 
// ⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
// ⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
// ⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
// ⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀ 
// ⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀ 
// ⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀ 
// ⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀
//                   ⠉⠛⠻⠿⠿⠿⠿⠛⠉
//
// Define font files
// const fonts = {
//     Roboto: {
//       normal: './fonts/Roboto-Black.ttf',
//       bold: './fonts/Roboto-Bold.ttf',
//       italics: './fonts/Roboto-Italic.ttf',
//     }
//   };



//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//CONTRAGENTS

// Получение агентов
fastify.post('/cg/show', async function (request, reply) {
    let data = {
        message: ' error',
        statusCode: 400
    }
    const urlName='/cg/show'
    const client = await pool.connect()
    try {
        const controlags = await client.query(`SELECT "cadid", "cagshortname", "cagfullname", "caginn", "cagadress", "cagogrn", "cagkpp"
                                            FROM controlag`);
        data.message = controlags.rows
        data.statusCode = 200
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()');
    }
    reply.send(data)
})

// Создание папок
fastify.post('/cg/create', async function (request, reply){
    let data= {
        message: ' error',
        statusCode: 400
    }
    const urlName='/cg/create'
    const client = await pool.connect()
    try {
        const controlag = await client.query(`INSERT INTO controlag ("cagshortname", "cagfullname", "caginn", "cagadress", "cagogrn", "cagkpp")
                                           VALUES ($1, $2, $3, $4, $5, $6) RETURNING "cadid", "cagshortname", "cagfullname", "caginn", "cagadress", "cagogrn", "cagkpp"`, 
                                           [ request.body.cagshortname, request.body.cagfullname, request.body.caginn, request.body.cagadress, request.body.cagogrn, request.body.cagkpp ]);
        if(controlag.rowCount > 0 && controlag.rows.length > 0){
            data.message = controlag.rows[0]
            data.statusCode = 200
        }
        else{
            console.log('Произошла ошибка при обновлении записи');
        }
        console.log(controlag);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()');
    }
    reply.send(data)
})

// Удаление папок
fastify.post('/cg/delete', async function (request, reply){
    
    let data= {
        message: ' error',
        statusCode: 400
    }
    const urlName='/cg/delete'
    const client = await pool.connect()
    try {
        const controlag = await client.query(`DELETE FROM controlag
                                           WHERE "cadid" = $1
                                           RETURNING *`, [ request.body.cadid]);
        if(controlag.rowCount > 0){
            data.message = controlag.rows[0]
            data.statusCode = 200
        }
        else{
            console.log(`Произошла ошибка при обновлении записи`)
        }
        console.log(controlag);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()');
    }
    reply.send(data)
})

//Обновление папок
fastify.post('/cg/update', async function (request, reply){
    
    let data= {
        message: ' error',
        statusCode: 400
    }
    const urlName='/cg/update'
    const client = await pool.connect()
    try {
        const controlag = await client.query(`UPDATE controlag
                                            SET "cagshortname" = $2, 
                                            "cagfullname" = $3, 
                                            "caginn" = $4, 
                                            "cagadress" = $5, 
                                            "cagogrn" = $6, 
                                            "cagkpp" = $7
                                           WHERE "cadid" = $1
                                           RETURNING *`, [request.body.cadid, request.body.cagshortname, 
                                            request.body.cagfullname, request.body.caginn, 
                                            request.body.cagadress, request.body.cagogrn, 
                                            request.body.cagkpp ]);
        if(controlag.rowCount > 0){
            data.message = controlag.rows[0]
            data.statusCode = 200
        }
        else{
            console.log(`Произошла ошибка при обновлении записи`)
        }
        console.log(controlag);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()');
    }
    reply.send(data)
})
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//USERS

//Показать пользователей
fastify.post('/u/show', async function (request, reply) {
    let data = {
        message: ' error',
        statusCode: 400
    }
    const urlName='/u/show'
    const client = await pool.connect()
    try {
        const users = await client.query(`SELECT "userid", "userfio", "userinn", "userdata", "userrole", "cadid"
                                            FROM users`);
        data.message = users.rows
        data.statusCode = 200
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()');
    }
    reply.send(data)
})

//Создание пользователей
fastify.post('/u/create', async function (request, reply){
    let data= {
        message: ' error',
        statusCode: 400
    }
    const urlName='/u/create'
    const client = await pool.connect()
    try {
        const users = await client.query(`INSERT INTO users ("userfio", "userinn", "userdata", "userrole", "cadid")
                                           VALUES ($1, $2, $3, $4, $5) RETURNING "userid"`,
                                           [ request.body.userfio, request.body.userinn, request.body.userdata, request.body.userrole, request.body.cadid]);
        if(users.rowCount > 0 && users.rows.length > 0){
            data.message = users.rows[0]
            data.statusCode = 200
        }
        else{
            console.log('Произошла ошибка при обновлении записи');
        }
        console.log(users);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()');
    }
    reply.send(data)
})

//Удаление пользователей
fastify.post('/u/delete', async function (request, reply){
    
    let data= {
        message: ' error',
        statusCode: 400
    }
    const urlName='/u/delete'
    const client = await pool.connect()
    try {
        const users = await client.query(`DELETE FROM users
                                           WHERE "userid" = $1
                                           RETURNING *`, [ request.body.userid]);
        if(users.rowCount > 0){
            data.message = users.rows[0]
            data.statusCode = 200
        }
        else{
            console.log(`Произошла ошибка при обновлении записи`)
        }
        console.log(users);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()');
    }
    reply.send(data)
})

//Обновление пользователей
fastify.post('/u/update', async function (request, reply){
    
    let data= {
        message: ' error',
        statusCode: 400
    }
    const urlName='/u/update'
    const client = await pool.connect()
    try {
        const users = await client.query(`UPDATE users
                                            SET "userfio" = $2, 
                                            "userinn" = $3, 
                                            "userdata" = $4,
                                            "userrole" = $5,
                                            "cadid" = $6
                                           WHERE "userid" = $1
                                           RETURNING *`, [request.body.userid, request.body.userfio, 
                                            request.body.userinn, request.body.userdata, request.body.userrole, request.body.cadid]);
        if(users.rowCount > 0){
            data.message = users.rows[0]
            data.statusCode = 200
        }
        else{
            console.log(`Произошла ошибка при обновлении записи`)
        }
        console.log(users);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()');
    }
    reply.send(data)
})
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// async function docFileFromStream(document) {
//     const chunks = [];
//     let result = null;
//     return new Promise(function (resolve, reject) {
//         try {
//             document.on('data', function (chunk) {
//                 chunks.push(chunk);
//             });
//             document.on('end', async function () {
//                 result = Buffer.concat(chunks);
//                 console.log('end');
//                 resolve(result);
                
//             });
//             document.on('error', reject);
//             document.end();
//         } catch (error) {
//             console.log('docFileFromStream ERROR');
//             console.log(error);
//             reject(null);
//         }
//     });
// }
// async function docFileFromStream(document) {
//     const chunks = [];
//     let result = null;
//     return new Promise(function (resolve, reject) {
//         try {
//             document.on('data', function (chunk) {
//                 chunks.push(chunk);
//             });
//             document.on('end', async function () {
//                 result = Buffer.concat(chunks);
//                 console.log('end');
//                 resolve(result);
                
//             });
//             document.on('error', reject);
//             document.end();
//         } catch (error) {
//             console.log('docFileFromStream ERROR');
//             console.log(error);
//             reject(null);
//         }
//     });
// }
// fastify.post('/pdf', async (request,reply) => {
//     try {
//         // 1. Запрос в базу на получение всех задач
//         // 2. Сформировать строку вида item1\item2\item3
//         // 3. Передать сформированную строку
//         const printer = new pdfMakePrinter(fonts)
//         const docFile = printer.createPdfKitDocument({
//             content: [
//                 'First paragraph',
//                 'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
//             ]
            
//         })
//         const doc = await docFileFromStream(docFile)
//         reply.header('Content-Type','application/pdf')
//         reply.send(doc)
//     }
//     catch(e) {
//         console.log(e)
//     }
// }); 
    
// Запускаем сервер на порту 3000
fastify.listen({ port: 3050 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
