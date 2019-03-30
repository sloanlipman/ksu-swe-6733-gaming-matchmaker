package com.gamingMatchMaker.gamingMatchMaker.service.registrationService;

import com.gamingMatchMaker.gamingMatchMaker.dao.UserAuthenticationRepository;
import com.gamingMatchMaker.gamingMatchMaker.dao.UserRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    private final UserRepository userDao;
    private final   UserAuthenticationRepository authDao;

    @Autowired
    public RegistrationServiceImpl(
            UserRepository userDao,
            UserAuthenticationRepository authDao
    ){
        this.userDao = userDao;
        this.authDao = authDao;
    }

    @Override
    public Optional<UserRec> createRegisterUser(UserRec newUserRecDetails) {
        // check for empty details
        System.out.println("got into createRegisterUser!");
        if(newUserRecDetails ==  null){
            throw new UserException("newUserRecDetails can not be null");
        }
        // check for empty username
        if(newUserRecDetails.getEmail()== null || newUserRecDetails.getEmail().length()<1){
            throw new UserException("Email cannot be empty");
        }
        //check for duplicate
        if(userDao.findByEmail(newUserRecDetails.getEmail()).isPresent()){
            throw new UserException("email already exists");
        }

        //make sure user id is null
        UserRec tempUserRec = new UserRec(newUserRecDetails);
        tempUserRec.setId(0);
        tempUserRec.setPassword(null);
        tempUserRec.setIs_active(true);

        // insert the new user
        UserRec newUserRec = userDao.save(tempUserRec);

        // make sure the insert was successful
        if(newUserRec == null || newUserRec.getEmail() == null) {
            throw new UserException("could not create user");
        }

        return Optional.of(newUserRec);

    }
}
