package com.gamingMatchMaker.gamingMatchMaker.service.userService;

import com.gamingMatchMaker.gamingMatchMaker.controller.authorization.UserDetail;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;

import java.util.Optional;

public interface UserService {
    Optional<UserRec> update(UserDetail userDetail);
}
