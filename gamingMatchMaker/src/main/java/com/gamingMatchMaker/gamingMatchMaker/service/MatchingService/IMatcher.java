package com.gamingMatchMaker.gamingMatchMaker.service.MatchingService;

import java.util.ArrayList;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;

public interface IMatcher {
	public ArrayList<UserRec> findMatches(UserRec self, ArrayList<UserRec> recs);
}
