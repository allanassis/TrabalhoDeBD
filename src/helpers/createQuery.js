module.exports = {

    add : function createQueryAdd(coluns, values, table)
            {
                let sqlStr = `INSERT INTO ${table} (
                    ${coluns.toString()} 
                ) 
                VALUES (
                        ${values.toString()} 
                )`;

                return new Promise((resolve, reject) =>
                        {
                            resolve(sqlStr);                    
                        });
            },

    get : function createQueryGet(coluns, table, id = false)
            {
                let sqlStr =  `SELECT ${coluns.toString()} 
                               FROM ${table} `;
                if(id)
                {                    
                    sqlStr += `WHERE ${table}.${id.name} = ${id.value}`
                }

                return new Promise((resolve, reject) =>
                            {
                                resolve(sqlStr);    
                            });
            },

    edit : function createQueryEdit(coluns, values, table, id)
            {
                if(id){

                    sqlStr = `UPDATE ${table} SET `;            

                    for(let i = 0 ; i < coluns.length ; i++){

                        sqlStr += ((coluns.length == 1) || (i == coluns.length - 1)) ?
                            `${coluns[i]} = ${values[i]} ` :
                            `${coluns[i]} = ${values[i]}, `;
                    }

                    sqlStr += `WHERE ${id.name} = ${id.value};`;

                    return new Promise((resolve, reject) =>
                                {
                                    resolve(sqlStr);
                                });
                }
                else{
                    return new Promise((resolve, reject) =>
                            {
                                reject();
                            });
                }
            },

    del : function createQueryDel(table, id)
            {
                if(id){

                    let sqlStr = `DELETE 
                                  FROM ${table}
                                  WHERE ${id.name} = ${id.value}`;

                    return new Promise((resolve, reject) =>
                            {
                                resolve(sqlStr);
                            });
                }
                else{
                    return new Promise((resolve, reject) =>
                            {
                                reject();
                            });
                }
            }
}