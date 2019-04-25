package com.gamingMatchMaker.gamingMatchMaker.service.MatchingService;

import com.gamingMatchMaker.gamingMatchMaker.model.GameGenre;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;

public class GenreCalc implements IMatcher {

	@Override
	public int scoreUser(UserRec self, UserRec other) {
		int score = 0;
		for(GameGenre gg : self.getGenres()) {
			if(other.getGenres().contains(gg)) score++;
		}
		//TODO normalize vs 10?
		return score;
	}

}
