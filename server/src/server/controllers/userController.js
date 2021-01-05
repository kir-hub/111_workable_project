const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../constants');
const bd = require('../models/index');
const NotFound = require('../errors/UserNotFoundError');
const ServerError = require('../errors/ServerError');
const UtilFunctions = require('../utils/functions');
const NotEnoughMoney = require('../errors/NotEnoughMoney');
const bcrypt = require('bcrypt');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const moment = require('moment');
const uuid = require('uuid/v1');
const controller = require('../../socketInit');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const ratingQueries = require('./queries/ratingQueries');

const logger = require('../logger/log')

const mailer = require('../nodemailer/mailer');
const { use } = require('../router');


const link = 'http://localhost:3000/EnterToken'


module.exports.resetPassword = async (req, res, next) =>{  //firstAction\\    
    try{
    const foundUser = await userQueries.findUser({ email: req.body.email });
    const newPassword = req.body.password
    //Object.assign(req.body, { password: req.hashPass });
    const accessToken = jwt.sign({
      password: newPassword,//.password//hashPass
      email: /*req.body.email*/foundUser.email
    },CONSTANTS.JWT_SECRET,{ expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
    
    const message = {
      
      to: req.body.email,
      subject: accessToken ,
      html: `<h2>copy token and follow <a href='${link}'>link </a></h2> `,
    }
    mailer(message)
    res.send/*debug*/({ email: req.body.email});
  }catch (e){
    next(e)
  }
}


module.exports.setPassword = async (req, res, next) =>{  
  try{ 
  const decoded = jwt.decode(req.token, {complete: true});
  const getPassFromPayload = JSON.parse(decoded.payload)
    // console.log(decoded.header);
    // console.log(decoded.payload)
  const userToUpdate = await bd.Users.findUser({email: getPassFromPayload.email}) 
  if (!userToUpdate){
    throw new NotFound('user with this data didn`t exist');
    //const newPassword = getPassFromPayload.password

  } else{
    return userToUpdate.set({password: getPassFromPayload.password}, {email: userToUpdate.email})
  }
  
  // const changePassword = async (/*data*/) =>{ await bd.Users.update({password: newPassword}/*data || req.body.password или newPassword*/ ,
  //    {where: { email: userToUpdate.email } } ) },

  }catch(e){
    next(e)
  }
}

module.exports.verifyChangedPassword = async (req, res, next) =>{
  try{
    const {token} = req.body;
    if(token){
      jwt.verify(token, CONSTANTS.JWT_SECRET, (err, decodedToken)=> {
        if(err) {
          return res.status(400)
        }
        const {email, password} = decodedToken
        const userWhoNeedToChangePassword =  userQueries.findUser({email: email})
        if(userWhoNeedToChangePassword){
          function setPassword (){
            try{ 
              const decoded = jwt.decode(req.token, {complete: true});
              const getPassFromPayload = JSON.parse(decoded.payload)
                console.log(decoded.header);
                console.log(decoded.payload)
              const userToUpdate = userQueries.findUser({email: getPassFromPayload.email}) // а где взять конкретно этот эмейл
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
        }else{
          return res.status(400)
        }
      })
    }
  }catch(e){
  next(e)
}
}








module.exports.login = async (req, res, next) => {
  try {

   

    const foundUser = await userQueries.findUser({ email: req.body.email });
    await userQueries.passwordCompare(req.body.password, foundUser.password);
    const accessToken = jwt.sign({
      firstName: foundUser.firstName,
      userId: foundUser.id,
      role: foundUser.role,
      lastName: foundUser.lastName,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
      rating: foundUser.rating,
      password: foundUser.password //раскодировать пароль
    }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
    await userQueries.updateUser({ accessToken }, foundUser.id);
    res.send/*debug*/({ token: accessToken });
    logger.info('login')
    
    
  } catch (err) {
    logger.error('errorERR')
    next(err);
  }
};

module.exports.registration = async (req, res, next) => {
  try {
    const newUser = await userQueries.userCreation(
      Object.assign(req.body, { password: req.hashPass }));
    const accessToken = jwt.sign({
      firstName: newUser.firstName,
      userId: newUser.id,
      role: newUser.role,
      lastName: newUser.lastName,
      avatar: newUser.avatar,
      displayName: newUser.displayName,
      balance: newUser.balance,
      email: newUser.email,
      rating: newUser.rating,
    }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
    await userQueries.updateUser({ accessToken }, newUser.id);
    res.send({ token: accessToken });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
};

function getQuery (offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () => ratingQueries.createRating({
    offerId,
    mark,
    userId,
  }, transaction);
  const getUpdateQuery = () => ratingQueries.updateRating({ mark },
    { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
  let sum = 0;
  let avg = 0;
  let transaction;
  const { isFirst, offerId, mark, creatorId } = req.body;
  const userId = req.tokenData.userId;
  try {
    transaction = await bd.sequelize.transaction(
      { isolationLevel: bd.Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await bd.Ratings.findAll({
      include: [
        {
          model: bd.Offers,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[ i ].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  let transaction;
  try {
    transaction = await bd.sequelize.transaction();
    await bankQueries.updateBankBalance({
        balance: bd.sequelize.literal(`
        
                CASE
            WHEN "cardNumber"='${ req.body.number.replace(/ /g,
          '') }' AND "cvc"='${ req.body.cvc }' AND "expiry"='${ req.body.expiry }'
                THEN "balance"-${ req.body.price }
            WHEN "cardNumber"='${ CONSTANTS.SQUADHELP_BANK_NUMBER }' AND "cvc"='${ CONSTANTS.SQUADHELP_BANK_CVC }' AND "expiry"='${ CONSTANTS.SQUADHELP_BANK_EXPIRY }'
                THEN "balance"+${ req.body.price } END
                
        `),
      },
      {
        cardNumber: {
          [ bd.sequelize.Op.in ]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction);
    const orderId = uuid();
    req.body.contests.forEach((contest, index) => {
      const prize = index === req.body.contests.length - 1 ? Math.ceil(
        req.body.price / req.body.contests.length)
        : Math.floor(req.body.price / req.body.contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      });
    });
    await bd.Contests.bulkCreate(req.body.contests, transaction);
    transaction.commit();
    res.send();
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }
    const updatedUser = await userQueries.updateUser(req.body,
      req.tokenData.userId);
    res.send({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;
  try {
    transaction = await bd.sequelize.transaction();
    const updatedUser = await userQueries.updateUser(
      { balance: bd.sequelize.literal('balance - ' + req.body.sum) },
      req.tokenData.userId, transaction);
    await bankQueries.updateBankBalance({
        balance: bd.sequelize.literal(`CASE 
                WHEN "cardNumber"='${ req.body.number.replace(/ /g,
          '') }' AND "expiry"='${ req.body.expiry }' AND "cvc"='${ req.body.cvc }'
                    THEN "balance"+${ req.body.sum }
                WHEN "cardNumber"='${ CONSTANTS.SQUADHELP_BANK_NUMBER }' AND "expiry"='${ CONSTANTS.SQUADHELP_BANK_EXPIRY }' AND "cvc"='${ CONSTANTS.SQUADHELP_BANK_CVC }'
                    THEN "balance"-${ req.body.sum }
                 END
                `),
      },
      {
        cardNumber: {
          [ bd.sequelize.Op.in ]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction);
    transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};


