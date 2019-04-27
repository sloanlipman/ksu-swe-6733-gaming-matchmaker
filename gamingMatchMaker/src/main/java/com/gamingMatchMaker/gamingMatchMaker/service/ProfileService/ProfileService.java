package com.gamingMatchMaker.gamingMatchMaker.service.ProfileService;

import com.gamingMatchMaker.gamingMatchMaker.controller.SaveChangesAttempt;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;

public interface ProfileService {
	UserRec GetUserProfile(int id);
	boolean SaveProfile(SaveChangesAttempt scr);
}
