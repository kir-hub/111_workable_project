const bd = require('../../models/index');
const NotFound = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');
const bcrypt = require('bcrypt');
const { db, where } = require('../../models/mongoModels/Message');

module.exports.updateUser = async (data, userId, transaction) => { // это чтобы залогинить???
  const [updatedCount, [updatedUser]] = await bd.Users.update(data,
    { where: { id: userId }, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update user');
  }
  return updatedUser.dataValues;
};

module.exports.findUser = async (predicate, transaction) => {
  const result = await bd.Users.findOne({ where: predicate, transaction });
  if ( !result) {
    throw new NotFound('user with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};








module.exports.userCreation = async (data) => {
  const newUser = await bd.Users.create(data);
  if ( !newUser) {
    throw new ServerError('server error on user creation');
  } else {
    return newUser.get({ plain: true });
  }
};

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if ( !passwordCompare) {
    throw new NotFound('Wrong password');
    
  }
};

module.exports.changePassword = async (data) =>{
  const [number, updatedSmth] = await bd.Users.update({
      where: {email: req.body.email},
      returning: true,
      plain: true
    })
    
//   const newPassword = await bd.Users.update(data, {where: {
//     email: req.body.email
//   }
// }
// )
  

}

module.exports.setPassword = async (req, res, next) =>{  
  try{ 
  const decoded = jwt.decode(/*req.token*/req.token, {complete: true});
  const getPassFromPayload = JSON.parse(decoded.payload)
    console.log(decoded.header);
    console.log(decoded.payload)
  const userToUpdate = await bd.Users.findUser({email: getPassFromPayload.email}) // а где взять конкретно этот эмейл
  if (!userToUpdate){
    throw new NotFound('user with this data didn`t exist');
    //const newPassword = getPassFromPayload.password
    

  } else{
    res.send({userToUpdate: email})
    return userToUpdate.set({password: getPassFromPayload.password}, {email: userToUpdate.email})
    
  }
  
  // const changePassword = async (/*data*/) =>{ await bd.Users.update({password: newPassword}/*data || req.body.password или newPassword*/ ,
  //    {where: { email: userToUpdate.email } } ) },

  }catch(e){
    next(e)
  }
}
// module.exports.userResetPass = async (data, userId) =>{
//   const [updatedPass, updatedRows] = await bd.Users.update(data, { //переделать
//     where: {id: userId}, returning: true
//   })
//   if(updatedPass !== 1) {
//     throw new ServerError(' cannot rest password')
//   }
//   return updatedRows,dataValues;


//   // const newPass = await bd.Users.findByPk({
//   //   where: req
//   // })
// }


