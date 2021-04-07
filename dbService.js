var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'bziqsnahwd71ifrem9c1-mysql.services.clever-cloud.com',
  user     : 'uek2htonqozkp6pn',
  password : 'dOOeQCz20bUWO0pT9YCA',
  database : 'bziqsnahwd71ifrem9c1'
});

let instance = null;

connection.connect((err)=>{
  if(!err)
  console.log("Connection successful !!");
  else
  console.log("Connection failed !!");
});

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });


class dbService {

  static getDbServiceInstance() {
      return instance ? instance : new dbService();
  }
  async searchHospital(name) {
    try {
         console.log(name);
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM hospitalInfo WHERE hospitalName= ?";
            //console.log(query);
            connection.query(query,[name], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        //console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
  }
  async registerUser(username,email,password) {
    try {
        const insertId = await new Promise((resolve, reject) => {
            
            const query = "INSERT INTO users (username, email, password) VALUES (?,?,?);";
            connection.query(query, [username,email,password] , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.insertId);
            })
        });
        // console.log(insertId,Name,Numb);
        return {
            id : insertId,
            Name : username,
            Email : email
        };
    } catch (error) {
        console.log(error);
    }
}

async authUser(email) {
    try {
        const user = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE email = ?";
            connection.query(query, [email] , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result);
            })
        });
        if(user.length==0)
        {
            return {
                userFound : false
            };
        }
        return {
            userFound : true,
            username : user[0].username,
            password : user[0].password,
            id : user[0].id
        };
    } catch (error) {
        console.log(error);
    }
}

async deserializeUser(id) {
    try {
        const user = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?";
            connection.query(query, [id] , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result);
            })
        });
        if(user.length==0)
        {
            return {
                userFound : false
            };
        }
        return user;
    } catch (error) {
        console.log(error);
    }
}

async getAllData() {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM hospitalInfo;";
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}



// async insertNewName(Name,Numb) {
//     try {
//         const insertId = await new Promise((resolve, reject) => {
//             const query = "INSERT INTO mySampleTable (Name,Numb) VALUES (?,?);";
//             connection.query(query, [Name,Numb] , (err, result) => {
//                 if (err) reject(new Error(err.message));
//                 resolve(result.insertId);
//             })
//         });
//         return {
//             id : insertId,
//             Name : Name,
//             Numb : Numb
//         };
//     } catch (error) {
//         console.log(error);
//     }
// }

// async deleteRowById(id) {
//     try {
//         id = parseInt(id, 10); 
//         const response = await new Promise((resolve, reject) => {
//             const query = "DELETE FROM mySampleTable WHERE id = ?";

//             connection.query(query, [id] , (err, result) => {
//                 if (err) reject(new Error(err.message));
//                 resolve(result.affectedRows);
//             })
//         });

//         return response === 1 ? true : false;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

// async updateNameById(id, Name) {
//     try {
//         id = parseInt(id, 10); 
//         const response = await new Promise((resolve, reject) => {
//             const query = "UPDATE mySampleTable SET Name = ? WHERE id = ?";

//             connection.query(query, [Name, id] , (err, result) => {
//                 if (err) reject(new Error(err.message));
//                 resolve(result.affectedRows);
//             })
//         });

//         return response === 1 ? true : false;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

// async searchByName(Name) {
//     try {
//         const response = await new Promise((resolve, reject) => {
//             const query = "SELECT * FROM mySampleTable WHERE Name = ?;";

//             connection.query(query, [Name], (err, results) => {
//                 if (err) 
//                 {
//                     reject(new Error(err.message));
//                 }
//                 resolve(results);
//             })
//         });

//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// }

// async addVisitor(ip) {
//     try {
//         const response = await new Promise((resolve, reject) => {
//             const query = "SELECT * FROM visits WHERE ip= ?;";
//             connection.query(query,[ip], (err, results) => {
//                 if (err) reject(new Error(err.message));
//                 if(results.length)
//                 {
//                     const sql = "UPDATE visits SET count = count + 1 WHERE  ip = ?";
//                     connection.query(sql, [ip], (err, results) => {})
//                 }
//                 else
//                 {
//                     const query = "INSERT INTO visits (ip) VALUES (?);";
//                     connection.query(query, [ip], (err, results) => {})
//                 }
//             })
//         });
//         return 'ok';
//     } catch (error) {
//         console.log(error);
//     }
// }
};


//connection.end();

module.exports = dbService;