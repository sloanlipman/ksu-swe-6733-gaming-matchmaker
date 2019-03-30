package com.gamingMatchMaker.gamingMatchMaker.service.ProfileService;

import org.springframework.security.core.userdetails.UserDetails;

import com.gamingMatchMaker.gamingMatchMaker.controller.SaveChangesAttempt;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;

public interface ProfileService {
	UserRec GetUserProfile(long id);
	boolean SaveProfile(SaveChangesAttempt scr);
}
