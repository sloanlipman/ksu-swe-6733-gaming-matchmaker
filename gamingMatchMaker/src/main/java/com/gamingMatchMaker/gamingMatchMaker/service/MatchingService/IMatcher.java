package com.gamingMatchMaker.gamingMatchMaker.service.MatchingService;

import java.util.ArrayList;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;

public interface IMatcher {
	public int scoreUser(UserRec self, UserRec other);
}
