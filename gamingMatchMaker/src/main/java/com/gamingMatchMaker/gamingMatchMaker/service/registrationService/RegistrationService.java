package com.gamingMatchMaker.gamingMatchMaker.service.registrationService;

import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;

import java.util.Optional;

public interface RegistrationService {

    Optional<UserRec> createRegisterUser(UserRec newUserRecDetails);
}
