package com.gamingMatchMaker.gamingMatchMaker.service.registrationService;

import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;

import java.util.Optional;

public interface RegistrationService {

    Optional<UserRec> createRegistration(String email, String password,
                                         String first_name, String last_name,
                                         int age, boolean is_active,
                                         int user_type, Location location);
}
