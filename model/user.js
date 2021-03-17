const pool = require('../config/connection');

class User {
    constructor(){        
        this.pool = pool;
    }
    async getAllusers(){
        let query =`SELECT * FROM users`;
        try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
    };

    async getUserByID(id){
        let query=`SELECT * from users where id = '${id}';`;
        try {
            let result = await this.pool.query(query);
            return result;
        }
        catch(error){
            return error;
        }
    }

    async getUserByEmail(email){
        let query=`SELECT * from users where emailaddress = '${email}';`;
        try {
            let result = await this.pool.query(query);
            return result;
        }
        catch(error){
            return error;
        }
    }


    async addNew(id, fname, lname, email, password){
        let query =`INSERT into users(id, password, emailaddress, fname, lname) 
        VALUES ('${id}','${password}','${email}','${fname}','${lname}');`;
        try {
            await this.pool.query(query);
            return 1;
        }
        catch(error){
            return error;
        }
    }

    //need to fix
    async emailExists(email){
            let query=`SELECT * FROM users WHERE emailaddress = '${email}';`
            try {
                let result = await this.pool.query(query);
                if (result.length>1){
                    return false
                }else{
                    return true
                }
            }
            catch(error){
                return error;
            }
    }


    async updateById(password,email,fname,lname){
        let query=`UPDATE users SET password='${password}', emailaddress='${email}',fname='${fname}',lname='${lname}' WHERE id='${id}'`;
        try {
            await this.pool.query(query);
            return 1;
        }
        catch(error){
            return error;
        }
    }

    async delById(id){
        let query=`DELETE FROM users WHERE id='${id}';`;
        try {
            await this.pool.query(query);
            return 1;
		}
		catch(error){
			return error;
		}
    }
}

module.exports = User;