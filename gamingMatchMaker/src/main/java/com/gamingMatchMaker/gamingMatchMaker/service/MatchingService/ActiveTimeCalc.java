package com.gamingMatchMaker.gamingMatchMaker.service.MatchingService;

import com.gamingMatchMaker.gamingMatchMaker.model.PlayTime;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import org.springframework.stereotype.Component;

@Component
public class ActiveTimeCalc implements IMatcher {

	@Override
	public int scoreUser(UserRec self, UserRec other) {
		int score = 0;
		for(PlayTime at : self.getTimings()) {
			if(other.getTimings().contains(at)) score+=3;
		}
		//normalize vs 10
		return (score > 10 ? 10 : score);
	}

}